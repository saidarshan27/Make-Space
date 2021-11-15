const { processBookCommand } = require('./modules/booking');
const { processVacancyCommand } = require('./modules/vacany');
const { getInput } = require('./modules/util');

const processCommand = (command) => {
  if (command.includes('BOOK')) {
    processBookCommand(command);
  } else if (command.includes('VACANCY')) {
    processVacancyCommand(command);
  } else {
    throw new Error('INCORRECT_INPUT');
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
