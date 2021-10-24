import numpy as np
from rules.othello_rules import OthelloRules

rules = OthelloRules()
board = rules.get_start_board()

print(board)
move = np.argmax(rules.get_valid_actions(board, 1))
print("\nmove:", move, "\n")
board = rules.step(board, move, 1)
print(board)