const mongoose = require('mongoose');
let usersSchema = new mongoose.Schema({
    username: String,
    password: String
})
module.exports = mongoose.model('users', usersSchema)