class World {
    constructor(roomsPerRow) {
        this.roomsPerRow = roomsPerRow;
        this.roomSize = canvasSize / this.roomsPerRow;
        this.rooms = [];
        this.createRooms();
        this.agent = new Agent(createVector(0, 0), this);
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
        for (var i = 0; i < this.roomsPerRow; i++) {
            for (var j = 0; j < this.roomsPerRow; j++) {
                availableRooms.push(i + " " + j);
            }
        }
        // Remove agent position
        availableRooms.splice(availableRooms.indexOf(this.agent.position.x + " " + this.agent.position.y), 1);

        // Add Wumpus
        var wumpusIndex = getRandomInt(availableRooms.length);
        var wumpusX = parseInt(availableRooms[wumpusIndex].split(" ")[0]);
        var wumpusY = parseInt(availableRooms[wumpusIndex].split(" ")[1]);
        availableRooms.splice(wumpusIndex, 1);
        this.getRoom(wumpusX, wumpusY).addObject(new Wumpus(createVector(wumpusX, wumpusY), this));

        // Add Pits
        for (var i = 0; i < Math.floor((this.roomsPerRow * this.roomsPerRow) / 8); i++) {
            var pitIndex = getRandomInt(availableRooms.length);
            var pitX = parseInt(availableRooms[pitIndex].split(" ")[0]);
            var pitY = parseInt(availableRooms[pitIndex].split(" ")[1]);
            availableRooms.splice(pitIndex, 1);
            this.getRoom(pitX, pitY).addObject(new Pit(createVector(pitX, pitY), this));
        }
    }

    getRoom(x, y) {
        return this.rooms[x][y]
    }

    showRoom(x, y) {
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