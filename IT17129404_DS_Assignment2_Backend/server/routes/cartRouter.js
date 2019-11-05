var cartController = require('../controllers/cartController');
var express = require('express');
var router = express.Router();

//POST request calls the insert method in cartController class

router.post('/', function (req, res) {
     cartController.insert(req.body).then(function (data) {
          res.status(data.status).send({ message: data.message });
     }).catch(err => {
          res.status(err.status).send({ message: err.message });
     })
});

//DELETE request calls deleteOne method in cartController class

router.delete('/:id', (req, res) => {
     cartController.deleteOne(req.params.id).then(data => {
          res.status(data.status).send({ data: data.data });
     }).catch(err => {
          res.status(err.status).send({ message: err.message });
     });
});

module.exports = router;