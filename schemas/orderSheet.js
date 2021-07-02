const mongoose = require('mongoose');

const {Schema} = mongoose;
const {
  Types: {ObjectId},
} = Schema;

const orderSheet = new Schema(
  {
    table_no: {
      type: Number,
      required: false,
      ref: 'Table',
    },
    menu_name: {
      type: String,
      required: false,
      ref: 'Menu',
    },
    menu_price: {
      type: Number,
      required: false,
    },
    order_quantity: {
      type: Number,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Order', orderSheet);
