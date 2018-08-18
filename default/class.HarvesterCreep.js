var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var BaseCreep = require('class.BaseCreep')

class HarvesterCreep extends BaseCreep{
	constructor(name, homeRoom, body, respawn){
		super(name, homeRoom, body, respawn);
	}

	work(){
		// check if the creep exists
		if(!this.exists())
		{
			return;
		}
		// roleBuilder.run(this.creep)
		// return;
		// can make this a function on BaseCreep?? maybe not
		// can make it a function somewhere though and add more complex logic to check if
		// it is worth it to grab/deposit energy b4 moving
		if (this.creep.memory.storing && this.creep.carry.energy == 0) {
		  this.creep.memory.storing = false;
		  this.creep.say('harvest');
		}
		if (!this.creep.memory.storing && this.creep.carry.energy == this.creep.carryCapacity) {
		  this.creep.memory.storing = true;
		  this.creep.say('store');
		}


		if (!this.creep.memory.storing) {
			this.findEnergy();
		} else {
			this.storeEnergy();
		}
	}

	storeEnergy(){
		var myEnergyHolders = this.creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
		filter: (mEH) => mEH.energy < mEH.energyCapacity && mEH.structureType != STRUCTURE_CONTAINER && mEH.structureType != STRUCTURE_STORAGE && mEH.structureType != STRUCTURE_TOWER
		});

		var towers = this.creep.room.find(FIND_MY_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity });

		let myCreeps = this.creep.room.find(FIND_MY_CREEPS);
		if(towers.length != 0 && myCreeps.length > 3)
		{
		myEnergyHolders = towers[0];
		}

		if (myEnergyHolders != undefined) {
		if (this.creep.transfer(myEnergyHolders, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			this.creep.moveTo(myEnergyHolders, {
			visualizePathStyle: {
				stroke: '#ffaa00'
			}
			});
		}
		}
		else{
		roleUpgrader.run(this.creep);
		}
	}
}

module.exports =  HarvesterCreep;
