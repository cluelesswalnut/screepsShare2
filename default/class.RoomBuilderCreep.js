var BuilderCreep = require('class.BuilderCreep')
require('role.testContiainerGrab')();

class RoomBuilderCreep extends BuilderCreep{
	constructor(name, homeRoom, targetRoom, body, respawn){
		super(name, homeRoom, body, respawn);
    this.targetRoom = targetRoom;
	}

  buildRoom(){
    if(!this.exists())
      return;

    if(this.goToRoom(this.targetRoom)){
      this.work();
    }
  }

}

module.exports =  RoomBuilderCreep;
