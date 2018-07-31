class myMiner {
  constructor(creep, source) {
    this.creep = creep;
    this.source = source;
  }

  mineSource() {
    if (this.creep.harvest(this.source) == ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.source, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
    } else if (this.creep.harvest(this.source) == OK) {
      var closeContainers = this.creep.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
      });
      var closeConstructionSites = this.creep.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 1, {
        filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
      });
      if (closeContainers.length == 0 && closeConstructionSites.length == 0) {
        this.creep.room.createConstructionSite(this.creep.pos, STRUCTURE_CONTAINER);
      } else if (closeContainers.legnth > 0) {
        this.creep.moveTo(closeContainers[0].pos);
      }

    }

  }
}


module.exports = myMiner;
