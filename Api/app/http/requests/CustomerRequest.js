const Request = require('./BaseRequest');

class CustomerRequest extends Request {
    static rules(){
        return {
            'name':'required|min:5' 
        };
    }
}

module.exports = CustomerRequest;
