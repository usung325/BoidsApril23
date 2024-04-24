let flock = [];

function setup() {
  createCanvas(400, 400);
  
  // translate(width/2, height/2);
  for(let i = 0; i < 50; i++){
    let b = new Boids(flock, random(width), random(height));
    flock.push(b);
  }
  console.log(flock);
}

function draw() {
  background(240);
  for(let boid of flock){
    boid.show();
    boid.update(boid);
    // boid.rule1();
  }

}
