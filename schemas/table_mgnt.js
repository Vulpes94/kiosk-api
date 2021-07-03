const mongoose = require('mongoose');

const {Schema} = mongoose;

const tableMgnt = new Schema(
  {
    table_no: {
      type: Number,
      required: true,
      index: true,
    },
    table_name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('table_mgnt', tableMgnt);
