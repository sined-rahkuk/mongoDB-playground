const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    dbName: 'MyApp'
});

module.exports = {
    mongoose
};