from flask import Flask, render_template, session, make_response,redirect, url_for, escape, request
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from game import *
from lobby import *
import random
from flask import Flask, redirect, url_for
import unittest
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # DONT LET BROWSER CACHE ANYTHING! -- For development only!
app.secret_key = 'development' # change when out of development!
socketio = SocketIO(app)
room_ID = 1
playerID = 1
playerIDs = 1
games = {} # in here we will store the game objects
lobbies={}
userTable = {} # this will be changed later on to be a database storing the user details
@app.route('/')
def home():
    # Quick session testing code.
    return render_template("home.html")

@app.route('/game')
def game():

    if 'username'and "roomname" in session:

        username = str(session['username'])
        roomname = str(session['roomname'])
        currentLobby = lobbies[roomname]
        playerdict = currentLobby.players

        if roomname in games: # if game for this room has already been created then go to game
            return(render_template("MapOnCanvas.html"))
        else:
              #otherwise create a new game for this room
            gameobject = GameBoard(playerdict)
            gameobject.gameID = roomname
            games[roomname] = gameobject
            print games
            return (render_template("MapOnCanvas.html"))

    print("NOT IN SESSION")


    return "You are not logged in <br><a href = '/lobby'></b>" + \
      "click here to log in</b></a>"


@socketio.on('checkroomprivacy')
def roomprivacy():
    print ("Check room called")
    #"Check move called"
    join_room("1")
    publicLobbies = []
    for lobbyobjectkey in lobbies:
        lobbyobj=lobbies[lobbyobjectkey]
        if lobbyobj.privacy == "public":
            print("public lobby found with id " +lobbyobj.name )
            publicLobbies.append(lobbyobj.name)
    emit('publicLobbies', {'lobbies': publicLobbies}, room=1)

@socketio.on('playerJoined')
def playerJoined():

    join_room(session["roomname"])
    emit('playerJoined',{'msg': str(session['username']) + " has joined room " + str(session['roomname'])},room=session["roomname"])


@socketio.on('getGameInitialization')
def getGameInitialization():
    roomname = session["roomname"]
    gameboard = games[roomname]
    print (gameboard.players)
    for player in gameboard.players:
        print (player)
        playerObj = gameboard.players[player]
        playerName = playerObj.name
        playerLocation = playerObj.getLocation()
        playerRole = playerObj.role
        emit('gamePlayerInitilization',{"playerName":playerName,"playerType":playerRole,"playerLocation":playerLocation},room=session["roomname"])

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

    emit('gameStarted',{},room=roomname)


@socketio.on('join')
def joined():
    player = session["username"]
    room = session["roomname"]
    print ("Player name: " + player)
    print ("Player room name: " + room)
    join_room(room)
    emit('joined', {'msg': str(player) + " joined room " + str(room)}, room=room)

@socketio.on('move')
def handleMessage(msg):
    player = session["username"]
    room = session["roomname"]
    location = msg["move_location"]
    emit('moved', {'msg' : str(player) + " moved to " + location}, room=room)

@socketio.on('click')
def handleclick(msg):
    room = str(session['roomname'])
    player = session["username"]
    messg= msg["mess"]
    print(messg)

    emit('clicked', {'msg' : player + messg },room=room)

@socketio.on('checkMove')
def handlecheckmove(msg):
    #"Check move called"
    roomName = str(session['roomname'])
    username = str(session["username"])
    cityToMove= msg["cityName"]
    print (username, " in room ", roomName," moved to ", cityToMove)
    gameObject = games[roomName]
    playerDictionary = gameObject.players
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            response=gameObject.movePlayer(playerObject.id,cityToMove)
            #       response will be either true or false
            print ("we are about to emit a message")
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

    cityCardName=msg["cityName"]
    cityToMove= msg["destination"]
    print("Player wants to discard card '",cityCardName,"' and wants to move to '",cityToMove,"' ")
    # IF USERS CURRENT CITY IS SAME AS THIS CITYTOMOVE TO VALUE THEN THEY CAN MOVE ANYWHERE
    #response=game.charterFlight(1,cityCardName,cityToMove)
    response=True
    #response will be either true or false

    emit('charterFlightChecked', {'msg':response,'city':cityToMove},room=room)

@socketio.on('checkShuttleFlight')
def handleclick(msg):
    room = str(session['roomname'])
    cityToMove= msg["cityName"]
    #response=game.charterFlight(1,cityToMove)
    response=True
    #response will be either true or false

    emit('shuttleFlightChecked', {'msg':response,'city':cityToMove},room=room)

@socketio.on('buildResearchStation')
def handleclick(msg):
    room = str(session['roomname'])
    cityToBuildOn= msg["cityName"]
    #response=game.charterFlight(1,cityToMove)
    response=True
    #response will be either true or false

    emit('researchBuildChecked', {'msg':response,'city':cityToBuildOn},room=room)

@socketio.on('shareKnowledge')
def handleclick(msg):
    room = str(session['roomname'])
    playerCity= msg["cityName"]
    secondPlayerCity = msg["cityName"]
    #response=game.charterFlight(1,cityToMove)
    response=True
    #response will be either true or false

    emit('knowledgeShared', {'msg':response,'city':playerCity},room=room)


@socketio.on('treatDisease')
def handleclick(msg):
    room = str(session['roomname'])
    playerCity= msg["cityName"]
    secondPlayerCity = msg["cityName"]
    #response=game.charterFlight(1,cityToMove)
    response=True
    #response will be either true or false

    emit('diseaseTreated', {'msg':response,'city':playerCity},room=room)


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


@socketio.on('checkCharterFlight')
def handleclick(msg):
    room = str(session['roomname'])

    cityCardName=msg["cityName"]
    cityToMove= msg["destination"]
    print("Player wants to discard card '",cityCardName,"' and wants to move to '",cityToMove,"' ")
    # IF USERS CURRENT CITY IS SAME AS THIS CITYTOMOVE TO VALUE THEN THEY CAN MOVE ANYWHERE
    #response=game.charterFlight(1,cityCardName,cityToMove)
    response=True
    #response will be either true or false

    emit('charterFlightChecked', {'msg':response,'city':cityToMove},room=room)

@socketio.on('checkShuttleFlight')
def handleclick(msg):
    room = str(session['roomname'])
    cityToMove= msg["cityName"]
    #response=game.charterFlight(1,cityToMove)
    response=True
    #response will be either true or false

    emit('shuttleFlightChecked', {'msg':response,'city':cityToMove},room=room)

@socketio.on('buildResearchStation')
def handleclick(msg):
    room = str(session['roomname'])
    cityToBuildOn= msg["cityName"]
    #response=game.charterFlight(1,cityToMove)
    response=True
    #response will be either true or false

    emit('researchBuildChecked', {'msg':response,'city':cityToBuildOn},room=room)

@socketio.on('shareKnowledge')
def handleclick(msg):
    room = str(session['roomname'])
    playerCity= msg["cityName"]
    secondPlayerCity = msg["cityName"]
    #response=game.charterFlight(1,cityToMove)
    response=True
    #response will be either true or false

    emit('knowledgeShared', {'msg':response,'city':playerCity},room=room)


@socketio.on('treatDisease')
def handleclick(msg):
    room = str(session['roomname'])
    playerCity= msg["cityName"]
    secondPlayerCity = msg["cityName"]
    #response=game.charterFlight(1,cityToMove)
    response=True
    #response will be either true or false

    emit('diseaseTreated', {'msg':response,'city':playerCity},room=room)


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



@socketio.on('checkCharterFlight')
def handleclick(msg):
    room = str(session['roomname'])

    cityCardName=msg["cityName"]
    cityToMove= msg["destination"]
    print("Player wants to discard card '",cityCardName,"' and wants to move to '",cityToMove,"' ")
    # IF USERS CURRENT CITY IS SAME AS THIS CITYTOMOVE TO VALUE THEN THEY CAN MOVE ANYWHERE
    #response=game.charterFlight(1,cityCardName,cityToMove)
    response=True
    #response will be either true or false

    emit('charterFlightChecked', {'msg':response,'city':cityToMove},room=room)

@socketio.on('checkShuttleFlight')
def handleclick(msg):
    room = str(session['roomname'])
    cityToMove= msg["cityName"]
    #response=game.charterFlight(1,cityToMove)
    response=True
    #response will be either true or false

    emit('shuttleFlightChecked', {'msg':response,'city':cityToMove},room=room)

@socketio.on('buildResearchStation')
def handleclick(msg):
    room = str(session['roomname'])
    cityToBuildOn= msg["cityName"]
    #response=game.charterFlight(1,cityToMove)
    response=True
    #response will be either true or false

    emit('researchBuildChecked', {'msg':response,'city':cityToBuildOn},room=room)

@socketio.on('shareKnowledge')
def handleclick(msg):
    room = str(session['roomname'])
    playerCity= msg["cityName"]
    secondPlayerCity = msg["cityName"]
    #response=game.charterFlight(1,cityToMove)
    response=True
    #response will be either true or false

    emit('knowledgeShared', {'msg':response,'city':playerCity},room=room)


@socketio.on('treatDisease')
def handleclick(msg):
    room = str(session['roomname'])
    playerCity= msg["cityName"]
    secondPlayerCity = msg["cityName"]
    #response=game.charterFlight(1,cityToMove)
    response=True
    #response will be either true or false

    emit('diseaseTreated', {'msg':response,'city':playerCity},room=room)


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

@socketio.on('/joinroom')
def handleMessage(msg):
    user = session["username"]
    room = session["roomname"]
    join_room(room)
    emit('created', {'msg' : ("Player " + str(user) + " created room " + room)}, room=room)
####################################################################################
# DO NOT MOVE ANYTHING IN BETWEEN HERE
#testing sending messages from game to server
if __name__ == '__main__':
    print("running server on 127.0.0.1:5000")
    socketio.run(app) #if you run this python file, it will execute a FLASK server.
# attempt to clear cache so static files reload... doesn't seem to work all the time!
@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r
####################################################################################

