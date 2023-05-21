var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const baseModel = require('./helpers/baseModel');
const CustomValidator = require('./helpers/CustomValidator');
const ReceiptInvoiceRequest = require('../http/requests/ReceiptInvoiceRequest');



const itemSchema = new mongoose.Schema({
  quantity: { 
    type: Number, 
    required: [true, "الكمية مطلوب"], 
    min: [1, "يجب ان تكون الكمية 1 كيلو او اكثر"]
  },
  color: { type: Schema.Types.ObjectId, ref: 'Color', required: true },

});
  


var newSchema = new Schema({
  'note': {
    type: String, 
    default: ""
  },
  'date': {
    type: Date, 
    default: Date.now
  },
  items: [{ type: itemSchema, required: true }],

  customerId: {
    required: [true, "Customer is required."],
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
 }
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
// newSchema.virtual('customer', {
//   ref: 'Customer', //The Model to use
//   localField: '_id', //Find in Model, where localField 
//   foreignField: 'customerId', // is equal to foreignField
// });

// Set Object and Json property to true. Default is set to false
newSchema.set('toObject', { virtuals: true });
newSchema.set('toJSON', { virtuals: true });





  baseModel(newSchema);
  CustomValidator(newSchema,ReceiptInvoiceRequest);

module.exports = mongoose.model('ReceiptInvoice', newSchema);
