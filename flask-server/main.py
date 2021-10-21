from flask import Flask, request, jsonify
from flask_cors import CORS

import numpy as np
import random

from rules.othello_rules import OthelloRules

app = Flask(__name__)
CORS(app)

# Othello
othello_rules = OthelloRules()
othello_board = othello_rules.get_start_board()
ply = 1
cur_player = 1

@app.route("/")
def landing():
  return "Landing"

@app.route('/add_move', methods=["POST"])
def add_move():
  global othello_board
  global cur_player
  global ply

  data = request.get_json()
  move = data["move"]
  othello_board = othello_rules.step(othello_board, move, cur_player)
  cur_player *= -1
  ply += 1

  return data

@app.route("/get_update")
def get_update():
  update = {}
  update["boardState"] = np.reshape(othello_board, -1).tolist()
  update["validMoves"] = othello_rules.get_valid_actions(othello_board, cur_player)
  update["currentPlayer"] = cur_player
  update["ply"] = ply

  return jsonify(update)

if __name__ == "__main__":
  app.run(debug=True)