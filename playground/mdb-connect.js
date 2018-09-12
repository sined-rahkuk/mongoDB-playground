const {
    MongoClient,
    ObjectId
} = require('mongodb');
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
    let i = 1;
    // ObjectId("5b97f0e48e5e380cfc452b75")
    result
        .db(db_name)
        .collection('my_documents')
        .findOneAndUpdate({
            name: "Dela"
        }, {
            $rename: {
                'age': 'old'
            }
        }, {
            returnOriginal: false
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));


    result.close();
}).catch((err) => {
    console.log(err);
});