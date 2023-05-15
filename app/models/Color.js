var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const baseModel = require('./helpers/baseModel');
const CustomValidator = require('./helpers/CustomValidator');
const ColorRequest = require('../http/requests/ColorRequest');

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
  CustomValidator(newSchema , ColorRequest);



module.exports = mongoose.model('Color', newSchema);
