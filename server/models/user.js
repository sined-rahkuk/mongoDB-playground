const mongoose = require('mongoose');

const User = mongoose.model('User', {
    first_name: {
        type: String,
        trim: true,
        minLength: 2,
        maxLength: 20
    },
    last_name: {
        type: String,
        trim: true,
        required: true,
        minLength: 2
    },
    tel: {
        type: Number,
        min: 100000,
        max: 999999999999
    },
    date_of_birth: {
        type: Date,
        default: new Date(0)
    }
});



module.exports = {
    User
};