import os
import torch
import datetime

def load_model(network, folder, name):
    if not os.path.isfile(os.path.join(folder, name)):
        raise FileNotFoundError(f"Cannot find model '{os.path.join(folder, name)}'")

    if torch.cuda.is_available():
        network.model.load_state_dict(torch.load(os.path.join(folder, name)))
    else:
        network.model.load_state_dict(torch.load(os.path.join(folder, name), map_location=torch.device("cpu")))

def get_time_stamp(s):
    t_s = str(datetime.timedelta(seconds=round(s)))
    ts = t_s.split(':')
    return '(' + ts[0] + 'h ' + ts[1] + 'm ' + ts[2] + 's)'

class PrintColors():
    red = "\33[91m"
    green = "\33[92m"
    yellow = "\33[93m"
    blue = "\33[94m"
    bold = "\33[1m"
    transparent = "\33[90m"
    endc = "\33[0m"

class Arguments(dict):
    def __getattr__(self, attr):
        return self[attr]
