module.exports = function() {

  doClaiming = function(creep, newRoom) {
    if (creep.room.name != newRoom) {

      var posInAnotherRoom = new RoomPosition(3, 25, newRoom);
      creep.moveTo(posInAnotherRoom);
      //creep.memory.next = 1;
    } else {
      var controller = creep.room.controller;
      creep.moveTo(controller);
      creep.attackController(controller);
    }
  }

}
