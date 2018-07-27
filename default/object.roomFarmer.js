function RoomFarmer(roomName, controlRoom) {
  // var DaysEnum = Object.freeze({"monday":1, "tuesday":2, "wednesday":3,});
  this.controlRoom = controlRoom;
  this.roomName = roomName;
  this.spawn = this.controlRoom.find(FIND_MY_SPAWNS)[0];
  // console.log("Spawn: " + this.spawn);
  // this.sources;
  // this.scout;
  // this.miner;
  // this.hauler;
  // this.builder;
}

RoomFarmer.prototype.locateSources = function() {
  let scoutName = "roomScout" + this.roomName;
  this.scout = Game.creeps[scoutName];
  if (this.scout == undefined) {
    // console.log("spawn: " + this.spawn);
    console.log(this.spawn.spawnCreep([MOVE], scoutName, {
      memory: {
        role: 'scout'
      }
    }));
  } else {
		//Go the the middle of the room or the source
		if (this.scout.room.name != this.roomName) {
			var newRoom = new RoomPosition(25, 25, this.roomName);
			this.scout.moveTo(newRoom);
		}else
		{
			this.sources = this.scout.room.find(FIND_SOURCES);
			// var newRoom = new RoomPosition(this.sources[0].pos.x, this.sources[0].pos.y, this.roomName);
			var newRoom = new RoomPosition(38, 17, this.roomName);
			this.scout.moveTo(newRoom);
		}
	}
}

RoomFarmer.prototype.operateMiner = function() {
	// let minerName = "roomMiner" + this.roomName;
	this.sources.forEach((source)=>{
		let minerName = "miner" + source.id;
		let miner = Game.creeps[minerName];

		if (miner == undefined) {
			// console.log("spawn: " + this.spawn);
			console.log(this.spawn.spawnCreep([WORK, WORK, WORK, MOVE, MOVE, MOVE], minerName, {
				memory: {
					role: 'roomMiner'
				}
			}));
		}

	 })

	this.miner = Game.creeps[minerName];
	if (this.miner == undefined) {
		// console.log("spawn: " + this.spawn);
		console.log(this.spawn.spawnCreep([MOVE], scoutName, {
			memory: {
				role: 'roomMiner'
			}
		}));
	} else {
		//Go the the middle of the room or the source
		if (this.miner.room.name != this.roomName) {
			var newRoom = new RoomPosition(25, 25, this.roomName);
			this.miner.moveTo(newRoom);
		}else
		{
			this.sources = this.scout.room.find(FIND_SOURCES);
			// var newRoom = new RoomPosition(this.sources[0].pos.x, this.sources[0].pos.y, this.roomName);
			var newRoom = new RoomPosition(38, 17, this.roomName);
			this.scout.moveTo(newRoom);
		}
	}
}

module.exports = RoomFarmer;
