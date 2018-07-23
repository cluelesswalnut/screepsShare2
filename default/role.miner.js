module.exports = {
  run: function(creep) {
    // let source = Game.getObjectById(creep.memory.sourceId);
    // let goal = _.map(creep.room.find(FIND_SOURCES), function(source) {
    //    return { pos: source.pos, range: 1 };
    // });
    // let source = Pathfinder.search(creep.pos, goal);
    let sources = creep.room.find(FIND_SOURCES);
    var chosenSource;
    var containerBySource;
    for (var s in sources) {
      var nearByMiners = sources[s].pos.findInRange(FIND_MY_CREEPS, 1, {
        filter: (c) => c.memory.role == 'miner' && c != creep
      });
      //console.log("soureces: " + sources[s]);

      containerBySource = sources[s].pos.findInRange(FIND_STRUCTURES, 1, {
        filter: {
          structureType: STRUCTURE_CONTAINER
        }
      })

      if (containerBySource.length == 0) {
        continue;
      }

      if (nearByMiners.length == 0) {
        chosenSource = s;
        break;
      }
    }

    //console.log("chosensource: " + chosenSource);

    // if (chosenSource != undefined) {
    //   let container = sources[chosenSource].pos.findInRange(FIND_STRUCTURES, 1, {
    //     filter: {
    //       structureType: STRUCTURE_CONTAINER
    //     }
    //   })[0];
    // }

    //console.log("cont:" + container);
    if (creep.pos.isEqualTo(containerBySource[0])) {
      //console.log("on container");
      var sourceToHarvest = creep.pos.findInRange(FIND_SOURCES, 1);
      creep.harvest(sourceToHarvest[0]);
    } else {
      //console.log("not on container")
      creep.moveTo(containerBySource[0], {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
    }
  }
};