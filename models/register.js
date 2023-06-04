const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var register = new Schema({
    name:({
        type:String
    }),
    image:({
        type:String
    })
})

const MyModel = mongoose.model('register', register);

module.exports = MyModel