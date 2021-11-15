const { meetingRooms } = require("../storage/meetingRooms");

const getAllMeetingRooms = () => {
  return meetingRooms;
};

const getMeetingRoomByName = (meetingRoomName) => {
  return meetingRooms.find((meetingRoom) => meetingRoom.name === meetingRoomName);
}

const confirmMeeting = (meetingRoomName, startTimestamp, endTimestamp) => {
  const bookingObj = {
    startTimestamp,
    endTimestamp,
  };

  const meetingRoom = getMeetingRoomByName(meetingRoomName);
 
  meetingRoom.bookings.push(bookingObj);

  return meetingRoomName;
};

module.exports = {
  getAllMeetingRooms,
  confirmMeeting,
};