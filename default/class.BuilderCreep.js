var roleUpgrader = require('role.upgrader');
var BaseCreep = require('class.BaseCreep')
require('role.testContiainerGrab')();

class BuilderCreep extends BaseCreep{
	constructor(name, homeRoom, body, respawn){
		super(name, homeRoom, body, respawn);
	}

	work(){
    // check if the creep exists
    if(!this.exists())
      return

    if(this.creep.memory.building && this.creep.carry.energy == 0) {
          this.creep.memory.building = false;
          this.creep.say('harvest');
    }
    if(!this.creep.memory.building && this.creep.carry.energy == this.creep.carryCapacity) {
        this.creep.memory.building = true;
        this.creep.say('build');
    }

    if(this.creep.memory.building) {
      var constructionSite = this.creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      if (constructionSite != undefined) {
        if (this.creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
          this.creep.moveTo(constructionSite, {
            visualizePathStyle: {
              stroke: '#ffaa00'
            }
          });
        }
      } else {
        this.repair();
      }
    }
    else {
      this.findEnergy();
    }
}

repair(){
  if (this.creep.memory.building) {

    //repair walls
    var wall = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) => (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART) && s.hits < this.wallHP
    });
    if (wall != undefined) {
      if (this.creep.repair(wall) == ERR_NOT_IN_RANGE) {
        // move towards it
        this.creep.moveTo(wall);
      }
    }
      else{


    // find closest structure with less than max hits
    // Exclude walls because they have way too many max hits and would keep
    // our repairers busy forever. We have to find a solution for that later.
    var structure = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
      // the second argument for findClosestByPath is an object which takes
      // a property called filter which can be a function
      // we use the arrow operator to define it
      filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
    });

    // if we find one
    if (structure != undefined) {
      // try to repair it, if it is out of range
      if (this.creep.repair(structure) == ERR_NOT_IN_RANGE) {
        // move towards it
        this.creep.moveTo(structure);
      }
    }
  else{
        roleUpgrader.run(this.creep);
      }
    }
  } else {
    this.findEnergy();

  }
}

}

module.exports =  BuilderCreep;
