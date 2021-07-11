const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const winston = require('../modules/winston');

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
        winston.error(error);
      } else {
        winston.info('Database Connected!');
        mongoose.set('autoCreate', true);
      }
    }
  );
};

mongoose.connection.on('error', (error) => {
  winston.error(error);
});

mongoose.connection.on('disconnected', () => {
  winston.error('Database Disconnected, Trying to connect again...');
  connect();
});

module.exports = connect;
