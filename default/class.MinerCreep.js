var roleUpgrader = require('role.upgrader');
var BaseCreep = require('class.BaseCreep')
var mySource = require('object.source');
require('role.testContiainerGrab')();

class MinerCreep extends BaseCreep {
  constructor(name, homeRoom, body, mySource, respawn) {
    super(name, homeRoom, body, respawn);
    this.mySource = mySource;
  }

  static findSources(room) {
    let gameSources = room.find(FIND_SOURCES);
    let sources = [];
    gameSources.forEach((source) => {
      sources.push(new mySource(room.name, source.pos.x, source.pos.y, source.id));
    });
    return sources;
  }

  work() {
    if(!this.exists())
      return;
    // respawn a new miner so it will be at the source when the old one dies...
    // this seems hard because it has to have a different name than the original miner, Idk how to handle this yet.
    // base this on the distance to the source or something
    if(this.creep.ticksToLive < 60){

    }
    if (this.goToRoom(this.mySource.room)) {
      let gameSource = Game.getObjectById(this.mySource.id);
      // move to the source
      let sourceInRange = this.creep.pos.getRangeTo(gameSource) <= 1;
      if (!sourceInRange) {
        this.creep.moveTo(gameSource, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
        return;
      }

      // check for a container. Move there, or create one of none exists
      let gameContainers = gameSource.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
      });
      let gameConstructionSites = gameSource.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 1, {
        filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
      });
      gameContainers = gameContainers.concat(gameConstructionSites);

      if (gameContainers.length > 0) {
        this.creep.moveTo(gameContainers[0]);
      } else {
        this.creep.room.createConstructionSite(this.creep.pos, STRUCTURE_CONTAINER);
      }

      // harvest the source
      this.creep.harvest(gameSource);

      // build/repair container
      if (gameConstructionSites.length > 0) {
        this.creep.build(gameConstructionSites[0]);
      } else if (gameContainers[0].hitsMax > gameContainers[0].hits) {
        this.creep.repair(gameContainers[0]);
      }
    }
  }

}

module.exports = MinerCreep;
