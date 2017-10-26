from flask import Flask, render_template, session, make_response,redirect, url_for, escape, request
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from gamelogic.game import *
from structures import Lobby
from time import gmtime, strftime
import random
from flask import Flask, redirect, url_for

# noinspection PyUnresolvedReferences
from application import app, socketio

# Views / Communication for gameplay.

playerIDs = 1
games = {} # in here we will store the game objects
lobbies={}

@socketio.on('existingRoom')
def joinTeam():
    emit('joinR')

@app.route('/')
def defaultRoute():
    return (redirect(url_for('home')))
@app.route('/secret')
def newSecret():
    return (render_template("joinSecretTeam.html"))
@app.route('/help')
def helpR():
    return (render_template("helpPage.html"))
@app.route('/rules')
def rules():
    return (render_template("rules.html"))
@app.route('/videoTutorials')
def videos():
    return (render_template("videotutorials.html"))
@app.route('/actions')
def actions():
    return (render_template("playerActions.html"))

@app.route('/join')
def newTeamRedirect():
    publicRooms = []
    for i in lobbies:
        if lobbies[i].privacy == "public":
            publicRooms.append(i)

    return (render_template("joinTeam.html",availableRooms = publicRooms,allRooms = lobbies))

@app.route('/new')
def newTeam():
    return (render_template("createTeam.html"))

@app.route('/game')
def game():
    if 'username'and "roomname" in session:

        username = str(session['username'])
        roomname = str(session['roomname'])
        currentLobby = lobbies[roomname]
        currentLobby.gameStarted=True
        playerdict = currentLobby.players
        if roomname not in games:
            gameobject = GameBoard(playerdict)
            gameobject.gameID = roomname
            gameobject.difficulty=currentLobby.difficulty
            games[roomname] = gameobject
        return (render_template("MapOnCanvas.html"))
    return "You are not logged in <br><a href = '/home'></b>" + \
      "click here to log in</b></a>"

@socketio.on('checkRoomPrivacy')
def roomprivacy():
    print ("Check room called")
    #"Check move called"
    join_room("default")
    publicLobbies = []
    for lobbyobjectkey in lobbies:
        lobbyobj=lobbies[lobbyobjectkey]
        if lobbyobj.privacy == "public" and lobbyobj.gameStarted==False:
            print("public lobby found with id " +lobbyobj.name )
            publicLobbies.append(lobbyobj.name)
    emit('publicLobbies', {'lobbies': publicLobbies}, room="default")


@socketio.on('playerJoined')
def playerJoined():
    join_room(session["roomname"])
    emit('playerJoined',{'msg': str(session['username']) + " has joined room " + str(session['roomname'])},room=session["roomname"])


@socketio.on('getGameInitialization')
def getGameInitialization():
    roomname = session["roomname"]
    gameboard = games[roomname]
    for player in gameboard.players:
        playerObj = gameboard.players[player]
        playerName = playerObj.name
        playerLocation = playerObj.location
        playerRole = playerObj.role
        emit('gamePlayerInitilization',{"playerName":playerName,"playerType":playerRole,"playerLocation":playerLocation})


@socketio.on('getInfections')
def getInfections():
    roomname = session["roomname"]
    gameboard = games[roomname]
    username = str(session["username"])
    for player in gameboard.players:
        playerObj = gameboard.players[player]
        playerName = playerObj.name
        if playerName==username:
            citiesInfected=gameboard.getAllCurrentInfectedCities()
            infectionLevel= gameboard.infectionLevel
            outbreakLevel= gameboard.outBreakLevel
            cubesUsed = []
            for colour in gameboard.cubesUsed:
                cubesUsed.append({colour: gameboard.cubesUsed[colour]})
            researchLocations=gameboard.getResearchStations()
            curesFound=gameboard.getCures()

            emit('InfectedCities',{"infected":citiesInfected,"infectLevel":infectionLevel,
                                   "outbreakLevel":outbreakLevel,"cubesUsed":cubesUsed,
                                   "researchLocations":researchLocations,"curesFound":curesFound})


@socketio.on('updateHands')
def updateHands():
    roomname = session["roomname"]
    username = session["username"]
    gameboard = games[roomname]
    playersHands = {}
    players = gameboard.players
    for playerK in players:
        playerObj = players[playerK]
        playerHand = playerObj.hand
        playerCardNames = []
        for card in playerHand:

            cardname = card.name
            playerCardNames.append(cardname)
        playersHands[players[playerK].name] = playerCardNames

    emit('gotUpdate', {"playerhand": playersHands, "username": username})




@socketio.on('getPlayersHands')
def getPlayersHands():
    roomname = session["roomname"]
    username = session["username"]
    gameboard = games[roomname]
    playersHands={}
    playerRoll = {}
    players=gameboard.players
    for playerK in players:
        print "one player", players[playerK].name
        playerObj= players[playerK]
        playerHand=playerObj.hand
        playerCardNames=[]
        print (players[playerK].role)
        print playerK
        value =(players[playerK].role)
        playerRoll[players[playerK].name]= value
        print ("His roll is: " ,playerRoll)
        for card in playerHand:
            print (card)
            cardname=card.name
            playerCardNames.append(cardname)
        playersHands[players[playerK].name]=playerCardNames


    print playersHands

    print ('gotInitialHands',{"playerhand":playersHands,"username":username,"Player roll":playerRoll})
    emit('gotInitialHands',{"playerhand":playersHands,"username":username,"playerRoll":playerRoll})


@socketio.on('getPlayerObject')
def getPlayerObject():

    roomname=session["roomname"]
    join_room(roomname)
    username=session["username"]
    gameObj=games[roomname]
    for playerkey in gameObj.players:
        playerObj=gameObj.players[playerkey]
        #print playerObj.name, "######"
        if playerObj.name==username:
            playerName = playerObj.name
            playerRole = playerObj.role
            emit('gotPlayer',{"playerName":playerName,"playerType":playerRole})


@socketio.on('newRoom')
def newRoom():
    emit('createNewRoom')
@socketio.on('secretRoom')
def newRoom():
    emit('joinSecret')

@socketio.on('help')
def newRoom():
    emit('helpRoom')

@socketio.on('startGame')
def startGame():
    roomname = session["roomname"]
    username = session["username"]
    lobbies[roomname].messageHistory = ""
    lobby=lobbies[roomname]
    for player in lobby.players:
        if lobby.players[player].name == username:
            numplayers = len(lobby.players)
            numRolesChosen = 0
            for role in lobby.playerRoles:
                if lobby.playerRoles[role] == 1:
                    numRolesChosen += 1
            print numRolesChosen,"Num roles chosen "
            print numplayers, " num players"
            if (numplayers==numRolesChosen):
                emit('gameStarted', {}, room=roomname)
            else:
                emit('gameStartFailed',{})


@socketio.on('getMessages')
def getMessages():
    if lobbies == {}:
        return
    else:
        roomStart = session["roomname"]
        LobbyInstance = lobbies[roomStart]
        previousMessages = LobbyInstance.messageHistory
        leave_room(roomStart)
        join_room(roomStart+"GetMessage")
        emit('messageReceived', {'msg' : previousMessages }, room=roomStart+"GetMessage")
        leave_room(roomStart+"GetMessage")
        join_room(roomStart)

@socketio.on('sendMessage')
def handleMessage(msg):

    player = session["username"]
    room = session["roomname"]
    message = msg["message"]
    messageSent = "<p> " + player + ": "+message + "</p>"
    LobbyInstance = lobbies[room]
    if LobbyInstance.messageHistory == "":
        LobbyInstance.messageHistory = messageSent
    else:
        LobbyInstance.messageHistory = LobbyInstance.messageHistory + messageSent
    #print "All of the chat history: " + LobbyInstance.messageHistory
    emit('messageReceived', {'msg' : LobbyInstance.messageHistory }, room=room)

@socketio.on('click')
def handleclick(msg):
    room = str(session['roomname'])
    player = session["username"]
    messg= msg["mess"]
    #print(messg)

    emit('clicked', {'msg' : player + messg },room=room)

@socketio.on('roundOverDone')
def roundOverDone():
    roomName = str(session['roomname'])
    username = str(session["username"])

    gameObject = games[roomName]
    gameObject.resetPlayerActions()

@socketio.on('discardCard')
def HandleDiscardCard(msg):
    roomName = str(session['roomname'])
    username = str(session["username"])
    cardName = msg["cardName"]
    gameObject = games[roomName]
    playerDictionary = gameObject.players
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            response = gameObject.discardCard(playerObject.id, cardName)
            if response==True:
                emit('cardRemoved', {'playerName': username, 'msg': response, 'cardToRemove': cardName}, room=roomName)
            else:
                emit('cardRemoved', {'playerName': username, 'msg': response, 'cardToRemove': cardName})


@socketio.on('checkMove')
def handlecheckmove(msg):
    #"Check move called"
    roomName = str(session['roomname'])
    username = str(session["username"])
    cityToMove= msg["cityName"]
    #print (username, " in room ", roomName," moved to ", cityToMove)
    gameObject = games[roomName]
    playerDictionary = gameObject.players
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            response=gameObject.movePlayer(playerObject.id,cityToMove)
            #       response will be either true or false
            #
            # print ("we are about to emit a message")
            print response
            if response["validAction"]==True:
                emit('checked', {'playerName':username,'msg':response,'city':cityToMove},room=roomName)
            else:
                emit('checked', {'playerName': username, 'msg': response, 'city': cityToMove})




@socketio.on('checkDirectFlight')
def handleclick(msg):
    room = str(session['roomname'])
    username = str(session["username"])
    cityToMove= msg["cityName"]
    gameObject = games[room]
    playerDictionary = gameObject.players
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            # Player found."
            print playerObject.id,"player id!"
            response = gameObject.directFlight(playerObject.id, cityToMove)
            if response["validAction"]==True:
                emit('checked', {'playerName':username,'msg':response,'city':cityToMove},room=room)
            else:
                emit('checked', {'playerName': username, 'msg': response, 'city': cityToMove})




@socketio.on('checkCharterFlight')
def handleclick(msg):
    room = str(session['roomname'])
    username = str(session["username"])
    cityCardName=msg["cityName"]
    cityToMove= msg["destination"]
    gameObject = games[room]
    playerDictionary = gameObject.players
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            print(playerObject.name," wants to use the card", cityCardName ," to move to ",cityToMove)

            response = gameObject.charterFlight(playerObject.id, cityCardName, cityToMove)
            # if response["validAction"] == True:
            #     emit('charterFlightChecked', {'playerName': username, 'msg': response, 'city': cityToMove}, room=room)
            # else:
            #     emit('charterFlightChecked', {'playerName': username, 'msg': response, 'city': cityToMove})
            if response["validAction"]==True:
                emit('checked', {'playerName':username,'msg':response,'city':cityToMove},room=room)
            else:
                emit('checked', {'playerName': username, 'msg': response, 'city': cityToMove})


@socketio.on('checkShuttleFlight')
def handleclick(msg):
    room = str(session['roomname'])
    username = str(session["username"])
    cityToMove = msg["cityName"]
    gameObject = games[room]
    playerDictionary = gameObject.players
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            response = gameObject.shuttleFlight(playerObject.id, cityToMove)
            # if response["validAction"] == True:
            #     emit('shuttleFlightChecked', {'playerName': username,'msg':response,'city':cityToMove},room=room)
            # else:
            #     emit('shuttleFlightChecked', {'playerName': username, 'msg': response, 'city': cityToMove})
            if response["validAction"]==True:
                emit('checked', {'playerName':username,'msg':response,'city':cityToMove},room=room)
            else:
                emit('checked', {'playerName': username, 'msg': response, 'city': cityToMove})


@socketio.on('buildResearchStation')
def handleclick(msg):
    room = str(session['roomname'])
    username = str(session["username"])

    #response=game.charterFlight(1,cityToMove)
    gameObject = games[room]
    playerDictionary = gameObject.players
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        cityToBuildOn = playerObject.location
        if playerObject.name == username:
            response= gameObject.buildResearchStation(playerObject.id,cityToBuildOn)
            if response["validAction"] == True:
                emit('researchBuildChecked', {'playerName': username, 'msg': response, 'city': cityToBuildOn}, room=room)
            else:
                emit('researchBuildChecked', {'playerName': username, 'msg': response, 'city': cityToBuildOn})



@socketio.on('shareKnowledgeGive')
def handleclick(msg):
    room = str(session['roomname'])
    username = str(session["username"])

    playerTakingName= msg["playerTaking"]
    gameObject = games[room]
    #print playerid, otherPlayerid
    playerDictionary = gameObject.players

    playerLocation=""
    playerid=""
    otherPlayerid=""
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            playerid=playerObject.id
            playerLocation=playerObject.location
        elif playerObject.name== playerTakingName:
            otherPlayerid=playerObject.id

    if "cityName" in msg:
        cityCardToShare = msg["cityName"]
    else:
        cityCardToShare=playerLocation
    response = gameObject.shareKnowledgeGive(playerid,otherPlayerid,cityCardToShare)

    if response["validAction"] == True:
        emit('giveKnowledgeShared', {'msg':response},room=room)
    else:
        emit('giveKnowledgeShared', {'msg': response})



@socketio.on('shareKnowledgeTake')
def handleclick(msg):
    room = str(session['roomname'])
    username = str(session["username"])

    playerGivingName= msg["playerGiving"]
    gameObject = games[room]
    playerDictionary = gameObject.players
    playerLocation = ""
    playerid = ""
    otherPlayerid = ""

    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            playerid=playerObject.id
            playerLocation=playerObject.location
        elif playerObject.name== playerGivingName:
            otherPlayerid=playerObject.id

    if "cityName" in msg:
        cityCardToShare = msg["cityName"]
    else:
        cityCardToShare=playerLocation

    response = gameObject.shareKnowledgeTake(playerid,otherPlayerid,cityCardToShare)
    #print response
    if response["validAction"] == True:
        emit('takeKnowledgeShared', {'msg':response}, room=room)
    else:
        emit('takeKnowledgeShared', {'msg': response})


@socketio.on('treatDisease')
def handleclick(msg):
    room = str(session['roomname'])
    username = str(session["username"])
    colToTreat = msg["InfectionColour"]
    gameObject = games[room]
    playerDictionary = gameObject.players
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            cityToTreat = playerObject.location
            cityObject = gameObject.cities[cityToTreat]
            response = gameObject.treatDisease(playerObject.id, playerObject.location, colToTreat)
            if response["validAction"] == True:
                emit('diseaseTreated', {'msg':response,'city':cityToTreat},room=room)
            else:
                emit('diseaseTreated', {'msg': response, 'city': cityToTreat})



@socketio.on('discoverCure')
def handleclick(msg):
    room = str(session['roomname'])
    cities= msg["cities"]
    username = str(session["username"])
    gameObject = games[room]
    playerDictionary = gameObject.players
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            response=gameObject.discoverCure(playerObject.id,cities)
            print response
            if response["validAction"] == True:
                emit('cureDiscovered', {'playerName': username,'msg':response,'cardsToDiscard':cities},room=room)
            else:
                emit('cureDiscovered', {'msg': response})


@socketio.on('PassTurn')
def handleclick():
    room = str(session['roomname'])
    username = str(session["username"])
    gameObject = games[room]
    playerDictionary = gameObject.players
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            response=gameObject.passTurn(playerObject.id)
            print response
            if response["validAction"] == True:
                emit('passTurnChecked', {'playerName': username,'msg':response},room=room)
            else:
                emit('passTurnChecked', {'msg': response})


@socketio.on('PlayEventCard')
def handleclick(msg):
    room = str(session['roomname'])
    username = str(session["username"])
    gameObject = games[room]
    eventCardName = msg["card"]

    playerDictionary = gameObject.players

    if eventCardName== "Government_Grant":
        for key in playerDictionary:
            playerObject = playerDictionary[key]
            if playerObject.name == username:
                cityToBuildOn = msg["city"]
                response=gameObject.governmentGrant(playerObject.id,eventCardName,cityToBuildOn)
                emit('governmentGrantChecked', {'msg': response},room=room)

    elif eventCardName== "AirLift":
        playerToMove = msg["player"]
        cityToMoveTo = msg["city"]
        print "PLAYER TO MOVE IS", playerToMove
        print " I AM ,", username
        playerId=""
        playerToMoveId=""
        for key in playerDictionary:
            playerObject = playerDictionary[key]
            if playerObject.name == username:
                playerId = playerObject.id
            if playerObject.name == playerToMove:
                playerToMoveId = playerObject.id
        print "PLAYER TO MOVE IS", playerToMoveId
        print " I AM ,", playerId
        response = gameObject.airLift(playerId,playerToMoveId, cityToMoveTo)
        emit('checked', {'playerName': playerToMove, 'msg': response, 'city': cityToMoveTo}, room=room)

    elif eventCardName == "One_Quiet_Night":
        for key in playerDictionary:
            playerObject = playerDictionary[key]
            if playerObject.name == username:
                response=gameObject.skipInfectStage(playerObject.id)

                emit('oneQuietNightChecked', {'msg': response})

    elif eventCardName == "Resilient Population":
        cardToRemove=msg["infectCard"]

        for key in playerDictionary:
            playerObject = playerDictionary[key]
            if playerObject.name == username:
                response=gameObject.removeInfectionCard(playerObject.id,cardToRemove)
                emit('resilientPopulationChecked', {'msg': response})

    # elif eventCardName== "Forecast":
    #     #cardOrder=msg["cardsOrdered"]
    #     cardOrder={2:"SYDNEY",3:"ATLANTA",0:"KOULKATA",5:"CHICAGO",1:"BOGOTA",4:"BEIJING"}
    #     #cardOrder=[3,2,0,1,4,5]
    #     for key in playerDictionary:
    #         playerObject = playerDictionary[key]
    #         if playerObject.name == username:
    #             response=gameObject.playForecast(playerObject.id,cardOrder)


@socketio.on('dispatcherMove')
def handle_message(msg):
    room = str(session['roomname'])
    username = str(session["username"])
    gameObject = games[room]
    playerDictionary = gameObject.players
    playerToMove = msg["player"]
    cityToMoveTo = msg["city"]
    playerId = ""
    playerToMoveId = ""
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            playerId = playerObject.id
        elif playerObject.name == playerToMove:
            playerToMoveId = playerObject.id
    response = gameObject.dispatcherMoveOther(playerId, playerToMoveId, cityToMoveTo)
    print response
    if response["validAction"] == True:
        emit('checked', {'playerName': playerToMove, 'msg': response, 'city': cityToMoveTo}, room=room)
    else:
        emit('checked', {'playerName': playerToMove, 'msg': response, 'city': cityToMoveTo})

@socketio.on('operationExpert')
def handle_message(msg):
    room = str(session['roomname'])
    username = str(session["username"])
    cardName = msg["card"]
    cityToMoveTo = msg["city"]
    gameObject = games[room]
    playerDictionary = gameObject.players
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            playerId = playerObject.id
            response = gameObject.operationsTeleport(playerId, cardName, cityToMoveTo)
            if response["validAction"] == True:
                emit('checked', {'playerName': username, 'msg': response, 'city': cityToMoveTo}, room=room)
            else:
                emit('checked', {'playerName': username, 'msg': response, 'city': cityToMoveTo})







@socketio.on('setRole') # use for testing client side messages.
def setRole(msg):
    roleToSet=msg["roleChoice"]
    room = str(session['roomname'])
    username = str(session["username"])
    lobby = lobbies[str(session['roomname'])]
    print username, room, lobby.name
    print lobby.players, "   players"
    for player in lobby.players:
        if lobby.players[player].name == username:
            roles=lobby.playerRoles
            if roles[msg["roleChoice"]]==0:
                roles[roleToSet]=1
                lobby.players[player].role=msg["roleChoice"]
                print roles
                numplayers = len(lobby.players)
                numRolesChosen = 0
                for role in lobby.playerRoles:
                    if lobby.playerRoles[role] == 1:
                        numRolesChosen += 1
                print numRolesChosen,"Num roles chosen "
                print numplayers, " num players"
                emit('roleSet', {'playerName': username, 'msg': msg["roleChoice"]})
                emit('changeRoleAvailibility', {'msg': msg["roleChoice"],"rolesChosenCount":numRolesChosen,"playersInLobbyCount":numplayers}, room=room)

            #return (render_template("home.html", error="This username is already taken, chose another"))





@socketio.on('message') # use for testing client side messages.
def handle_message(msg):
    print('received message: ' + str(msg))


@app.route('/home', methods = ['GET', 'POST'])
def home():
    return render_template("home.html")


@app.route('/lobby', methods = ['GET', 'POST'])
def lobby():
    session["username"] = (random.randint(0,100000000))
    global playerIDs

    if request.method == 'POST':

            if request.form['roomtype']=="create":
                if request.form['username'].isspace() or request.form['username']=="":
                    print ("HERE")
                    return (render_template("createTeam.html",error="Please type in your name."))
                elif (request.form['roomname'] == ""):
                    print ("OR here")
                    return (render_template("createTeam.html",error="No public games available"))
                elif request.form['roomname'].isspace() or request.form['roomname']=="":
                    print ("HERE")
                    return (render_template("createTeam.html", error="Select a room to join."))
                elif len(request.form['username'])>10:
                    print
                    return (render_template("createTeam.html", error="Your name can't be that long."))
                elif len(request.form['roomname'])>10:
                    print
                    return (render_template("createTeam.html", error="Your room name is too long."))

                session['username'] = request.form['username']
                session['roomname'] = request.form['roomname']

                if session['roomname'] in lobbies:
                    return (render_template("createTeam.html", error="Sorry this room name is already taken chose another"))

                lobby=Lobby(str(session['roomname']))
                lobby.privacy=request.form['privacy']
                difficulty = request.form["difficulty"]
                if difficulty=="Normal":
                    lobby.difficulty=0
                elif difficulty=="Hard":
                    lobby.difficulty=1
                else:
                    lobby.difficulty=2

                print(lobby.difficulty, " is the diffculty")
                print ("THis room privacy is :" + lobby.privacy)

                #add lobby to dictionary

                lobby.playerCount=1

                newPlayer=Player(lobby.playerCount,str(session['username']))
                lobby.players[1]=newPlayer

                playerIDs = playerIDs + 1

                lobbies[str(session['roomname'])] = lobby


            else: # if user is joining a game
                try:
                    if request.form['username'].isspace() or request.form['username']=="":
                        print ("HERE")
                        return (render_template("joinTeam.html",error="Please type in your name."))
                    elif (request.form['roomname'] == ""):
                        print ("OR here")
                        return (render_template("joinTeam.html",error="No public games available"))
                    elif request.form['roomname'].isspace() or request.form['roomname']=="":
                        print ("HERE")
                        return (render_template("joinTeam.html", error="Select a room to join."))
                    elif len(request.form['username'])>10:
                        return (render_template("joinTeam.html", error="Your name can't be that long."))

                    print ("Passed here")
                    session['username'] = request.form['username']
                    session['roomname'] = request.form['roomname']

                    lobby = lobbies[str(session['roomname'])]

                    if lobby.playerCount==4:
                        return (render_template("joinTeam.html",error="Sorry this room is full! Please join another"))
                    if lobby.gameStarted==True:
                        return (render_template("joinTeam.html", error="This game has already started please Join or create another game"))

                    for player in lobby.players:
                        print lobby.players[player]
                        print session['username']
                        if lobby.players[player].name==session['username']:
                            return (render_template("home.html", error="This username is already taken, chose another"))


                    lobby.playerCount += 1
                    newPlayer = Player(lobby.playerCount, str(session['username']))
                    lobby.players[lobby.playerCount]=newPlayer
                except:
                    print"Lobby does not exist"
                    return (render_template("home.html", error="Sorry no room exist. Create a new one."))


            return (render_template("intermission.html",room=session['roomname'],playerRoles=lobby.playerRoles))
    return (render_template("home.html"))




#---------------------------------------

@app.route('/secret', methods = ['GET', 'POST'])
def secret():
    session["username"] = (random.randint(0,100000000))
    global playerIDs

    if request.method == 'POST':

            session['username'] = request.form['username']
            session['roomname'] = request.form['roomname']

            try:
                lobby = lobbies[str(session['roomname'])]

                if lobby.playerCount==4:
                    return (render_template("joinSecretTeam.html",error="Sorry this room is full! Please join another"))
                if lobby.gameStarted==True:
                    return (render_template("joinSecretTeam.html", error="This game has already started please Join or create another game"))

                for player in lobby.players:
                    print lobby.players[player]
                    print session['username']
                    if lobby.players[player].name==session['username']:
                        return (render_template("joinSecretTeam.html", error="This username is already taken, chose another"))


                lobby.playerCount += 1
                newPlayer = Player(lobby.playerCount, str(session['username']))
                lobby.players[lobby.playerCount]=newPlayer
            except:
                print"Lobby does not exist"
                return (render_template("joinSecretTeam.html", error="Sorry this room does not exist try another room"))


            return (render_template("intermission.html",room=session['roomname'],playerRoles=lobby.playerRoles))
    return (render_template("joinSecretTeam.html"))
