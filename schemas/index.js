const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  mongoose.connect(
    process.env.MONGO_URL,
    {
      dbName: 'kible',
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    },
    (error) => {
      if (error) {
        console.log('Database Connection Error...', error);
      } else {
        console.log('Database Connected!');
        mongoose.set('autoCreate', true);
      }
    }
  );
};

mongoose.connection.on('error', (error) => {
  console.error('Database Connection Error...', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('Database Disconnected, Trying to connect again...');
  connect();
});

module.exports = connect;
