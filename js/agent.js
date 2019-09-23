class Agent {
    constructor(pos, world) {
        this.position = pos;
        this.direction = 1;
        this.world = world;
        this.alive = true;
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
        if (this.alive) {
            image(img, this.position.x * this.world.roomSize, this.position.y * this.world.roomSize, this.world.roomSize, this.world.roomSize);
        }
    }

    up() {
        if (this.direction != 3) {
            this.direction = 3;
        } else if (this.position.y > 0) {
            this.position.y--;
            this.world.showRoom(this.position.x, this.position.y);
        }
        this.checkCurrentRoom();
    }

    down() {
        if (this.direction != 1) {
            this.direction = 1;
        } else if (this.position.y < this.world.roomsPerRow - 1) {
            this.position.y++;
            this.world.showRoom(this.position.x, this.position.y);
        }
        this.checkCurrentRoom();
    }

    left() {
        if (this.direction != 2) {
            this.direction = 2;
        } else if (this.position.x > 0) {
            this.position.x--;
            this.world.showRoom(this.position.x, this.position.y);
        }
        this.checkCurrentRoom();
    }

    right() {
        if (this.direction != 0) {
            this.direction = 0;
        } else if (this.position.x < this.world.roomsPerRow - 1) {
            this.position.x++;
            this.world.showRoom(this.position.x, this.position.y);
        }
        this.checkCurrentRoom();
    }

    checkCurrentRoom() {
        if (this.world.getRoom(this.position.x, this.position.y).containsWumpus() || this.world.getRoom(this.position.x, this.position.y).containsPit()) {
            this.world.showAllRooms();
            this.alive = false;
        }
    }

}