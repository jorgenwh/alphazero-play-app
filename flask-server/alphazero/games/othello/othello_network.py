import torch
import numpy as np
from typing import List, Tuple

from .othello_model import OthelloModel
from alphazero.network import Network
from alphazero.misc import Arguments

class OthelloNetwork(Network):
    def __init__(self, args: Arguments):
        self.args = args
        self.device = torch.device("cuda:0" if torch.cuda.is_available() and self.args.cuda else "cpu")
        self.model = OthelloModel(self.args).to(self.device)
        
    def __call__(self, board: np.ndarray) -> Tuple[np.ndarray, float]:
        self.model.eval()
        b = board.reshape(1, 1, 8, 8)
        b = torch.FloatTensor(b).to(self.device)

        with torch.no_grad():
            pi, v = self.model(b)

        pi = torch.softmax(pi[0].cpu(), dim=0).data.numpy()
        v = v[0].cpu().data.detach().numpy()
        return pi, v
        