require('role.testContiainerGrab')();
var roleUpgrader = require('role.upgrader');

var roleRepairer = {

  wallHP: 10000,
  repairRatio: 0.9,

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('harvest');
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('build');
    }

    if (creep.memory.building) {
      // find closest structure with less than max hits
      // Exclude walls because they have way too many max hits and would keep
      // our repairers busy forever. We have to find a solution for that later.
      var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        // the second argument for findClosestByPath is an object which takes
        // a property called filter which can be a function
        // we use the arrow operator to define it
        filter: (s) => s.hits < s.hitsMax * this.repairRatio && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
      });

      // if we find one
      if (structure != undefined) {
        // try to repair it, if it is out of range
        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(structure);
        }
      }
      // if we can't fine one
      else {
        //repair walls
        var wall = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s) => (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART) && s.hits < this.wallHP
        });
        console.log("wall: " + wall);
        if (wall != undefined) {
          if (creep.repair(wall) == ERR_NOT_IN_RANGE) {
            // move towards it
            creep.moveTo(wall);
          }
        } else {

          // look for construction sites
          roleUpgrader.run(creep);
        }
      }
    } else {
      findEnergy(creep);
      // var source = creep.pos.findClosestByPath(FIND_SOURCES);
      // if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      //   creep.moveTo(source, {
      //     visualizePathStyle: {
      //       stroke: '#ffffff'
      //     }
      //   });
      // }
    }
  }
};

module.exports = roleRepairer;


// var roleRepairer = require('role.repairer');
//
// module.exports = {
//   run: function(creep) {
//     if (creep.memory.working == true && creep.carry.energy == 0) {
//       creep.memory.working = false;
//       creep.say(':arrows_counterclockwise: harvest');
//     } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
//       creep.memory.working = true;
//       creep.say(':hammer: build');
//     }
//     if (creep.memory.working == true) {
//       var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
//       if (constructionSite != undefined) {
//         if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
//           creep.moveTo(constructionSite, {
//             visualizePathStyle: {
//               stroke: '#ffaa00'
//             }
//           });
//         }
//       } else {
//         roleRepairer.run(creep);
//       }
//     } else {
//       var source = creep.pos.findClosestByPath(FIND_SOURCES);
//       if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
//         creep.moveTo(source, {
//           visualizePathStyle: {
//             stroke: '#ffffff'
//           }
//         });
//       }
//     }
//   }
// };
