const Request = require('./BaseRequest');

class ExpenseRequest extends Request {
    static rules(){
        return {
            'price':'required|min:1' 
        };
    }
}

module.exports = ExpenseRequest;
