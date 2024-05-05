//working boids before implementing Quadtree

class Boids {
    constructor(r, g, b, id) {
        this.position = createVector(random(200, width - 200), random(200, height - 200));
        this.velocity = p5.Vector.random2D();
        this.velocity.mult(random(2));
        this.velocity.setMag(random(1, 1.5));
        this.acceleration = createVector();

        this.maxForce = 0.2; // 0.2
        this.sepForce = 0.5; // 0.5
        this.maxSpeed = 5;

        this.colorR = r;
        this.colorG = g;
        this.colorB = b;

        this.id = id;
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

    iterateBoidArr(boidArr) {

        let avgAlignment = createVector();
        let avgCohesion = createVector();
        let avgSeparation = createVector();

        let total = 0;
        let sameIdTotal = 0;
        let avg = [];


        for (let other of boidArr) {

            // console.log(other.userData);
            // console.log(this);

            let d = dist(this.position.x, this.position.y, other.userData.position.x, other.userData.position.y);

            if (other.userData != this) { //it's 'this' not self

                //////////////////////////////
                if (other.userData.id == this.id) {

                    avgAlignment.add(other.userData.velocity);

                    //////////////////////////////

                    avgCohesion.add(other.userData.position);

                    sameIdTotal += 1;

                }


                //////////////////////////////

                let diff = p5.Vector.sub(this.position, other.userData.position)
                // avg.sub(other.velocity.sub(self.velocity));
                diff.div(d);
                avgSeparation.add(diff);

                //////////////////////////////

                total += 1;

            }
        }
        if (total > 0) {

            ///////////////////////////////////////////////////////////////

            avgAlignment.div(total);
            avgAlignment.setMag(); // this helped them not slow down //MISSING MAX SPEED
            avgAlignment.sub(this.velocity);
            avgAlignment.limit(this.maxForce);

            avg.push(avgAlignment);

            ///////////////////////////////////////////////////////////////


            avgSeparation.div(total);
            avgSeparation.setMag(); // this helped them not slow down //MISSING MAX SPEED
            avgSeparation.sub(this.velocity);
            avgSeparation.limit(this.sepForce);

            avg.push(avgSeparation);

            ///////////////////////////////////////////////////////////////

            avgCohesion.div(sameIdTotal);
            avgCohesion.sub(this.position); //added this

            avgCohesion.setMag(this.maxSpeed); // this helped them not slow down

            avgCohesion.sub(this.velocity);
            avgCohesion.limit(this.maxForce);

            avg.push(avgCohesion);

            ///////////////////////////////////////////////////////////////
        }

        else{

            avg.push(avgAlignment);
            avg.push(avgSeparation);
            avg.push(avgCohesion);
        }

        return avg;
    }

    flock(boidArr, volume) {

        let avgList = this.iterateBoidArr(boidArr);

        let alignment = avgList[0];
        let separation = avgList[1];
        let cohesion = avgList[2];

        // console.log(volume);
        alignment.mult(alignSlider.value() - (volume * 60) );
        separation.mult(separationSlider.value());
        cohesion.mult(cohesionSlider.value());

        this.acceleration.add(alignment);// you want this to be addition later
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);


        return;

    }

}