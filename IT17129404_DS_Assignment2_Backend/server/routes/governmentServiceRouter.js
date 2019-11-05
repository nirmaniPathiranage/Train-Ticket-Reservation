var governmentServiceController = require('../controllers/governmentServiceController');
var express = require('express');
var router = express.Router();

//POST request calls the insert method in governmentServiceController class to add data to the table

router.post('/', function (req, res) {
  governmentServiceController.insert(req.body).then(function (data) {
    res.status(data.status).send({ message: data.message });
  }).catch(err => {
    res.status(err.status).send({ message: err.message });
  })
});

//GET request calls the get method in governmentServiceController class to get all the details of nic

router.get('/', (req, res) => {
  governmentServiceController.get().then(data => {
     res.status(data.status).send(data.data);
  }).catch(err => {
     res.status(err.status).send({ message: err.message });
  });
});

//GET request calls the checkNIC method in governmentServiceController class to get details of a particular user based on the NIC

router.get('/:nic', (req, res) => {
  governmentServiceController.checkNIC(req.params.nic).then(data => {
    res.status(data.status).send(data.data);
  }).catch(err => {
    res.status(err.status).send({ message: err.message });
  });
});

module.exports = router;