class BaseCreep{
  constructor(name, homeRoom, bodyParts){
    this.name = name;
    this.homeRoom = homeRoom;

		this.creep = Game.creeps[name];
		if (this.creep == undefined) {
			this.spawn.spawnCreep(bodyParts, this.name);
      this.creep = Game.creeps[name];
    }
  }

  // moves the creep towards the room. Returns true if creep is in the room, false if not
  goToRoom(room){
    if (this.creep.room.name != room) {
      let roomPos = new RoomPosition(25, 25, this.roomName);
      this.creep.moveTo(roomPos);
      return false;
    }
    else{
      return false;
    }
  }

}

export default BaseCreep;
