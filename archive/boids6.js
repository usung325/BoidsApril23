// refactored to have computation in single function 
// boids7 will be making it only have to run through the boidArr list once.
class Boids {
    constructor(r, g, b) {
        this.position = createVector(random(200, width - 200), random(200, height - 200));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(1, 1.5));
        this.acceleration = createVector();

        this.maxForce = 0.2;
        this.sepForce = 0.5;
        this.maxSpeed = 10;

        this.colorR = r;
        this.colorG = g;
        this.colorB = b;
    }

    edges() {
        let offset = 200;
        if (this.position.x > width - offset) {
            this.velocity.sub(1, 0);
        }
        else if (this.position.x < 0 + offset) {
            this.velocity.add(1, 0);
        }
        else if (this.position.y > height - offset) {
            this.velocity.sub(0, 1);
        }
        else if (this.position.y < 0 + offset) {
            this.velocity.add(0, 1);
        }
    }

    show() {
        strokeWeight(10);
        stroke(this.colorR, this.colorG, this.colorB);
        point(this.position);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0); // acceleration doesn't keep adding up, fixed accleration
    }

    iterateBoidArr(boidArr, perceptionR, methodName) {
        let perceptionRadius = perceptionR;
        let avg = createVector();
        let total = 0;

        for (let other of boidArr) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != self && d < perceptionRadius) {
                if (methodName == 'align') {
                    avg.add(other.velocity);
                }
                else if (methodName == 'cohesion') {
                    avg.add(other.position);
                }

                else if (methodName == 'separation') {
                    let diff = p5.Vector.sub(this.position, other.position)
                    // avg.sub(other.velocity.sub(self.velocity));
                    diff.div(d);
                    avg.add(diff);
                }
                total += 1;

            }
        }
        if (total > 0) {
            if (methodName == 'align') {
                    avg.div(total);
                    avg.setMag(this.maxSpeed); // this helped them not slow down
                    avg.sub(this.velocity);
                    avg.limit(this.maxForce);
            }

            else if (methodName == 'cohesion') {
    
                    avg.div(total);
                    avg.sub(this.position); //added this
    
                    avg.setMag(this.maxSpeed); // this helped them not slow down
    
                    avg.sub(this.velocity);
                    avg.limit(this.maxForce);
    
            }

            else if (methodName == 'separation') {
    
                    avg.div(total);
                    avg.setMag(this.maxSpeed); // this helped them not slow down
                    avg.sub(this.velocity);
                    avg.limit(this.sepForce);
    
            }
        }
        return avg;
    }

    flock(boidArr) {
        // let alignment = this.align(boidArr);
        // let cohesion = this.cohesion(boidArr);
        // let separation = this.separation(boidArr);

        let alignment = this.iterateBoidArr(boidArr, 40, 'align');
        let cohesion = this.iterateBoidArr(boidArr, 40, 'cohesion');
        let separation = this.iterateBoidArr(boidArr, 30, 'separation');

        separation.mult(separationSlider.value());
        cohesion.mult(cohesionSlider.value());
        alignment.mult(alignSlider.value());

        this.acceleration.add(alignment);// you want this to be addition later
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

}