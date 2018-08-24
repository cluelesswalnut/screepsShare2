var roleUpgrader = require('role.upgrader');
var BaseCreep = require('class.BaseCreep')
var mySource = require('object.source');
require('role.testContiainerGrab')();

class DesignatedUpgraderCreep extends BaseCreep {
  constructor(name, homeRoom, body, respawn) {
    super(name, homeRoom, body, respawn);

    // example of creating new name
    // let n = 'b0-E52S43-1';
    // let dashIndex = n.substring(4, n.length).search('-');
    // console.log(dashIndex)
    // var test = n.substring(0, dashIndex + 4 + 1 ) + (Number(n.substring(dashIndex + 4 + 1, n.length)) + 1);
    // console.log(test);

    // this is the miner comment, but it applies to the designated upgrader too
    // respawn a new miner so it will be at the source when the old one dies...
    // this seems hard because it has to have a different name than the original miner, Idk how to handle this yet.
    // base this on the distance to the source or something
    // if (this.creep.ticksToLive < 60 && false) {
    //   // Checkout javascripts match() function. Let's use that in combination with a regex. In this example, the regular expression is /d/gi. This means we are looking for occurrences of the letter "d". The "g" is a regex modifier. It means "global". So look for all occurrences of the letter "d". Without the "global" modifier, the regex would just stop on the first "d". The i is another regex modifier. It means "case insensitive".
    //   let num_matches = name.match(/-/gi).length;
    //   if(num_matches == 1){
    //     var newName = name + '-1';
    //   }
    //   else{
    //     let dashIndex = name.substring(4, name.length).search('-');
    //     var newName = name.substring(0, dashIndex + 4 + 1 ) + (Number(name.substring(dashIndex + 4 + 1, name.length)) + 1);
    //   }
    //   if(this.creep.name.length == )
    //   let newCreep = new DesignatedUpgraderCreep(name, homeRoom, body, respawn);
    // }
  }

  work() {
    if (!this.exists())
      return;

    // return untill creep is at controller
    if (!this.moveToController()) {
      return;
    };

    let controller = this.creep.room.controller;
    var gameLinks = controller.pos.findInRange(FIND_STRUCTURES, 4, {
      filter: (struct) => struct.structureType == STRUCTURE_LINK
    });
    var linkConstructionSites = controller.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 4, {
      filter: (struct) => struct.structureType == STRUCTURE_LINK
    });
    let gameLinkObjects = gameLinks.concat(linkConstructionSites);

    if (gameLinkObjects.length > 0) {
      this.creep.moveTo(gameLinkObjects[0]);
    } else {
      this.creep.room.createConstructionSite(this.creep.pos, STRUCTURE_LINK);
    }

    if (gameLinks == undefined || gameLinks.length <= 0) {
      return;
    }

    if (gameLinks != undefined && gameLinks.length > 0) {
      var gameLink = gameLinks[0];

      this.creep.upgradeController(controller);
      this.creep.withdraw(gameLink, RESOURCE_ENERGY);
    }

  }

  moveToController() {
    let controller = this.creep.room.controller;
    // move to the source
    let contollerInRange = this.creep.pos.getRangeTo(controller) <= 3;
    if (!contollerInRange) {
      this.creep.moveTo(controller, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
      return false;
    }
    return true;
  }

}

module.exports = DesignatedUpgraderCreep;
