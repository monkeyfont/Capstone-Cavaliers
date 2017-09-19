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

#

@app.route('/game')
def game():
    if 'username'and "roomname" in session:

        username = str(session['username'])
        roomname = str(session['roomname'])
        currentLobby = lobbies[roomname]
        playerdict = currentLobby.players
        if roomname not in games:
            gameobject = GameBoard(playerdict)
            gameobject.gameID = roomname
            games[roomname] = gameobject
        return (render_template("MapOnCanvas.html"))
    return "You are not logged in <br><a href = '/lobby'></b>" + \
      "click here to log in</b></a>"

@socketio.on('checkRoomPrivacy')
def roomprivacy():
    print ("Check room called")
    #"Check move called"
    join_room("default")
    publicLobbies = []
    for lobbyobjectkey in lobbies:
        lobbyobj=lobbies[lobbyobjectkey]
        if lobbyobj.privacy == "public":
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
        emit('gamePlayerInitilization',{"playerName":playerName,"playerType":playerRole,"playerLocation":playerLocation},room=session["roomname"])


@socketio.on('getinitInfections')
def getinitInfections():
    roomname = session["roomname"]
    gameboard = games[roomname]
    citiesInfected=gameboard.initInfectedCities

    emit('intitialInfectedCities',citiesInfected,room=session["roomname"])



@socketio.on('getPlayersHands')
def getPlayersHands():
    roomname = session["roomname"]
    gameboard = games[roomname]
    playersHands={}
    players=gameboard.players
    for playerK in players:
        playerObj= players[playerK]
        playerHand=playerObj.hand
        playerCardNames=[]
        for card in playerHand:
            cardname=card.name
            playerCardNames.append(cardname)
        playersHands[playerK]=playerCardNames

    emit('gotInitialHands',playersHands,room=session["roomname"])


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


@socketio.on('startGame')
def startGame():
    roomname = session["roomname"]
    username = session["username"]
    lobbies[roomname].messageHistory = ""

    emit('gameStarted',{},room=roomname)

@socketio.on('getMessages')
def getMessages():
    if lobbies == {}:
        return
    else:
        roomStart = session["roomname"]
        print roomStart
        LobbyInstance = lobbies[roomStart]
        previousMessages = LobbyInstance.messageHistory
        leave_room(roomStart)
        join_room(roomStart+"GetMessage")
        emit('messageReceived', {'msg' : previousMessages }, room=roomStart+"GetMessage")
        leave_room(roomStart+"GetMessage")
        join_room(roomStart)

# this will received the message by the user
# add it to the message history
# and then return the whole history
@socketio.on('sendMessage')
def handleMessage(msg):
    time = strftime("%Y-%m-%d %H:%M:%S", gmtime())

    player = session["username"]
    room = session["roomname"]
    message = msg["message"]
    messageSent = time + "  :: "+ player + " said: "+message
    LobbyInstance = lobbies[room]
    if LobbyInstance.messageHistory == "":
        LobbyInstance.messageHistory = messageSent
    else:
        LobbyInstance.messageHistory = LobbyInstance.messageHistory + " &#013 "+messageSent
    #print "All of the chat history: " + LobbyInstance.messageHistory
    emit('messageReceived', {'msg' : messageSent}, room=room)

@socketio.on('click')
def handleclick(msg):
    room = str(session['roomname'])
    player = session["username"]
    messg= msg["mess"]
    #print(messg)

    emit('clicked', {'msg' : player + messg },room=room)

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
            emit('checked', {'playerName':username,'msg':response,'city':cityToMove},room=roomName)



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

    emit('directFlightChecked', {'playerName':username,'msg':response,'city':cityToMove},room=room)



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
    # IF USERS CURRENT CITY IS SAME AS THIS CITYTOMOVE TO VALUE THEN THEY CAN MOVE ANYWHERE

    emit('charterFlightChecked', {'playerName': username, 'msg': response, 'city': cityToMove}, room=room)

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
    emit('shuttleFlightChecked', {'playerName': username,'msg':response,'city':cityToMove},room=room)

@socketio.on('buildResearchStation')
def handleclick(msg):
    room = str(session['roomname'])
    username = str(session["username"])
    cityToBuildOn= msg["cityName"]
    #response=game.charterFlight(1,cityToMove)
    gameObject = games[room]
    playerDictionary = gameObject.players
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            response= gameObject.buildResearchStation(playerObject.id,cityToBuildOn)
    emit('researchBuildChecked', {'playerName': username, 'msg': response, 'city': cityToBuildOn}, room=room)


@socketio.on('shareKnowledgeGive')
def handleclick(msg):
    room = str(session['roomname'])
    username = str(session["username"])
    cityCardToShare=msg["cityName"]
    playerTakingName= msg["playerTaking"]
    gameObject = games[room]

    #print playerid, otherPlayerid
    playerDictionary = gameObject.players

    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            playerid=playerObject.id
        elif playerObject.name== playerTakingName:
            otherPlayerid=playerObject.id
    response = gameObject.shareKnowledgeGive(playerid,otherPlayerid,cityCardToShare)


    emit('giveKnowledgeShared', {'msg':response,'city':"no"},room=room)

@socketio.on('shareKnowledgeTake')
def handleclick(msg):
    room = str(session['roomname'])
    username = str(session["username"])
    cityCardToShare=msg["cityName"]
    playerGivingName= msg["playerGiving"]
    gameObject = games[room]

    #print playerid, otherPlayerid
    playerDictionary = gameObject.players

    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            playerid=playerObject.id
        elif playerObject.name== playerGivingName:
            otherPlayerid=playerObject.id
    response = gameObject.shareKnowledgeTake(playerid,otherPlayerid,cityCardToShare)


    emit('takeKnowledgeShared', {'msg':response,'city':"no"},room=room)


@socketio.on('treatDisease')
def handleclick(msg):
    room = str(session['roomname'])
    username = str(session["username"])
    cityToTreat = msg["cityName"]
    gameObject = games[room]
    cityObject = gameObject.cities[cityToTreat]
    playerDictionary = gameObject.players
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            response = gameObject.treatDisease(playerObject.id, cityToTreat, cityObject.colour)
            emit('diseaseTreated', {'msg':response,'city':cityToTreat},room=room)


@socketio.on('discoverCure')
def handleclick(msg):
    room = str(session['roomname'])
    playerCity= msg["cityName"]
    secondPlayerCity = msg["cityName"]
    #response=game.charterFlight(1,cityToMove)
    response=True
    #response will be either true or false

    emit('cureDiscovered', {'msg':response,'city':playerCity},room=room)



@socketio.on('message') # use for testing client side messages.
def handle_message(msg):
    print('received message: ' + str(msg))


@app.route('/lobby', methods = ['GET', 'POST'])
def lobby():
    session["username"] = (random.randint(0,100000000))
    global playerIDs

    if request.method == 'POST':

            session['username'] = request.form['username']
            session['roomname'] = request.form['roomname']
            if request.form['roomtype']=="create":


                if session['roomname'] in lobbies:
                    return (render_template("lobby.html", error="Sorry this room name is already taken chose another"))


                lobby=Lobby(str(session['roomname']))
                lobby.privacy=request.form['privacy']
                #add lobby to dictionary
                lobbies[str(session['roomname'])] = lobby
                lobby.playerCount=1

                newPlayer=Player(lobby.playerCount,str(session['username']))
                lobby.players[1]=newPlayer

                playerIDs = playerIDs + 1

            else: # if user is joining a game
                try:
                    lobby = lobbies[str(session['roomname'])]

                    if lobby.playerCount==4:
                        return (render_template("lobby.html",error="Sorry this room is full! Please join another"))
                    lobby.playerCount += 1
                    newPlayer = Player(lobby.playerCount, str(session['username']))
                    lobby.players[lobby.playerCount]=newPlayer
                except:
                    print"Lobby does not exist"
                    return (render_template("lobby.html", error="Sorry this room does not exist try another room"))
            return (render_template("intermission.html",room=session['roomname']))
    return (render_template("lobby.html"))

print("imported")