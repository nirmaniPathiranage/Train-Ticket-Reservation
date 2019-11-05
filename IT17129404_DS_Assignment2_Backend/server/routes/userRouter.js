var userController = require('../controllers/userController');
var express = require('express');
var router = express.Router();

//POST request calls the insert method in userController class to add a new user

router.post('/', function (req, res) {
   userController.insert(req.body).then(function (data) {
      res.status(data.status).send({ message: data.message });
   }).catch(err => {
      res.status(err.status).send({ message: err.message });
   })
});

//GET request calls the get method in userController class to get all the user details

router.get('/', (req, res) => {
   userController.get().then(data => {
      res.status(data.status).send(data.data);
   }).catch(err => {
      res.status(err.status).send({ message: err.message });
   });
});

//GET request calls the getOne method in userController class to get the details of a particular user based on the email and password
//based on the unique fields

router.get('/:email/:password', (req, res) => {
   userController.getOne(req.params.email, req.params.password).then(data => {
      res.status(data.status).send(data.data);
   }).catch(err => {
      res.status(err.status).send({ message: err.message });
   });
});

//GET request calls the checkEmail method in userController class to get details of a particular user based on the email

router.get('/:email', (req, res) => {
   userController.checkEmail(req.params.email).then(data => {
      res.status(data.status).send(data.data);
   }).catch(err => {
      res.status(err.status).send({ message: err.message });
   });
});

//DELETE request calls the deleteOne method in userController class to delete the details of a particular user based on the ID

router.delete('/:id', (req, res) => {
   userController.deleteOne(req.params.id).then(data => {
      res.status(data.status).send({ data: data.data });
   }).catch(err => {
      res.status(err.status).send({ message: err.message });
   });
});

module.exports = router;