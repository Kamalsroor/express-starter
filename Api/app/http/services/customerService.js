const Customer = require("../../models/Customer")
const CRUD = require('./crudService');
const { getModelsByAggregateAndPagination } = require('../../../helpers/query');
var mongoose = require('mongoose');
const Color = require('../../models/Color');


const customerService = new CRUD(Customer , 'customers');



customerService.getReceipts =async (req, res) => {
    try {
        const customerPipeline = [
            {
                $lookup: {
                    from: 'receiptinvoices',
                    localField: '_id',
                    foreignField: 'customerId',
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
        // const doc = await Customer.findById(req.params.id).withReletion('receipts').pagination(req);

           
        Customer.findById(req.params.id)
        .populate({
            path:'deliveries',
            populate: { path: 'items.color' },
        })
        .populate({
          path: 'receipts',
          populate: { path: 'color' },
        })
        .exec((err, customer) => {
          if (err) {
            console.error(err);
            res.status(500).apiError(err);

            return;
          }
          const colors = {};
            customer.receipts.forEach(inv => {
            if (colors[inv.color._id]) {
                colors[inv.color._id].totalReceipt += inv.quantity;
                colors[inv.color._id].currentQuantity += inv.quantity;
            } else {
                colors[inv.color._id] = {
                 totalReceipt: inv.quantity,
                 name: inv.color.name,
                 hex: inv.color.hex,
                 _id: inv.color._id,
                 totalDelivery:0,
                 currentQuantity : inv.quantity
                };
            }
            });
            customer.deliveries.forEach(inv => {

                inv.items.forEach(item => {


                    if (colors[item.color._id]) {
                        colors[item.color._id].totalDelivery += item.quantity;
                        colors[item.color._id].currentQuantity -= item.quantity;
                    } else {
                        colors[item.color._id] = {
                            totalDelivery: item.quantity,
                            name: item.color.name,
                            _id: item.color._id,
                            hex: item.color.hex,
                            totalReceipt:0,
                            currentQuantity: 0 - inv.quantity

                        };
                    }
                });
    
                
            });
            let data = {}; 
            data = {
                customer,
                colors:Object.values(colors)
            };

            res.apiSuccess(data)
        });
   


    } catch (err) {
        res.status(500).apiError(err.message);
    }
}
customerService.router.get('/get/receipts', customerService.getReceipts);
customerService.router.get('/get/:id/receipts', customerService.getCustomerReceipts);





module.exports = customerService;

