var roleRepairer = require('role.repairer');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('build');
	    }

	    if(creep.memory.building) {
        var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES,
          {filter: {
            structureType: STRUCTURE_CONTAINER
          }});
        if (constructionSite != undefined) {
          if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
            creep.moveTo(constructionSite, {
              visualizePathStyle: {
                stroke: '#ffaa00'
              }
            });
          }
        } else {
          roleRepairer.run(creep);
        }
	    }
	    else {
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source, {
            visualizePathStyle: {
              stroke: '#ffffff'
            }
          });
        }
	    }
	}
};

module.exports = roleBuilder;


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
