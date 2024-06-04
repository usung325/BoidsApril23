//implementing 1->3
//works with boids12js

const flock = [];
let qTree;
let isPaused = false;

let alignSlider, cohesionSlider, separationSlider;

let capacity = 100;
let checkRange = 20;
let boidNum = 3000;

let xStart = 0;


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


    background(0,115,127,99);
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
            textAlign(CENTER);
            // text('Welcome to 1 -> 3!', width/2, height-50);  


    ///// text ///////

    for (let x = xStart; x < width; x += 170) { //use a for loop to draw the line of text multiple times down the vertical axis
        
        fill(200,150,187); //create a gradient by associating the fill color with the y location of the text
        text('Welcome to 1->3!', -x + 700, 100); //display text
      }
      xStart--; //move the starting point of the loop up to create the scrolling animation, yStart-- is the same as yStart = yStart -1 or yStart-=1

      text('Feel free to take a seat and try some of our board games :)', width/2, height - 100)
    }