const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  company: { type: String, required: false },
  email: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  googleId: { type: String, required: true },
});

const NewUserDB = mongoose.model('NewUserDB', userSchema);

module.exports = NewUserDB;
