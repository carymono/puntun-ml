var convnetjs = require('convnetjs')

var layer_defs = [];
layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:2});
layer_defs.push({type:'fc', num_neurons:5, activation:'sigmoid'});
layer_defs.push({type:'regression', num_neurons:1});
var net = new convnetjs.Net();
net.makeLayers(layer_defs);

var x = new convnetjs.Vol([0.5, -1.3]);

// train on this datapoint, saying [0.5, -1.3] should map to value 0.7:
// note that in this case we are passing it a list, because in general
// we may want to  regress multiple outputs and in this special case we
// used num_neurons:1 for the regression to only regress one.
var trainer = new convnetjs.SGDTrainer(net,
              {learning_rate:0.01, momentum:0.0, batch_size:1, l2_decay:0.001});
trainer.train(x, [0.7]);

// evaluate on a datapoint. We will get a 1x1x1 Vol back, so we get the
// actual output by looking into its 'w' field:
var predicted_values = net.forward(x);
console.log('predicted value: ' + predicted_values.w[0]);
