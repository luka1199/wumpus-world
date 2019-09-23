class Wumpus {
    constructor(pos, world) {
        this.position = pos;
        this.world = world;
    }

    isVisible() {
        return this.world.roomIsVisible(this.position.x, this.position.y);
    }

    display() {
        image(wumpus_image, this.position.x * this.world.roomSize, this.position.y * this.world.roomSize, this.world.roomSize, this.world.roomSize);
    }
}