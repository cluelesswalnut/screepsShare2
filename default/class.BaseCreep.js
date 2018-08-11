require('role.testContiainerGrab')();

class BaseCreep{
  constructor(name, homeRoom, bodyParts, respawn){
    this.name = name;
    this.homeRoom = homeRoom;
    this.spawn = homeRoom.find(FIND_MY_SPAWNS)[0];

		this.creep = Game.creeps[name];
		if (this.creep == undefined && respawn != false) {
			this.spawn.spawnCreep(bodyParts, this.name, {
          memory: {
            role: name[0]
          }
        });
      this.creep = Game.creeps[name];
    }
  }

  // add function to determine best body composition
  // add calculation for how many of each body part a room needs

  exists() {
    if (this.creep != undefined){
      return true;
    }
    else{
      return false;
    }
  }
  // moves the creep towards the room. Returns true if creep is in the room, false if not
  goToRoom(room){
    if (this.creep.room.name != room) {
      let roomPos = new RoomPosition(25, 25, room);
      this.creep.moveTo(roomPos);
      return false;
    }
    else{
      return true;
    }
  }

  findEnergy(){
    findEnergy(this.creep);
  }

}

module.exports = BaseCreep;
