var roleUpgrader = require('role.upgrader');
var BaseCreep = require('class.BaseCreep')
var mySource = require('object.source');
require('role.testContiainerGrab')();

class DesignatedUpgraderCreep extends BaseCreep {
  constructor(name, homeRoom, body, respawn) {
    super(name, homeRoom, body, respawn);
  }

  work() {
    if(!this.exists())
      return;
    // this is the miner comment, but it applies to the designated upgrader too
    // respawn a new miner so it will be at the source when the old one dies...
    // this seems hard because it has to have a different name than the original miner, Idk how to handle this yet.
    // base this on the distance to the source or something
    if(this.creep.ticksToLive < 60){

    }

      let controller = this.creep.room.controller;
      // move to the source
      let contollerInRange = this.creep.pos.getRangeTo(controller) <= 3;
      if (!contollerInRange) {
        this.creep.moveTo(controller, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
        return;
      }

      // check for a container. Move there, or create one of none exists
      let gameContainers = controller.pos.findInRange(FIND_STRUCTURES, 3, {
        filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
      });
      let containerConstructionSites = controller.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 3, {
        filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
      });
      let gameContainerObjects = gameContainers.concat(containerConstructionSites);

      if (gameContainerObjects.length > 0) {
        this.creep.moveTo(gameContainerObjects[0]);
      } else {
        this.creep.room.createConstructionSite(this.creep.pos, STRUCTURE_CONTAINER);
      }

      // if the creep is on the container take care of the link
      if(gameContainerObjects.length > 0 && this.creep.pos.isEqualTo(gameContainerObjects[0])){
        var gameLinks = controller.pos.findInRange(FIND_STRUCTURES, 4, {
          filter: (struct) => struct.structureType == STRUCTURE_LINK
        });
        var linkConstructionSites = controller.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 4, {
          filter: (struct) => struct.structureType == STRUCTURE_LINK
        });
        let gameLinkObjects = gameLinks.concat(linkConstructionSites);
        if (gameLinkObjects.length <= 0) {
          let xpos = this.creep.pos.x;
          let ypos = this.creep.pos.y;
          let room = this.creep.room.name;
          let result = ERR_INVALID_TARGET;
          var count = 0;
          while(result != OK && count < 10){
            count++;
            console.log('count ' + count)
            // console.log('22')
            let xInc = Math.floor(Math.random() * Math.floor(2)) - 1;
            let yInc = Math.floor(Math.random() * Math.floor(2)) - 1;
            result = this.creep.room.createConstructionSite(new RoomPosition(xpos + xInc, ypos + yInc, room), STRUCTURE_LINK);
          }
        }

      }

      if(gameLinks != undefined && gameLinks.length <= 0 || gameContainers.length <= 0){
        return;
      }

      var gameLink = gameLinks[0];
      var gameContainer = gameContainers[0];
      // if(gameLink.energy > 0 && gameContainer.store[RESOURCE_ENERGY] < gameContainer.storeCapacity - this.creep.carryCapacity){
      //   console.log('1')
      //   this.creep.withdraw(gameLink, RESOURCE_ENERGY, this.creep.carryCapacity - this.creep.carry);
      //   console.log(this.creep.upgradeController(controller));
      //   this.creep.transfer(gameContainer, RESOURCE_ENERGY);
      // }
      // else{
        // console.log('2')
        // console.log(this.creep.withdraw(gameLink, RESOURCE_ENERGY));
        this.creep.upgradeController(controller);
        this.creep.withdraw(gameLink, RESOURCE_ENERGY);
      // }

      // Add code to repair and container
      // this.creep.repair(gameContainers[0]);

  }

}

module.exports = DesignatedUpgraderCreep;
