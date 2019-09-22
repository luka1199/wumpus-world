class Agent {
    constructor(pos, world) {
        this.position = pos;
        this.direction = 1;
        this.world = world;
        world.showRoom(0, 0);
    }

    display() {
        let img;
        switch (this.direction) {
            case 0:
                img = agent_right_image;
                break;
            case 1:
                img = agent_down_image;
                break;
            case 2:
                img = agent_left_image;
                break;
            case 3:
                img = agent_up_image;
                break;
        }
        image(img, this.position.x * this.world.roomSize, this.position.y * this.world.roomSize, this.world.roomSize, this.world.roomSize);
    }

    up() {
        if (this.direction != 3) {
            this.direction = 3;
        } else if (this.position.y > 0) {
            this.position.y--;
            world.showRoom(this.position.x, this.position.y);
        }
    }

    down() {
        if (this.direction != 1) {
            this.direction = 1;
        } else if (this.position.y < world.roomsPerRow - 1) {
            this.position.y++;
            world.showRoom(this.position.x, this.position.y);
        }
    }

    left() {
        if (this.direction != 2) {
            this.direction = 2;
        } else if (this.position.x > 0) {
            this.position.x--;
            world.showRoom(this.position.x, this.position.y);
        }
    }

    right() {
        if (this.direction != 0) {
            this.direction = 0;
        } else if (this.position.x < world.roomsPerRow - 1) {
            this.position.x++;
            world.showRoom(this.position.x, this.position.y);
        }
    }
}