import numpy as np
from collections import defaultdict
from typing import List
from tqdm import tqdm

from alphazero.rules import Rules
from alphazero.network import Network
from alphazero.misc import Arguments, PrintColors

class MCTS():
  """
  Monte-Carlo Tree Search class containing the search tree.
  """
  def __init__(self, rules: Rules, network: Network, args: Arguments):
    self.rules = rules
    self.network = network
    self.args = args

    self.N = defaultdict(float)
    self.W = defaultdict(float)
    self.Q = defaultdict(float)
    self.P = defaultdict(float)

  def clear(self) -> None:
    self.N.clear()
    self.W.clear()
    self.Q.clear()
    self.P.clear()

  def get_policy(self, board: np.ndarray, temperature: float, mcts_simulations: int = -1) -> List[int]:
    print(PrintColors.yellow, end="")
    if (mcts_simulations != -1 and mcts_simulations > 0):
      bar = tqdm(range(mcts_simulations), desc="MCTS Simulations", bar_format="{l_bar}{bar}| Simulation: {n_fmt}/{total_fmt} - Elapsed: {elapsed}")
      for _ in bar:
        self.search(board)
    else:
      bar = tqdm(range(self.args.monte_carlo_sims), desc="MCTS Simulations", bar_format="{l_bar}{bar}| Simulation: {n_fmt}/{total_fmt} - Elapsed: {elapsed}")
      for _ in bar:
        self.search(board)
    print(PrintColors.endc, end="")

    s = self.rules.to_string(board)
    raw_policy = [self.N[(s, a)] for a in range(self.rules.get_action_space())]

    # If temperature = 0, we choose the move deterministically (for competitive play)
    if temperature > 0:
      pi = [N ** (1 / temperature) for N in raw_policy]
      if sum(pi) == 0:
        pi = [1 for _ in range(len(pi))]
      pi = [N / sum(pi) for N in pi]
    else:
      actions = [i for i in range(len(raw_policy)) if raw_policy[i] == max(raw_policy)]
      pi = [0] * len(raw_policy)
      pi[np.random.choice(actions)] = 1

      return pi

  def search(self, board: np.ndarray) -> float:
    # If the search has reached a terminal game position, it retuns the position's value determined by the
    # game rules
    if self.rules.is_concluded(board):
      value = self.rules.get_result(board)
      return -value

    s = self.rules.to_string(board)
    valid_actions = self.rules.get_valid_actions(board, 1)

    # We evaluate the position using the network if we have reached a leaf node.
    # To avoid forwarding equal positions through the network several times, we store the value assigned
    # by the network for future use
    if s not in self.P:
      pi, value = self.network(board)

      # Mask the invalid actions from the action probability tensor before
      # renormalizing the output probabilities.
      pi = pi * valid_actions
      pi = pi / max(np.sum(pi), 1e-8)

      self.P[s] = pi
      return -value

    qu, action = -np.inf, None
    for a in range(self.rules.get_action_space()):
      # Only compute the QU value for valid actions
      if valid_actions[a]:
        q = self.Q[(s, a)]
        u = self.args.cpuct * self.P[s][a] * np.sqrt(sum([self.N[(s, a_)] for a_ in range(self.rules.get_action_space())])) / (1 + self.N[(s, a)])
        qu_a = q + u 

        if qu_a > qu:
          qu = qu_a
          action = a

    # Simulate the action and get the next positional node
    next_board = self.rules.step(board, action, 1)
    next_board = self.rules.flip(next_board)

    # Get the value from the continued search
    value = self.search(next_board)
    
    self.N[(s, action)] += 1
    self.W[(s, action)] += value
    self.Q[(s, action)] = self.W[(s, action)] / self.N[(s, action)]

    return -value    
