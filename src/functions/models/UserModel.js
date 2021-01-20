const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    company: { type: String, required: true },
    email: { type: String,  required: true},
    createdAt: { type: String, required: true},
    userId: { type: String,  required: true}
});

const NewUserDB = mongoose.model('NewUserDB', userSchema);

module.exports = NewUserDB;