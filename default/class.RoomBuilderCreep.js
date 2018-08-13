var BuilderCreep = require('class.BuilderCreep')
var MinerCreep = require('class.MinerCreep')
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
			//normal operation
      // this.work();

			// miner to help new room get started
			let room = Game.rooms['E53S44'];
			let sources = MinerCreep.findSources(room);
			let myMiner = new MinerCreep(this.name, this.homeRoom, this.body, sources[(Number(this.name[1]) - 2)], true)
			myMiner.creep.memory.role = 'm';
			myMiner.work();
    }
  }

}

module.exports =  RoomBuilderCreep;
