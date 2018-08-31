var functions = {
  print: function(text){
    console.log(text);
  },

  recycleCreeps(){
    for(var name in Game.creeps) {
       var creep = Game.creeps[name];
       if(creep.memory.inUse != Game.time)
       {
         functions.print('NOT IN USE: ' + creep)
         let spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
         if(spawn == undefined){
           spawn = Game.spawns.Spawn1;
         }
         creep.moveTo(spawn);
         spawn.recycleCreep(creep);
       }
     }
  }

}

module.exports = functions;
