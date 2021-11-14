const { getInput, processCommand } = require('./modules/util');

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
