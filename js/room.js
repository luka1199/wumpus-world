class Room {
    constructor(pos, roomSize) {
        this.position = pos;
        this.size = roomSize;
        this.attributes = new Set();
        this.visible = false;
        this.objects = new Set();
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    addAttribute(attr) {
        this.attributes.add(attr);
    }

    removeAttribute(attr) {
        this.attributes.delete(attr);
    }

    addObject(obj) {
        this.objects.add(obj);
    }

    removeObject(obj) {
        this.objects.delete(obj);
    }

    containsWumpus() {
        var result = false;
        this.objects.forEach(obj => {
            if (obj instanceof Wumpus) {
                result = true;
            }
        });
        return result;
    }

    containsPit() {
        var result = false;
        this.objects.forEach(obj => {
            if (obj instanceof Pit) {
                result = true;
            }
        });
        return result;
    }

    display() {
        strokeWeight(2);
        stroke(30);
        if (this.visible) {
            fill(255);
            square(this.position.x * this.size, this.position.y * this.size, this.size);
            if (this.objects.length > 0) {
                this.objects.forEach(obj => {
                    obj.display();
                });
            } else {
                fill(0);
                textSize(18);
                textAlign(CENTER, TOP);
                strokeWeight(0.5);
                let s = "";
                this.attributes.forEach((value) => {
                    s += value + "\n"
                });
                text(s, this.position.x * this.size, this.position.y * this.size + 20, this.size, this.size - 20);
            }
        } else {
            fill(150);
            square(this.position.x * this.size, this.position.y * this.size, this.size);
        }
    }
}