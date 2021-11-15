const { processBookCommand } = require('./service/business/booking');
const { processVacancyCommand } = require('./service/business/vacany');
const { getInput } = require('./service/business/util');


const processCommand = (command) => {
  try {
    if (command.includes('BOOK')) {
      processBookCommand(command);
    } else if (command.includes('VACANCY')) {
      processVacancyCommand(command);
    } 
  } catch (e) {
    console.error(e.message);
  }
};

const main = async () => {
  const inputFilePath = process.argv[2];

  const commands = await getInput(inputFilePath);

  commands.forEach((command) => {
    processCommand(command);
  });
};

main();
