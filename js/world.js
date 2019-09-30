class World {
    constructor(roomsPerRow) {
        this.roomsPerRow = roomsPerRow;
        this.roomSize = canvasSize / this.roomsPerRow;
        this.rooms = [];
        this.createRooms();
        this.agent;
        this.wumpus = null;
        this.spawnObjects();
    }

    createRooms() {
        for (var i = 0; i < this.roomsPerRow; i++) {
            this.rooms.push(new Array());
            for (var j = 0; j < this.roomsPerRow; j++) {
                this.rooms[i].push(new Room(createVector(i, j), this.roomSize));
            }
        }
    }

    spawnObjects() {
        var availableRooms = []
        for (var dx = 0; dx < this.roomsPerRow; dx++) {
            for (var dy = 0; dy < this.roomsPerRow; dy++) {
                availableRooms.push(dx + " " + dy);
            }
        }
        // Spawn agent
        // var agentIndex = getRandomInt(availableRooms.length - 1);
        // var agentIndex = getRandomInt(availableRooms.length - 1);
        // var agentX = parseInt(availableRooms[agentIndex].split(" ")[0]);
        // var agentY = parseInt(availableRooms[agentIndex].split(" ")[1]);
        var agentPos = [[0, 0], 
                        [0, this.roomsPerRow - 1], 
                        [this.roomsPerRow - 1, 0], 
                        [this.roomsPerRow - 1, this.roomsPerRow - 1]]
                        [getRandomInt(4)];
        var agentX = agentPos[0];
        var agentY = agentPos[1];
        this.agent = new Agent(createVector(agentX, agentY), this);
        this.agent.getCurrentRoom().containsAgent = true;
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                let posX = this.agent.position.x + dx;
                let posY = this.agent.position.y + dy;
                if (posX >= 0 || posX < this.roomsPerRow || posY >= 0 || posY < this.roomsPerRow) {
                    availableRooms.splice(availableRooms.indexOf(posX + " " + posY), 1);
                }
            }
        }

        // Add Wumpus
        var wumpusIndex = getRandomInt(availableRooms.length - 1);
        var wumpusX = parseInt(availableRooms[wumpusIndex].split(" ")[0]);
        var wumpusY = parseInt(availableRooms[wumpusIndex].split(" ")[1]);
        availableRooms.splice(wumpusIndex, 1);
        this.wumpus = new Wumpus(createVector(wumpusX, wumpusY), this);
        this.getRoom(wumpusX, wumpusY).addObject(this.wumpus);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if ((dx != 0 || dy != 0) && Math.abs(dx) + Math.abs(dy) < 2) {
                    if (this.getRoom(wumpusX + dx, wumpusY + dy) != null) {
                        this.getRoom(wumpusX + dx, wumpusY + dy).addAttribute("Stench");
                    }
                }
            }
        }

        // Add Pits
        for (var i = 0; i < Math.floor((this.roomsPerRow * this.roomsPerRow) / 9); i++) {
            var pitIndex = getRandomInt(availableRooms.length - 1);
            var pitX = parseInt(availableRooms[pitIndex].split(" ")[0]);
            var pitY = parseInt(availableRooms[pitIndex].split(" ")[1]);
            availableRooms.splice(pitIndex, 1);
            this.getRoom(pitX, pitY).addObject(new Pit(createVector(pitX, pitY), this));
            for (var dx = -1; dx <= 1; dx++) {
                for (var dy = -1; dy <= 1; dy++) {
                    if ((dx != 0 || dy != 0) && Math.abs(dx) + Math.abs(dy) < 2) {
                        if (this.getRoom(pitX + dx, pitY + dy) != null) {
                            this.getRoom(pitX + dx, pitY + dy).addAttribute("Breeze");
                        }
                    }
                }
            }
        }

        // Spawn arrow
        var arrowIndex = getRandomInt(availableRooms.length);
        var arrowX = parseInt(availableRooms[arrowIndex].split(" ")[0]);
        var arrowY = parseInt(availableRooms[arrowIndex].split(" ")[1]);
        availableRooms.splice(arrowIndex, 1);
        this.getRoom(arrowX, arrowY).addArrow();
    }

    getRoom(x, y) {
        if (x < 0 || x > this.roomsPerRow - 1 || y < 0 || y > this.roomsPerRow - 1) {
            return null;
        } else {
            return this.rooms[x][y]
        }
    }

    showRoom(x, y) {
        if (x < 0 || x > this.roomsPerRow - 1 || y < 0 || y > this.roomsPerRow - 1) {
            return;
        }
        this.rooms[x][y].show();
    }

    hideRoom(x, y) {
        this.rooms[x][y].hide();
    }

    showAllRooms() {
        this.rooms.forEach(row => {
            row.forEach(room => {
                room.show();
            });
        });
    }

    roomIsVisible(x, y) {
        return this.getRoom(x, y).visible;
    }

    display() {
        this.displayRooms();
        this.agent.display();
    }

    displayRooms() {
        for (var i = 0; i < this.roomsPerRow; i++) {
            for (var j = 0; j < this.roomsPerRow; j++) {
                this.rooms[i][j].display();
            }
        }

    }

}