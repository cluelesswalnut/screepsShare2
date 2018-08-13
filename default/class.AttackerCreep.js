var BaseCreep = require('class.BaseCreep')
require('role.testContiainerGrab')();

class AttackerCreep extends BaseCreep{
	constructor(name, homeRoom, targetRoom, body, respawn){
		super(name, homeRoom, body, respawn);
    this.targetRoom = targetRoom;
	}

	work(){
    // check if the creep exists
    if(!this.exists())
      return

      if (this.goToRoom(this.targetRoom)) {
        var target = this.creep.room.find(FIND_HOSTILE_STRUCTURES)[0];
        this.creep.moveTo(target);
        this.creep.attack(target);
      }
}
}

module.exports =  AttackerCreep;
