module.exports = function() {

findEnergy = function(creep)
{
  var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: {
      structureType: STRUCTURE_CONTAINER
    }
  });
  if (creep.withdraw(source, RESOURCE_ENERGY, creep.carryCapacity-creep.energy) == ERR_NOT_IN_RANGE) {
    creep.moveTo(source, {
      visualizePathStyle: {
        stroke: '#ffaa00'
      }
    });
  }
}
}


//
//   /** @param {Creep} creep **/
//   run: function(creep) {
//     if (creep.carry.energy < creep.carryCapacity) {
//       //            var sources = creep.room.find(FIND_SOURCES);
//       var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
//         filter: {
//           structureType: STRUCTURE_CONTAINER
//         }
//       });
//       if (creep.withdraw(source, RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE) {
//         creep.moveTo(source, {
//           visualizePathStyle: {
//             stroke: '#ffaa00'
//           }
//         });
//       }
//     } else {
//       var myEnergyHolders = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
//         filter: (mEH) => mEH.energy < mEH.energyCapacity
//       });
//       if (myEnergyHolders != undefined) {
//         if (creep.transfer(myEnergyHolders, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//           creep.moveTo(myEnergyHolders, {
//             visualizePathStyle: {
//               stroke: '#ffaa00'
//             }
//           });
//         }
//       }
// }
// }
// }
