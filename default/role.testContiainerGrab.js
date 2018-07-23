module.exports = function() {

  findEnergy = function(creep) {
    let sources = creep.room.find(FIND_SOURCES);
    var minerSum = 0;
    for (var s in sources) {
      var minersBySource = sources[s].pos.findInRange(FIND_MY_CREEPS, 1, {
        filter: (c) => c.memory.role == 'miner' // && c != creep
      });
      if(minersBySource.length > 0)
      {
        minerSum++;// = minerSum + minersBySource.length;
      }
    }
    //console.log("miner sum: " + minerSum)
    //var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    //console.log('miner COUNT: ' + miners.length);

    if (minerSum == 0) {

      let minerNextToYou = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
        filter: (c) => c.memory.role == 'miner' // && c != creep
      });
      console.log("miner Next: " + minerNextToYou.length);
      if(minerNextToYou.length > 0)
      {
        creep.moveTo(33,33)
      }

      //if (creep.memory.role != 'harvester') {
        //creep.moveTo(40, 20);
        let sources = creep.room.find(FIND_SOURCES);
        let source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source, {
            visualizePathStyle: {
              stroke: '#ffaa00'
            }
          });
        }
      //}
    } else {
      // var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      //   filter: {
      //     structureType: STRUCTURE_CONTAINER
      //   }
      // });
      var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (mEH) =>  mEH.structureType == STRUCTURE_CONTAINER && mEH.store[RESOURCE_ENERGY] > 500
      });

      if(source == undefined){
        var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (mEH) =>  mEH.structureType == STRUCTURE_CONTAINER && mEH.store[RESOURCE_ENERGY] > 0
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
