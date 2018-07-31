var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleTower = require('role.tower');
var roomFarmer =  require('object.roomFarmer');
require('role.claimer')();

// module.exports = {
//   myFunc: () => { //stuff  },
//   myFunc2: (param) => { //other stuff }
// }(edited)
// const myModule = require(myfile);

// import 'object.roomFarmer';
if (Memory.lifeCount == undefined){
  var units = ['harvester', 'upgrader', 'builder', 'miner'];
  Memory.lifeCount = {};
  for(var unit in units)
  {
    Memory.lifeCount[units[unit]] = 1;
  }
}

// var calc = new testObj(3,4);
//
// console.log("addition of operands is: " + calc.add());
// console.log("subtraction of operands is: " + calc.subtract());
// console.log("multiplication of operands is: " + calc.multiply());
// console.log("quotient on dividing operands is: "  + calc.divide());
// console.log("remainder on dividing operands is: " + calc.remainder());



// if(Memory.testObj == undefined)
// {
  // Memory.testObj = new roomFarmer('E57S49', Game.spawns.Spawn1.room);
// }

module.exports.loop = function() {

// roomFarmer.locateSources(Memory.testObj);
//  var testObj = new roomFarmer('E56S49', Game.spawns.Spawn1.room);
// testObj.locateSources();
// testObj.operateMiner();
// console.log("csout: " + testObj.scout);

var hostileCreeps = Game.spawns.Spawn1.room.find(FIND_HOSTILE_CREEPS, {filter: (c) => c.owner.username != 'LightLemmonDrop' && c.owner.username != 'LoveL'});
// console.log(hostileCreeps.length);
if (hostileCreeps.length != 0) {
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role === 'upgrader' || creep.memory.role === 'builder') {
      creep.memory.role = 'harvester';
    }
  }
}

  // testObj.person('testName');
  roleTower.operateTower(Game.spawns.Spawn1.room);
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  console.log('Harvesters: ' + harvesters.length);
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  console.log('Upgraders: ' + upgraders.length);
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  console.log('builders: ' + builders.length);
  var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
  console.log('miner: ' + miners.length);
  var fighter = _.filter(Game.creeps, (creep) => creep.memory.role == 'figher');
  console.log('figher: ' + fighter.length);
  var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
  console.log('claimer: ' + claimer.length);


  var maxHarvesters = 5;
  var maxUpgraders = 7;
  var maxBuilders = 3;
  var maxMiners = 2;
  var maxClaimers = 0;

  if (miners.length < maxMiners) {
    var newName = 'M' + Memory.lifeCount['miner'];
    console.log('Spawning new miner: ' + newName);
    if (Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, WORK, WORK, WORK], newName, {
        memory: {
          role: 'miner'
        }
      }) == OK) {
      Memory.lifeCount['miner']++;
    }
    else{

    }
  }
  else if (harvesters.length < maxHarvesters) {
    var newName = 'H' + Memory.lifeCount['harvester'];
    console.log('Spawning new harvester: ' + newName);
    if (Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {
        memory: {
          role: 'harvester'
        }
      }) == OK) {
      Memory.lifeCount['harvester']++;
    }
  }
  else if (builders.length < maxBuilders) {
    var newName = 'B' + Memory.lifeCount['builder'];
    console.log('Spawning new builder: ' + newName);
    if (Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {
        memory: {
          role: 'builder'
        }
      }) == OK) {
      Memory.lifeCount['builder']++;
    }
  }
  else if (upgraders.length < maxUpgraders) {
    var newName = 'U' + Memory.lifeCount['upgrader'];
    console.log('Spawning new upgraders: ' + newName);
    if (Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {
        memory: {
          role: 'upgrader'
        }
      }) == OK) {
      Memory.lifeCount['upgrader']++;
    }
  }
  else if (claimer.length < maxClaimers) {
    var newName = 'U' + Memory.lifeCount['claimer'];
    console.log('Spawning new claimer: ' + newName);
    if (Game.spawns['Spawn1'].spawnCreep([CLAIM, MOVE, MOVE, MOVE, MOVE], newName, {
        memory: {
          role: 'claimer'
        }
      }) == OK) {
      Memory.lifeCount['claimer']++;
    }
  }



  if (Game.spawns['Spawn1'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
      'spawning: ' + spawningCreep.memory.role,
      Game.spawns['Spawn1'].pos.x + 1,
      Game.spawns['Spawn1'].pos.y, {
        align: 'left',
        opacity: 0.8
      });
  };

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    // var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    // if(creep.memory.role == 'builder')
    // {
    //   if(harvesters.length > 3){
    //     console.log("here");
    //     creep.memory.role = 'upgrader';
    //   }
    // }

    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    else if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    else if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
    else if(creep.memory.role == 'miner')
    {
      roleMiner.run(creep);
    }
    else if(creep.memory.role == 'claimer')
    {
      doClaiming(creep, 'E58S49');
    }

  };
}
