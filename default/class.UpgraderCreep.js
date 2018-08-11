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
}

module.exports =  UpgraderCreep;
