import os
import argparse
from layered.problem import Problem
from layered.trainer import Trainer


def main():
    # The problem defines dataset, network and learning parameters
    parser = argparse.ArgumentParser('layered')
    parser.add_argument(
        'problem',
        help='path to the YAML problem definition')
    parser.add_argument(
        '-s', '--save', default=None,
        help='path to dump the learned weights at each evaluation')
    parser.add_argument(
        '-l', '--load', default=None,
        help='path to load the weights from at startup')
    parser.add_argument(
        '-v', '--visual', action='store_true',
        help='show a diagram of training costs')
    args = parser.parse_args()
    print('Problem', os.path.split(args.problem)[1])
    problem = Problem(args.problem)
    trainer = Trainer(problem, args.load, args.save, args.visual)
    trainer()
    print('Done')


if __name__ == '__main__':
    main()
