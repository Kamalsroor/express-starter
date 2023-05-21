const Request = require('./BaseRequest');

class ReceiptInvoiceRequest extends Request {
    static rules(){
        return {
            'items':'required|array|min:1'

        };
    }
}

module.exports = ReceiptInvoiceRequest;
