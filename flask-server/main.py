from flask import Flask, json, request, jsonify
from flask_cors import CORS

import numpy as np
import random

from rules.othello_rules import OthelloRules

app = Flask(__name__)
CORS(app)

# Othello
rules = OthelloRules()
board = rules.get_start_board()
cur_player = 1

@app.route("/")
def landing():
  return "Empty landing"

@app.route("/reset")
def reset():
  print("RESETTING GAME")
  global rules
  global board
  global cur_player
  global ply

  board = rules.get_start_board() 
  cur_player = 1

  response = jsonify({"success": True})
  return response

@app.route('/post_state', methods=["POST"])
def post_state():
  global rules
  global board
  global cur_player

  data = request.get_json()
  state = data["state"]
  cur_player = data["curPlayer"]
  board = np.reshape(np.array(state), (8, 8))

  valid_actions = rules.get_valid_actions(board, cur_player)
  move = random.randint(0, 63)
  while valid_actions[move] == 0:
    move = random.randint(0, 63) 

  print("[POST] Received state:")
  print(board)
  print("\nReturning move:", move)
  return jsonify({"move": move}) 

if __name__ == "__main__":
  app.run(debug=True)