class World {
    constructor(roomsPerRow) {
        this.roomsPerRow = roomsPerRow;
        this.roomSize = canvasSize / this.roomsPerRow;
        this.rooms = [];
        this.createRooms();
        this.agent = new Agent(createVector(0, 0), this);
        this.wumpus = new Wumpus(createVector(3, 3), this);
    }

    createRooms() {
        for (var i = 0; i < this.roomsPerRow; i++) {
            this.rooms.push(new Array());
            for (var j = 0; j < this.roomsPerRow; j++) {
                this.rooms[i].push(new Room(createVector(i, j), this.roomSize));
            }
        }
    }

    showRoom(x, y) {
        this.rooms[x][y].show();
    }

    hideRoom(x, y) {
        this.rooms[x][y].hide();
    }

    roomIsVisible(x, y) {
        return this.rooms[x][y].visible;
    }

    display() {
        this.displayGrid();
        this.displayWorldObjects();
    }

    displayGrid() {
        for (var i = 0; i < this.roomsPerRow; i++) {
            for (var j = 0; j < this.roomsPerRow; j++) {
                this.rooms[i][j].display();
            }
        }

    }

    displayWorldObjects() {
        this.wumpus.display();
        this.agent.display();
    }

}