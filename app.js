const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const dotenv = require('dotenv');

dotenv.config();

const connect = require('./schemas');
const winston = require('./modules/winston');

const tableMgnt = require('./routes/table-mgnt');
const menuMgnt = require('./routes/menu-mgnt');
const menuSlct = require('./routes/menu-slct');
const wishList = require('./routes/wishlist');
const orderSheet = require('./routes/ordersheet');
const dailySales = require('./routes/dailysales');

const app = express();
app.set('port', process.env.PORT || 3050);
connect();

const combined =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
const dev = ':method :url :status :response-time ms - :res[content-length]';

if (process.env.NODE_ENV === 'production') {
  app.use(morgan(combined, {stream: winston.stream}));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(
    morgan(dev, {
      stream: winston.stream,
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/table-mgnt', tableMgnt);
app.use('/api/menu-mgnt', menuMgnt);
app.use('/api/menu-slct', menuSlct);
app.use('/api/wishlist', wishList);
app.use('/api/ordersheet', orderSheet);
app.use('/api/dailysales', dailySales);

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Router is not exist.`);
  err.name = 'NotFoundError';
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500).json();
  winston.error(err.stack);
});

app.listen(app.get('port'), () => {
  winston.info(`Waiting at Port ${app.get('port')}`);
});
