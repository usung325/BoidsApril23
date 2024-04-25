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
            flock.push(new Boids(random(0, 200),random(60,255),0, randId));
        }
        else if (randId == 3){
            flock.push(new Boids(255,random(100,255),random(60,255), randId));
        }
        else{
            flock.push(new Boids(random(60,255), 60,random(255), randId));
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

            

            // qTree.show();
            
            textSize(20);
            noStroke();
            fill('white');
            textAlign(CENTER);
            text(int(frameRate()), width/2, height-50);  
    
}