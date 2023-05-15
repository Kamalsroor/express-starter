var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const baseModel = require('./helpers/baseModel');

var newSchema = new Schema({
  'name': {
    type: String,
    required: [true, "name is required."],
    default: ""
  },
  'hex': {
    type: String,
    required: [true, "hex is required."],
    default: ""
  },
},
  { timestamps: true });

  baseModel(newSchema);



module.exports = mongoose.model('Color', newSchema);
