const jwt = require('jsonwebtoken');

data = {
    usr_id: 435235,
    pass: "123pass"
}

const new_token = jwt.sign(data, 'my_secret');
console.log(new_token);
// console.log(jwt.decode(new_token, {
//     complete: true
// }));
const decoded_token = jwt.verify(new_token, 'my_secret', (err, res) => {
    console.log('res:', typeof res, res);
    console.log('err:', typeof err, err);

});
console.log(typeof decoded_token);