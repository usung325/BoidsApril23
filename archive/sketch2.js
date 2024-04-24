const flock = [];

function setup() {
    createCanvas(400, 400);
    for (let i = 0; i < 100; i++){
        flock.push(new Boids());
    }
}

function draw(){
    background(220);
    for (let boid of flock) {
        boid.flock(flock);
        boid.show();
        boid.update();
    }
}