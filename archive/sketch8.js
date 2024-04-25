// works with boids9.js


// PROBLEM SKETCH
// I've accidentally created NEW Points @ line 36
// this makes it impossible to do a check for if boid != boid (you can't calculate vector from the distance of your own boid)

const flock = [];
let isPaused = false;

let alignSlider, cohesionSlider, separationSlider;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 100);
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);

    for (let i = 0; i < 40; i++) {
        flock.push(new Boids(random(255), random(255), 255, 1));
    }
    for (let i = 0; i < 40; i++) {
        flock.push(new Boids(255, random(255), random(255), 2));
    }
    for (let i = 0; i < 40; i++) {
        flock.push(new Boids(random(255), 255, random(255), 3));
    }
}

function mousePressed() {
    isPaused = true;
}
function mouseReleased() {
    isPaused = false;
}

function draw() {
    background(0);

    let qtree = new QuadTree(new Rectangle(width / 2, height / 2, width, height), 5);

    for (let boid of flock) {

        qtree.insert(new Point(boid.position.x, boid.position.y, boid));

        let range = new Rectangle(boid.position.x, boid.position.y, boid.perceptionR, boid.perceptionR); // this is not a list of points. it's just
        // a new rectangle class

        let boidArrThing = []

        for (let boidj of flock){
            if (range.contains(boidj)){
                boidArrThing.push(boidj)
            }
        }
        
        let points = qtree.query(boidArrThing); // this is wrong. don't input range


        boid.flock(points);

        boid.update();
        boid.edges();
        boid.show();


        qtree.show();
    }

    console.log('FRAME: '+frameRate());
}