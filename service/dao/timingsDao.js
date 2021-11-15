const { timings } = require("../storage/timings");

const getWorkingHours = () => {
  return timings.workingHours;
}

const getCleaningTimings = () => {
  return timings.cleaningTimings;
};

module.exports = {
  getWorkingHours,
  getCleaningTimings
}