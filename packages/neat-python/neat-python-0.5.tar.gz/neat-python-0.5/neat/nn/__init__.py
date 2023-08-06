import math


def exp_sigmoid(bias, response, x):
    z = bias + x * response
    z = max(-60.0, min(60.0, z))
    return 1.0 / (1.0 + math.exp(-z))


def tanh_sigmoid(bias, response, x):
    z = bias + x * response
    z = max(-60.0, min(60.0, z))
    return math.tanh(z)


def find_feed_forward_layers(inputs, connections):
    '''
    Collect the layers whose members can be evaluated in parallel in a feed-forward network.
    :param inputs: list of the network input nodes
    :param connections: list of (input, output) connections in the network.

    Returns a list of layers, with each layer consisting of a set of node identifiers.
    '''

    # TODO: Detect and omit nodes whose output is ultimately never used.

    layers = []
    S = set(inputs)
    while 1:
        # Find candidate nodes C for the next layer.  These nodes should connect
        # a node in S to a node not in S.
        C = set(b for (a, b) in connections if a in S and b not in S)
        # Keep only the nodes whose entire input set is contained in S.
        T = set()
        for n in C:
            if all(a in S for (a, b) in connections if b == n):
                T.add(n)

        if not T:
            break

        layers.append(T)
        S = S.union(T)

    return layers


class FeedForwardNetwork(object):
    def __init__(self, max_node, inputs, outputs, node_evals):
        self.node_evals = node_evals
        self.input_nodes = inputs
        self.output_nodes = outputs
        self.values = [0.0] * (1 + max_node)

    def serial_activate(self, inputs):
        for i, v in zip(self.input_nodes, inputs):
            self.values[i] = v

        for node, func, bias, response, links in self.node_evals:
            s = 0.0
            for i, w in links:
                s += self.values[i] * w
            self.values[node] = func(bias, response, s)

        return [self.values[i] for i in self.output_nodes]


def create_feed_forward_phenotype(genome):
    """ Receives a genome and returns its phenotype (a neural network). """

    # Gather inputs and expressed connections.
    input_nodes = [ng.ID for ng in genome.node_genes.values() if ng.type == 'INPUT']
    output_nodes = [ng.ID for ng in genome.node_genes.values() if ng.type == 'OUTPUT']
    connections = [(cg.in_node_id, cg.out_node_id) for cg in genome.conn_genes.values() if cg.enabled]

    layers = find_feed_forward_layers(input_nodes, connections)
    node_evals = []
    used_nodes = set(input_nodes + output_nodes)
    for layer in layers:
        for node in layer:
            inputs = []
            for cg in genome.conn_genes.values():
                if cg.out_node_id == node and cg.enabled:
                    inputs.append((cg.in_node_id, cg.weight))
                    used_nodes.add(cg.in_node_id)

            used_nodes.add(node)
            ng = genome.node_genes[node]
            if ng.activation_type == "tanh":
                activation_function = tanh_sigmoid
            else:
                activation_function = exp_sigmoid

            node_evals.append((node, activation_function, ng.bias, ng.response, inputs))

    return FeedForwardNetwork(max(used_nodes), input_nodes, output_nodes, node_evals)


def create_feed_forward_function(genome):
    """ Receives a genome and returns a function implementing its neural network. """

    f = ['def f(values):']

    # Gather inputs and expressed connections.
    input_nodes = [ng.ID for ng in genome.node_genes.values() if ng.type == 'INPUT']
    connections = [(cg.in_node_id, cg.out_node_id) for cg in genome.conn_genes.values() if cg.enabled]

    layers = find_feed_forward_layers(input_nodes, connections)
    for i, layer in enumerate(layers):
        f.append('    # evaluate layer %d' % i)
        for node in layer:
            ev = []
            for cg in genome.conn_genes.values():
                if cg.out_node_id == node and cg.enabled:
                    ev.append('(%f * values[%d])' % (cg.weight, cg.in_node_id))

            ev = ' + '.join(ev)
            f.append('    z = ' + ev)

            ng = genome.node_genes[node]
            if ng.activation_type == 'tanh':
                activation_function = 'tanh_sigmoid'
            else:
                activation_function = 'exp_sigmoid'

            f.append('    values[%d] = %s(%f, %f, z)' % (node, activation_function, ng.bias, ng.response))
            f.append('')

    return '\n'.join(f)
