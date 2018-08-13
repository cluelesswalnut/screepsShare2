module.exports = function() {

  findEnergy = function(creep) {
    // find container or raw raw energy or tombstone?  probably store in the room object which containers are sources
    // go get energy from there

    // if none of those exist get harvest energy manually
    //needs to have work parts for this

    // if a miner is trying to get to the source get out of the way
  }


  findEnergy2 = function(creep) {
    var rawEnergy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 2);
    if(rawEnergy.length > 0)
    {
      creep.moveTo(rawEnergy[0].pos);
      creep.pickup(rawEnergy[0]);
      // return;
    }

    let sources = creep.room.find(FIND_SOURCES);
    var minerSum = 0;
    for (var s in sources) {
      var minersBySource = sources[s].pos.findInRange(FIND_MY_CREEPS, 1, {
        filter: (c) => c.memory.role == 'm' // && c != creep
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
        filter: (c) => c.memory.role == 'm' // && c != creep
      });
      // console.log("miner Next: " + minerNextToYou.length);
      if(minerNextToYou.length > 0)
      {
        creep.moveTo(33,33)
      }

      //if (creep.memory.role != 'harvester') {
        //creep.moveTo(40, 20);
        // let sources = creep.room.find(FIND_SOURCES, {filter: (source)=>{source.energy > 0} });
        let source = creep.pos.findClosestByPath(FIND_SOURCES, {filter: (s) => {return s.energy > 0;} });
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
      var source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
        filter: (drop) =>  drop.resourceType == RESOURCE_ENERGY && drop.amount > 200 && drop.room.name == creep.room.name
      });


      if (source != undefined){
        creep.moveTo(source.pos);
        creep.pickup(source);
        return;
      }


        var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (mEH) =>  mEH.structureType == STRUCTURE_CONTAINER && mEH.store[RESOURCE_ENERGY] > 500
        });

      if(source == undefined){
        var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (mEH) =>  mEH.structureType == STRUCTURE_CONTAINER && mEH.store[RESOURCE_ENERGY] > 0
        });
      };


      if(source == undefined){
        var energy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
          filter: (drop) =>  drop.resourceType == RESOURCE_ENERGY && drop.room.name == creep.room.name
        });
        if (energy != undefined){
          creep.moveTo(energy.pos);
          creep.pickup(energy);
          return;
        }
      }

      //console.log(creep.name + " cont source: " + source);
      var rawEnergy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
      creep.pickup(rawEnergy[0]);
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
