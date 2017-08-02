from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, send, emit, join_room, leave_room
import random

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # DONT LET BROWSER CACHE ANYTHING! -- For development only!
app.secret_key = 'development' # change when out of development!
socketio = SocketIO(app)

@app.route('/')
def home():
    # Quick session testing code.
    session["username"] = "Player " + str(random.randrange(1000))
    print(session["username"])
    return render_template("home.html")

@socketio.on('join')
def joined(msg):
    room = "1" # room = session.get('room')
    player = session["username"]
    join_room(room)
    emit('joined', {'msg' : str(player + " joined room" + room)}, room=room)

@socketio.on('move')
def handleMessage(msg):
    room = "1"
    player = session["username"]
    location = msg["move_location"]
    emit('moved', {'msg' : player + " moved to " + location}, room=room)

@socketio.on('message') # use for testing client side messages.
def handle_message(msg):
    print('received message: ' + str(msg))

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