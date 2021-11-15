const { confirmMeeting } = require('../dao/meetingRoomsDao');
const { getCommandParts, getUTCTimestamp } = require('./util');
const { getOptimalVacantRoom, getVacantRooms } = require('./vacany');
const { validateBookCommand } = require('./validate');

const bookMeeting = (command) => {
  const [type, startTime, endTime, capacity] = getCommandParts(command);
  const startTimestamp = getUTCTimestamp(startTime);
  const endTimestamp = getUTCTimestamp(endTime);

  const vacantRooms = getVacantRooms(startTimestamp, endTimestamp);
  const optimalVacantRoom = getOptimalVacantRoom(vacantRooms, capacity);

  const confirmedRoomName = confirmMeeting(optimalVacantRoom.name, startTimestamp, endTimestamp);
  return confirmedRoomName;
};

const processBookCommand = (command) => {
  validateBookCommand(command);
  const bookedRoomName = bookMeeting(command);
  console.log(bookedRoomName);
};

module.exports = {
  processBookCommand,
};
