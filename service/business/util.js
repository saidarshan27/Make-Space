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

const isValidTimeRange = (startTime, endTime) => {
  const [startHour, startMinute] = getTimeParts(startTime);
  const [endHour, endMinute] = getTimeParts(endTime);

  let validTimeRange;
  if (startHour === endHour) {
    validTimeRange = parseInt(endMinute, 10) >= parseInt(startMinute, 10);
  } else {
    validTimeRange = parseInt(endHour, 10) >= parseInt(startHour, 10);
  }

  return validTimeRange;
};

const checkContainment = (firstTimeRange, secondTimeRange) => {
  const [fStartTimestamp, fEndTimestamp] = firstTimeRange;
  const [sStartTimestamp, sEndTimestamp] = secondTimeRange;

  const { max, min } = Math;

  return max(fStartTimestamp, sStartTimestamp) < min(fEndTimestamp, sEndTimestamp);
};

const isBetweenWorkingHours = (startTime, endTime) => {
  const openingTimestamp = getUTCTimestamp('00:00');
  const closingTimestamp = getUTCTimestamp('23:45');

  const startTimestamp = getUTCTimestamp(startTime);
  const endTimestamp = getUTCTimestamp(endTime);

  const firstTimeRange = [openingTimestamp, closingTimestamp];
  const secondTimeRange = [startTimestamp, endTimestamp];

  const isBetween = checkContainment(firstTimeRange, secondTimeRange);

  return isBetween;
};

const overlapWithCleaning = (startTimestamp, endTimestamp) => {
  const cleaningTimings = [
    {
      startTimestamp: getUTCTimestamp('09:00'),
      endTimestamp: getUTCTimestamp('09:15'),
    },
    {
      startTimestamp: getUTCTimestamp('13:15'),
      endTimestamp: getUTCTimestamp('13:45'),
    },
    {
      startTimestamp: getUTCTimestamp('18:45'),
      endTimestamp: getUTCTimestamp('19:00.'),
    },
  ];

  for (let cleaningTimeIndex = 0; cleaningTimeIndex < cleaningTimings.length; cleaningTimeIndex += 1) {
    const cleaningTime = cleaningTimings[cleaningTimeIndex];

    const firstTimeRange = [cleaningTime.startTimestamp, cleaningTime.endTimestamp];
    const secondTimeRange = [startTimestamp, endTimestamp];

    if (checkContainment(firstTimeRange, secondTimeRange)) {
      throw new Error('NO_VACANT_ROOM');
    }
  }
};

module.exports = {
  getInput,
  getCommandParts,
  getUTCTimestamp,
  getTimeParts,
  isValidTimeRange,
  isBetweenWorkingHours,
  checkContainment,
  overlapWithCleaning,
};
