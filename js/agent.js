class Agent {
    constructor(pos, world) {
        this.position = pos;
        // 0: right, 1: down, 2: left, 3: up
        this.direction = 1;
        this.world = world;
        this.alive = true;
        this.hasArrow = false;
        world.showRoom(pos.x, pos.y);
        world.showRoom(pos.x - 1, pos.y);
        world.showRoom(pos.x, pos.y - 1);
        world.showRoom(pos.x + 1, pos.y);
        world.showRoom(pos.x, pos.y + 1);
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
            if (this.hasArrow) {
                image(arrow_overlay_image, this.position.x * this.world.roomSize, this.position.y * this.world.roomSize, this.world.roomSize, this.world.roomSize);
            }
        }
    }

    getCurrentRoom() {
        return this.world.getRoom(this.position.x, this.position.y);
    }

    up() {
        if (this.alive && this.world.wumpus.alive) {
            if (this.direction != 3) {
                this.direction = 3;
            } else if (this.position.y > 0) {
                this.position.y--;
                this.world.showRoom(this.position.x, this.position.y);
            }
            this.checkCurrentRoom();
        }
    }

    down() {
        if (this.alive && this.world.wumpus.alive) {
            if (this.direction != 1) {
                this.direction = 1;
            } else if (this.position.y < this.world.roomsPerRow - 1) {
                this.position.y++;
                this.world.showRoom(this.position.x, this.position.y);
            }
            this.checkCurrentRoom();
        }
    }

    left() {
        if (this.alive && this.world.wumpus.alive) {
            if (this.direction != 2) {
                this.direction = 2;
            } else if (this.position.x > 0) {
                this.position.x--;
                this.world.showRoom(this.position.x, this.position.y);
            }
            this.checkCurrentRoom();
        }
    }

    right() {
        if (this.alive && this.world.wumpus.alive) {
            if (this.direction != 0) {
                this.direction = 0;
            } else if (this.position.x < this.world.roomsPerRow - 1) {
                this.position.x++;
                this.world.showRoom(this.position.x, this.position.y);
            }
            this.checkCurrentRoom();
        }
    }

    checkCurrentRoom() {
        if (this.world.getRoom(this.position.x, this.position.y).containsWumpus() && this.world.wumpus.alive) {
            this.world.showAllRooms();
            this.kill();
        } else if (this.world.getRoom(this.position.x, this.position.y).containsPit()) {
            this.world.showAllRooms();
            this.kill();
        }
        if (this.world.getRoom(this.position.x, this.position.y).containsArrow) {
            this.world.getRoom(this.position.x, this.position.y).removeArrow();
            this.hasArrow = true;
            bell_sound.play();
        }
    }

    kill() {
        this.alive = false;
        lose_sound.play();
        console.log("You died. Game over!")
    }

    shoot() {
        if (!this.hasArrow || !this.alive) {
            return;
        }
        var victory = false;
        switch (this.direction){
            case 0:
                var y = this.position.y;
                for (var x = this.position.x; x < roomsPerRow; x++) {
                    if (this.world.getRoom(x, y).containsWumpus()) {
                        victory = true;
                        break;
                    }
                }
                break;
            case 1:
                var x = this.position.x;
                for (var y = this.position.y; y < roomsPerRow; y++) {
                    if (this.world.getRoom(x, y).containsWumpus()) {
                        victory = true;
                        break;
                    }
                }
                break;
            case 2:
                var y = this.position.y;
                for (var x = this.position.x; x >= 0; x--) {
                    if (this.world.getRoom(x, y).containsWumpus()) {
                        victory = true;
                        break;
                    }
                }
                break;
            case 3:
                var x = this.position.x;
                for (var y = this.position.y; y >= 0; y--) {
                    if (this.world.getRoom(x, y).containsWumpus()) {
                        victory = true;
                        break;
                    }
                }
                break;
        }
        if (victory) {
            this.world.wumpus.kill();
            console.log("Victory!");
            victory_sound.play();
            this.world.showAllRooms();
        }

        this.hasArrow = false;
    }

}