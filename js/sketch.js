let canvasSize = 500;
let roomsPerRow = 6;
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
    var canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent("canvas-container");
    world = new World(roomsPerRow);
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