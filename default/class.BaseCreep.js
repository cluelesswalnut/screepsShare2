require('role.testContiainerGrab')();

class BaseCreep{
  constructor(symbolicName, homeRoom, bodyParts, respawn){
    this.symbolicName = symbolicName;
    // find the "real" name of the creep
    if(Memory.realCreepNames == undefined){
      Memory.realCreepNames = {};
    }
    if(!Memory.realCreepNames.hasOwnProperty(symbolicName)){
      Memory.realCreepNames[symbolicName] = symbolicName;
    }
    else{
      var name = Memory.realCreepNames[symbolicName];
    }
    // let name = Game.memory.realCreepNames[symbolicName]
    // let name = symbolicName;
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

    if(this.creep != undefined){
      this.creep.memory.inUse = Game.time;
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

  repairRoadsAsYouGo(){
    var structures = this.creep.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: (s) => s.structureType == STRUCTURE_ROAD && s.hits < s.hitsMax
    });
    structures.sort((a,b)=>{return a.hits < b.hits});
    this.creep.repair(structures[0]);
  }

}

module.exports = BaseCreep;
