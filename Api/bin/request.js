class Request {
    constructor(data) {
      this.data = data;
      this.errors = {};
    }
  
    validate(rules) {
      for (let key in rules) {
        const rulesList = rules[key].split('|');
        for (let rule of rulesList) {
          if (rule === 'required' && !this.data[key]) {
            this.errors[key] = 'The ' + key + ' field is required.';
          }else if (rule === 'email' && this.validateEmail(this.data[key])) {
            this.errors[key] = 'The ' + key + ' field must be email.';
          } else if (rule.startsWith('min:') && this.data[key]) {
            const length = parseInt(rule.split(':')[1]);
            if (this.data[key].length < length) {
              this.errors[key] = 'The ' + key + ' field must be at least ' + length + ' characters.';
            }
          }
          // Add more validation rules as needed
        }
      }
  
      return Object.keys(this.errors).length === 0;
    }


    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

  }
  
  module.exports = Request;