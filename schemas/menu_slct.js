const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuSlct = new Schema(
  {
    menu_name: {
      type: String,
      required: true,
      unique: true,
      ref: 'Menu',
    },
    menu_price: {
      type: Number,
      required: true,
    },
    menu_stock: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('menu_slct', menuSlct);
