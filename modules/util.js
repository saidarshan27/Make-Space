const { once } = require('events');
const readline = require('readline');
const fs = require('fs');

const getTimeParts = (timeString) => {
  return timeString.split(':');
};

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

const getCommandParts = (command) => {
  return command.split(' ');
};

const getUTCTimestamp = (timeString) => {
  const [hour, minute] = getTimeParts(timeString);
  const ISOString = new Date().toISOString();
  const [date] = ISOString.split('T');
  const [year, month, day] = date.split('-');

  const ms = Date.UTC(year, month - 1, day, hour, minute);
  return ms;
};

module.exports = {
  getInput,
  getCommandParts,
  getUTCTimestamp,
  getTimeParts,
};
