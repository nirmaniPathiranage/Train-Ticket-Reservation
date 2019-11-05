var express = require('express');
var routes = express.Router();

//requires all classes that handles routes

var trainrouter = require('./routes/trainCodesRouter');
var userrouter = require('./routes/userRouter');
var cartrouter = require('./routes/cartRouter');
var paycardrouter = require('./routes/payCardRouter');
var paydialogrouter = require('./routes/payDialogRouter');
var governmentservicerouter = require('./routes/governmentServiceRouter');

//routes the request to the specified class

routes.use('/train', trainrouter);
routes.use('/user', userrouter);
routes.use('/cart', cartrouter);
routes.use('/creditcard', paycardrouter);
routes.use('/dialogpay', paydialogrouter);
routes.use('/government', governmentservicerouter);

module.exports = routes;