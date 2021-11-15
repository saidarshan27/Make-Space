const { IncorrectInputError } = require('../errors/IncorrectInputError');
const { NoVacantRoomError } = require('../errors/NoVacantRoomError');
const { isBetweenWorkingHours } = require('./timings');
const {
  getTimeParts, isValidTimeRange, getCommandParts,
} = require('./util');

// helper functions
const validateIntervalsOf15 = (startTime, endTime) => {
  const startTimeParts = getTimeParts(startTime);
  const endTimeParts = getTimeParts(endTime);

  const [startHour, startMinute] = startTimeParts;
  const [endtHour, endMinute] = endTimeParts;

  const integerStartMinute = parseInt(startMinute, 10);
  const integerEndMinute = parseInt(endMinute, 10);

  if (integerStartMinute % 15 !== 0 || integerEndMinute % 15 !== 0) {
    throw new IncorrectInputError();
  }
};

const validateHHMMFormat = (startTime, endTime) => {
  const startTimeParts = getTimeParts(startTime);
  const endTimeParts = getTimeParts(endTime);

  const [startHour, startMinute] = startTimeParts;
  const [endHour, endMinute] = endTimeParts;

  const isValidHH = (startHour.length === 2 && endHour.length === 2);
  const isValidMM = (startMinute.length === 2 && endMinute.length === 2);

  if (!isValidHH || !isValidMM) {
    throw new IncorrectInputError();
  }
};

const validateTimeRange = (startTime, endTime) => {
  const startTimeParts = getTimeParts(startTime);
  const endTimeParts = getTimeParts(endTime);

  const [startHour] = startTimeParts;
  const [endHour] = endTimeParts;

  const validTimeRange = isValidTimeRange(startTime, endTime)
    && isBetweenWorkingHours(startTime, endTime);

  if (!validTimeRange) {
    throw new IncorrectInputError();
  }
};

const validateCapacity = (capacity) => {
  const integerCapacity = parseInt(capacity, 10);
  const mininumCapacity = 2;
  const maximumCapacity = 20;

  if (integerCapacity < mininumCapacity || integerCapacity > maximumCapacity) {
    throw new NoVacantRoomError();
  }
};
// exposed funciton
const validateBookCommand = (command) => {
  const [type, startTime, endTime, capacity] = getCommandParts(command);

  validateHHMMFormat(startTime, endTime);
  validateTimeRange(startTime, endTime);
  validateIntervalsOf15(startTime, endTime);
  validateCapacity(capacity);
};

const validateVacancyCommand = (command) => {
  const [type, startTime, endTime] = getCommandParts(command);

  validateHHMMFormat(startTime, endTime);
  validateTimeRange(startTime, endTime);
  validateIntervalsOf15(startTime, endTime);
};

module.exports = {
  validateBookCommand,
  validateVacancyCommand,
};
