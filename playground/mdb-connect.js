const {
    MongoClient,
    ObjectId
} = require('mongodb');
const assert = require('assert');
const random = require('random-name');
const randNumb = require('random-number');

// Connection URL
const url = 'mongodb://localhost:27017/';
const db_name = 'MyApp';



// Use connect method to connect to the server
MongoClient.connect(url, {
    useNewUrlParser: true
}).then((result) => {
    console.log("i've successfully connected to the db");
    let i = 1;

    my_people = generatePeople(100);

    result
        .db(db_name)
        .collection('users')
        .insertMany(my_people)
        .then(res => console.log(res))
        .catch(err => console.error(err));


    result.close();
}).catch((err) => {
    console.log(err);
});


const generatePeople = (amount) => {
    const generated_array = [];
    let tel_gen = randNumb.generator({
        min: 100000000,
        max: 999999999,
        integer: true
    })
    for (let i = 0; i < amount; i++) {
        generated_array.push({
            name: random.first(),
            lastName: random.last(),
            tel: `+421${tel_gen()}`
        })
    }

    return generated_array;
}