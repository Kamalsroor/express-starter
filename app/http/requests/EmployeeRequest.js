const Request = require('./BaseRequest');

class EmployeeRequest extends Request {
    static rules(){
        return {
            'name':'required|min:5' 
        };
    }
}

module.exports = EmployeeRequest;
