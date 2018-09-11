const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const random = require('random-name');

// Connection URL
const url = 'mongodb://localhost:27017/';
const db_name = 'MyApp';



// Use connect method to connect to the server
MongoClient.connect(url, {
    useNewUrlParser: true
}).then((result) => {
    console.log("i've successfully connected to the db");


    result
        .db(db_name)
        .collection('my_documents')
        .find({})
        .count()
        .then(res => console.log(res));

    result.close();
}).catch((err) => {
    console.log(err);
});