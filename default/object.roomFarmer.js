// one miner for each source
// one container for each source
// roads to the store in the main room
// one builder for each room
// one  hauler for each room or source?

// import {myMiner} from './role.minerFunc.js';

var myMiner = require('role.minerFunc');
var myBuilder = require('role.builderFunc');
var myHauler = require('role.haulerFunc');
var myRoom = require('object.room');
var mySource = require('object.source');


function RoomFarmer(roomName, controlRoom) {
  // var DaysEnum = Object.freeze({"monday":1, "tuesday":2, "wednesday":3,});
  this.controlRoom = controlRoom;
  this.roomName = roomName;
  this.spawn = this.controlRoom.find(FIND_MY_SPAWNS)[0];
  this.roomNameCost = this.roomName + 'cost';

  if(Memory[this.roomNameCost] == undefined)
  {
    Memory[this.roomNameCost] = 0;
  }
  // console.log("Spawn: " + this.spawn);
  // this.sources;
  // this.scout;
  // this.miner;
  // this.hauler;
  // this.builder;
}

RoomFarmer.prototype.locateSources = function() {
  if (Memory[this.roomName] == undefined) {
    let scoutName = "roomScout" + this.roomName;
    this.scout = Game.creeps[scoutName];
    if (this.scout == undefined) {
      // console.log("spawn: " + this.spawn);
      if (this.spawn.spawnCreep([MOVE], scoutName, {
          memory: {
            role: 'roomScout'
          }
        }) == OK) {
        console.log("SPAWNED A THINGY");
        Memory[this.roomNameCost] = Memory[this.roomNameCost] + 50;
      };
    } else {
      //Go the the middle of the room or the source
      if (this.scout.room.name != this.roomName) {
        var newRoom = new RoomPosition(25, 25, this.roomName);
        this.scout.moveTo(newRoom);
      } else {
        let gameSources = this.scout.room.find(FIND_SOURCES);
        let sources = [];
        for (let i in gameSources) {
          sources.push(new mySource(this.roomName, gameSources[i].pos.x, gameSources[i].pos.y, gameSources[i].id))
        }

        if (Memory[this.roomName] == undefined) {
          console.log("WTF")
          Memory[this.roomName] = new myRoom(this.roomName, sources);
        }

      }
    }
  }
}

// RoomFarmer.prototype.locateSources = function() {
//   let scoutName = "roomScout" + this.roomName;
//   this.scout = Game.creeps[scoutName];
//   if (this.scout == undefined) {
//     // console.log("spawn: " + this.spawn);
//     if(this.spawn.spawnCreep([MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY], scoutName, {
//       memory: {
//         role: 'roomBuilder'
//       }
//     }) == OK){
//       console.log("SPAWNED A THINGY");
//       Memory[this.roomName] = Memory[this.roomName] + 50 * 6 + 3 * 100;
//     };
//   } else {
// 		//Go the the middle of the room or the source
// 		if (this.scout.room.name != this.roomName) {
// 			var newRoom = new RoomPosition(25, 25, this.roomName);
// 			this.scout.moveTo(newRoom);
// 		}else
// 		{
// 			this.sources = this.scout.room.find(FIND_SOURCES);
// 			var newRoom = new RoomPosition(this.sources[0].pos.x, this.sources[0].pos.y, this.roomName);
// 			// var newRoom = new RoomPosition(38, 17, this.roomName);
//       // var newRoom = new RoomPosition(25, 25, this.roomName);
//       // this.scout.moveTo(newRoom);
// 			// this.scout.moveTo(newRoom);
//       this.myBuilder = new myBuilder(this.scout, this.roomName);
//       this.myBuilder.maintainRoom(newRoom);
//
// 		}
// 	}
// }

RoomFarmer.prototype.operateMiner = function() {
	// let minerName = "roomMiner" + this.roomName;
	this.miners = [];
	this.myMiners = [];
  // this.sources = Game.rooms[this.roomName].find(FIND_SOURCES);
  this.sources = Memory[this.roomName].sources;
  console.log(this.sources);
  if(this.sources != undefined)
{	this.sources.forEach((source)=>{
		let minerName = "miner" + source.id;
		let miner = Game.creeps[minerName];

		if (miner == undefined) {
			// console.log("spawn: " + this.spawn);
			if(this.spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], minerName, {
				memory: {
					role: 'roomMiner'
				}
			}) == OK){
        console.log("SPAWNED A THINGY");
        Memory[this.roomNameCost] = Memory[this.roomNameCost] + 5* 100 + 3*50;
      };
		}else{
      let minerObj = new myMiner(miner, source);
      minerObj.mineSource();
			// this.miners.push(miner);
	}
	});

	// this.miners.forEach((miner) => {
  //   console.log('foreachMiner');
	//   if (miner.room.name != this.roomName) {
  //     console.log("not in this room");
	//     var newRoom = new RoomPosition(25, 25, this.roomName);
	//     miner.moveTo(newRoom);
	//   }
	// 	else{
  //     console.log("in this room");
	// 		let sourceId = miner.name.slice(5, miner.name.length);
	// 		this.myMiners.push(new myMiner(miner, Game.getObjectById(sourceId)));
	// 		this.myMiners[this.myMiners.length - 1].mineSource();
	// 	}
	// });
}

  RoomFarmer.prototype.operateHauler = function() {
    this.haulers = [];
    this.myHaulers = [];
    this.containers = Game.rooms[this.roomName].find(FIND_STRUCTURES, {
      filter: (mEH) =>  mEH.structureType == STRUCTURE_CONTAINER
    })

    if(this.containers != undefined){
      this.containers.forEach((container)=>{
        let haulerName = "roomHauler1" + container.id;
          this.hauler = Game.creeps[haulerName];
          if (this.hauler == undefined) {
            // console.log("spawn: " + this.spawn);
            if(this.spawn.spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], haulerName, {
              memory: {
                role: 'roomHauler'
              }
            }) == OK){
              console.log("SPAWNED A THINGY");
              Memory[this.roomNameCost] = Memory[this.roomNameCost] + 20*50;
            };
      }
      else{
        this.haulers.push(this.hauler);
      }
      let haulerName2 = "roomHauler2" + container.id;
        this.hauler2 = Game.creeps[haulerName2];
        if (this.hauler2 == undefined) {
          // console.log("spawn: " + this.spawn);
          if(this.spawn.spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], haulerName2, {
            memory: {
              role: 'roomHauler'
            }
          }) == OK){
            console.log("SPAWNED A THINGY");
            Memory[this.roomNameCost] = Memory[this.roomNameCost] + 20*50;
          };
        }
        else{
          this.haulers.push(this.hauler2);
        }
    });

this.haulers.forEach((hauler)=>{
  let containerID = hauler.name.slice(11, hauler.name.length);
  let container = Game.getObjectById(containerID);
  let store = this.controlRoom.storage;
  this.myHaulers.push(new myHauler(hauler, container,store ));
  this.myHaulers[this.myHaulers.length - 1].haul();
})

  }
}

RoomFarmer.prototype.reserveRoom = function() {
  let reserverName = "reserver" + this.roomName;
  this.reserver = Game.creeps[reserverName];
  if (this.reserver == undefined) {
    // console.log("spawn: " + this.spawn);
    if(this.spawn.spawnCreep([MOVE, CLAIM], reserverName, {
      memory: {
        role: 'roomReserver'
      }
    }) == OK){
      console.log("SPAWNED A THINGY");
      Memory[this.roomNameCost] += 600 + 50;
    };
  } else {
		//Go the the middle of the room or the source
		if (this.reserver.room.name != this.roomName) {
			var newRoom = new RoomPosition(25, 25, this.roomName);
			this.reserver.moveTo(newRoom);
		}else
		{
      console.log("claimer in room")
			let controler = this.reserver.room.controller;
      if(this.reserver.reserveController(controler) == ERR_NOT_IN_RANGE)
      {
        this.reserver.moveTo(controler);
      }
		}
	}
}

  //   let haulterName = "roomHauler" + this.roomName;
  //   this.hauler = Game.creeps[haulterName];
  //   if (this.hauler == undefined) {
  //     // console.log("spawn: " + this.spawn);
  //     console.log(this.spawn.spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], haulterName, {
  //       memory: {
  //         role: 'roomHauler'
  //       }
  //     }));
  //   } else {
  // 		//Go the the middle of the room or the source
  // 		if (this.scout.room.name != this.roomName) {
  // 			var newRoom = new RoomPosition(25, 25, this.roomName);
  // 			this.scout.moveTo(newRoom);
  // 		}else
  // 		{
  // 			this.sources = this.scout.room.find(FIND_SOURCES);
  // 			// var newRoom = new RoomPosition(this.sources[0].pos.x, this.sources[0].pos.y, this.roomName);
  // 			var newRoom = new RoomPosition(38, 17, this.roomName);
  // 			// this.scout.moveTo(newRoom);
  //       this.myBuilder = new myBuilder(this.scout, this.roomName);
  //       this.myBuilder.maintainRoom();
  // 		}
  // 	}
  // }

}

module.exports = RoomFarmer;
