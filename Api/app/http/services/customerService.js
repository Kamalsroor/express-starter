const Customer = require("../../models/Customer")
const CRUD = require('./crudService');
const { getModelsByAggregateAndPagination } = require('../../../helpers/query');


const customerService = new CRUD(Customer , 'customers');



customerService.getReceipts =async (req, res) => {
    try {
        const customerPipeline = [
            {
                $lookup: {
                    from: 'receiptinvoices',
                    localField: '_id',
                    foreignField: 'coustomerId',
                    as: 'receiptInvoices'
                }
            },
            {
              $project: {
                _id: 1,
                id: 1,
                name: 1,
                phone: 1,
                email: 1,
                totalReceiptsQuantity: { $sum: '$receiptInvoices.quantity' }
              }
            }
          ];

        const docs = await getModelsByAggregateAndPagination(Customer,customerPipeline,req.query.page, req.query.perPage );

        res.apiSuccess(docs)
    } catch (err) {
        res.status(500).apiError(err.message);
    }
}
customerService.router.get('/get/receipts', customerService.getReceipts);



customerService.getCustomerReceipts =async (req, res) => {
    try {
        const doc = await Customer.findById(req.params.id).withReletion('receipts').withSumQuantity().pagination(req);
        res.apiSuccess(doc)
    } catch (err) {
        res.status(500).apiError(err.message);
    }
}
customerService.router.get('/get/receipts', customerService.getReceipts);
customerService.router.get('/get/:id/receipts', customerService.getCustomerReceipts);





module.exports = customerService;

