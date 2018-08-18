module.exports = function() {

  findEnergy = function(creep){
  findClosestEnergySource = function(object){
    let maxDistanceRatio = 0;
    var target = undefined;
    for (let energySourceProperty in object) {
      if (object.hasOwnProperty(energySourceProperty) && object[energySourceProperty] > 0) {
        let energySource = Game.getObjectById(energySourceProperty);
        let distanceToResource = PathFinder.search(creep.pos, energySource).path.length;
        let ratio = object[energySourceProperty] *  object[energySourceProperty]/ distanceToResource;
        if(ratio > maxDistanceRatio){
          maxDistanceRatio = ratio;
          target = energySource;
        }
      }
    }
    return target;
  }

  //PathFinder.search(Game.getObjectById('5b6cd5bf0fa21e7cf0bd192e').pos, Game.getObjectById('59f1a68a82100e1594f40231')).path.length

  // let energyObject = {
  //   rawEnergy: rawEnergy,
  //   tombstones: tombstones,
  //   containers: containers,
  //   links: links
  // }

  var creepRemainingCapacity = creep.carryCapacity - creep.carry.energy;
  var target = undefined;
  var energyObject = creep.room.memory.energyObject;
  // first look for rawEnergy
  if(target == undefined){
    let rawEnergyProperty = 'rawEnergy';
    let rawEnergy = energyObject[rawEnergyProperty];
    target = findClosestEnergySource(rawEnergy);
    if(target != undefined){
      creep.room.memory.energyObject[rawEnergyProperty][target.id] -= creepRemainingCapacity;
      creep.moveTo(target);
      creep.pickup(target);
    }
  }
  // next look for tombstones
  if(target == undefined){
    let tombstomeProperty = 'tombstones';
    let tombstones = energyObject[tombstomeProperty];
    target = findClosestEnergySource(tombstones);
    if(target != undefined){
      creep.room.memory.energyObject[tombstomeProperty][target.id] -= creepRemainingCapacity;
      creep.moveTo(target);
      creep.withdraw(target, RESOURCE_ENERGY);
    }
  }
  // next look for containers
  if(target == undefined){
    let containerProperty = 'containers';
    let containers = energyObject[containerProperty];
    target = findClosestEnergySource(containers);
    if(target != undefined){
      creep.room.memory.energyObject[containerProperty][target.id] -= creepRemainingCapacity;
      creep.moveTo(target);
      creep.withdraw(target, RESOURCE_ENERGY);
    }
  }
}

  // findEnergy2: function(creep) {
  //   var rawEnergy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 2);
  //   if(rawEnergy.length > 0)
  //   {
  //     creep.moveTo(rawEnergy[0].pos);
  //     creep.pickup(rawEnergy[0]);
  //     // return;
  //   }
  //
  //   let sources = creep.room.find(FIND_SOURCES);
  //   var minerSum = 0;
  //   for (var s in sources) {
  //     var minersBySource = sources[s].pos.findInRange(FIND_MY_CREEPS, 1, {
  //       filter: (c) => c.memory.role == 'm' // && c != creep
  //     });
  //     if(minersBySource.length > 0)
  //     {
  //       minerSum++;// = minerSum + minersBySource.length;
  //     }
  //   }
  //   //console.log("miner sum: " + minerSum)
  //   //var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
  //   //console.log('miner COUNT: ' + miners.length);
  //
  //   if (minerSum == 0) {
  //
  //     let minerNextToYou = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
  //       filter: (c) => c.memory.role == 'm' // && c != creep
  //     });
  //     // console.log("miner Next: " + minerNextToYou.length);
  //     if(minerNextToYou.length > 0)
  //     {
  //       creep.moveTo(33,33)
  //     }
  //
  //     //if (creep.memory.role != 'harvester') {
  //       //creep.moveTo(40, 20);
  //       // let sources = creep.room.find(FIND_SOURCES, {filter: (source)=>{source.energy > 0} });
  //       let source = creep.pos.findClosestByPath(FIND_SOURCES, {filter: (s) => {return s.energy > 0;} });
  //       if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
  //         creep.moveTo(source, {
  //           visualizePathStyle: {
  //             stroke: '#ffaa00'
  //           }
  //         });
  //       }
  //     //}
  //   } else {
  //     // var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
  //     //   filter: {
  //     //     structureType: STRUCTURE_CONTAINER
  //     //   }
  //     // });
  //     // creep.memory.source = undefined
  //     if(creep.memory.source == undefined){
  //     var source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
  //       filter: (drop) =>  drop.resourceType == RESOURCE_ENERGY && drop.amount > 200 && drop.room.name == creep.room.name
  //     });
  //
  //
  //     // if (source != undefined){
  //     //   creep.moveTo(source.pos);
  //     //   creep.pickup(source);
  //     //   return;
  //     // }
  //
  //     if(source == undefined){
  //       var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
  //         filter: (mEH) =>  mEH.structureType == STRUCTURE_CONTAINER && mEH.store[RESOURCE_ENERGY] > 500
  //       });
  //     }
  //
  //     if(source == undefined){
  //       var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
  //         filter: (mEH) =>  mEH.structureType == STRUCTURE_CONTAINER && mEH.store[RESOURCE_ENERGY] > 0
  //       });
  //     };
  //
  //
  //     if(source == undefined){
  //       var energy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
  //         filter: (drop) =>  drop.resourceType == RESOURCE_ENERGY && drop.room.name == creep.room.name
  //       });
  //       if (energy != undefined){
  //         creep.moveTo(energy.pos);
  //         creep.pickup(energy);
  //         return;
  //       }
  //     }
  //     if(source != undefined){
  //       creep.memory.source = source.id;
  //     }
  //   }
  //
  //   var source = Game.getObjectById(creep.memory.source);
  //   // if(source == undefined || Game.time % 50 == 0){
  //   if(source == undefined || Game.time % 100 == 0){
  //     creep.memory.source = undefined;
  //     return;
  //   }
  //
  //     //console.log(creep.name + " cont source: " + source);
  //     var rawEnergy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
  //     creep.pickup(rawEnergy[0]);
  //     // console.log(creep.withdraw(source, RESOURCE_ENERGY, creep.carryCapacity - creep.energy))
  //     var result = creep.withdraw(source, RESOURCE_ENERGY, creep.carryCapacity - creep.energy);
  //     if (result == ERR_NOT_IN_RANGE) {
  //       creep.moveTo(source, {
  //         visualizePathStyle: {
  //           stroke: '#ffaa00'
  //         }
  //       });
  //     }else if(result == ERR_INVALID_TARGET){
  //         // console.log(source + ' ' + creep.name);
  //         creep.moveTo(source.pos);
  //         if(creep.pickup(source) == OK){
  //           creep.memory.source = undefined;
  //         }
  //     }
  //     else if(result == OK){
  //       creep.memory.source = undefined;
  //     }
  //
  //
  //
  //   }
  // }
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
