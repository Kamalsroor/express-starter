const Employee = require("../models/Employee")
const CRUD = require('./crudServcice');
    

const EmployeeService = new CRUD(Employee , 'Employees');



module.exports = EmployeeService;

