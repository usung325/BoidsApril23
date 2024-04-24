class Boids {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(1, 1.5));
        this.acceleration = createVector();
    }

    show() {
        strokeWeight(10);
        stroke(0);
        point(this.position);
    }

    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }

    flock(boidArr){
        let alignment = this.align(boidArr)
        this.acceleration = alignment;// you want this to be addition later
        // this.acceleration.add(alignment)
    }

    align(boidArr) {
        let perceptionRadius = 10;
        let avg = createVector();
        let total = 0;
        for (let other of boidArr){ //this is where you check ALL of list. good place to implement quadtree
            let d  = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != self && d < perceptionRadius ){
                avg.add(other.velocity);
                total += 1;
            }
        }
        if(total > 0){
            avg.div(total);
            avg.sub(this.velocity);
        }
        return avg;
    }
}