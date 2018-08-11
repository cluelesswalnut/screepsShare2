var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleTower = require('role.tower');
// var roomFarmer =  require('object.roomFarmer');
require('role.claimer')();
var HarvesterCreep = require('class.HarvesterCreep')
var BuilderCreep = require('class.BuilderCreep')
var RoomBuilderCreep = require('class.RoomBuilderCreep')
var UpgraderCreep = require('class.UpgraderCreep')
var MinerCreep = require('class.MinerCreep')
var ClaimerCreep = require('class.ClaimerCreep')
var MyRoom = require('class.MyRoom')

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

  var spawn = Game.spawns['Spawn1'];
  if (spawn.hits <= 4000) {
    spawn.room.controller.activateSafeMode();
  }

try{
// var myHarv = new HarvesterCreep('h1', Game.spawns.Spawn1.room, [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]);
// myHarv.harvest();
}
catch(error){
  console.log("fail");
}
  // try{
    // roomFarmer.locateSources(Memory.testObj);
    //  var testObj = new roomFarmer('E56S49', Game.spawns.Spawn1.room);
    // testObj.locateSources();
    // testObj.operateMiner();
    // testObj.operateHauler();
    // testObj.reserveRoom();
  // }
  // catch(error)
  // {
  //   console.log("crash");
  // }
  //
  // try{
  //   // roomFarmer.locateSources(Memory.testObj);
  //    var testObj2 = new roomFarmer('E55S49', Game.spawns.Spawn1.room);
  //   testObj2.locateSources();
  //   testObj2.operateMiner();
  //   testObj2.operateHauler();
  //   testObj2.reserveRoom();
  //   // console.log("csout: " + testObj2.scout);
  // }
  // catch(error)
  // {
  //   console.log("crash room 2");
  // }


// test room Object
var myRoom2 = new MyRoom('E52S41');
myRoom2.operate()

var myRoom = new MyRoom('E52S43');
myRoom.operate()


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

}
