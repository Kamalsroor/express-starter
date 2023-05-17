const Request = require('./BaseRequest');

class DeliveryInvoiceRequest extends Request {
    static rules(){
        return {
            'customer':'required',
            'items':'required|array|min:1'
        };
    }
}

module.exports = DeliveryInvoiceRequest;
