const mongoose = require('mongoose');
const functions = require('firebase-functions');

// Connect to MongoDB database.
class ConnectMongo {
  static init() {
    const uri = functions.config().app.atlas_uri;
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log('MongoDB connection established');
    });
  }
}

module.exports = ConnectMongo;
