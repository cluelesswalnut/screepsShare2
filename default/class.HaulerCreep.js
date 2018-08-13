var BaseCreep = require('class.BaseCreep')

class HaulerCreep extends BaseCreep {
  constructor(name, homeRoom, targetRoom, body, respawn) {
    super(name, homeRoom, body, respawn);
    this.targetRoom = targetRoom;
  }

  work() {
    // check if the creep exists
    if (!this.exists()) {
      return;
    }

    if (this.creep.memory.storing && this.creep.carry.energy == 0) {
      this.creep.memory.storing = false;
      this.creep.say('harvest');
    }
    if (!this.creep.memory.storing && this.creep.carry.energy >= this.creep.carryCapacity * 0.8) {
      this.creep.memory.storing = true;
      this.creep.say('store');
    }

    if (!this.creep.memory.storing) {
      if (this.goToRoom(this.targetRoom)) {
        this.findEnergy();
      }
    } else if (this.creep.memory.storing) {
      if (this.goToRoom(this.homeRoom.name)) {
        if (this.creep.transfer(this.store, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          this.creep.moveTo(this.store, {
            visualizePathStyle: {
              stroke: '#ffaa00'
            }
          });
        }
      }
      repairRoadsAsYouGo();
    }

  }

}

module.exports = HaulerCreep;
