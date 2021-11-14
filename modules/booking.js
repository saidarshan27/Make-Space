const { getCommandParts, getUTCTimestamp } = require('./util');
const { validateBookCommand } = require('./validate');

const meetingRooms = {
  'C-Cave': {
    capacity: 3,
    bookings: [],
  },
  'D-Tower': {
    capacity: 7,
    bookings: [],
  },
  'G-Mansion': {
    capacity: 20,
    bookings: [],
  },
};

const makeBooking = (command) => {
  const [type, startTime, endTime, capacity] = getCommandParts(command);
  const startTimestamp = getUTCTimestamp(startTime);
  const endTimestamp = getUTCTimestamp(endTime);

  console.log(startTimestamp, endTimestamp);
  // Object.keys(meetingRooms).forEach((meetingRoom) => {
  //   if (meetingRoom.capacity >= capacity) {
  //   }
  // });
};

const processBookCommand = (command) => {
  try {
    validateBookCommand(command);
    makeBooking(command);
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = {
  processBookCommand,
};
