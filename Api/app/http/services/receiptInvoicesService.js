const ReceiptInvoice = require("../../models/ReceiptInvoice")
const CRUD = require('./crudService');
const Color = require('../../models/Color');


const receiptInvoiceService = new CRUD(ReceiptInvoice , 'receiptInvoices');


receiptInvoiceService.getColors =async (req, res) => {
    try {
        const docs = await Color.paginate(req);
        res.apiSuccess(docs)
        } catch (err) {
        res.status(500).apiError(err.message);
    }
}
receiptInvoiceService.router.get('/get/colors', receiptInvoiceService.getColors);


module.exports = receiptInvoiceService;

