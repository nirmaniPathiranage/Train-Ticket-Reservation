var payDialogController = require('../controllers/payDialogController');
var express = require('express');
var router = express.Router();

//Uses insert method in payDialogController class to add data to the table

router.post('/', function (req, res) {
     payDialogController.insert(req.body).then(function (data) {
          res.status(data.status).send({ message: data.message });
     }).catch(err => {
          res.status(err.status).send({ message: err.message });
     })
});

module.exports = router;