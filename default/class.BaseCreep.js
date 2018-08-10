require('role.testContiainerGrab')();

class BaseCreep{
  constructor(name, homeRoom, bodyParts){
    this.name = name;
    this.homeRoom = homeRoom;
    this.spawn = homeRoom.find(FIND_MY_SPAWNS)[0];

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

  findEnergy(){
    findEnergy(this.creep);
  }

}

module.exports = BaseCreep;
