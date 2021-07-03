const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const dotenv = require('dotenv');

dotenv.config();

const connect = require('./schemas');

const tableMgnt = require('./routes/table-mgnt');
const menuMgnt = require('./routes/menu-mgnt');
const menuSlct = require('./routes/menu-slct');
const wishList = require('./routes/wishlist');
const orderSheet = require('./routes/ordersheet');
const dailySales = require('./routes/dailysales');

const app = express();
app.set('port', process.env.PORT || 3050);
connect();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/table-mgnt', tableMgnt);
app.use('/menu-mgnt', menuMgnt);
app.use('/menu-slct', menuSlct);
app.use('/wishlist', wishList);
app.use('/ordersheet', orderSheet);
app.use('/dailysales', dailySales);

app.use((req, res, next) => {
  const error = new Error(`Page is not found :(`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
});

app.listen(app.get('port'), () => {
  console.log('Waiting at Port', app.get('port'));
  console.log('http://localhost:3050');
});
