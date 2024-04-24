class Boids {
    constructor() {
        this.position = createVector(random(200, width-200), random(200, height-200));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(1, 1.5));
        this.acceleration = createVector();

        this.maxForce = 0.2;
        this.sepForce = 0.5;
        this.maxSpeed = 10;

        this.colorR = random(255);
        this.colorG = random(255)
        this.colorB = random(255)
    }

    edges() {
        let offset = 200;
        if (this.position.x > width - offset) {
            this.velocity.mult(-10, 1);
        }
        else if (this.position.x < 0 + offset){
            this.velocity.mult(-10, 1);
        }
        else if(this.position.y > height - offset) {
            this.velocity.mult(1, -10);
        }
        else if(this.position.y < 0 + offset) {
            this.velocity.mult(1, -10);
        }
    }

    show() {
        strokeWeight(10);
        stroke(this.colorR,this.colorG,this.colorB);
        point(this.position);
    }

    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0); // acceleration doesn't keep adding up, fixed accleration
    }

    flock(boidArr){
        let alignment = this.align(boidArr);
        let cohesion = this.cohesion(boidArr);

        let separation = this.separation(boidArr);


        separation.mult(separationSlider.value());
        cohesion.mult(cohesionSlider.value());
        alignment.mult(alignSlider.value());

        this.acceleration.add(alignment);// you want this to be addition later
        this.acceleration.add(cohesion);

        this.acceleration.add(separation);
    }

    align(boidArr) {
        let perceptionRadius = 40;
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
            avg.setMag(this.maxSpeed); // this helped them not slow down
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
        }
        return avg;
    }


    cohesion(boidArr) {
        let perceptionRadius = 40;
        let avg = createVector();
        let total = 0;


        // let avgColR = [];
        // let avgColG = [];
        // let avgColB = [];

        for (let other of boidArr){ //this is where you check ALL of list. good place to implement quadtree
            let d  = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != self && d < perceptionRadius ){
                avg.add(other.position); // changed other.velocity to other.position
                total += 1;

                // avgColR.push(this.colorR);
                // avgColG.push(this.colorG);
                // avgColB.push(this.colorB);
            }
        }

        if(total > 0){
            avg.div(total);
            avg.sub(this.position); //added this


            avg.setMag(this.maxSpeed); // this helped them not slow down
            
            
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
        }
        return avg;
    }

    separation(boidArr){
        let perceptionRadius = 30;
        let avg = createVector();
        let total = 0;
        
        for (let other of boidArr){
            let d  = (dist(this.position.x, this.position.y, other.position.x, other.position.y));
            if (other != self && d < perceptionRadius ){

                let diff = p5.Vector.sub(this.position, other.position)
                // avg.sub(other.velocity.sub(self.velocity));
                diff.div(d);
                avg.add(diff);
                total += 1;
            }
        }

        if(total > 0){

            avg.div(total);

            avg.setMag(this.maxSpeed); // this helped them not slow down
            
            
            avg.sub(this.velocity);
            avg.limit(this.sepForce);
        }

        return avg;
    }



}