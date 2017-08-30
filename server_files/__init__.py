from flask import Flask, render_template, session, make_response,redirect, url_for, escape, request
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from game import *

from time import gmtime, strftime
import random
from flask import Flask, redirect, url_for
import unittest
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # DONT LET BROWSER CACHE ANYTHING! -- For development only!
app.secret_key = 'development' # change when out of development!
socketio = SocketIO(app)
room_ID = 1
playerID = 1
games = {} # in here we will store the game objects
userTable = {} # this will be changed later on to be a database storing the user details
game=GameBoard()
#This will check if the username calling the game has a cookie with a username, room it wants to join
#whether it requested to join or create a room and lastly if he wants to make the room public ro private.
@app.route('/game')
def game():
    # session['username'] = "Jorge"
    # session['roomname'] = "mexicanRoom"
    # session['roomtype'] = "create"
    if 'username'and "roomname" and "roomtype" in session:
        username = str(session['username'])
        roomname = str(session['roomname'])
        roomtype = str(session['roomtype'])
        roomprivacy = str(session['roomprivacy'])
        # We need to check if the user is joining or creating a game
        if (roomtype == "create"):
            global playerID
            # Create the user
            playerObject = Player(playerID,username)
            # Create the gameboard
            gameobject = GameBoard()
            gameobject.gameID = roomname
            gameobject.playerCount = 1
            gameobject.visibility = roomprivacy
            print (gameobject.visibility + " room created")
            session["playerid"] = gameobject.playerCount
            gameobject.players[gameobject.playerCount] = playerObject
            games[roomname] = gameobject
            playerID = playerID + 1
        else:
            #get the gameboard onject requested
            gameobject = games[roomname]
            numberOfPlayers = gameobject.playerCount
            # if the gameboard we are requesting has 4 players already, then we can't join that game
            if numberOfPlayers == 4:
                print "Too many players"
            else:
                # Create a user object and change its properties
                playerObject = Player(playerID,username)
                # Add the user to the gameboard
                gameobject.playerCount = gameobject.playerCount + 1
                numberOfPlayers = gameobject.playerCount
                gameobject.players[numberOfPlayers] = playerObject
                print ("Number of players in this board game: " + str(gameobject.playerCount))
        return (render_template("MapOnCanvas.html"))
    #TODO make a better page displaying thaat the user needs to go to the lobby first
    return "You are not logged in <br><a href = '/lobby'></b>" + \
      "click here to log in</b></a>"

#This is called to display the public rooms in the lobby page
@socketio.on('checkRoomPrivacy')
def roomprivacy():
    print ("Check room called")
    #All users will start by joining the 'default_room'. This is so we can send the list of public rooms to all of them
    # TODO Deny users the ability to create a room called 'default_room'
    join_room("default_room")
    publicRooms = []
    for gameobjectkey in games:
        gameobject = games[gameobjectkey]
        if gameobject.visibility == "public":
            print("public room found with id " +gameobject.gameID )

            publicRooms.append(gameobject.gameID)
    print (publicRooms)
    emit('publicRooms', {'rooms': publicRooms}, room="default_room")

@socketio.on('playerJoined')
def playerJoined():
    print("player joined",session["username"])
    join_room(session["roomname"])
    emit('playerJoined',{'playerName':str(session['username'])},room=session["roomname"])

@socketio.on('getMessages')
def getMessages():
    roomStart = session["roomname"]

    Gameinstance = games[roomStart]
    previousMessages = Gameinstance.messageHistory
    leave_room(roomStart)
    join_room(roomStart+"GetMessage")
    emit('messageReceived', {'msg' : previousMessages }, room=roomStart+"GetMessage")
    leave_room(roomStart+"GetMessage")
    join_room(roomStart)

@socketio.on('sendMessage')
def handleMessage(msg):
    time = strftime("%Y-%m-%d %H:%M:%S", gmtime())

    player = session["username"]
    room = session["roomname"]
    message = msg["message"]

    messageSent = time + "  :: "+ player + " said: "+message
    Gameinstance = games[room]
    if Gameinstance.messageHistory == "":
        Gameinstance.messageHistory = messageSent
    else:
        Gameinstance.messageHistory = Gameinstance.messageHistory + "&#013"+messageSent
    print "All of the chat history: " + Gameinstance.messageHistory
    emit('messageReceived', {'msg' : messageSent}, room=room)

@socketio.on('click')
def handleclick(msg):
    room = str(session['roomname'])
    player = session["username"]
    messg= msg["mess"]
    print(messg)

    emit('clicked', {'msg' : player + messg },room=room)

@socketio.on('checkMove')
def handleclick(msg):
    #"Check move called"
    room = str(session['roomname'])
    username = str(session["username"])
    cityToMove= msg["cityName"]
    gameObject = games[room]
    playerDictionary = gameObject.players
    for key in playerDictionary:
        playerObject = playerDictionary[key]
        if playerObject.name == username:
            #Player found."
            response=gameObject.movePlayer(playerObject.id,cityToMove)
    #response will be either true or false
    emit('checked', {'playerName':username,'msg':response,'city':cityToMove},room=room)


@socketio.on('checkDirectFlight')
def handleclick(msg):
    room = str(session['roomname'])
    cityToMove= msg["cityName"]
    #response=game.directFlight(1,cityToMove)
    #response will be either true or false
    response = True
    emit('directFlightChecked', {'msg':response,'city':cityToMove},room=room)


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

    if request.method == 'POST':
        print "Here"

        if request.form['roomtype'] == "join":

                session['username'] = request.form['username']
                session['roomname'] = request.form['roomname']
                session['roomtype'] = request.form['roomtype']
                return (redirect(url_for('game')))
        else:
            for key in games:
                print "ROom type: "+ request.form['roomtype']
                if key == request.form['roomname']:
                    print "Room type: " +  request.form['roomtype'];
                    print ("That room already exists")
                    # we are setting the name to invalid so when we redirect it to the lobby it knows that the username put an exisitng room
                    # and now it can be corrected.
                    # fron end people shoul use this
                    session['roomtype'] = "invalid"
                    return (render_template("lobby.html"))

            session['username'] = request.form['username']
            session['roomname'] = request.form['roomname']
            session['roomtype'] = request.form['roomtype']
            session['roomprivacy'] = request.form['privacy']
            return (redirect(url_for('game')))




    return (render_template("lobby.html"))


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

