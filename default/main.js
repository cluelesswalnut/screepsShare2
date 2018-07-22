var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

// var units = ['harvester', 'upgrader', 'builder'];
// Memory.lifeCount = {};
// for(var unit in units)
// {
//   Memory.lifeCount[units[unit]] = 1;
// }

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

    var minHarvesters = 4;
    var minUpgraders = 5;

    if(harvesters.length < minHarvesters) {
        var newName = 'H' + Memory.lifeCount['harvester'];
        console.log('Spawning new harvester: ' + newName);
        if (Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,{memory: {role: 'harvester'}}) == OK)
        {
          Memory.lifeCount['harvester']++;
        }
    }

    if(upgraders.length < minUpgraders) {
        var newName = 'U' + Memory.lifeCount['upgrader'];
        //lifeCount['upgrader']++;
        console.log('Spawning new upgraders: ' + newName);
        if (Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}}) == OK)
            {
              Memory.lifeCount['upgrader']++;
            }
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            'spawning: ' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
