module.exports = {
  operateTower: function(room)
  {
    var hostileCreeps = room.find(FIND_HOSTILE_CREEPS);

     // console.log(hostileCreeps[0].owner.username);
    var tower = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER }})[0];

    // tower.attack(hostileCreeps[0]);
    for(c in hostileCreeps)
    {
      if(hostileCreeps[c].owner.username != 'LightLemmonDrop')
      {
        tower.attack(hostileCreeps[c]);
      }
    }
  }
}
