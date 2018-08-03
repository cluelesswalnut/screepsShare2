// class to represent a source
class mySource{
  constructor(room, x, y, id){
    this.room = room;
    this.x = x;
    this.y = y;
    this.id = id;
  }

  //find the path/distance to a source... should help us know how long it will take a hauler and how many parts it needs?
  findPathto(startRoomPos){

  }

  // move a creep to this source
  moveCreepTo(creep){
    var newRoom = new RoomPosition(this.x, this.y, this.room);
    creep.moveTo(newRoom);
  }

}

module.exports = mySource;
