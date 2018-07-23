require('role.testContiainerGrab')();
var roleUpgrader = require('role.upgrader');

var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.carry.energy /*== 0 ){//}*/< creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES);
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
      //findEnergy(creep);
    } else {
      var myEnergyHolders = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (mEH) => mEH.energy < mEH.energyCapacity && mEH.structureType != STRUCTURE_CONTAINER
      });
      if (myEnergyHolders != undefined) {
        if (creep.transfer(myEnergyHolders, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(myEnergyHolders, {
            visualizePathStyle: {
              stroke: '#ffaa00'
            }
          });
        }
      }
      else{
        roleUpgrader.run(creep);
      }




      // var targets = creep.room.find(FIND_STRUCTURES, {
      //   filter: (structure) => {
      //     return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
      //       structure.energy < structure.energyCapacity;
      //   }
      // });
      // if (targets.length > 0) {
      //   if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      //     creep.moveTo(targets[0], {
      //       visualizePathStyle: {
      //         stroke: '#ffffff'
      //       }
      //     });
      //   }
      // }
    }
  }
};

module.exports = roleHarvester;
