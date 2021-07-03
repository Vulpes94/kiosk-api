const mongoose = require('mongoose');

const {Schema} = mongoose;

const orderSheet = new Schema(
  {
    table_no: {
      type: Number,
      required: true,
      ref: 'Table',
    },
    menu_name: {
      type: String,
      required: true,
      ref: 'Menu',
    },
    menu_price: {
      type: Number,
      required: true,
    },
    order_quantity: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('ordersheet', orderSheet);
