var mongoose = require('../DBSchema');
var schema = mongoose.model('governmentservice');

//Handles government service requests, this class manipulates data in the governmentservice table

var governmentServiceController = function () {

    //insert method to insert data

    this.insert = function (data) {
        return new Promise(function (resolve, reject) {
            var governmentemployees = schema({
                nic: data.nic
            })

            governmentemployees.save().then(function () {
                resolve({ status: 200, message: "Added a new Record of a Government Employee" })
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

    //this method checkNIC is used to check whether the NIC entered during the payment process has been already taken
    //this is a measure of Authentication and Security

    this.checkNIC = (nic) => {
        return new Promise((resolve, reject) => {
            schema.find({ nic: nic }).exec().then((data) => {
                resolve({ status: 200, data: data });
            }).catch(err => {
                reject({ status: 500, message: "Error:- " + err });
            })
        })
    }
}


//The governmentServiceController() method is exported for the cartRouter class's use

module.exports = new governmentServiceController();