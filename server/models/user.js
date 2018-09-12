const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: {
        type: String,
        trim: true,
        minLenght: 1,
        require: true
    }
});

module.exports.User = User;