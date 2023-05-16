const Employee = require("../../models/Employee")
const CRUD = require('./crudService');
    

const EmployeeService = new CRUD(Employee , 'Employees');



module.exports = EmployeeService;

