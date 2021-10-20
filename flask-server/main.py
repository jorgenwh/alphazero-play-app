from flask import Flask, request
from flask_cors import CORS

from server.functional import load_latest_model_checkpoint

app = Flask(__name__)
CORS(app)

@app.route("/")
def landing():
  return "Landing"

@app.route("/sendMove", methods=["POST"])
def sendMove():
  return "sendMove"

if __name__ == "__main__":
  app.run()