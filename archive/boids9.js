class Boids {
    constructor(r, g, b, id) {
        this.position = createVector(random(200, width - 200), random(200, height - 200));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(1, 1.5));
        this.acceleration = createVector();

        this.maxForce = 0.2;
        this.sepForce = 0.5;
        this.maxSpeed = 5;

        this.colorR = r;
        this.colorG = g;
        this.colorB = b;

        this.id = id;
        this.perceptionR = 40;
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

    iterateBoidArr(queryFoundBoids) { //update so it takes in and processes only given boids instead of loopiong through all.


        

        let avgAlignment = createVector();
        let avgCohesion = createVector();
        let avgSeparation = createVector();
        let total = 0;
        let sameIdTotal = 0;
        let avg = [];
        console.log(queryFoundBoids);

        for (let other of queryFoundBoids) {
            
                let d = dist(this.position.x, this.position.y, other.userData.position.x, other.userData.position.y);

            // console.log('this is data.y:' + other.userData.position.y);
            // console.log('this is position.y:' + this.position.y);

            if (other != self) {


                //////////////////////////////
                if (other.id == this.id) {

                avgAlignment.add(other.velocity);

                //////////////////////////////

                avgCohesion.add(other.position);

                    sameIdTotal += 1;

                }


                //////////////////////////////

                let diff = p5.Vector.sub(this.position, other.position)
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
            avgAlignment.setMag(this.maxSpeed); // this helped them not slow down
            avgAlignment.sub(this.velocity);
            avgAlignment.limit(this.maxForce);

            avg.push(avgAlignment);

            ///////////////////////////////////////////////////////////////


            avgSeparation.div(total);
            avgSeparation.setMag(this.maxSpeed); // this helped them not slow down
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
        return avg;
    }

    flock(queryFoundBoids) {
        // let alignment = this.align(boidArr);
        // let cohesion = this.cohesion(boidArr);
        // let separation = this.separation(boidArr);
        let avgList = this.iterateBoidArr(queryFoundBoids);

        // if(avgList == false){
        //     return;
        // }

        let alignment = avgList[0];
        let separation = avgList[1];
        let cohesion = avgList[2];

        // let alignment = this.iterateBoidArr(boidArr, 40, 'align');
        // let cohesion = this.iterateBoidArr(boidArr, 40, 'cohesion');
        // let separation = this.iterateBoidArr(boidArr, 30, 'separation');

        separation.mult(separationSlider.value());
        cohesion.mult(cohesionSlider.value());
        alignment.mult(alignSlider.value());

        this.acceleration.add(alignment);// you want this to be addition later
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

}