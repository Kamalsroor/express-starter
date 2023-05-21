const ReceiptInvoice = require("../../models/ReceiptInvoice")
const CRUD = require('./crudService');
const Color = require('../../models/Color');


const receiptInvoiceService = new CRUD(ReceiptInvoice , 'receiptInvoices');


receiptInvoiceService.getAllWithCustomer = async (req, res) => {
    try {
        const docs = await ReceiptInvoice.find().withReletion('customerId').pagination(req);
        res.apiSuccess(docs)
    } catch (err) {
        res.status(500).apiError(err.message);
    }
}


receiptInvoiceService.getColors =async (req, res) => {
    try {
        const docs = await Color.find();
        res.apiSuccess(docs)
        } catch (err) {
        res.status(500).apiError(err.message);
    }
}
receiptInvoiceService.router.get('/get/colors', receiptInvoiceService.getColors);
receiptInvoiceService.router.get('/get/with-customer', receiptInvoiceService.getAllWithCustomer);


module.exports = receiptInvoiceService;

