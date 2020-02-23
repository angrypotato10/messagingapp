import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

data = {}
chatlog = []

@app.route("/")
def index():
    return render_template("index.html", chatlog=chatlog)

@socketio.on("submit message")
def vote(data):
    emit("chatlog", data, broadcast=True)


if __name__ == "__main__":
    socketio.run(app)

# In this project, you’ll build an online messaging service using Flask, similar in spirit to Slack. 
# Users will be able to sign into your site with a display name, create channels (i.e. chatrooms) to communicate in, 
# as well as see and join existing channels. Once a channel is selected, users will be able to send and receive messages with one another in real time.
#  Finally, you’ll add a personal touch to your chat application of your choosing!

