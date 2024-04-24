class Boids {
    constructor(flock, x, y) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();
        this.size = random(5, 10);
        this.flock = flock;
        this.sum = createVector();
    }

    show() {
        stroke(255, 0, 0);
        strokeWeight(this.size);
        point(this.position);

        this.position.add(this.velocity);
    }

    update(boid) {
        let v1 = this.rule1(boid);
        let v2 = createVector() // rule2(boid);
        let v3 = createVector() // rule3(boid);

        boid.velocity = boid.velocity.add(v1);
        boid.velocity = boid.velocity.add(v2);
        boid.velocity = boid.velocity.add(v3);
        boid.position = boid.position.add(boid.velocity);
    }

    rule1(boid) {
        // this.position.add(this.velocity);
        // this.velocity.add(this.acceleration);

        let checkRadius = 10;

        for (let i = 0; i < flock.length; i++) {
            if (dist(this.velocity.x, this.velocity.y, boid.velocity.x, boid.velocity.y) < checkRadius && boid != self) {
                this.sum.add(boid.position)
                console.log('what')
            }
            let avg = this.sum / (flock.length - 1);
            return avg / 100 //you want it to move 1% of it towards the centre
        }
    }

    rule2() {
        return
    }

    rule3() {
        return
    }
}