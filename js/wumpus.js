class Wumpus {
    constructor(pos, world) {
        this.position = pos;
        this.world = world;
    }

    display() {
        if (this.world.roomIsVisible(this.position.x, this.position.y)) {
            image(wumpus_image, this.position.x * this.world.roomSize, this.position.y * this.world.roomSize, this.world.roomSize, this.world.roomSize);
        }
    }
}