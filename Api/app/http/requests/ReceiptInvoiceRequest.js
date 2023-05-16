const Request = require('./BaseRequest');

class ReceiptInvoiceRequest extends Request {
    static rules(){
        return {
            'quantity':'required|min:1' 
        };
    }
}

module.exports = ReceiptInvoiceRequest;
