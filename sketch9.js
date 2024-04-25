// workes with boid8.js

const flock = [];
let qTree;
let isPaused = false;

let alignSlider, cohesionSlider, separationSlider;

let capacity = 2;
let checkRange = 50;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 100);
    
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);

    
    for(let i = 0; i < 2000; i++){
        let randId = int(random(1,4));
        if (randId == 2){
            flock.push(new Boids(random(255),random(255),60, randId));
        }
        else if (randId == 3){
            flock.push(new Boids(60,random(255),random(255), randId));
        }
        else{
            flock.push(new Boids(255,255,255, randId));
        }
    }
}

function draw() {
    background(0);
    qTree = new QuadTree(new Rectangle(width/2, height/2, width, height), capacity);
    
    for(let boid of flock){

            qTree.insert(new Point(boid.position.x, boid.position.y, boid));

            let radiusOfBoid = new Circle(boid.position.x, boid.position.y, checkRange);
                // radiusOfBoid.show();
                let boidsInRange = (qTree.query(radiusOfBoid)); // query keeps returning empty list. Can't find boids intersecting for some reason


                boid.flock(boidsInRange);
                boid.update();
                boid.edges();
                boid.show();
                
            }

            

            qTree.show();
            
            textSize(50);
            fill('white');
            text(int(frameRate()), width - 500, height-50);  
    
}