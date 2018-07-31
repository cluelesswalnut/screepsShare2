class myBuilder {
  constructor(creep, assignedRoom) {
    this.creep = creep;
    this.assignedRoom = assignedRoom;
  }

  maintainRoom() {
    if (this.creep.memory.building && this.creep.carry.energy == 0) {
      this.creep.memory.building = false;
      this.creep.say('harvest');
    }
    if (!this.creep.memory.building && this.creep.carry.energy == this.creep.carryCapacity) {
      this.creep.memory.building = true;
      this.creep.say('build');
    }

    if (this.creep.memory.building) {
      console.log("building");
      var constructionSite = this.creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)//, {
      //   filter: (cs) => {
      //     cs.room.name +'' == ''+this.assignedRoom
      //   }
      // });
      // console.log("CS: " + constructionSite.room.name)
      // console.log(this.assignedRoom)
      if (constructionSite != undefined) {
        if (this.creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
          this.creep.moveTo(constructionSite, {
            visualizePathStyle: {
              stroke: '#ffaa00'
            }
          });
        }
      } else {
        var structure = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s) => s.hits < s.hitsMax && s.room.name == this.assignedRoom
        });

        if (structure != undefined) {
          if (this.creep.repair(structure) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(structure);
          }
        }
      }
    } else {
      console.log('not building');

      var rawEnergy = this.creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);//, {filter: (res)=>{res.resourceType == RESOURCE_ENERGY}});
      console.log("DROPED ENERGY: " + rawEnergy);

      var source = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (mEH) => mEH.structureType == STRUCTURE_CONTAINER && mEH.store[RESOURCE_ENERGY] > 500 && mEH.room.name == this.assignedRoom
      });

      if (source == undefined) {
        var source = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (mEH) => mEH.structureType == STRUCTURE_CONTAINER && mEH.store[RESOURCE_ENERGY] > 0 && mEH.room.name == this.assignedRoom
        });
      };

      console.log("ENERGY: " + source);
      console.log(this.creep.withdraw(source, RESOURCE_ENERGY, this.creep.carryCapacity - this.creep.energy));
      //console.log(creep.name + " cont source: " + source);

      if(source != undefined)
      {
      if (this.creep.withdraw(source, RESOURCE_ENERGY, this.creep.carryCapacity - this.creep.energy) == ERR_NOT_IN_RANGE) {
        this.creep.moveTo(source, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
    }
    else if(rawEnergy != undefined){
      console.log("raw ENERGY")
      console.log(this.creep.pickup(rawEnergy))
      if (this.creep.pickup(rawEnergy) == ERR_NOT_IN_RANGE) {
        this.creep.moveTo(rawEnergy, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
    }
    }
  }
}


module.exports = myBuilder;
