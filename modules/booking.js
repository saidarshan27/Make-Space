const { meetingRooms } = require('../repository/meetingRooms');
const { getCommandParts, getUTCTimestamp } = require('./util');
const { getVacancies, getOptimalVacantRoom } = require('./vacany');
const { validateBookCommand } = require('./validate');

const confirmBooking = (meetingRoomName, startTimestamp, endTimestamp) => {
  const meetingRoom = meetingRooms[meetingRoomName];
  const bookingObj = {
    startTimestamp,
    endTimestamp,
  };
  meetingRoom.bookings.push(bookingObj);

  return meetingRoomName;
};

const makeBooking = (command) => {
  const [type, startTime, endTime, capacity] = getCommandParts(command);
  const startTimestamp = getUTCTimestamp(startTime);
  const endTimestamp = getUTCTimestamp(endTime);

  const vacancies = getVacancies(meetingRooms, startTimestamp, endTimestamp);
  const optimalVacantRoom = getOptimalVacantRoom(meetingRooms, vacancies, capacity);

  return confirmBooking(optimalVacantRoom, startTimestamp, endTimestamp);
};

const processBookCommand = (command) => {
  try {
    validateBookCommand(command);
    console.log(makeBooking(command));
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = {
  processBookCommand,
};
