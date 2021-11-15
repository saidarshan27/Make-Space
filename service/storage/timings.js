const { getUTCTimestamp } = require("../business/util");

const timings = {
  workingHours: {
    openingTimestamp: getUTCTimestamp('00:00'),
    closingTimestamp: getUTCTimestamp('23:45'),
  },
  cleaningTimings: [
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
  ],
};

module.exports.timings = timings;