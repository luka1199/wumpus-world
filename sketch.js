let canvasSize = 500;
let world;

function setup() {
    createCanvas(canvasSize, canvasSize);
    world = new World();
}

function draw() {
    background(255);
    world.display()
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

        this.agent = new Agent(0, 0);
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
        for (var i = 0; i <= 4; i++) {
            for (var j = 0; j <= 4; j++) {
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
    constructor(x, y) {
        this.position = createVector(x, y);
    }

    display() {

    }
}

class Agent {
    constructor(x, y) {
        this.position = createVector(x, y);
    }

    display() {

    }

    up() {

    }

    down() {

    }

    left() {

    }

    right() {

    }
}

class Gold {
    constructor(x, y) {
        this.position = createVector(x, y);
    }

    display() {

    }
}

class Pit {
    constructor(x, y) {
        this.position = createCanvas(x, y);
    }

    display() {

    }
}