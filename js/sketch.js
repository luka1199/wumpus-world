let canvasSize = 750;
let roomsPerRow = 4;    
let wumpusWorld;
let wumpus_image;
let wumpus_dead_image;
let agent_up_image;
let agent_down_image;
let agent_left_image;
let agent_right_image;
let arrow_overlay_image;
let terrain_image;
let bell_sound;
let pit_image;


function setup() {
    wumpus_image = loadImage('assets/wumpus.png');
    wumpus_dead_image = loadImage('assets/wumpus_dead.png');
    agent_up_image = loadImage('assets/agent_up.png');
    agent_down_image = loadImage('assets/agent_down.png');
    agent_left_image = loadImage('assets/agent_left.png');
    agent_right_image = loadImage('assets/agent_right.png');
    arrow_overlay_image = loadImage('assets/arrow_overlay.png')
    pit_image = loadImage('assets/pit.png');
    terrain_image = loadImage('assets/terrain.png');
    bell_sound = loadSound('assets/bell.wav');
    var canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent("canvas-container");
    wumpusWorld = new World(roomsPerRow);
}

function draw() {
    background(255);
    smooth();
    wumpusWorld.display();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        wumpusWorld.agent.up();
    } else if (keyCode === DOWN_ARROW) {
        wumpusWorld.agent.down();
    } else if (keyCode === LEFT_ARROW) {
        wumpusWorld.agent.left();
    } else if (keyCode === RIGHT_ARROW) {
        wumpusWorld.agent.right();
    } else if (keyCode == ENTER) {
        wumpusWorld.agent.shoot();
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}