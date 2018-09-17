const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
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
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not valid"
        },
        minLength: 5,
    },
    password: {
        type: String,
        trim: false,
        minLength: 6,
        required: true
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});
UserSchema.statics.findByToken = function (token) {
    //return a Promise
    let decoded;
    const User = this;

    try {
        decoded = jwt.verify(token, 'secret');
    } catch (error) {
        return Promise.reject();
    }
    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });

}
UserSchema.methods.toJSON = function () {
    const user = this;
    userObj = user.toObject();
    return _.pick(userObj,
        ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({
            _id: user._id.toHexString(),
            access
        },
        'secret').toString();
    user.tokens.push({
        access,
        token
    });

    return user
        .save()
        .then(() => token)
}

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};