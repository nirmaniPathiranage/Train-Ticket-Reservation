var mongoose = require('../DBSchema');
var schema = mongoose.model('creditcard');
const nodemailer = require('nodemailer');
var springedge = require('springedge');

var payCardController = function () {

    //Insert method inserts data into the database when called by the payCardRouter class

    this.insert = function (data) {
        return new Promise(function (resolve, reject) {
            var card = schema({
                email: data.email,
                phone: data.phone,
                name: data.name,
                cardNumber: data.cardNumber,
                cvc: data.cvc,
                total: data.total,
                subtotal: data.subtotal
            })

            card.save().then(function () {
                resolve({ status: 200, message: "Added card infomation" })
            }).catch(err => {
                reject({ status: 500, message: "Error:- " + err });
            })

            //Sends a confirmation email to the customer 

            var output = `
            <b>Online Train Ticket Reservation</b>
            <p>Dear Customer, We recieved your payment of ${data.subtotal} LKR. Thank you for booking train tickets with Online Train Ticket Reservation.</p>
        `;

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false,
                port: 25,

                auth: {
                    user: 'bookingonlinetrainticket@gmail.com',
                    pass: 'bookingonlinetraintickets456'
                },

                tls: {
                    rejectUnauthorized: false
                }
            });


            let mailOptions = {
                from: '"Online Train Ticket Reserving" <bookingonlinetrainticket@gmail.com>',
                to: data.email,
                subject: 'Payment Confirmation',
                text: 'Hello',
                html: output
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }

                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });

            //Sends a confirmation SMS to the customer

            var params = {
                'apikey': '6n7h4wv5yte7t87qxp4vmrfh96tu0el7', //SMS REST API Key of the dummy service of springedge 
                'sender': 'Online Train Ticket Reservation', //Test Sender
                'to': [
                    data.phone  //Mobile Number
                ],
                'message': output,
                'format': 'json'
            };

            springedge.messages.send(params, 5000, function (err, response) {
                if (err) {
                    return console.log(err);
                }
                console.log(response);
            });
        })
    }
}

module.exports = new payCardController();