const Expense = require("../models/Expense")
const CRUD = require('./crudServcice');
    

const ExpenseService = new CRUD(Expense , 'Expenses');



module.exports = ExpenseService;

