const mongoose = require('mongoose');

const {Schema} = mongoose;

const table = new Schema(
  {
    table_no: {
      type: Number,
      required: false,
      index: true,
    },
    table_name: {
      type: String,
      required: false,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Table', table);
