from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from game import Player
import random
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # DONT LET BROWSER CACHE ANYTHING! -- For development only!
app.secret_key = 'development' # change when out of development!
socketio = SocketIO(app)
room_ID = 1
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


@socketio.on('join')
def joined(msg):
    global room_ID
    room = str(room_ID + 1)
    room_ID = room_ID + 1
    join_room(room)
    print(session["username"] + " created room " + room )



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
    user();


@socketio.on('click')
def handleclick(msg):
    room = "1"
    player = session["username"]
    messg= msg["mess"]
    print(messg)

    emit('clicked', {'msg' : player + messg },room=room)

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
    session["username"] = "Player " + str(random.randrange(1000))
    return render_template("userpage.html")
####################################################################################
##############      fUNCTIONS WORKING ON       #####################################

# used to create a new room

# test for the create new room button
# can add more functionalities in the future.
@socketio.on('newroom')
def handleMessage(msg):
    global room_ID
    player = session["username"]
    print ("User " +session["username"] +" has created a new game." )

# test for connecting to new room
# can add more functionalities in the future.
@socketio.on('joinexistingroom')
def handleMessage(msg):
    new_room_id = msg["roomName"]
    player = session["username"]
    print ("User " +session["username"] +" wants to join room "+new_room_id )
playerID = 0
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

