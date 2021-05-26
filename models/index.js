const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const Menu = require('./menu');
const OrderSheet = require('./orderSheet');
const DailySales = require('./dailySales');
const Table = require('./table');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Menu = Menu;
db.OrderSheet = OrderSheet;
db.DailySales = DailySales;
db.Table = Table;

Menu.init(sequelize);
OrderSheet.init(sequelize);
DailySales.init(sequelize);
Table.init(sequelize);

module.exports = db;
