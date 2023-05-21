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
                $lookup: {
                    from: 'deliveryinvoices',
                    localField: '_id',
                    foreignField: 'customer',
                    as: 'deliveryinvoices'
                }
            },
            {
              $project: {
                _id: 1,
                id: 1,
                name: 1,
                phone: 1,
                email: 1,
                receiptInvoices:1,
                deliveryinvoices:1,
                // totalReceiptsQuantity: { $sum: '$receiptInvoices.quantity' }
                // totalReceiptsQuantity: { $sum: '$receiptInvoices.quantity' }
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
        console.log(req.params.id);
        // const customerPipeline = [
        //     { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
        //     { $limit: 1 },
        //     {
        //         $lookup: {
        //           from: "receiptinvoices",
        //           localField: "_id",
        //           foreignField: "customerId",
        //           as: "receiptInvoices"
        //         }
        //       },
        //       {
        //         $lookup: {
        //           from: "deliveryinvoices",
        //           localField: "_id",
        //           foreignField: "customer",
        //           as: "deliveryInvoices"
        //         }
        //       },
        //       { $unwind: "$receiptInvoices" },
        //       { $unwind: "$receiptInvoices.items" },
        //     //   { $unwind: "$deliveryInvoices" },
        //     //   { $unwind: "$deliveryInvoices.items" },
        //       {
        //         $group: {
        //           _id: "$_id",
        //           totalReceiptQuantity: { $sum: "$receiptInvoices.items.quantity" },
        //           totalDeliveryQuantity: { $sum: "$deliveryInvoices.items.quantity" }
        //         }
        //       },
        //       {
        //         $project: {
        //           _id: 1,
        //             // name: 1,
        //             // phone: 1,
        //             // email: 1,
        //             // deliveryinvoices:1,
        //             // receiptinvoices:1,
        //           totalReceiptQuantity: 1,
        //           totalDeliveryQuantity: 1
        //         }
        //       }
        //   ];


     
          
        // const doc =  await Customer.aggregate(customerPipeline);

        
        const doc = await Customer.findById(req.params.id)
        .populate({
            path: "receipts",
            populate: { path: 'items.color' },

        })
        .populate({
            path: "deliveries",
            populate: { path: 'items.color' },
        })
        .exec((err, customer) => {
          if (err) {
            console.error(err);
            res.status(500).apiError(err);

            return;
          }
          const colors = {};


          let totalReceiptQuantity = 0;
          let totalDeliveryQuantity  = 0;


            customer.receipts.forEach(inv => {
                inv.items.forEach(item => {
                    totalReceiptQuantity += item.quantity;
                    if (colors[item.color._id]) {
                        colors[item.color._id].totalReceipt += item.quantity;
                        colors[item.color._id].currentQuantity += item.quantity;
                    } else {
                        colors[item.color._id] = {
                            totalReceipt: item.quantity,
                            name: item.color.name,
                            hex: item.color.hex,
                            _id: item.color._id,
                            totalDelivery:0,
                            currentQuantity : item.quantity
                        };
                    }
                });
            });
            customer.deliveries.forEach(inv => {

                inv.items.forEach(item => {
                    totalDeliveryQuantity += item.quantity;

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
                colors:Object.values(colors),
                totalReceiptQuantity,
                totalDeliveryQuantity
            };

            res.apiSuccess(data)
        });
   
        // res.apiSuccess(doc)


    } catch (err) {
        res.status(500).apiError(err.message);
    }
}
customerService.router.get('/get/receipts', customerService.getReceipts);
customerService.router.get('/get/:id/receipts', customerService.getCustomerReceipts);





module.exports = customerService;

