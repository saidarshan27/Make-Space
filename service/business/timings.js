const { getCleaningTimings, getWorkingHours } = require('../dao/timingsDao');
const { getUTCTimestamp, checkOverlap } = require('./util');

const isBetweenWorkingHours = (startTime, endTime) => {
  const { openingTimestamp, closingTimestamp } = getWorkingHours();
  
  const startTimestamp = getUTCTimestamp(startTime);
  const endTimestamp = getUTCTimestamp(endTime);

  const firstTimeRange = [openingTimestamp, closingTimestamp];
  const secondTimeRange = [startTimestamp, endTimestamp];

  const isBetween = checkOverlap(firstTimeRange, secondTimeRange);

  return isBetween;
};

const overlapWithCleaning = (startTimestamp, endTimestamp) => {
  const cleaningTimings = getCleaningTimings();
  let isOverlapping = false;

  for (let cleaningTimeIndex = 0; cleaningTimeIndex < cleaningTimings.length; cleaningTimeIndex += 1) {
    const cleaningTime = cleaningTimings[cleaningTimeIndex];

    const cleaningTimeRange = [cleaningTime.startTimestamp, cleaningTime.endTimestamp];
    const requestedBookingTimeRange = [startTimestamp, endTimestamp];

    if (checkOverlap(cleaningTimeRange, requestedBookingTimeRange)) {
      isOverlapping = true;
      break;
    }
  }

  return isOverlapping;
};

module.exports = {
  isBetweenWorkingHours,
  overlapWithCleaning,
}