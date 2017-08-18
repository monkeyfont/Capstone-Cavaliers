from flask import Flask, render_template, session, make_response,redirect, url_for, escape, request
from flask_socketio import SocketIO, send, emit, join_room, leave_room

from game import *
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


@app.route('/')
def home():
    # Quick session testing code.
    return render_template("home.html")



@app.route('/game')
def game():
    if 'username' in session:
        username = session['username']
        roomname = session['roomname']
        roomtype = session['roomtype']
        print "User: "+ username
        print "Room name: " +roomname
        print "roomtype: " + roomtype
        return (render_template("MapOnCanvas.html"))

    return "You are not logged in <br><a href = '/lobby'></b>" + \
      "click here to log in</b></a>"

@socketio.on('join')
def joined(msg):
    room = "1" # room = session.get('room')
    player = session["username"]
    join_room(room)

    emit('joined', {'msg': str(player + " joined room" + room)}, room=room)

    emit('joined', {'msg' : "Player " + str(player) + " joined room " + room}, room=room)



@socketio.on('move')
def handleMessage(msg):
    room = "1"
    player = session["username"]
    location = msg["move_location"]
    emit('moved', {'msg' : str(player) + " moved to " + location}, room=room)
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
    cityToMove= msg["cityName"]
    response=game.movePlayer(1,cityToMove)
    #response will be either true or false

    emit('checked', {'msg':response,'city':cityToMove},room=room)


@socketio.on('message') # use for testing client side messages.
def handle_message(msg):
    print('received message: ' + str(msg))




##############      PAGES WORKING ON       #####################################

@app.route('/room')
def room():
    if 'username' in session:
        username = str(session['username'])
        roomname = str(session['roomname'])
        roomtype = str(session['roomtype'])

        print('Logged in as ' + username )
        print("Redirecting to the board game")
        print("User requested to " + roomtype + " room named " + roomname+".")

        room = roomname
        if (roomtype == "create"):
            print ("Created")
            global playerID
            global room_ID


            player = username
            gameobject = GameBoard()
            gameobject.gameID = room

            gamePlayer = Player(playerID,player)
            gameobject.playerCount = 1
            gameobject.players[gameobject.playerCount] = gamePlayer

            games[room] = gameobject

            #join_room("1")
            #emit('created', {'msg' : ("Player " + str(player) + " created room " + room),'username':session["username"], 'userroom':str(room)}, room=room)

            room_ID = room_ID + 1
            playerID = playerID + 1


        else:
            #get the gameboard called
            gameCalled = games[room]
            numberOfPlayers = gameCalled.playerCount

            if numberOfPlayers == 4:
                print "Too many players"
            else:
                player = session["username"]
                session["room"] = room
                player = Player(playerID,player)
                numberOfPlayers = gameCalled.playerCount + 1

                gameCalled.players[numberOfPlayers] = player
                gameCalled.playerCount = gameCalled.playerCount + 1
                join_room(room)
                #emit('joined', {'msg' : "Player " + str(session["username"]) + " joined room " + str(room)}, room=room)
               # emit('putUserDetails',{'username':session["username"], 'userroom':str(room)})
        return (redirect(url_for('game')))
    return "You are not logged in <br><a href = '/lobby'></b>" + \
      "click here to log in</b></a>"

@app.route('/lobby', methods = ['GET', 'POST'])
def lobby():
    if request.method == 'POST':
            session['username'] = request.form['username']
            session['roomname'] = request.form['roomname']
            session['roomtype'] = request.form['roomtype']
            return (redirect(url_for('room')))
    return (render_template("lobby.html"))



##############      fUNCTIONS WORKING ON       #####################################
'''
@socketio.on('/newroom')
def handleMessage(msg):
    global playerID
    global room_ID

   # sessionDetails = [x.strip() for x in session["username"].split(' ')]

    room = str(room_ID)
    session["username"] = msg["playerName"]
    session["room"] = room
    player = session["username"]
    gameobject = GameBoard()
    gameobject.gameID = room

    gamePlayer = Player(playerID,player)
    gameobject.playerCount = 1
    gameobject.players[gameobject.playerCount] = gamePlayer

    games[room] = gameobject

    join_room(room)
    emit('created', {'msg' : ("Player " + str(player) + " created room " + room),'username':session["username"], 'userroom':str(room)}, room=room)

    room_ID = room_ID + 1
    playerID = playerID + 1





@socketio.on('joinexistingroom')
def handleMessage(msg):
    global playerID
    room = msg["roomName"]
    #get the gameboard called
    gameCalled = games[room]
    numberOfPlayers = gameCalled.playerCount

    if numberOfPlayers == 4:
        print "Too many players"
    else:
        session["username"] = msg["playerName"]
        player = session["username"]
        session["room"] = room
        player = Player(playerID,player)
        numberOfPlayers = gameCalled.playerCount + 1

        gameCalled.players[numberOfPlayers] = player
        gameCalled.playerCount = gameCalled.playerCount + 1
        join_room(room)
        emit('joined', {'msg' : "Player " + str(session["username"]) + " joined room " + str(room)}, room=room)
        emit('putUserDetails',{'username':session["username"], 'userroom':str(room)})



'''

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

