const { getAllMeetingRooms } = require('../dao/meetingRoomsDao');
const { NoVacantRoomError } = require('../errors/NoVacantRoomError');
const { overlapWithCleaning } = require('./timings');
const {
  checkOverlap, getCommandParts, getUTCTimestamp,
} = require('./util');
const { validateVacancyCommand } = require('./validate');

const getVacantRooms = (startTimestamp, endTimestamp) => {
  if (overlapWithCleaning(startTimestamp, endTimestamp)) {
    throw new NoVacantRoomError();
  }

  const vacantRooms = [];
  const meetingRooms = getAllMeetingRooms();

  meetingRooms.forEach((meetingRoom) => {
    const bookings  = meetingRoom.bookings;
    let isBookedForRequestedTime = false;

    // loop over bookings
    for (let bookingIndex = 0; bookingIndex < bookings.length; bookingIndex += 1) {
      const booking = bookings[bookingIndex];
      const bookedStartTimestamp = booking.startTimestamp;
      const bookedEndTimestamp = booking.endTimestamp;

      const bookedTimeRange = [bookedStartTimestamp, bookedEndTimestamp];
      const requestedBookingTimeRange = [startTimestamp, endTimestamp];

      // if the any of the booking time overlaps with the provided break and go to next room
      if (checkOverlap(bookedTimeRange, requestedBookingTimeRange)) {
        isBookedForRequestedTime = true;
        break;
      }
    }
    if (!isBookedForRequestedTime) {
      vacantRooms.push(meetingRoom);
    }
  });

  if (vacantRooms.length === 0) {
    throw new NoVacantRoomError();
  }

  return vacantRooms;
};

const getVacantRoomNames = (vacantRooms) => {     
  return vacantRooms.map((vacantRoom) => vacantRoom.name);
};

const getOptimalVacantRoom = (vacantRooms, capacity) => {
  return vacantRooms.find((vacantRoom) => vacantRoom.capacity >= capacity);
};

const printVacantRoomNames = (command) => {
  const [type, startTime, endTime] = getCommandParts(command);

  const startTimestamp = getUTCTimestamp(startTime);
  const endTimestamp = getUTCTimestamp(endTime);

  const vacantRooms = getVacantRooms(startTimestamp, endTimestamp);
  const vacantRoomNames = getVacantRoomNames(vacantRooms);
  console.log(vacantRoomNames.join(' '));
};

const processVacancyCommand = (command) => {
  validateVacancyCommand(command);
  printVacantRoomNames(command);
};

module.exports = {
  processVacancyCommand,
  getVacantRooms,
  getOptimalVacantRoom,
};
