from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from game import *
import random
import unittest
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # DONT LET BROWSER CACHE ANYTHING! -- For development only!
app.secret_key = 'development' # change when out of development!
socketio = SocketIO(app)
room_ID = 1
playerID = 1
games = {} # in here we will store the game objects
@app.route('/')
def home():
    # Quick session testing code.
    session["username"] = "Player " + str(random.randrange(1000))
    print(session["username"])
    return render_template("home.html")

@app.route('/game')
def game():
    session["username"] = "Player " + str(random.randrange(1000))
    return render_template("MapOnCanvas.html")


<<<<<<< HEAD
=======
@socketio.on('join')
def joined(msg):
    global room_ID
    room = str(room_ID + 1)

    global playerID
    player_id = str(playerID+1)

    join_room(room)
    player = Player(player_id,"Vicente")
    player.id = playerID
    player.room = room
    print(session["username"] + " created room " + player.room + " and his id is " + str(player.getRoom() ))
    room_ID = room_ID + 1
    playerID = playerID + 1



@socketio.on('joinGame')
def joined(msg):
    room = "1" # room = session.get('room')
    player = session["username"]
    
    join_room(room)
    emit('joined', {'msg' : str(player + " joined room " + room)}, room=room)



@socketio.on('move')
def handleMessage(msg):
    room = "1"
    player = session["username"]
    location = msg["move_location"]
    emit('moved', {'msg' : player + " moved to " + location}, room=room)



>>>>>>> d6581b3da195ede32a414b22bf83c1b484349e78
@socketio.on('click')
def handleclick(msg):
    room = "1"
    player = session["username"]
    messg= msg["mess"]
    print(messg)

    emit('clicked', {'msg' : player + messg },room=room)

@socketio.on('checkMove')
def handleclick(msg):
    room = "1"
    x= msg["xpos"]
    y = msg["ypos"]
    print(msg)
    response= "true"
    #set to false to test invalid move
    # response = "false"

    emit('checked', {'msg':response,'xpos':x,'ypos':y},room=room)


@socketio.on('message') # use for testing client side messages.
def handle_message(msg):
    print('received message: ' + str(msg))




##############      PAGES WORKING ON       #####################################
# in this page users can create a new room or join an existing room
@app.route('/room')
def room():
    session["username"] = "Player " + str(random.randrange(1000))
    return render_template("room.html")

# this is the page were users go to after they have decided to either start a game or join a game
@app.route('/user')
def user():
    session["username"] = playerID
    return render_template("userpage.html")
####################################################################################
##############      fUNCTIONS WORKING ON       #####################################
@socketio.on('newroom')
def handleMessage(msg):
    global playerID
    global room_ID
    new_game_id = room_ID
    player_name = msg["playerName"]

    gameobject = GameBoard()
    gameobject.gameID = new_game_id

    gamePlayer = Player(playerID,player_name)
    gameobject.playerCount = 1
    gameobject.players[gameobject.playerCount] = gamePlayer

    games[new_game_id] = gameobject
    playerID = playerID + 1


    join_room(new_game_id)
    room_ID = new_game_id + 1


@socketio.on('joinexistingroom')
def handleMessage(msg):
    global playerID
    new_room_id = int(msg["roomName"])
    #get the gameboard called
    gameCalled = games[new_room_id]
    numberOfPlayers = gameCalled.playerCount

    if numberOfPlayers == 4:
        print "Too many players"
    else:
        player_name = msg["playerName"]
        player = Player(playerID,player_name)

        gameobject = games[new_room_id]
        numberOfPlayers = gameobject.playerCount + 1

        gameobject.players[numberOfPlayers] = player
        gameobject.playerCount = gameobject.playerCount + 1
        join_room(new_room_id)



@socketio.on('createUserObject')
def userobj(msg):
    player = session["username"]
    global playerID
    playerone = Player(playerID,"Jorge")
    print ("User "+ player +" has joined and it has created a user object with the values.")
    print ("Player id: "+ str(playerone.id))
    print ("Player name: "+playerone.name)
    idincrease =  playerID + 1
    playerID = idincrease


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

