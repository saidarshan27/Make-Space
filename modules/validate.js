// helper functions
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

const validateHHMMFormat = (startTime, endTime) => {
  const [startTimeParts, endTimeParts] = getTimeParts(startTime, endTime);

  if (startTimeParts.length < 2 || endTimeParts.length < 2) {
    throw new Error('INCORRECT_INPUT');
  }

  const [startHour, startMinute] = startTimeParts;
  const [endHour, endMinute] = endTimeParts;

  const isValidHH = (startHour.length === 2 && endHour.length === 2);
  const isValidMM = (startMinute.length === 2 && endMinute.length === 2);

  if (!isValidHH || !isValidMM) {
    throw new Error('INCORRECT_INPUT');
  }
};

const validateTimeRange = (startTime, endTime) => {
  const [startTimeParts, endTimeParts] = getTimeParts(startTime, endTime);

  const [startHour] = startTimeParts;
  const [endHour] = endTimeParts;

  const isValidTimeRange = parseInt(endHour, 10) > parseInt(startHour, 10);

  if (!(isValidTimeRange)) {
    throw new Error('INCORRECT_INPUT');
  }
};

const validateCapacity = (capacity) => {
  const integerCapacity = parseInt(capacity, 10);
  const mininumCapacity = 2;
  const maximumCapacity = 20;

  if (integerCapacity < mininumCapacity || integerCapacity > maximumCapacity) {
    throw new Error('INCORRECT_INPUT');
  }
};
// exposed funciton
const validateBookCommand = (command) => {
  const [type, startTime, endTime, capacity] = command.split(' ');

  validateHHMMFormat(startTime, endTime);
  validateTimeRange(startTime, endTime);
  validateIntervalsOf15(startTime, endTime);
  validateCapacity(capacity);
};

module.exports = {
  validateBookCommand,
};
