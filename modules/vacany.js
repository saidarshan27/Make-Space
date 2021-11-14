const { meetingRooms } = require('../repository/meetingRooms');
const {
  checkContainment, overlapWithCleaning, getCommandParts, getUTCTimestamp,
} = require('./util');
const { validateVacancyCommand } = require('./validate');

const getVacancies = (availableMeetingRooms, startTimestamp, endTimestamp) => {
  if (overlapWithCleaning(startTimestamp, endTimestamp)) {
    throw new Error('NO_VACANT_ROOM');
  }

  const vacancies = [];

  Object.keys(availableMeetingRooms).forEach((meetingRoom) => {
    const { bookings } = availableMeetingRooms[meetingRoom];
    let isVacant = true;

    // loop over bookings
    for (let bookingIndex = 0; bookingIndex < bookings.length; bookingIndex += 1) {
      const booking = bookings[bookingIndex];
      const bookedStartTimestamp = booking.startTimestamp;
      const bookedEndTimestamp = booking.endTimestamp;

      const firstTimeRange = [bookedStartTimestamp, bookedEndTimestamp];
      const secondTimeRange = [startTimestamp, endTimestamp];

      // if the any of the booking time overlaps with the provided break and go to next room
      if (checkContainment(firstTimeRange, secondTimeRange)) {
        isVacant = false;
        break;
      }
    }
    if (isVacant) {
      vacancies.push(meetingRoom);
    }
  });

  if (vacancies.length === 0) {
    throw new Error('NO_VACANT_ROOM');
  }

  return vacancies;
};

const getOptimalVacantRoom = (availableMeetingRooms, vacancies, capacity) => {
  let optimalVacantRoom;

  for (let vacancyIndex = 0; vacancyIndex < vacancies.length; vacancyIndex += 1) {
    const vacantRoomName = vacancies[vacancyIndex];
    const meetingRoom = availableMeetingRooms[vacantRoomName];

    if (meetingRoom.capacity >= capacity) {
      optimalVacantRoom = vacantRoomName;
      break;
    }
  }

  return optimalVacantRoom;
};

const printVacancies = (command) => {
  const [type, startTime, endTime] = getCommandParts(command);

  const startTimestamp = getUTCTimestamp(startTime);
  const endTimestamp = getUTCTimestamp(endTime);

  const vacancies = getVacancies(meetingRooms, startTimestamp, endTimestamp);
  console.log(vacancies.join(' '));
};

const processVacancyCommand = (command) => {
  try {
    validateVacancyCommand(command);
    printVacancies(command);
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = {
  processVacancyCommand,
  getVacancies,
  getOptimalVacantRoom,
};
