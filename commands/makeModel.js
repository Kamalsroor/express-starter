
const fs = require('fs');


// commands/makeModel.js
module.exports = function(name) {
    // Logic to create a new Mongoose model 
    const modelName = name.charAt(0).toUpperCase() + name.slice(1); // Capitalize first letter of model name
    const modelFileName = `${modelName}.js`;
    const templatePath = './commands/stubs/model.stub';
    const outputPath = `./models/${modelFileName}`;

    fs.readFile(templatePath, 'utf-8', (err, data) => {
      if (err) throw err;

      const output = data
                    .replace(/{{modelName}}/g, modelName)
                    .replace(/{{name}}/g, name);

      fs.writeFile(outputPath, output, (err) => {
        if (err) throw err;
        console.log(`Model ${modelName} created successfully!`);
        return true;
      });
    });
  }