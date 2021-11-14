const { once } = require('events');
const readline = require('readline');
const fs = require('fs');

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

const getTimeParts = (startTime, endTime) => {
  return [startTime.split(':'), endTime.split(':')];
};

const validateIntervalsOf15 = (startTime, endTime) => {
  const [startTimeParts, endTimeParts] = getTimeParts(startTime, endTime);

  const [startHour, startMinute] = startTimeParts;
  const [endtHour, endMinute] = endTimeParts;

  const integerStartMinute = parseInt(startMinute, 10);
  const integerEndMinute = parseInt(endMinute, 10);

  if (integerStartMinute % 15 !== 0 || integerEndMinute % 15 !== 0) {
    throw new Error('INCORRECT_INPUT');
  }
};

const isValidHHMM = (startTimeParts, endTimeParts) => {
  if (startTimeParts.length < 2 || endTimeParts.length < 2) return false;
  const [startHour, startMinute] = startTimeParts;
  const [endHour, endMinute] = endTimeParts;

  const isValidHH = (startHour.length === 2 && endHour.length === 2);
  const isValidMM = (startMinute.length === 2 && endMinute.length === 2);

  return (isValidHH && isValidMM);
};

const validateCapacity = (capacity) => {
  const integerCapacity = parseInt(capacity, 10);
  const mininumCapacity = 2;
  const maximumCapacity = 20;

  if (integerCapacity < mininumCapacity || integerCapacity > maximumCapacity) {
    throw new Error('INCORRECT_INPUT');
  }
};
const validateTimeRange = (startTime, endTime) => {
  const [startTimeParts, endTimeParts] = getTimeParts(startTime, endTime);

  const [startHour] = startTimeParts;
  const [endHour] = endTimeParts;

  const isValidTimeRange = parseInt(endHour, 10) > parseInt(startHour, 10);
  const result = isValidHHMM(startTimeParts, endTimeParts);

  if (!(isValidTimeRange && result)) {
    throw new Error('INCORRECT_INPUT');
  }
};

const processBookCommand = (command) => {
  const [type, startTime, endTime, capacity] = command.split(' ');
  try {
    validateTimeRange(startTime, endTime);
    validateIntervalsOf15(startTime, endTime);
    validateCapacity(capacity);
  } catch (e) {
    console.error(e.message);
  }
};

const processCommand = (command) => {
  const [type] = command.split(' ');
  if (type === 'BOOK') {
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
