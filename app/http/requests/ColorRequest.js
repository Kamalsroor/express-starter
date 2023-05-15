const Request = require('./BaseRequest');

class ColorRequest extends Request {
    static rules(){
        return {
            'name':'required|min:2' 
        };
    }
}

module.exports = ColorRequest;
