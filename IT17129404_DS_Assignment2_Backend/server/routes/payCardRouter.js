var payCardController = require('../controllers/payCardController');
var express = require('express');
var router = express.Router();

//insert method in paycardController class to add data to the table

router.post('/', function (req, res) {
    payCardController.insert(req.body).then(function (data) {
        res.status(data.status).send({ message: data.message });
    }).catch(err => {
        res.status(err.status).send({ message: err.message });
    })
});

module.exports = router;