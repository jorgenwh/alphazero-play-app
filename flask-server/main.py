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

@app.route("/")
def landing():
  return "Empty landing"

@app.route("/reset")
def reset():
  print(PrintColors.bold + "CLEARING SEARCH TREE" + PrintColors.endc)

  mcts.clear()

  response = jsonify({"success": True})
  return response

@app.route("/post_state", methods=["POST"])
def post_state():
  global rules
  global mcts
  
  data = request.get_json()
  state = data["board"]
  cur_player = int(data["curPlayer"])
  num_rollouts = int(data["mctsSimulations"])

  board = np.reshape(np.array(state), (8, 8))
  print(PrintColors.blue + "Received current player: " + PrintColors.bold + str(cur_player) + PrintColors.endc)
  print(PrintColors.blue + "Received num rollouts: " + PrintColors.bold + str(num_rollouts) + PrintColors.endc)
  print(PrintColors.blue + "Received board state:" + PrintColors.endc)
  print(PrintColors.yellow + str(board) + PrintColors.endc)

  if cur_player == -1:
    board = rules.flip(board)

  pi = mcts.get_policy(board, args.temperature, num_rollouts=num_rollouts)
  move = np.argmax(pi)
  move = int(move)
  perceived_value = mcts.Q[(rules.to_string(board), move)]

  print(PrintColors.green + f"Returning move: {move}, and perceived value: {perceived_value}" + PrintColors.endc)
  return jsonify({"move": move}) 

if __name__ == "__main__":
  app.run(debug=True)