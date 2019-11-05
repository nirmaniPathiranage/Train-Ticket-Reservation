var mongoose = require('mongoose');
var schema = mongoose.Schema;

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


//Train codes schema

var trainCodes = new schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    availableQty: {
        type: Number,
        required: true
    }
})


//User schema

var user = new schema({

    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true
    },

    employeestate: {
        type: String,
        enum: ['Government', 'Other'],
        required: true
    },

    nic: {
        type: String,
        unique: true,
    },

    password: {
        type: String,
        unique: true,
        required: true
    }


})


//shopping cart schema

var cart = new schema({

    ID: {
        type: String,
        required: true
    },

    trainname: {
        type: String,
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    Date: {
        type: Date,
        default: Date.now,
        required: true
    }
})


//credit card schema

var creditcard = new schema({

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true
    },

    name: {
        type: String,
        required: true
    },

    cardNumber: {
        type: String,
        unique: true,
        required: true
    },

    cvc: {
        type: Number,
        unique: true,
        min: 000,
        max: 999,
        required: true
    },

    phone: {
        type: String,
        unique: true,
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    subtotal: {
        type: Number,
        required: true
    }

})


//dialog mobile schema

var dialogpay = new schema({

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true
    },

    phone: {
        type: String,
        unique: true,
        required: true
    },

    pin: {
        type: Number,
        unique: true,
        min: 0000,
        max: 9999,
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    subtotal: {
        type: Number,
        required: true
    }
})


//government service schema

var governmentservice = new schema({

    nic: {
        type: String,
        unique: true,
        required: true
    }
})


//renaming schemas of the database

mongoose.model('trainCodes', trainCodes);
mongoose.model('user', user);
mongoose.model('cart', cart);
mongoose.model('creditcard', creditcard);
mongoose.model('dialogpay', dialogpay);
mongoose.model('governmentservice', governmentservice);


//connecting to mongodb and creating a database called Train

mongoose.connect('mongodb://127.0.0.1:27017/Train', function (err) {
    if (err) {
        console.log(err);
        process.exit(-1);
    }
    console.log("The Application is Connected to the Train DataBase");
})

module.exports = mongoose;