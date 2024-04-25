// workes with boid8.js

const flock = [];
let isPaused = false;

let alignSlider, cohesionSlider, separationSlider;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 100);
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);

    for (let i = 0; i < 100; i++) {
        flock.push(new Boids(random(255), random(255), 255, 1));
    }
    for (let i = 0; i < 100; i++) {
        flock.push(new Boids(255, random(255), random(255), 2));
    }
    for (let i = 0; i < 100; i++) {
        flock.push(new Boids(random(255), 255, random(255), 3));
    }
}

function mousePressed(){
    isPaused = true;
}
function mouseReleased() {
    isPaused = false;
}

function draw() {
    background(0);
    
        for (let boid of flock) {
    
    
            boid.show();

            if(!isPaused){
            boid.flock(flock);
    
            boid.update();

        }
    
            boid.edges();
    
    
    
            // console.log('posX: ' + boid.position);
            // console.log('velX: ' + boid.velocity);
    
            console.log(frameRate());
    
    
        
    }
}