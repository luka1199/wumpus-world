let canvasSize = 750;
let roomsPerRow = 5;    
let wumpusWorld;
let wumpus_image;
let wumpus_dead_image;
let agent_up_image;
let agent_down_image;
let agent_left_image
let agent_right_image;
let agent_walk_sprite_sheet;
let arrow_overlay_image;
let terrain_image;
let victory_sound;
let lose_sound;
let bell_sound;
let wind_sounds;
let flies_sound;
let pit_image;
let loading = true;
let loadCounter = 0;
let filesToLoad = 16;
let bar;

let agentWalkDownFrames = [{
    "name": "agent_walk_down1",
    "frame": {
        "x": 48 * 0,
        "y": 48 * 0,
        "width": 48,
        "height": 48
    }
}, {
    "name": "agent_walk_down2",
    "frame": {
        "x": 48 * 0,
        "y": 48 * 1,
        "width": 48,
        "height": 48
    }
}, {
    "name": "agent_walk_down3",
    "frame": {
        "x": 48 * 0,
        "y": 48 * 2,
        "width": 48,
        "height": 48
    }
}, {
    "name": "agent_walk_down4",
    "frame": {
        "x": 48 * 0,
        "y": 48 * 3,
        "width": 48,
        "height": 48
    }
}];

let agentWalkLeftFrames = [{
    "name": "agent_walk_left1",
    "frame": {
        "x": 48 * 1,
        "y": 48 * 0,
        "width": 48,
        "height": 48
    }
}, {
    "name": "agent_walk_left2",
    "frame": {
        "x": 48 * 1,
        "y": 48 * 1,
        "width": 48,
        "height": 48
    }
}, {
    "name": "agent_walk_left3",
    "frame": {
        "x": 48 * 1,
        "y": 48 * 2,
        "width": 48,
        "height": 48
    }
}, {
    "name": "agent_walk_left4",
    "frame": {
        "x": 48 * 1,
        "y": 48 * 3,
        "width": 48,
        "height": 48
    }
}];

let agentWalkUpFrames = [{
    "name": "agent_walk_up1",
    "frame": {
        "x": 48 * 2,
        "y": 48 * 0,
        "width": 48,
        "height": 48
    }
}, {
    "name": "agent_walk_up2",
    "frame": {
        "x": 48 * 2,
        "y": 48 * 1,
        "width": 48,
        "height": 48
    }
}, {
    "name": "agent_walk_up3",
    "frame": {
        "x": 48 * 2,
        "y": 48 * 2,
        "width": 48,
        "height": 48
    }
}, {
    "name": "agent_walk_up4",
    "frame": {
        "x": 48 * 2,
        "y": 48 * 3,
        "width": 48,
        "height": 48
    }
}];

let agentWalkRightFrames = [{
    "name": "agent_walk_right1",
    "frame": {
        "x": 48 * 3,
        "y": 48 * 0,
        "width": 48,
        "height": 48
    }
}, {
    "name": "agent_walk_right2",
    "frame": {
        "x": 48 * 3,
        "y": 48 * 1,
        "width": 48,
        "height": 48
    }
}, {
    "name": "agent_walk_right3",
    "frame": {
        "x": 48 * 3,
        "y": 48 * 2,
        "width": 48,
        "height": 48
    }
}, {
    "name": "agent_walk_right4",
    "frame": {
        "x": 48 * 3,
        "y": 48 * 3,
        "width": 48,
        "height": 48
    }
}];


function loadAssets(callback) {
    wumpus_image = loadImage('assets/textures/wumpus.png', callback);
    wumpus_dead_image = loadImage('assets/textures/wumpus_dead.png', callback);
    agent_up_image = loadImage('assets/textures/agent_up.png', callback);
    agent_down_image = loadImage('assets/textures/agent_down.png', callback);
    agent_left_image = loadImage('assets/textures/agent_left.png', callback);
    agent_right_image = loadImage('assets/textures/agent_right.png', callback);
    agent_walk_sprite_sheet = loadSpriteSheet('assets/textures/agent_walk.png', 48, 48, 16);
    arrow_overlay_image = loadImage('assets/textures/arrow_overlay.png', callback)
    pit_image = loadImage('assets/textures/pit.png', callback);
    terrain_image = loadImage('assets/textures/terrain.png', callback);
    bell_sound = loadSound('assets/sounds/bell.wav', callback);
    victory_sound = loadSound('assets/sounds/victory.wav', callback);
    lose_sound = loadSound('assets/sounds/lose.wav', callback);
    wind_sounds = [loadSound('assets/sounds/wind.wav', callback),
        loadSound('assets/sounds/wind2.wav', callback),
        loadSound('assets/sounds/wind3.wav', callback)
    ];
    flies_sound = loadSound('assets/sounds/flies.wav', callback);
    flies_sound.setVolume(0.5);
}

function loadCallback() {
    loadCounter++;
    bar.next();
    if (loadCounter == filesToLoad) {
        loading = false;
    }
}

function setup() {
    var canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent("canvas-container");
    bar = new ProgressBar(filesToLoad);
    loadAssets(loadCallback);
    wumpusWorld = new World(roomsPerRow);
}

function restart() {
    wumpusWorld = new World(roomsPerRow);
}

function draw() {
    if (loading) {
        background(100);
        smooth();
        bar.display();
    } else {
        background(255);
        smooth();
        wumpusWorld.display();
    }
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
        if (wumpusWorld.agent.alive && wumpusWorld.wumpus.alive) {
            wumpusWorld.agent.shoot();
        } else {
            restart();
        }
    } else if (keyCode == 32) {
        restart();
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