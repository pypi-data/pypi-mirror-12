#!/usr/bin/env python
# -*- coding: utf-8 -*-

import numpy as np
import theano.tensor as T
from deepy.layers import NeuralLayer
from deepy.utils import onehot_tensor, onehot
from deepy.utils import FLOATX

class OneHotEmbedding(NeuralLayer):
    """
    One-hot embedding layer.
    Computation: [0,1,2]  ---> [[1,0,0],[0,1,0],[0,0,1]]
    """
    def __init__(self, vocab_size, on_memory=True, zero_index=None):
        super(OneHotEmbedding, self).__init__("onehot")
        self.vocab_size = vocab_size
        self.output_dim = vocab_size
        self.on_memory = on_memory
        self.zero_index = zero_index

    def setup(self):
        if not self.on_memory:
            return
        onehot_matrix = []
        for i in xrange(self.vocab_size):
            onehot_matrix.append(onehot(self.vocab_size, i))
        onehot_matrix = np.array(onehot_matrix, dtype=FLOATX)
        self.onehot_list = self.create_matrix(self.vocab_size, self.vocab_size, "onehot_list")
        self.onehot_list.set_value(onehot_matrix)

    def output(self, x):
        if self.on_memory:
            ret_tensor = self.onehot_list[x.flatten()].reshape((x.shape[0], x.shape[1], self.vocab_size))
        else:
            ret_tensor = onehot_tensor(x, self.vocab_size)
        if self.zero_index != None:
            mask = T.neq(x, self.zero_index)
            ret_tensor *= mask[:, :, None]
        return ret_tensor
