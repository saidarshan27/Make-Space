const { processBookCommand } = require('./modules/booking');
const { getInput } = require('./modules/util');

const processCommand = (command) => {
  if (command.includes('BOOK')) {
    processBookCommand(command);
  }
  // } else if (type === 'VACANCY') {
  //   processVacancyCommand(command);
  // } else {
  //   throw new Error('INCORRECT_INPUT');
  // }
};

const main = async () => {
  const inputFilePath = process.argv[2];

  const commands = await getInput(inputFilePath);

  commands.forEach((command) => {
    processCommand(command);
  });
};

main();

module.exports = {
  processCommand,
};
