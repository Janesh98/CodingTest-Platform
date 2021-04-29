const app = require('./app');
const mongoose = require('mongoose');

// initialize MongoDB configuration
// ConnectMongo.init();
const uri = 'mongodb://localhost:27017/myapp';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
