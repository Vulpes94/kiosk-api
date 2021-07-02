const mongoose = require('mongoose');

const {Schema} = mongoose;
const menu = new Schema(
  {
    menu_name: {
      type: String,
      required: false,
      unique: true,
    },
    menu_price: {
      type: Number,
      required: false,
    },
    menu_stock: {
      type: Number,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Menu', menu);
