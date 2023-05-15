var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const baseModel = require('./helpers/baseModel');
const CustomValidator = require('./helpers/CustomValidator');
const CustomerRequest = require('../http/requests/CustomerRequest');

var newSchema = new Schema({
  'name': {
    type: String,
    required: [true, "name is required."],
    default: ""
  },
  'phone': {
    type: String,
    required: [true, "phone is required."],
    default: ""
  },
  'email': {
    type: String,
    required: [true, "email is required."],
    default: ""
  },
  
},
  { timestamps: true });


  
/**
 * @action Defined Schema Virtual
 * @keys 
 *    1.   The first parameter can be named anything.
 *          It defines the name of the key to be named on the Schema
 * 
 *    2. Options Object
 *       ref: Model name for Child collection
 *       localField: Key for reference id, stored on Child Doc, as named on Parent Doc.
 *       foreignField: Key name that holds localField value on Child Document
 */
newSchema.virtual('receipts', {
  ref: 'ReceiptInvoice', //The Model to use
  localField: '_id', //Find in Model, where localField 
  foreignField: 'coustomerId', // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
newSchema.set('toObject', { virtuals: true });
newSchema.set('toJSON', { virtuals: true });





baseModel(newSchema);
CustomValidator(newSchema , CustomerRequest);






module.exports = mongoose.model('Customer', newSchema);
