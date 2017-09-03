from flask import Flask, render_template, session, make_response,redirect, url_for, escape, request
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from gamelogic.game import *
from structures import Lobby
from time import gmtime, strftime
import random
from flask import Flask, redirect, url_for
# noinspection PyUnresolvedReferences
from application import app, socketio

# Views for NON game play rou tes/ws calls.

