let canvasSize = 750;
let roomsPerRow = 6;    
let wumpusWorld;
let wumpus_image;
let wumpus_dead_image;
let agent_up_image;
let agent_down_image;
let agent_left_image;
let agent_right_image;
let arrow_overlay_image;
let terrain_image;
let victory_sound;
let lose_sound;
let bell_sound;
let wind_sounds;
let flies_sound;
let pit_image;


function setup() {
    wumpus_image = loadImage('assets/textures/wumpus.png');
    wumpus_dead_image = loadImage('assets/textures/wumpus_dead.png');
    agent_up_image = loadImage('assets/textures/agent_up.png');
    agent_down_image = loadImage('assets/textures/agent_down.png');
    agent_left_image = loadImage('assets/textures/agent_left.png');
    agent_right_image = loadImage('assets/textures/agent_right.png');
    arrow_overlay_image = loadImage('assets/textures/arrow_overlay.png')
    pit_image = loadImage('assets/textures/pit.png');
    terrain_image = loadImage('assets/textures/terrain.png');
    bell_sound = loadSound('assets/sounds/bell.wav');
    victory_sound = loadSound('assets/sounds/victory.wav');
    lose_sound = loadSound('assets/sounds/lose.wav');
    wind_sounds = [loadSound('assets/sounds/wind.wav'), 
                loadSound('assets/sounds/wind2.wav'), 
                loadSound('assets/sounds/wind3.wav')];
    flies_sound = loadSound('assets/sounds/flies.wav');
    flies_sound.setVolume(0.5);
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
    wumpusWorld.rooms.forEach(row => {
        row.forEach(room => {
            room.containsAgent = false;
        });
        wumpusWorld.agent.getCurrentRoom().containsAgent = true;
    });

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}