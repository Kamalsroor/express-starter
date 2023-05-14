var express = require('express');
const app = express();


const userRoute = require('./user');
// const customerRoute = require('./customer');
const customerRoute = require('../services/customerService');
const employeeRoute = require('../services/employeeService');
const expenseRoute = require('../services/expenseService');
const ReceiptInvoicesRoute = require('../services/receiptInvoicesService');

const publicRoute = require('./public');
const uploadRoute = require('./upload');



app.use('/user', userRoute)
app.use('/customers', customerRoute.router)
app.use('/employees', employeeRoute.router)
app.use('/expenses', expenseRoute.router)
app.use('/receipt-invoices', ReceiptInvoicesRoute.router)
app.use('/public', publicRoute)
app.use('/upload', uploadRoute)

module.exports = app;
