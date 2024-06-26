//for twitter
//works with boids12js

const flock = [];
let qTree;
let isPaused = false;

let alignSlider, cohesionSlider, separationSlider;

let capacity = 100;
let checkRange = 20;
let boidNum = 1800;


function setup() {
    createCanvas(800, window.innerHeight);
    
    alignSlider = createSlider(0, 5, 5, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);

    /////// mic ///////

    mic = new p5.AudioIn();

    
    // console.log(mic)

    ///////////////////

    
    for(let i = 0; i < boidNum; i++){
        let randId = int(random(1,4));
        if (randId == 2){
            flock.push(new Boids(random(150,255), random(116, 150), 255, randId));
        }
        else if (randId == 3){
            flock.push(new Boids(255,random(115, 180), random(127,180), randId));
        }
        else{
            flock.push(new Boids(random(200,255), random(200,255), random(200,255), randId));
        }
    }
}

function mouseClicked() {
    // for(let i = 0; i < 20; i++){
    //     flock.push(new Boids(random(180,220), random(180,220), random(180,220), 5));
    // }
    mic.start();
}


function draw() {

    /////// mic ///////

    let vol = mic.getLevel();
    let volume = map(vol, 0, 1, 0, 5);

    /////// mic ///////


    background(0,0,0,99);
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
            
            // textSize(20);
            // noStroke();
            // fill('white');
            // textAlign(CENTER);
            // text('Welcome to 1 -> 3!', width/2, height-50);  
    
}