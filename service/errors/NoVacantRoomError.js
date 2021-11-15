function NoVacantRoomError() {
  this.name = 'NoVacantRoomError';
  this.message = 'NO_VACANT_ROOM';
}

NoVacantRoomError.prototype = Error.prototype;

module.exports.NoVacantRoomError = NoVacantRoomError;
