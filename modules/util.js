const { once } = require('events');
const readline = require('readline');
const fs = require('fs');
const { validateBookCommand } = require('./validate');

const getInput = async (path) => {
  const fileStream = fs.createReadStream(path);
  const lineReader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const inputLines = [];

  lineReader.on('line', (line) => {
    inputLines.push(line);
  });

  await once(lineReader, 'close');

  return inputLines;
};

const processBookCommand = (command) => {
  try {
    validateBookCommand(command);
  } catch (e) {
    console.error(e.message);
  }
};

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

module.exports = {
  getInput,
  processCommand,
};
