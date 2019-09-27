class Pit {
    constructor(pos, world) {
        this.position = pos;
        this.world = world;
    }

    isVisible() {
        return this.world.roomIsVisible(this.position.x, this.position.y);
    }

    display() {
        image(pit_image, this.position.x * this.world.roomSize, this.position.y * this.world.roomSize, this.world.roomSize, this.world.roomSize);
        noFill();
        square(this.position.x * this.world.roomSize, this.position.y * this.world.roomSize, this.world.roomSize);
    }
}