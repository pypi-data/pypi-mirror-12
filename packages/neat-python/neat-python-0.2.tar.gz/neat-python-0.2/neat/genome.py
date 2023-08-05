# -*- coding: UTF-8 -*-
import random


class NodeGene(object):
    def __init__(self, ID, nodetype, bias=0.0, response=4.924273, activation_type=None):
        """ A node gene encodes the basic artificial neuron model.
            nodetype should be "INPUT", "HIDDEN", or "OUTPUT"
        """
        self.ID = ID
        self.type = nodetype
        self.bias = bias
        self.response = response
        self.activation_type = activation_type

        assert (self.type in ('INPUT', 'OUTPUT', 'HIDDEN'))

    def __str__(self):
        return "Node %2d %6s, bias %+2.10s, response %+2.10s" \
               % (self.ID, self.type, self.bias, self.response)

    def get_child(self, other):
        """ Creates a new NodeGene randomly inheriting its attributes from parents """
        assert (self.ID == other.ID)

        ng = NodeGene(self.ID, self.type,
                      random.choice((self.bias, other.bias)),
                      random.choice((self.response, other.response)),
                      self.activation_type)
        return ng

    def __mutate_bias(self, config):
        self.bias += random.gauss(0, 1) * config.bias_mutation_power
        if self.bias > config.max_weight:
            self.bias = config.max_weight
        elif self.bias < config.min_weight:
            self.bias = config.min_weight

    def __mutate_response(self, config):
        """ Mutates the neuron's average firing response. """
        self.response += random.gauss(0, 1) * config.response_mutation_power

    def copy(self):
        return NodeGene(self.ID, self.type, self.bias,
                        self.response, self.activation_type)

    def mutate(self, config):
        if random.random() < config.prob_mutate_bias:
            self.__mutate_bias(config)
        if random.random() < config.prob_mutate_response:
            self.__mutate_response(config)


class CTNodeGene(NodeGene):
    """ Continuous-time node gene - used in CTRNNs.
        The main difference here is the addition of
        a decay rate given by the time constant.
    """

    def __init__(self, ID, nodetype, bias=1.0, response=1.0, activation_type='exp', time_constant=1.0):
        super(CTNodeGene, self).__init__(ID, nodetype, bias, response, activation_type)
        self.time_constant = time_constant

    def mutate(self, config):
        super(CTNodeGene, self).mutate(config)
        # mutating the time constant could bring numerical instability
        # do it with caution
        # if random.random() < 0.1:
        #    self.__mutate_time_constant()

    def __mutate_time_constant(self, config):
        """ Warning: perturbing the time constant (tau) may result in numerical instability """
        self.time_constant += random.gauss(1.0, 0.5) * 0.001
        if self.time_constant > config.max_weight:
            self.time_constant = config.max_weight
        elif self.time_constant < config.min_weight:
            self.time_constant = config.min_weight
        return self

    def get_child(self, other):
        """ Creates a new NodeGene ramdonly inheriting its attributes from parents """
        assert (self.ID == other.ID)

        ng = CTNodeGene(self.ID, self.type,
                        random.choice((self.bias, other.bias)),
                        random.choice((self.response, other.response)),
                        self.activation_type,
                        random.choice((self.time_constant, other.time_constant)))
        return ng

    def __str__(self):
        return "Node %2d %6s, bias %+2.10s, response %+2.10s, activation %s, time constant %+2.5s" \
               % (self.ID, self.type, self.bias, self.response,
                  self.activation_type, self.time_constant)

    def copy(self):
        return CTNodeGene(self.ID, self.type, self.bias,
                          self.response, self.activation_type, self.time_constant)


class ConnectionGene(object):
    __global_innov_number = 0
    __innovations = {}  # A list of innovations.

    def __init__(self, innodeid, outnodeid, weight, enabled, innov=None):
        self.in_node_id = innodeid
        self.out_node_id = outnodeid
        self.weight = weight
        self.enabled = enabled
        if innov is None:
            try:
                self.__innov_number = self.__innovations[self.key]
            except KeyError:
                self.__innov_number = self.__get_new_innov_number()
                self.__innovations[self.key] = self.__innov_number
        else:
            self.__innov_number = innov

    # Key for dictionaries, avoids two connections between the same nodes.
    key = property(lambda self: (self.in_node_id, self.out_node_id))

    def mutate(self, config):
        r = random.random
        if r() < config.prob_mutate_weight:
            self.__mutate_weight(config)
        if r() < config.prob_togglelink:
            self.enable()
            # TODO: Remove weight_replaced?
            # if r() < 0.001:
            #    self.__weight_replaced()

    def enable(self):
        """ Enables a link. """
        self.enabled = True

    def __mutate_weight(self, config):
        # self.weight += random.uniform(-1,1) * Config.weight_mutation_power
        self.weight += random.gauss(0, 1) * config.weight_mutation_power

        if self.weight > config.max_weight:
            self.weight = config.max_weight
        elif self.weight < config.min_weight:
            self.weight = config.min_weight

    def __weight_replaced(self, config):
        # self.weight = random.uniform(-Config.random_range, Config.random_range)
        self.weight = random.gauss(0, config.weight_stdev)

    @classmethod
    def __get_new_innov_number(cls):
        cls.__global_innov_number += 1
        return cls.__global_innov_number

    def __str__(self):
        s = "In %2d, Out %2d, Weight %+3.5f, " % (self.in_node_id, self.out_node_id, self.weight)
        if self.enabled:
            s += "Enabled, "
        else:
            s += "Disabled, "
        return s + "Innov %d" % (self.__innov_number,)

    def __cmp__(self, other):
        return cmp(self.__innov_number, other.__innov_number)

    def split(self, node_id):
        """ Splits a connection, creating two new connections and disabling this one """
        self.enabled = False
        new_conn1 = ConnectionGene(self.in_node_id, node_id, 1.0, True)
        new_conn2 = ConnectionGene(node_id, self.out_node_id, self.weight, True)
        return new_conn1, new_conn2

    def copy(self):
        return ConnectionGene(self.in_node_id, self.out_node_id, self.weight,
                              self.enabled, self.__innov_number)

    def is_same_innov(self, cg):
        return self.__innov_number == cg.__innov_number

    def get_child(self, cg):
        # TODO: average both weights (Stanley, p. 38)
        return random.choice((self, cg)).copy()
