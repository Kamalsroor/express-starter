const program = require('commander');

const MakeModel = require('../commands/makeModel');
const makeService = require('../commands/makeService');
const makeRoute = require('../commands/makeRoute');



program
  .command('make:model <name>')
  .description('Create a new model')
  .action((name) => MakeModel(name));

program
  .command('make:service <name>')
  .description('Create a new service')
  .action((name) => makeService(name));

program
  .command('make:route <name>')
  .description('Create a new route')
  .action((name) => makeRoute(name));
  
program
  .command('make:crud <name>')
  .description('Create a new crud')
  .action(async function(name) {

    await MakeModel(name)
    await makeService(name)
    await makeRoute(name)
    console.log(`Crud ${name} created successfully!`);

  });
  
program.parse(process.argv);


