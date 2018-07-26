  function RoomFarmer(roomName, controlRoom) {
    // var DaysEnum = Object.freeze({"monday":1, "tuesday":2, "wednesday":3,});
    this.controlRoom = controlRoom;
    this.roomName = roomName;
    // this.spawn = this.controlRoom.find(FIND_MY_SPAWNS)[0];
    // this.sources;
    // this.scout;
    // this.miner;
    // this.hauler;
    // this.builder;
  }

  RoomFarmer.prototype.locateSources = function() {
		 let spawn = this.controlRoom.find(FIND_MY_SPAWNS)[0];
		 let scoutName = "roomScout" + this.roomName;
		 console.log("scoutName: " + scoutName)
		 let scout = Game.creeps[scoutName];
    // Object.keys(Game.rooms)
    console.log("scout: " + scout);
    // console.log("sources: " + sources);
    if (scout == undefined) {
			console.log("spawn: " + this.spawn);
      console.log(spawn.spawnCreep([MOVE], scoutName, {
        memory: {
          role: 'scout'
        }
      }));
    } else {
			console.log("room: " + this.roomName);
      // var newRoom = new RoomPosition(2, 27, this.roomName);
			console.log("mem Source: " + Memory.sources[0]);
			console.log("by id: " + Game.getObjectById(Memory.sources[0].id));
			 var newRoom = new RoomPosition(Memory.sources[0].pos.x, Memory.sources[0].pos.y, this.roomName);
      if (scout.room.name != this.roomName) {
				console.log("here");
        scout.moveTo(newRoom);
      } else {
        Memory.sources = scout.room.find(FIND_SOURCES);
      }
			scout.moveTo(newRoom);
    }
		console.log("sources: " + Memory.sources[0]);
		if(Memory.sources != undefined)
		{
			console.log("x: " + Memory.sources[0].pos.x);
	}
  }

module.exports = RoomFarmer;

  // operate() {
	//
  // }
	//
  // add() {
  //   return this.x + this.y;
  // }
  // subtract() {
  //   return this.x - this.y;
  // }
  // multiply() {
  //   return this.x * this.y;
  // }
  // divide() {
  //   return this.x / this.y
  // }
  // remainder() {
  //   return this.x % this.y
  // }

// module.exports = roomFarmer;
