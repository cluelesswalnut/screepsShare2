class myMiner {
  constructor(creep, source) {
    this.creep = creep;
    this.source = source;
  }

  mineSource() {

    if (creep.room.name != this.source.room) {
      this.source.comeTo(this.creep);
    } else {
      let gameSource = Game.getObjectById(source.id);
      let sourceInRange = this.creep.pos.getRangeTo(gameSource) <= 1;
      let gameContainers = gameSource.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
      });
      let gameConstructionSites = gameSource.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 1, {
        filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
      });

      // get next to the source before doing anything
      if (!sourceInRange) {
        this.creep.moveTo(gameSource, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      } else {

        // move the miner to the correct spot
        if (gameContainers.length == 0 && gameConstructionSites == 0) {
          this.creep.room.createConstructionSite(this.creep.pos, STRUCTURE_CONTAINER);
        } else if (gameContainers.length == 0 && gameConstructionSites.length > 0 && !this.creep.pos.isEqualTo(gameContainers[0].pos)) {
          this.creep.moveTo(gameConstructionSites[0]);
        } else if (gameContainers.length > 0 && !this.creep.pos.isEqualTo(gameContainers[0].pos)) {
          this.creep.moveTo(gameContainers[0]);
        }

        // Once the miner is in the correct spot do work
        if (gameContainers.length == 0 && gameConstructionSites.length > 0) {
          // get energy
          // build site
        } else if (gameContainers.length > 0 && gameContainers[0].hitsMax - gameContainers[0].hits > SOMENUMBER) {
          // repair the container
        } else if (gameContainers.length == 0) {
          this.creep.harvest(gameSource);
        }

      }
    }
  }
}


module.exports = myMiner;

// class myMiner {
//   constructor(creep, source) {
//     this.creep = creep;
//     this.source = source;
//   }
//
//   mineSource() {
//
//     if (creep.room.name != this.source.room) {
//   	    var newRoom = new RoomPosition(25, 25, this.roomName);
//   	    this.source.moveCreepTo(this.creep);
//   	  }
//     if (this.creep.harvest(this.source) == ERR_NOT_IN_RANGE) {
//       this.creep.moveTo(this.source, {
//         visualizePathStyle: {
//           stroke: '#ffaa00'
//         }
//       });
//     } else if (this.creep.harvest(this.source) == OK) {
//       var closeContainers = this.creep.pos.findInRange(FIND_STRUCTURES, 1, {
//         filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
//       });
//       var closeConstructionSites = this.creep.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 1, {
//         filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
//       });
//       if (closeContainers.length == 0 && closeConstructionSites.length == 0) {
//         this.creep.room.createConstructionSite(this.creep.pos, STRUCTURE_CONTAINER);
//       } else if (closeContainers.legnth > 0) {
//         this.creep.moveTo(closeContainers[0].pos);
//       }
//
//     }
//
//   }
// }
//
//
// module.exports = myMiner;
