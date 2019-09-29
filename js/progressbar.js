class ProgressBar {
    constructor(maxProgress) {
        this.max = maxProgress;
        this.current = 0;
    }

    next() {
        this.current++;
    }

    display() {
        let width = canvas.width * 0.5;
        let height = 10;
        
        fill(30);
        rect(canvas.width / 2 - width / 2, canvas.height / 2 - height, width / this.max * this.current, height);
        
        strokeWeight(4);
        stroke(30);
        noFill();
        rect(canvas.width / 2 - width / 2, canvas.height / 2 - height, width, height);
    }
}