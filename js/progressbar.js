class ProgressBar {
    constructor(maxProgress) {
        this.max = maxProgress;
        this.progress = 0;
        this.currentPosition = 0;
        this.lastChange = -Infinity;
        this.timer = 0.001;
    }

    next() {
        this.progress++;
    }

    display() {
        let width = canvas.width * 0.5;
        let height = 10;
        if (this.currentPosition < this.progress && millis() - this.lastChange > this.timer) {
            this.currentPosition += 0.5;
            this.lastChange = millis();
        }

        fill(30);
        rect(canvas.width / 2 - width / 2, canvas.height / 2 - height, width / this.max * this.currentPosition, height);

        strokeWeight(4);
        stroke(30);
        noFill();
        rect(canvas.width / 2 - width / 2, canvas.height / 2 - height, width, height);
    }
}