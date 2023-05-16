const fs = require('fs');
const pluralize = require('pluralize');
// commands/makeService.js 
module.exports = function(name) {

  this.runCommand(`make:model ${name}`);

  console.log(`Crud ${name} created successfully!`);

 


}