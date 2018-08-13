var roleUpgrader = require('role.upgrader');
var BaseCreep = require('class.BaseCreep')
require('role.testContiainerGrab')();

class UpgraderCreep extends BaseCreep{
	constructor(name, homeRoom, body, respawn){
		super(name, homeRoom, body, respawn);
	}

	work(){
    // check if the creep exists
    if(!this.exists())
      return

    if (this.creep.memory.upgrading && this.creep.carry.energy == 0) {
      this.creep.memory.upgrading = false;
      this.creep.say('harvest');
    }
    if (!this.creep.memory.upgrading && this.creep.carry.energy == this.creep.carryCapacity) {
      this.creep.memory.upgrading = true;
      this.creep.say('upgrade');
    }

    if (this.creep.memory.upgrading) {
      if (this.creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
        this.creep.moveTo(this.creep.room.controller, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
      }
    } else {
      this.findEnergy();
	}
}

designatedUpgrader(){
  if(!this.exists())
    return;
  // respawn a new miner so it will be at the source when the old one dies...
  // this seems hard because it has to have a different name than the original miner, Idk how to handle this yet.
  // base this on the distance to the source or something
  if(this.creep.ticksToLive < 60){

  }
    // move to the controller
    let controller = this.homeRoom.controller;
    let controllerInRange = this.creep.pos.getRangeTo(controller) <= 3;
    if (!controllerInRange) {
      this.creep.moveTo(controller, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
      return;
    }

    // check for a container. Move there, or create one of none exists
    let gameContainers = controller.pos.findInRange(FIND_STRUCTURES, 3, {
      filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
    });
    let gameConstructionSites = controller.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 3, {
      filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
    });
    gameContainers = gameContainers.concat(gameConstructionSites);

    if (gameContainers.length > 0) {
      this.creep.moveTo(gameContainers[0]);
    } else {
      this.creep.room.createConstructionSite(this.creep.pos, STRUCTURE_CONTAINER);
    }

    // harvest the source
    this.creep.upgradeController(controller);

    // build/repair container
    if (gameConstructionSites.length > 0) {
      this.creep.build(gameConstructionSites[0]);
    } else if (gameContainers[0].hitsMax > gameContainers[0].hits) {
      this.creep.repair(gameContainers[0]);
    }
}


}

module.exports =  UpgraderCreep;
