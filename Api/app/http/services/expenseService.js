const Expense = require("../../models/Expense")
const CRUD = require('./crudService');
    

const ExpenseService = new CRUD(Expense , 'Expenses');



module.exports = ExpenseService;

