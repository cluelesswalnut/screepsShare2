var roleUpgrader = require('role.upgrader');
var BaseCreep = require('class.BaseCreep')
require('role.testContiainerGrab')();

class UpgraderCreep extends BaseCreep{
	constructor(name, homeRoom, body){
		super(name, homeRoom, body);
	}

	upgrade(){
    if(this.creep == undefined)
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
