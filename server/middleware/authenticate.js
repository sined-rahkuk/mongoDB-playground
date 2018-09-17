const {
    User
} = require('./../models/user');

module.exports.authenticate = (req, res, next) => {
    const token = req.header('x-auth');
    User.findByToken(token)
        .then(usr => {
            if (!usr) Promise.reject();
            req.user = usr;
            req.token = token;
            next();
        })
        .catch(err => res.status(401).send(err));
}