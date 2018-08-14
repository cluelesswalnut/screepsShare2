var BaseCreep = require('class.BaseCreep')
require('role.testContiainerGrab')();

class getEnergy extends BaseCreep{
	constructor(name, homeRoom, body, respawn){
		super(name, homeRoom, body, respawn);
	}

	work(){
    // check if the creep exists
    if(!this.exists())
      return

      if (this.creep.memory.storing && this.creep.carry.energy == 0) {
  		  this.creep.memory.storing = false;
  		  this.creep.say('harvest');
  		}
  		if (!this.creep.memory.storing && this.creep.carry.energy == this.creep.carryCapacity) {
  		  this.creep.memory.storing = true;
  		  this.creep.say('store');
  		}

      if (!this.creep.memory.storing) {
        let tombstones = this.creep.room.find(FIND_TOMBSTONES);

        if(tombstones.length > 0){

          this.creep.moveTo(tombstones[0])
          this.creep.withdraw(tombstones[0], RESOURCE_ENERGY)
        }
        else{
          var source = this.creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
            filter: (drop) =>  drop.resourceType == RESOURCE_ENERGY
          });
          this.creep.moveTo(source.pos);
          this.creep.pickup(source);
        }

      }
      else{
        let store = this.creep.room.storage;
        this.creep.moveTo(store);
        this.creep.transfer(store, RESOURCE_ENERGY);
      }

}
}

module.exports =  getEnergy;
