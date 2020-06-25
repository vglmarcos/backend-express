const { model, Schema } = require('mongoose');

const User = new Schema({
    name: String,
    lastname: String,
    username: String,
    email: String,
    password: String
},
{
    timestamps: true
});

module.exports = model('User', User, 'Users');