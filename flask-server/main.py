from flask import Flask, json, request, jsonify
from flask_cors import CORS

import numpy as np
import random

app = Flask(__name__)
CORS(app)

from alphazero.mcts import MCTS
from alphazero.misc import load_model, Arguments, PrintColors
from alphazero.games.othello.othello_rules import OthelloRules
from alphazero.games.othello.othello_network import OthelloNetwork

from args import args
print(PrintColors.green + "Successfully loaded argument-file" + PrintColors.endc)

# load game rule set
rules = OthelloRules()
print(PrintColors.green + "Successfully loaded game rule set" + PrintColors.endc)

# create network object
network = OthelloNetwork(args)
print(PrintColors.green + "Successfully created network object" + PrintColors.endc)

# load latest model
load_model(network, "/Users/cola/Documents/projects/alphazero/models", "othello-14block")
print(PrintColors.green + "Successfully loaded network model" + PrintColors.endc)

mcts = MCTS(rules, network, args)
print(PrintColors.green + "Successfully created MCTS object" + PrintColors.endc)

print(PrintColors.bold + "AZ Server is ready" + PrintColors.endc)

local_board = None
local_cur_player = None
local_mcts_simulations = None

@app.route("/")
def landing():
  return "Empty landing"

@app.route("/clear", methods=["POST"])
def clear():
  try:
    print(PrintColors.bold + "CLEARING SEARCH TREE" + PrintColors.endc)

    mcts.clear()

    print(PrintColors.green + "MCTS cleared successfully" + PrintColors.endc)
    return jsonify({"success": True})
  except:
    return jsonify({"success": False})

@app.route("/get", methods=["GET"])
def get():
  try:
    global rules
    global mcts
    global local_board
    global local_cur_player
    global local_mcts_simulations

    if local_cur_player == -1:
      local_board = rules.flip(local_board)

    pi = mcts.get_policy(local_board, 0, local_mcts_simulations)
    move = np.argmax(pi)
    move = int(move)
    value = mcts.Q[(rules.to_string(local_board), move)]
    value = float(value)

    print(PrintColors.yellow + "Sending move=" + PrintColors.bold + str(move) + PrintColors.endc)
    print(PrintColors.yellow + "Sending value=" + PrintColors.bold + str(value) + PrintColors.endc)

    return jsonify({"success": True, "move": move, "value": value})
  except:
    return jsonify({"success": False})

@app.route("/post", methods=["POST"])
def post():
  try:
    global rules
    global mcts
    global local_board
    global local_cur_player
    global local_mcts_simulations
    
    data = request.get_json()
    state = data["board"]
    cur_player = int(data["curPlayer"])
    mcts_simulations = int(data["mctsSimulations"])

    board = np.reshape(np.array(state), (8, 8))
    print(PrintColors.blue + "Received cur_player=" + PrintColors.bold + str(cur_player) + PrintColors.endc)
    print(PrintColors.blue + "Received mcts_simulations=" + PrintColors.bold + str(mcts_simulations) + PrintColors.endc)
    print(PrintColors.blue + "Received board state:" + PrintColors.endc)
    print(PrintColors.blue + str(board) + PrintColors.endc)

    local_board = board
    local_cur_player = cur_player
    local_mcts_simulations = max(2, mcts_simulations)

    return jsonify({"success": True}) 
  except:
    return jsonify({"success": False})

if __name__ == "__main__":
  app.run(debug=True)