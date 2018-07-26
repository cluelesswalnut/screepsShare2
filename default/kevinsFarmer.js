module.exports = function(){

takeRoom = function(miners, helpers, helptrans, newroom, controlroom){


console.log("This is function");
var miner3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'TRminer');

if(miner3.length < miners){
	if(Memory.numminers == undefined){
		Memory.numminers = 1;
	}
	var namem = 'TRMiner'+Memory.numminers;
	Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,WORK,WORK,WORK], namem,  {
        memory: {
          role: 'TRminer'
        }});
	//Game.creeps.namem.memory.role = 'TRminer';
	Memory.numminers = Memory.numminers + 1;
}

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'TRminer'){
    	console.log(newroom);
    	moveMiner(creep, newroom);
    }
	}


var units = _.filter(Game.creeps, (creep) => creep.memory.role == 'helpminer');
console.log('units');
console.log(units);

if(units.length < helpers){
	console.log("need helpers");
	if(Memory.numhelpminers == undefined){
		Memory.numhelpminers = 1;
	}
	var namem = 'helpminer'+Memory.numhelpminers;
	console.log('namem');
	console.log(namem);
	Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,CARRY,WORK,MOVE], namem, {
        memory: {
          role: 'helpminer'
        }});
	//Game.creeps.namem.memory.role = 'helpminer';
	Memory.numhelpminers = Memory.numhelpminers + 1;
}
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'helpminer'){
    	moveUnits(creep, newroom);
    }
	}


	var trans = _.filter(Game.creeps, (creep) => creep.memory.role == 'helptrans');

if(trans.length < helptrans){
	console.log("need transhelpers");
	if(Memory.numtrans == undefined){
		Memory.numtrans = 1;
	}
	var namem = 'helptrans'+Memory.numtrans;
	console.log('namem');
	console.log(namem);
	Game.spawns['Spawn1'].spawnCreep([MOVE,CARRY,MOVE,MOVE,MOVE,CARRY,WORK,CARRY,WORK,WORK,MOVE,CARRY], namem, {
        memory: {
          role: 'helptrans',
          return: false
        }});
	//Game.creeps.namem.memory.role = 'helpminer';
	Memory.numtrans = Memory.numtrans + 1;
}
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'helptrans'){
    	moveHelpTrans(creep, newroom, controlroom);
    }
	}
//moveUnits(Game.creeps.helpminer1);


}

moveMiner = function(creep, newroom){
	console.log('Move miner');
	creep.say('M3');

	if(creep.room.name != newroom){
                                console.log('new room '+ newroom)

                    var posInAnotherRoom = new RoomPosition(27, 17, newroom);
                    creep.moveTo(posInAnotherRoom);
                    //creep.memory.next = 1;
        }else{
	let sources = creep.room.find(FIND_SOURCES);
    console.log(sources);

    var chosenSource;
    for(var s in sources)
    {
      var nearByMiners = sources[s].pos.findInRange(FIND_MY_CREEPS, 1,
      {filter: (c) => c.memory.role == 'TRminer' && c != creep});
      console.log(nearByMiners);

      if(nearByMiners.length == 0)
      {
        source = sources[s];
        break;
      }
    }
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
        }
}

moveUnits = function(creep, newroom){
	console.log('Move helper');
	creep.say('Help');


	if(creep.room.name != newroom){

                    var posInAnotherRoom = new RoomPosition(27, 17, newroom);
                    creep.moveTo(posInAnotherRoom);
                    //creep.memory.next = 1;
        }else {

            if (creep.carry.energy == 0) {
            	console.log('what the fuck');
                  var sources = creep.room.find(FIND_DROPPED_RESOURCES);
                  console.log(sources);
                    var max = 0;
					var index = 0
                  for(var item in sources){
                  	console.log(sources[item]);
                  	console.log(sources[item].amountnumber);

                  	if(sources[item].amountnumber > max){
                  		max = sources[item].amountnumber;
                  		index = item
                  	}
                  }
      //            var sources = creep.room.find(FIND_SOURCES);
                    var droppedEnergy = sources[index];
                    //var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                    console.log('droppedenergy');
                    console.log(droppedEnergy);
        if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(droppedEnergy)
        }
        /*else if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }*/
    }else{
    	creep.say('B');
        var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (constructionSite != undefined) {
          if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
            creep.moveTo(constructionSite, {
              visualizePathStyle: {
                stroke: '#ffaa00'
              }
            });
          }
        }else{
        	            creep.say('HR');
              var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        // the second argument for findClosestByPath is an object which takes
                        // a property called filter which can be a function
                        // we use the arrow operator to define it
                        filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                    });
                        // try to repair it, if it is out of range
                        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.moveTo(structure);
                        }
        }

    }


	}


}


moveHelpTrans = function(creep, newroom, controlroom){
	console.log('Move helper');
	creep.say('TH');
        //console.log('H2');

        //console.log(creep.memory.return);

        if(creep.memory.return == false){
            //console.log('H2 mem is false');

        if(creep.room.name != newroom){

                    var posInAnotherRoom = new RoomPosition(27, 17, newroom);
                    creep.moveTo(posInAnotherRoom);
                    //creep.memory.next = 1;
        }else {
            console.log('what the fuck');
            if (creep.carry.energy < creep.carryCapacity) {
            	console.log('energy?');
            	var sources = creep.room.find(FIND_DROPPED_RESOURCES);
                  console.log(sources);
                  var index = 0;
                  var max = 0;
                  for(var item in sources){
                  	console.log(sources[item]);
                  	console.log(sources[item].amountnumber);
                  	if(sources[item].amountnumber > max){
                  		max = sources[item].amountnumber;
                  		index = item
                  	}
                  }
      //            var sources = creep.room.find(FIND_SOURCES);
                    var droppedEnergy = sources[index];
        if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(droppedEnergy)
        }
        /*else if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }*/
    }else{
            //creep.memory.building = false;
            creep.memory.return = true;
    }

}
}

if(creep.memory.return == true){

    //console.log('H2 energy check');
    if(creep.carry.energy == 0){
            //console.log('H2 energy 0');

        creep.memory.return = false;
    }

            if(creep.room.name != controlroom){
                    //console.log("in room");


                    var posInAnotherRoom = new RoomPosition(33, 15, controlroom);
                    creep.moveTo(posInAnotherRoom);
        }else{

            if (creep.carry.energy > 0){
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
      }

    }

    }







  }


}




}

//module.exports = takeRoom;
