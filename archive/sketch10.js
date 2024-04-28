//implementing 1->3

const flock = [];
let qTree;
let isPaused = false;

let alignSlider, cohesionSlider, separationSlider;

let capacity = 100;
let checkRange = 30;
let boidNum = 100;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 100);
    
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);

    /////// mic ///////

    mic = new p5.AudioIn();

    mic.start();

    ///////////////////

    
    for(let i = 0; i < boidNum; i++){
        let randId = int(random(1,4));
        if (randId == 2){
            flock.push(new Boids(random(150,255), random(116, 150), 187, randId));
        }
        else if (randId == 3){
            flock.push(new Boids(20,random(115, 180), random(127,180), randId));
        }
        // else{
        //     flock.push(new Boids(255, 255, 255, randId));
        // }
    }
}

function mouseClicked() {
    for(let i = 0; i < 20; i++){
        flock.push(new Boids(random(180,220), random(180,220), random(180,220), 5));
    }
}


function draw() {

    /////// mic ///////

    let vol = mic.getLevel();
    let volume = map(vol, 0, 1, 0, 5);

    /////// mic ///////


    background(0,115,127,90);
    qTree = new QuadTree(new Rectangle(width/2, height/2, width, height), capacity);
    
    for(let boid of flock){

            qTree.insert(new Point(boid.position.x, boid.position.y, boid));

            let radiusOfBoid = new Circle(boid.position.x, boid.position.y, checkRange);
                // radiusOfBoid.show();
                let boidsInRange = (qTree.query(radiusOfBoid)); // query keeps returning empty list. Can't find boids intersecting for some reason


                boid.flock(boidsInRange, volume);
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