var mongoose = require('../DBSchema');
var schema = mongoose.model('cart');

//Handles all ticket booking cart requests, this class manipulates data in the carts table

var cartController = function () {

    //insert method to insert data

    this.insert = function (data) {
        return new Promise(function (resolve, reject) {
            var cart = schema({
                ID: data.ID,
                trainname: data.trainname,
                total: data.total,
                Date: new Date()
            })

            cart.save().then(function () {
                resolve({ status: 200, message: "Booked a new Train Code" })
            }).catch(err => {
                reject({ status: 500, message: "Error:- " + err });
            })
        })
    }

    //deleteOne method to delete data

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

//The cartController() method is exported for the cartRouter class's use

module.exports = new cartController();