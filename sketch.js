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
        this.visible = [
            [false, false, false, false],
            [false, false, false, false],
            [false, false, false, false],
            [false, false, false, false]
        ];

        this.agent = new Agent(createVector(0, 0), this);
        this.showRoom(0, 0);
    }

    showRoom(x, y) {
        this.visible[x][y] = true;
    }

    display() {
        this.displayGrid();
        this.displayWorldObjects();
    }

    displayGrid() {
        strokeWeight(2);
        stroke(30);
        for (var i = 0; i <= 3; i++) {
            for (var j = 0; j <= 3; j++) {
                if (this.visible[i][j] == true) {
                    fill(255);
                } else {
                    fill(150);
                }
                square(i * this.roomSize, j * this.roomSize, this.roomSize);
            }
        }

    }

    displayWorldObjects() {
        this.agent.display();
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