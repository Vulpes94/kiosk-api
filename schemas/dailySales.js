const mongoose = require('mongoose');

const {Schema} = mongoose;
const {
  Types: {ObjectId},
} = Schema;

const dailySales = new Schema(
  {
    menu_name: {
      type: String,
      required: false,
      unique: true,
      ref: 'Menu',
    },
    sales_quantity: {
      type: Number,
      required: false,
    },
    menu_price: {
      type: Number,
      required: false,
      ref: 'Menu',
    },
    total_price: {
      type: Number,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Sales', dailySales);
