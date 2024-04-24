const flock = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 100);
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);

    for (let i = 0; i < 100; i++){
        flock.push(new Boids(255,50,60, 1));
    }
    for (let i = 0; i < 100; i++){
        flock.push(new Boids(0,255,255, 2));
    }
    for (let i = 0; i < 100; i++){
        flock.push(new Boids(255,255,255, 3));
    }
}

function draw(){
    background(0);
    
    for (let boid of flock) {
        boid.flock(flock);
        boid.show();
        boid.update();

        boid.edges();
        


        // console.log('posX: ' + boid.position);
        // console.log('velX: ' + boid.velocity);

        console.log(frameRate());
        
        
    }
}