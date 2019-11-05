var mongoose = require('../DBSchema');
var schema = mongoose.model('user');

//Handles all ticket booking requests based on the user table, this class manipulates data in the user table

var userController = function () {

   //insert method to add data into user table

   this.insert = function (data) {
      return new Promise(function (resolve, reject) {
         var user = schema({
            fullname: data.fullname,
            email: data.email,
            employeestate: data.employeestate,
            nic:data.nic,
            password: data.password
         })

         user.save().then(function () {
            resolve({ status: 200, message: "Added a new user" })
         }).catch(err => {
            reject({ status: 500, message: "Error:- " + err });
         })
      })
   }

   //get method to retrieve all data

   this.get = () => {
      return new Promise((resolve, reject) => {

         schema.find().sort({ random: 1 }).limit(1).exec().then((data) => {
            resolve({ status: 200, data: data });
         }).catch(err => {
            reject({ status: 500, message: "Error:- " + err });
         })
      })
   }

   //getOne method to retrieve data of a specified user based on the email and password

   this.getOne = (email, password) => {
      return new Promise((resolve, reject) => {
         schema.find({ email: email, password: password }).exec().then((data) => {
            resolve({ status: 200, data: data });
         }).catch(err => {
            reject({ status: 500, message: "Error:- " + err });
         })
      })
   }

   //this method checkemail is used to check whether the email entered during the sign up has been already taken
   //this is a measure of Authentication and Security

   this.checkEmail = (email) => {
      return new Promise((resolve, reject) => {
         schema.find({ email: email }).exec().then((data) => {
            resolve({ status: 200, data: data });
         }).catch(err => {
            reject({ status: 500, message: "Error:- " + err });
         })
      })
   }

   //this method deleteOne is used to delete data of specified user based on a unique id

   this.deleteOne = (id) => {
      return new Promise((resolve, reject) => {
         schema.remove({ _id: id }).exec().then((data) => {
            resolve({ status: 200, message: "Deleted" });
         }).catch(err => {
            reject({ status: 500, message: "Error:- " + err });
         })
      })

   }
}

//The userController() method is exported for the userRouter class's use

module.exports = new userController();