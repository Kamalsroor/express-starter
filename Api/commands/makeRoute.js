const fs = require('fs');
const pluralize = require('pluralize');
// commands/makeService.js 
module.exports = function(name) {



  
  const filePath = './routes/index.js';

  const comment = '// here add route in make crud command';
  const requireComment = '// here add require in make crud command';

  const serviceName = name.charAt(0).toUpperCase() + name.slice(1); // Capitalize first letter of service name


  const data = fs.readFileSync(filePath, 'utf8');
  let position = data.indexOf(comment)  - 1 ;

  let content = `\n app.use('/${pluralize(name.toLowerCase(), 2)}', ${pluralize(name.toLowerCase(), 2)}Route.router)`;

  let newData = [data.slice(0, position), content, data.slice(position)].join('');


   position = data.indexOf(requireComment)  - 1 ;

   content = `\n const ${pluralize(name.toLowerCase(), 2)}Route = require('../app/http/services/${name.charAt(0).toLowerCase() + name.slice(1)}Service');`;

   newData = [newData.slice(0, position), content, newData.slice(position)].join('');

  fs.writeFileSync(filePath, newData, (err) => {
    if (err) throw err;
  });
  console.log(`Route ${name} created successfully!`);


}