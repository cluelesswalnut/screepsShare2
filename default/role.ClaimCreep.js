import BaseCreep from 'role.BaseCreep';

class ClaimCreep extends BaseCreep{
  constructor(name, homeRoom, bodyParts, roomToClaim){
    super(name, homeRoom, bodyParts);
    this.roomToClaim = roomToClaim;
  }

  claimRoom(){
    let isInRoom = this.creep.moveTo(this.roomToClaim);
    if(isInRoom){
      
    }
  }

}
