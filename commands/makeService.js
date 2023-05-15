const fs = require('fs');

// commands/makeService.js 
module.exports = function(name) {
  const LowerServiceName = name.charAt(0).toLowerCase() + name.slice(1); // Capitalize first letter of service name


  const serviceName = name.charAt(0).toUpperCase() + name.slice(1); // Capitalize first letter of service name
  const serviceFileName = `${LowerServiceName}Service.js`;
  const templatePath = './commands/stubs/service.stub';
  const outputPath = `./services/${serviceFileName}`;

  fs.readFile(templatePath, 'utf-8', (err, data) => {
    if (err) throw err;

    const output = data
                  .replace(/{{serviceName}}/g, serviceName)
                  .replace(/{{name}}/g, name);

    fs.writeFile(outputPath, output, (err) => {
      if (err) throw err;
      console.log(`Service ${serviceName} created successfully!`);
    });
  });
}