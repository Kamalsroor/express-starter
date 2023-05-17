const DeliveryInvoice = require("../../models/DeliveryInvoice")
const CRUD = require('./crudService');
const Color = require('../../models/Color');


const deliveryInvoiceService = new CRUD(DeliveryInvoice , 'deliveryInvoices');


deliveryInvoiceService.getAllWithCustomer = async (req, res) => {
    try {
        const docs = await DeliveryInvoice.find().withReletion('customer').pagination(req);
        res.apiSuccess(docs)
    } catch (err) {
        res.status(500).apiError(err.message);
    }
}

deliveryInvoiceService.router.get('/get/with-customer', deliveryInvoiceService.getAllWithCustomer);


module.exports = deliveryInvoiceService;

