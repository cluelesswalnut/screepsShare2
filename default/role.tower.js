module.exports = {
  operateTower: function(room)
  {
    var hostileCreeps = room.find(FIND_HOSTILE_CREEPS);

     // console.log(hostileCreeps[0].owner.username);
    var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER }});

    // tower.attack(hostileCreeps[0]);
    for(c in hostileCreeps)
    {
      if(hostileCreeps[c].owner.username != 'LightLemmonDrop')
      {
        towers.forEach(tower => tower.attack(hostileCreeps[c]));
      }
    }

    var myHurtCreeps = room.find(FIND_MY_CREEPS, {
        filter: function(hurtedCreep) {
          return hurtedCreep.hits < hurtedCreep.hitsMax;
        }
      });
      if(myHurtCreeps.length > 0) {
        towers.forEach(tower => tower.heal(myHurtCreeps[0]));
      }

  }
}
