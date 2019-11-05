var mongoose = require('../DBSchema');
var schema = mongoose.model('trainCodes');

//Manages train code requests, this class manipulates data in the traincodes table

var TrainController = function () {

  //insert function to insert data into the traincodes table

  this.insert = function (data) {
    return new Promise(function (resolve, reject) {
      var traincode = schema({
        name: data.name,
        price: data.price,
        avilableQty: data.avilableQty
      })
      traincode.save().then(function () {
        resolve({ status: 200, message: "Added a new Train Code" })
      }).catch(err => {
        reject({ status: 500, message: "Error:- " + err });
      })
    })
  }

  //return details of all train codes

  this.getAll = () => {
    return new Promise((resolve, reject) => {
      schema.find().exec().then((data) => {
        resolve({ status: 200, data: data });
      }).catch(err => {
        reject({ status: 500, message: "Error:- " + err });
      })
    })
  }

  //returns details of a train code with the requested code

  this.getOne = (trainname) => {
    return new Promise((resolve, reject) => {
      console.log(trainname);
      var trainName = new RegExp(["^", trainname, "$"].join(""), "i");
      schema.find({ name: trainName }).then((data) => {
        resolve({ status: 200, data: data });
      }).catch(err => {
        reject({ status: 500, message: "Error:- " + err });
      })
    })
  }

  //deletes details of a train code with the requested code

  this.deleteOne = (trainname) => {
    return new Promise((resolve, reject) => {
      schema.remove({ name: trainname }).exec().then((data) => {
        resolve({ status: 200, message: "Deleted the Train code" });
      }).catch(err => {
        reject({ status: 500, message: "Error:- " + err });
      })
    })
  }
}

//The TrainController() method is exported for the trainCodeRouter class's use

module.exports = new TrainController();