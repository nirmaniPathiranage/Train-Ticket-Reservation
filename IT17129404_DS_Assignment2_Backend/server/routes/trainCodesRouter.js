var traincontroller = require('../controllers/controller');
var express = require('express');
var router = express.Router();

//Calls the insert function in controller class to insert data into the traincodes table

router.post('/', function (req, res) {
     traincontroller.insert(req.body).then(function (data) {
          res.status(data.status).send({ message: data.message });
     }).catch(err => {
          res.status(err.status).send({ message: err.message });
     })
});

//Calls the getAll function in controller class to retrive all data

router.get('/', (req, res) => {
     traincontroller.getAll().then(data => {
          res.status(data.status).send({ data: data.data });
     }).catch(err => {
          res.status(err.status).send({ message: err.message });
     });
});

//Calls the getOne function in controller class to retrive data of the specified train code

router.get('/:trainname', (req, res) => {
     traincontroller.getOne(req.params.trainname).then(data => {
          res.status(data.status).send({ data: data.data });
     }).catch(err => {
          res.status(err.status).send({ message: err.message });
     });
});

//Calls the deleteOne function in controller class to delete data from traincodes table

router.delete('/:trainname', (req, res) => {
     traincontroller.deleteOne(req.params.trainname).then(data => {
          res.status(data.status).send({ data: data.data });
     }).catch(err => {
          res.status(err.status).send({ message: err.message });
     });
});

module.exports = router;