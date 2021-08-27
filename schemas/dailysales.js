const mongoose = require('mongoose');

const { Schema } = mongoose;

const dailySales = new Schema(
  {
    menu_name: {
      type: String,
      required: true,
      unique: true,
      ref: 'Menu',
    },
    sales_quantity: {
      type: Number,
      required: true,
    },
    menu_price: {
      type: Number,
      required: true,
      ref: 'Menu',
    },
    total_price: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('dailysales', dailySales);
