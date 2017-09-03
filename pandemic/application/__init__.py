from flask_socketio import SocketIO
from flask import Flask

# create the app and socket objects.
app = Flask(__name__)
socketio = SocketIO(app)
# noinspection PyUnresolvedReferences
from application import game_controllers
# noinspection PyUnresolvedReferences
from application import website_controllers

