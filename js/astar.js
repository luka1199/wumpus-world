class AStar {
    constructor(rooms) {
        this.rooms = rooms;
    }

    search(start, end) {
        var open = []
        var closed = []
        open.push(start)

        while(open.length > 0) {

        }

        return []
    }

    // Manhattan distance
    heuristic(pos1, pos2) {
        var d1 = Math.abs (pos2.x - pos1.x);
        var d2 = Math.abs (pos2.y - pos1.y);
        return d1 + d2;
    }

    getNeighbors(room) {
        var ret = [];
        var x = room.position.x;
        var y = room.position.y;
    
        if(this.rooms[x-1] && this.rooms[x-1][y]) {
        ret.push(this.rooms[x-1][y]);
        }
        if(this.rooms[x+1] && this.rooms[x+1][y]) {
        ret.push(this.rooms[x+1][y]);
        }
        if(this.rooms[x][y-1] && this.rooms[x][y-1]) {
        ret.push(this.rooms[x][y-1]);
        }
        if(this.rooms[x][y+1] && this.rooms[x][y+1]) {
        ret.push(this.rooms[x][y+1]);
        }
        return ret;
    }
}