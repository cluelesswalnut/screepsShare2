var BaseCreep = require('class.BaseCreep')
require('role.testContiainerGrab')();

class ClaimerCreep extends BaseCreep{
	constructor(name, homeRoom, targetRoom, body, respawn){
		super(name, homeRoom, body, respawn);
    this.targetRoom = targetRoom;
	}

	work(){
    // check if the creep exists
    if(!this.exists())
      return

      if (this.goToRoom(this.targetRoom)) {
        var controller = this.creep.room.controller;
        this.creep.moveTo(controller);
        this.creep.claimController(controller);
      }
}
}

module.exports =  ClaimerCreep;
