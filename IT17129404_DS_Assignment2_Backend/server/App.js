const express = require('express');
const bodyParser = require('body-parser');;
const cors = require('cors');
var mongoose = require('mongoose');
var routes = require('./routes');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

//Route all requests to the routes.js file

app.use('/', routes);

//Backend server is listening to the port 3000

app.listen(3000, () => {
    console.log("Server is listening to port 3000");
})