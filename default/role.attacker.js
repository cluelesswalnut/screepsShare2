module.exports = function(){

spawnAttackers = function(newroom, spawn, numberattackers){
console.log('in spawn attackers');

    var attacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'attackerlol');

if(attacker.length < numberattackers){
  console.log('trying to spawn shit');
  if(Memory.numattackers == undefined){
    Memory.numattackers = 1;
  }
  var namem = 'attackerlol'+Memory.numattackers;
  console.log('NAME M ATTACKERS: '+ namem);
  Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE], namem,  {
        memory: {
          role: 'attackerlol'
        }});
  //Game.creeps.namem.memory.role = 'TRminer';
  //if(namem)
  Memory.numattackers = Memory.numattackers + 1;
}


  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'attackerlol'){
      console.log(newroom);
      attackJacubyE(creep, newroom, spawn);
    }
  }
}

attackJacubyE = function(creep, newroom, spawn){

        if(creep.room.name != newroom){

                    var posInAnotherRoom = new RoomPosition(27, 17, newroom);
                    creep.moveTo(posInAnotherRoom);
                    //creep.memory.next = 1;
        }else {

          if(spawn == 1){

    //Game.spawns.Spawn1.createCreep([Game.ATTACK, Game.MOVE],'Attacker1');
//var attacker = Game.creeps.Attacker1;

if(creep.attack(creep.room.find(FIND_HOSTILE_SPAWNS)[0]) == ERR_NOT_IN_RANGE){
    creep.moveTo(creep.room.find(FIND_HOSTILE_SPAWNS)[0]);
}

//console.log(creep.attack(creep.room.find(FIND_HOSTILE_SPAWNS)[0]));
}else{
creep.owner.username != 'LightLemmonDrop'
var enemies= creep.room.find(Game.HOSTILE_CREEPS);
var enemies = creep.room.find(FIND_HOSTILE_CREEPS, {filter: (c) => c.owner.username != 'cluelesswalnut'});
creep.moveTo(enemies[0]);
creep.attack(enemies[0]);

}

}


}
}

//module.exports = takeRoom;
