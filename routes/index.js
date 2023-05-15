var express = require('express');
const app = express();


const userRoute = require('./user');
// const customerRoute = require('./customer');
const customerRoute = require('../app/http/services/customerService');
const employeeRoute = require('../app/http/services/employeeService');
const expenseRoute = require('../app/http/services/expenseService');
const ReceiptInvoicesRoute = require('../app/http/services/receiptInvoicesService');


// here add require in make crud command


const publicRoute = require('./public');
const uploadRoute = require('./upload');



app.use('/user', userRoute)
app.use('/customers', customerRoute.router)
app.use('/employees', employeeRoute.router)
app.use('/expenses', expenseRoute.router)

// here add route in make crud command


app.use('/receipt-invoices', ReceiptInvoicesRoute.router)
app.use('/public', publicRoute)
app.use('/upload', uploadRoute)

module.exports = app;
