// var roleBuilder = require('role.builder');
require('role.testContiainerGrab')();

var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('harvest');
    }
    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('upgrade');
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
      }
    } else {
      //findEnergy(creep);
      //var sources = creep.room.find(FIND_SOURCES);
      //if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      var source = creep.pos.findClosestByPath(FIND_SOURCES);

      // let container = creep.room.find(FIND_STRUCTURES, 1, {
      //   filter: {
      //     structureType: STRUCTURE_CONTAINER
      //   }
      // })[0];

      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
    }
  }
};

module.exports = roleUpgrader;
