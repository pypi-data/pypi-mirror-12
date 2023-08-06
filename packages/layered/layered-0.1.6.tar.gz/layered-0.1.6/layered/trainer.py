import numpy as np
from layered.gradient import BatchBackprop
from layered.network import Network, Matrices
from layered.optimization import GradientDecent, Momentum, WeightDecay
from layered.utility import repeated, batched
from layered.evaluation import compute_costs, compute_error


class Trainer:

    def __init__(self, problem, load=None, save=None, visual=False):
        self.problem = problem
        self.load = load
        self.save = save
        self.visual = visual
        self._init_network()
        self._init_training()
        self._init_visualize()

    def _init_network(self):
        """Define model and initialize weights"""
        self.network = Network(self.problem.layers)
        self.weights = Matrices(self.network.shapes)
        if self.load:
            loaded = np.load(self.load)
            assert loaded.shape == self.weights.shape, (
                'weights to load must match problem definition')
            self.weights.flat = loaded
        else:
            self.weights.flat = np.random.normal(
                0, self.problem.weight_scale, len(self.weights.flat))

    def _init_training(self):
        """Classes needed during training"""
        self.backprop = BatchBackprop(self.network, self.problem.cost)
        self.momentum = Momentum()
        self.decent = GradientDecent()
        self.decay = WeightDecay()

    def _init_visualize(self):
        if not self.visual:
            return
        from layered.plot import Window
        window = Window()
        self.plot_training = window.plot(
            211, 'dot', 'Training', 'Examples', 'Cost', fixed=1000)
        self.plot_testing = window.plot(
            212, 'line', 'Testing', 'Time', 'Error')

    def __call__(self):
        """Train the model."""
        print('Start training')
        repeats = repeated(self.problem.dataset.training, self.problem.epochs)
        batches = batched(repeats, self.problem.batch_size)
        for index, batch in enumerate(batches):
            self._train(index, batch)

    def _train(self, index, batch):
        gradient = self.backprop(self.weights, batch)
        gradient = self.momentum(gradient, self.problem.momentum)
        self.weights = self.decent(
            self.weights, gradient, self.problem.learning_rate)
        self.weights = self.decay(self.weights, self.problem.weight_decay)
        self._visualize(batch)
        self._evaluate(index)

    def _visualize(self, batch):
        if not self.visual:
            return
        costs = compute_costs(
            self.network, self.weights, self.problem.cost, batch)
        self.plot_training(costs)

    def _evaluate(self, index):
        if not self._every(self.problem.evaluate_every,
                           self.problem.batch_size, index):
            return
        if self.save:
            np.save(self.save, self.weights)
        error = compute_error(self.network, self.weights,
                              self.problem.cost, self.problem.dataset.testing)
        print('Batch {} test error {:.2f}%'.format(index, 100 * error))
        if self.visual:
            self.plot_testing([error])

    @staticmethod
    def _every(times, step_size, index):
        """
        Given a loop over batches of an iterable and an operation that should
        be performed every few elements. Determine whether the operation should
        be called for the current index.
        """
        current = index * step_size
        step = current // times * times
        reached = current >= step
        overshot = current >= step + step_size
        return current and reached and not overshot
