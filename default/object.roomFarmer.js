class roomFarmer{
	constructor(room, controlRoom) {
		this.room = room;
    this.controlRoom = controlRoom;
	}
	add(){
		return this.x + this.y;
	}
	subtract(){
		return this.x - this.y;
	}
	multiply(){
		return this.x * this.y;
	}
	divide(){
		return this.x / this.y
	}
	remainder(){
		return this.x % this.y
	}
}

module.exports = Ganit
