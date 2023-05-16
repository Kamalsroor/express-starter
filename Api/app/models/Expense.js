var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const baseModel = require('./helpers/baseModel');
const CustomValidator = require('./helpers/CustomValidator');
const ExpenseRequest = require('../http/requests/ExpenseRequest');

var newSchema = new Schema({
  'price': {
    type: Number, 
    required: [true, "Quantity is required."], 
    min: [1, "Must be 1 or greater"], 
    default: 0
  },
  'item': {
    required: [true, "Item is required."], 
    type: String, 
    default: ""
  },
  'type': {
    required: [true, "type is required."], 
    type: String,
    enum: ['general', 'administrative','staff'], 
    default: "general"
  },
  'note': {
    type: String, 
    default: ""
  },
  'date': {
    type: Date, 
    default: Date.now
  },
},
  { timestamps: true });

  baseModel(newSchema);
  CustomValidator(newSchema,ExpenseRequest);



module.exports = mongoose.model('Expense', newSchema);
