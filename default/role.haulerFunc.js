class myHauler {
  constructor(creep, container, store) {
    this.creep = creep;
    this.container = container;
    this.store = store
  }

  haul() {
    if(this.creep.carry.energy != this.creep.carryCapacity)
    {
      var rawEnergy = this.creep.pos.findInRange(FIND_DROPPED_RESOURCES, 2);
      if(rawEnergy.length > 0)
      {
        this.creep.moveTo(rawEnergy[0].pos);
        this.creep.pickup(rawEnergy[0]);
      }
      else{
      if (this.creep.withdraw(this.container, RESOURCE_ENERGY, this.creep.carryCapacity - this.creep.energy) == ERR_NOT_IN_RANGE) {
        this.creep.moveTo(this.container, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
    }

    //   var source = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
    //     filter: (mEH) => mEH.structureType == STRUCTURE_CONTAINER && mEH.store[RESOURCE_ENERGY] > 500 && mEH.room.name == this.assignedRoom
    //   });
    //
    //   if (source == undefined) {
    //     var source = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
    //       filter: (mEH) => mEH.structureType == STRUCTURE_CONTAINER && mEH.store[RESOURCE_ENERGY] > 0 && mEH.room.name == this.assignedRoom
    //     });
    //   };
    //
    //   console.log("ENERGY: " + source);
    //   console.log(this.creep.withdraw(source, RESOURCE_ENERGY, this.creep.carryCapacity - this.creep.energy));
    //   //console.log(creep.name + " cont source: " + source);
    //
    //   if(source != undefined)
    //   {
    //   if (this.creep.withdraw(source, RESOURCE_ENERGY, this.creep.carryCapacity - this.creep.energy) == ERR_NOT_IN_RANGE) {
    //     this.creep.moveTo(source, {
    //       visualizePathStyle: {
    //         stroke: '#ffaa00'
    //       }
    //     });
    //   }
    // }
  }
  else{
    if (this.creep.transfer(this.store, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.store, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
    }
  }

    //
    // if (this.creep.harvest(this.source) == ERR_NOT_IN_RANGE) {
    //   this.creep.moveTo(this.source, {
    //     visualizePathStyle: {
    //       stroke: '#ffaa00'
    //     }
    //   });
    // } else if (this.creep.harvest(this.source) == OK) {
    //   var closeContainers = this.creep.pos.findInRange(FIND_STRUCTURES, 1, {
    //     filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
    //   });
    //   var closeConstructionSites = this.creep.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 1, {
    //     filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
    //   });
    //   if (closeContainers.length == 0 && closeConstructionSites.length == 0) {
    //     this.creep.room.createConstructionSite(this.creep.pos, STRUCTURE_CONTAINER);
    //   } else if (closeContainers.legnth > 0) {
    //     this.creep.moveTo(closeContainers[0].pos);
    //   }
    //
    // }

  }
}


module.exports = myHauler;
