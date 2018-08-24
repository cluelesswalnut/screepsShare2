var HarvesterCreep = require('class.HarvesterCreep')
var BuilderCreep = require('class.BuilderCreep')
var RoomBuilderCreep = require('class.RoomBuilderCreep')
var UpgraderCreep = require('class.UpgraderCreep')
var MinerCreep = require('class.MinerCreep')
var ClaimerCreep = require('class.ClaimerCreep')
var DesignatedUpgraderCreep = require('class.DesignatedUpgraderCreep')
var roleTower = require('role.tower');


// add a tracker for how much energy is being processed


// class to represent a room
class MyRoom {
  constructor(name, sources) {
    this.name = name;
    this.room = Game.rooms[name];
    if (sources == undefined) {
      this.sources = MinerCreep.findSources(this.room);
    }
    this.spawn = this.room.find(FIND_MY_SPAWNS)[0];

    // implement this to find all of the structures of note in the room
    // var gameLinks = controller.pos.findInRange(FIND_STRUCTURES, 4, {
    //   filter: (struct) => struct.structureType == STRUCTURE_LINK
    // });
    // var linkConstructionSites = controller.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 4, {
    //   filter: (struct) => struct.structureType == STRUCTURE_LINK
    // });
    // this.findRoomObjects();

    this.locateAvaliableEnergy();

    this.adjustCreepCount();

    this.linkEnergyTransfer();
  }

  operate() {
    // if spawn gets damaged activate safe mode
    if (this.spawn.hits <= 4000) {
      this.spawn.room.controller.activateSafeMode();
    }

    // if there are less than 3 creeps spawn a small harvester to get the room up and running again
    let numCreeps = this.countCreeps();
    if (numCreeps <= 3) {
      var myCreep = new HarvesterCreep('h0-' + this.name, this.room, [WORK, MOVE, CARRY]);
      myCreep.work();
    }


    this.runCreeps();

    this.annotateSpawner();

    roleTower.operateTower(this.room);

    this.countEnergyUsed();
  }

  countEnergyUsed() {
    // initialize counters
    if (this.room.memory.energyUpgraded == undefined) {
      this.room.memory.energyUpgraded = 0;
      this.room.memory.ticks = 0;
    }

    // find how much the upgrader progess has increased since last tick
    let progress = this.room.controller.progress;
    let increaseThisTick = progress - this.room.memory.progressLastTick;

    // if the increase was non-negative, increment the increase
    if (increaseThisTick >= 0) {
      this.room.memory.energyUpgraded += increaseThisTick;
      this.room.memory.ticks++;

    }
    //set the progress for the last tick
    this.room.memory.progressLastTick = progress;

    // every day rest the progress of the rooms at the same time
    if (Game.time % 28800 == 0) {
      this.room.memory.progressAtLastDay = progress;
    }

    // initialize counters for spawn energy spent
    if (this.room.memory.energySpent == undefined) {
      this.room.memory.energySpent = 0;
    }

    // find how much energy was spent this tick
    let energyInSpawn = this.room.energyAvailable;
    let energySpent = this.room.memory.energyInSpawnLastTick - energyInSpawn;

    // increment the count of energy spent
    if (energySpent > 0) {
      this.room.memory.energySpent += energySpent + 1;
    }
    //set the energy held for the current tick
    this.room.memory.energyInSpawnLastTick = energyInSpawn;

  }

  // find what body parts creeps should have
  findCreepSpecs() {
    let bodySet = [WORK, MOVE, CARRY];
    let bodySetCost = 200;
    let bodyPartSets = Math.floor(this.room.energyCapacityAvailable / bodySetCost);
    var balanceBody = [];
    for (let i = 0; i < bodyPartSets; ++i) {
      balanceBody = balanceBody.concat(bodySet);
    }
    let bodySetsNeeded = 12;

    // find how many of each creep is needed based on the body size
    var maxHarvesters = Math.min(8, 12 / bodyPartSets) + Memory[this.name + 'ExtraUpgraders'];
    var maxUpgraders = this.DesignatedUpgrader ? 0 : Math.min(8, 12 / bodyPartSets);
    let constructionSites = this.room.find(FIND_MY_CONSTRUCTION_SITES);
    var maxBuilders = constructionSites.length > 0 ? Math.min(8, 12 / bodyPartSets) : 1;
    var maxMiners = this.room.energyCapacityAvailable >= 550 ? this.sources.length : 0;
    var maxDesignatedUpgraderCreep = 1;
    var maxClaimers = 0;

    return {
      balanceBody: balanceBody,
      maxHarvesters: maxHarvesters,
      maxUpgraders: maxUpgraders,
      maxBuilders: maxBuilders,
      maxMiners: maxMiners,
      maxClaimers: maxClaimers
    }
  }

  // spawn and operate creeps
  runCreeps() {
    let specs = this.findCreepSpecs();
    var miners = _.filter(Game.creeps, (creep) => creep.name.substr(creep.name.length - 6) == this.name && creep.name[0] == 'm');
    // dont spawn other creeps untill enough miners are produced
    if (miners.length < specs.maxMiners){
      var spawn = false;
    }

    // if only level 2 controller miner cant have a carry or extra move parts
    let minerBody = this.room.energyCapacityAvailable >= 700 ? [MOVE,  MOVE, MOVE, CARRY, WORK, WORK, WORK, WORK, WORK] : [MOVE, WORK, WORK, WORK, WORK, WORK];
    let sources = MinerCreep.findSources(this.room);
    for (let i = 0; i < specs.maxMiners; ++i) {
      var myCreep = new MinerCreep('m' + i + '-' + this.name, this.room, minerBody, sources[i]);
      myCreep.work();
    }

    for (let i = 0; i < specs.maxUpgraders; ++i) {
      var myCreep = new UpgraderCreep('u' + i + '-' + this.name, this.room, specs.balanceBody, spawn);
      myCreep.work();
    }

    for (let i = 0; i < specs.maxBuilders; ++i) {
      var myCreep = new BuilderCreep('b' + i + '-' + this.name, this.room, specs.balanceBody, spawn);
      myCreep.work();
    }

    for (let i = 0; i < specs.maxHarvesters; ++i) {
      //
      let uniqueParts = [WORK, MOVE];
      let baseParts = [CARRY, CARRY, MOVE];
      let maxBaseParts = 10;
      let body = this.calculateBody(uniqueParts, baseParts, maxBaseParts);
      if (this.DesignatedUpgrader) {
        var myCreep = new HarvesterCreep('h' + i + '-' + this.name, this.room, body, spawn);
      } else {
        var myCreep = new HarvesterCreep('h' + i + '-' + this.name, this.room, specs.balanceBody, spawn);
      }
      myCreep.work();
    }

    if (this.DesignatedUpgrader == true) {
      let uniqueParts = [CARRY];
      let baseParts = [WORK, WORK, MOVE];
      let maxBaseParts = 7;
      let body = this.calculateBody(uniqueParts, baseParts, maxBaseParts);
      for (let i = 0; i < 1; ++i) {
        var myCreep = new DesignatedUpgraderCreep('d' + i + '-' + this.name, this.room, body, spawn);
        myCreep.work();
      }
    }
  }

  calculateBody(uniqueParts, baseParts, maxBaseParts){
    let baseCost = 0;
    baseParts.forEach(part => baseCost += BODYPART_COST[part]);
    let uniqueCost = 0;
    uniqueParts.forEach(part => baseCost += BODYPART_COST[part]);

    let parts = Math.floor(this.room.energyCapacityAvailable - uniqueCost / baseCost);
    let body = uniqueParts;
    for (let i = 0; i < parts && i < maxBaseParts; ++i) {
      body = body.concat(baseParts);
    }
    return body;
  }

  countCreeps() {
    // count # of each type of creep
    var harvesters = _.filter(Game.creeps, (creep) => creep.name.substr(creep.name.length - 6) == this.name && creep.name[0] == 'h');
    var upgraders = _.filter(Game.creeps, (creep) => creep.name.substr(creep.name.length - 6) == this.name && creep.name[0] == 'u');
    var builders = _.filter(Game.creeps, (creep) => creep.name.substr(creep.name.length - 6) == this.name && creep.name[0] == 'b');
    var miners = _.filter(Game.creeps, (creep) => creep.name.substr(creep.name.length - 6) == this.name && creep.name[0] == 'm');
    var fighter = _.filter(Game.creeps, (creep) => creep.memory.role == 'figher');
    var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    let EPT = this.room.memory.energyUpgraded / this.room.memory.ticks;
    console.log(this.name + ' EPT: ' + EPT + ': Harvesters: ' + harvesters.length + '; Upgraders: ' + upgraders.length + '; Builders: ' + builders.length + '; Miners: ' + miners.length + '; Claimers: ' + claimer.length);
    return harvesters.length + upgraders.length + builders.length + miners.length;
  }

  annotateSpawner() {
    if (this.spawn.spawning) {
      var spawningCreep = Game.creeps[this.spawn.spawning.name];
      this.spawn.room.visual.text(
        'spawning: ' + spawningCreep.name + ' ' + spawningCreep.memory.role,
        this.spawn.pos.x + 1,
        this.spawn.pos.y, {
          align: 'left',
          opacity: 0.8
        });
    };
  }

  // private find the energy sources avaliable in the rooms
  locateAvaliableEnergy() {
    // raw energy
    let rawEnergy = {};
    this.room.find(FIND_DROPPED_RESOURCES, {
      filter: (drop) => drop.resourceType == RESOURCE_ENERGY
    }).forEach(drop => rawEnergy[drop.id] = drop.amount);
    // tombstones
    let tombstones = {};
    this.room.find(FIND_TOMBSTONES, {
      filter: (stone) => stone.store[RESOURCE_ENERGY] > 0
    }).forEach(stone => tombstones[stone.id] = stone.store[RESOURCE_ENERGY]);
    // containers
    let containers = {};
    this.room.find(FIND_STRUCTURES, {
      filter: (container) => container.structureType == STRUCTURE_CONTAINER && container.store[RESOURCE_ENERGY] > 0 && !container.pos.inRangeTo(this.room.controller, 4)
    }).forEach(container => containers[container.id] = container.store[RESOURCE_ENERGY]);
    // links
    let links = {};
    this.room.find(FIND_MY_STRUCTURES, {
      filter: (link) => link.structureType == STRUCTURE_LINK && link.energy > 0
    }).forEach(link => links[link.id] = link.energy);

    // save the avaliable energy to memory
    let energyObject = {
      rawEnergy: rawEnergy,
      tombstones: tombstones,
      containers: containers,
      links: links
    }

    // store in the room's Memory
    this.room.memory.energyObject = energyObject;

  }

  // calculate how many extra creeps are needed to process excess energy
  adjustCreepCount() {
    // use more creeps if the containers in the room are full. Meaning enough energy isnt being used
    if (Memory[this.name + 'ExtraUpgraders'] == undefined) {
      Memory[this.name + 'ExtraUpgraders'] = 0;
    }

    // Every X ticks check if containers are full. If they are more creeps are needed
    if (Game.time % 500 == 0) {
      let fullContainers = this.room.find(FIND_STRUCTURES, {
        filter: (mEH) => mEH.structureType == STRUCTURE_CONTAINER && mEH.store[RESOURCE_ENERGY] == mEH.storeCapacity
      });
      let emptyContainers = this.room.find(FIND_STRUCTURES, {
        filter: (mEH) => mEH.structureType == STRUCTURE_CONTAINER && mEH.store[RESOURCE_ENERGY] < 500
      });
      fullContainers.forEach(() => {
        Memory[this.name + 'ExtraUpgraders']++;
      })
      if (Memory[this.name + 'ExtraUpgraders'] > 2) {
        Memory[this.name + 'ExtraUpgraders'] = 2;
      }
      if (fullContainers.length == 0 && emptyContainers.length > 0) {
        Memory[this.name + 'ExtraUpgraders']--;
      }
      if (Memory[this.name + 'ExtraUpgraders'] < 0) {
        Memory[this.name + 'ExtraUpgraders'] = 0;
      }
    }

    if (Game.time % 28800 == 0) {
      Memory[this.name + 'ExtraUpgraders'] = 0;
    }
  }

  // transfer energy from the link by the storage to the link by the controller
  linkEnergyTransfer() {
    var controllerLink = this.room.controller.pos.findInRange(FIND_STRUCTURES, 4, {
      filter: (struct) => struct.structureType == STRUCTURE_LINK
    })[0];

    let storage = this.room.storage;
    if (storage != undefined) {
      var spawnLink = this.room.storage.pos.findInRange(FIND_STRUCTURES, 4, {
        filter: (struct) => struct.structureType == STRUCTURE_LINK
      })[0];

      if (spawnLink != undefined && controllerLink != undefined) {
        // if(this.room.name != 'E53S44'){
        this.DesignatedUpgrader = true;
        // }
        if (spawnLink.energy == spawnLink.energyCapacity && controllerLink.energy < 50) {
          console.log(spawnLink)
          console.log(controllerLink)
          spawnLink.transferEnergy(controllerLink);
        }
      }
    }
  }
}

module.exports = MyRoom;
