let canvasSize = 400;
let world;
let wumpus_image;
let agent_up_image;
let agent_down_image;
let agent_left_image;
let agent_right_image;


function setup() {
    wumpus_image = loadImage('assets/wumpus.png');
    agent_up_image = loadImage('assets/agent_up.png');
    agent_down_image = loadImage('assets/agent_down.png');
    agent_left_image = loadImage('assets/agent_left.png');
    agent_right_image = loadImage('assets/agent_right.png');
    createCanvas(canvasSize, canvasSize);
    world = new World();
}

function draw() {
    background(255);
    smooth();
    world.display();
    // console.log(mouseX, mouseY);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        world.agent.up();
    } else if (keyCode === DOWN_ARROW) {
        world.agent.down();
    } else if (keyCode === LEFT_ARROW) {
        world.agent.left();
    } else if (keyCode === RIGHT_ARROW) {
        world.agent.right();
    }

}


class World {
    constructor() {
        this.roomSize = canvasSize / 4;
        this.rooms = [];
        this.createRooms();

        this.agent = new Agent(createVector(0, 0), this);
    }

    createRooms() {
        for (var i = 0; i < 4; i++) {
            this.rooms.push(new Array());
            for (var j = 0; j < 4; j++) {
                this.rooms[i].push(new Room(createVector(i, j), this.roomSize));
            }
        }
    }

    showRoom(x, y) {
        this.rooms[x][y].show();
    }

    display() {
        this.displayGrid();
        this.displayWorldObjects();
    }

    displayGrid() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                this.rooms[i][j].display();
            }
        }

    }

    displayWorldObjects() {
        this.agent.display();
    }

}

class Room {
    constructor(pos, roomSize) {
        this.position = pos;
        this.size = roomSize;
        this.attributes = new Set();
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    addAttribute(attr) {
        this.attributes.add(attr);
    }

    removeAttribute(attr) {
        this.attributes.delete(attr);
    }

    display() {
        strokeWeight(2);
        stroke(30);
        if (this.visible) {
            fill(255);
        } else {
            fill(150);
        }
        square(this.position.x * this.size, this.position.y * this.size, this.size);

        fill(0);
        textSize(18);
        textAlign(CENTER, TOP);
        strokeWeight(0.5);
        let s = "";
        this.attributes.forEach((value) => {
            s += value + "\n"
        });
        text(s, this.position.x * this.size, this.position.y * this.size + 20, this.size, this.size - 20);
    }
}

class Wumpus {
    constructor(pos) {
        this.position = pos;
    }

    display() {

    }
}

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
        } else if (this.position.y < 3) {
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
        } else if (this.position.x < 3) {
            this.position.x++;
            world.showRoom(this.position.x, this.position.y);
        }
    }
}

class Gold {
    constructor(pos) {
        this.position = pos;
    }

    display() {

    }
}

class Pit {
    constructor(pos) {
        this.position = pos;
    }

    display() {

    }
}