var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const baseModel = require('./helpers/baseModel');
const CustomValidator = require('./helpers/CustomValidator');
const ReceiptInvoiceRequest = require('../http/requests/ReceiptInvoiceRequest');

var newSchema = new Schema({
  'quantity': {
    type: Number, 
    required: [true, "Quantity is required."], 
    min: [1, "Must be 1 or greater"], 
    default: 0
  },
  'color': {
    type: String,
    required: [true, "Color is required."],
    type: mongoose.Types.ObjectId,
    ref: "Color"
  },
  'note': {
    type: String, 
    default: ""
  },
  'date': {
    type: Date, 
    default: Date.now
  },
  coustomerId: {
    required: [true, "Coustomer is required."],
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
 }
},
  { timestamps: true });

  baseModel(newSchema);
  CustomValidator(newSchema,ReceiptInvoiceRequest);

module.exports = mongoose.model('ReceiptInvoice', newSchema);
