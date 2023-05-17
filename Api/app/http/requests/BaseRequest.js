class BaseRequest {
    constructor(data) {
      this.data = data;
      this.errors = {};
    }
  
    static rules(){
        return {};
    }


    static validated(data) {
        this.data = data;
        this.errors = {};
        for (let key in this.rules()) {
          const rulesList = this.rules()[key].split('|');
          let isArray = this.rules()[key].includes('array');
        for (let rule of rulesList) {
          if (rule === 'required' && !this.data[key]) {
            throw new Error('The ' + key + ' field is required.');
          }else if (rule === 'array' && typeof this.data[key] !== 'array' && typeof this.data[key] !== 'object') {
            console.log(typeof this.data[key]);


            throw new Error('The ' + key + ' field is must be Array.');
          }else if (rule === 'email' && !this.validateEmail(this.data[key])) {
            throw new Error('The ' + key + ' field must be email.');
          } else if (rule.startsWith('min:') && this.data[key]) {
            const length = parseInt(rule.split(':')[1]);
            if (typeof this.data[key] === 'number' && this.data[key] < length ) {
                throw new Error('The ' + key + ' field must be biger than ' + length + ' .');
            }else if(isArray && this.data[key].length < length){
              throw new Error('The ' + key + ' field must be at least ' + length + ' items.');

            }else if(this.data[key].length < length){
              throw new Error('The ' + key + ' field must be at least ' + length + ' characters.');

            }
          }
          // Add more validation rules as needed
        }
      }
  
      return Object.keys(this.errors).length === 0;
    }


    static validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

  }
  
  module.exports = BaseRequest;