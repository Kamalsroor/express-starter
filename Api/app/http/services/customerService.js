const Customer = require("../../models/Customer")
const CRUD = require('./crudService');
    

const customerService = new CRUD(Customer , 'customers');



customerService.getReceipts =async (req, res) => {
    try {
        const docs = await Customer.find().withReletion('receipts').pagination(req);
        res.apiSuccess(docs)
    } catch (err) {
        res.status(500).apiError(err.message);
    }
}
customerService.router.get('/get/receipts', customerService.getReceipts);



customerService.getCustomerReceipts =async (req, res) => {
    try {
        const doc = await Customer.findById(req.params.id).withReletion('receipts');
        res.apiSuccess(doc)
    } catch (err) {
        res.status(500).apiError(err.message);
    }
}
customerService.router.get('/get/receipts', customerService.getReceipts);
customerService.router.get('/get/:id/receipts', customerService.getCustomerReceipts);





module.exports = customerService;

