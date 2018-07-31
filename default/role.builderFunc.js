class myBuilder {
  constructor(creep, assignedRoom) {
    this.creep = creep;
    this.assignedRoom = assignedRoom;
  }

  maintainRoom() {
    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('harvest');
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('build');
    }

    if (creep.memory.building) {
      var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {filter: (cs)=>{cs.room.name == this.assignedRoom}});
      if (constructionSite != undefined) {
        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
          creep.moveTo(constructionSite, {
            visualizePathStyle: {
              stroke: '#ffaa00'
            }
          });
        }
      }
      else{

      }
    } else {
      var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (mEH) => mEH.structureType == STRUCTURE_CONTAINER && mEH.store[RESOURCE_ENERGY] > 500
      });

      if (source == undefined) {
        var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (mEH) => mEH.structureType == STRUCTURE_CONTAINER && mEH.store[RESOURCE_ENERGY] > 0
        });
      };

      //console.log(creep.name + " cont source: " + source);

      if (creep.withdraw(source, RESOURCE_ENERGY, creep.carryCapacity - creep.energy) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
    }
  }
}


module.exports = myBuilder;
