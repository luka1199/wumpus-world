let grid = Grid()

function setup() {
    createCanvas(640, 480);
}

function draw() {
    background(255);
    grid.draw()
}

class Grid {
    constructor () {
        this.visible =  [[false, false, false, false],
                        [false, false, false, false],
                        [false, false, false, false],
                        [false, false, false, false]]
    }

    showRoom(x, y) {
        this.visible[x][y] = true;
    }

    draw() {

    }

}

class Wumpus {
    constructor (x, y) {
        this.position = createVector(x, y);
    }

    draw() {

    }
}

class Agent {
    constructor (x, y) {
        this.position = createVector(x, y);
    }

    draw() {

    }
}

class Gold {
    constructor (x, y) {
        this.position = createVector(x, y);
    }

    draw() {
        
    }
}

class Pit {
    constructor (x, y) {
        this.position = createCanvas(x, y);
    }

    draw() {

    }
}