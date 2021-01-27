const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var particles = [];
var plinkos = [];
var divisions = [];
var particle;

var divisionHeight = 250;
var score = 0;
var turn = 0;
var gameState = "play";

function setup(){
  var canvas = createCanvas(730,750);
  
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);
  // g2 = new Ground(width/2,460,width,10);
  g3 = new Ground(2,height/2,10,height);
  g4 = new Ground(726,height/2,10,height);
  g5 = new Ground(width/2,2,width,10);
  for(var k=15; k <= width; k=k+78){
   divisions.push(new Divisions(k,height-divisionHeight/2,10,divisionHeight));
   // divisions[k].display();
  }

  for(var j = 45;j<= width ;j=j+50){
    plinkos.push(new Plinko(j,75));
  }

  for(var j = 30;j<= width ;j=j+50){
    plinkos.push(new Plinko(j,175));
  }

  for(var j = 45;j<= width ;j=j+50){
    plinkos.push(new Plinko(j,275));
  }

  for(var j = 30;j<= width ;j=j+50){
    plinkos.push(new Plinko(j,375));
  }

  console.log(turn);
  console.log(gameState);
}

function draw() {
  background(0);
  Engine.update(engine);

  textSize(20);
  fill(255);
  text("500",35,600);
  text("500",115,600);
  text("500",190,600);
  text("100",270,600);
  text("100",350,600);
  text("100",425,600);
  text("200",505,600);
  text("200",580,600);
  text("200",665,600);
  textSize(25);
  fill("aqua")
  text("Score: "+ score,30,35);
  text("Turn: " + turn,610,35);

  if(gameState == "end"){
    gameOver();
  }
  
  for(var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {
   divisions[k].display();
  }
  fill("yellow");
  rect(width/2,460,width,10);
  // g2.display();
  fill("brown");
  ground.display();
  g3.display();
  g4.display();
  g5.display();

  if(particle!= null){
    particle.display();

    if(particle.body.position.y > 465){
      if(particles.body.position.x < 250){
        score = score+500;
        particle = null;
        if(turn>= 5){
          gameState = "end";
        }
      }

      else if(particles.body.position.x > 250 && particle.body.position.x < 485){
        score = score+100;
        particle = null;
        if(turn>= 5){
          gameState = "end";
        }
      }

      else if(particles.body.position.x > 485 && particles.body.position.x < 750){
        score = score+200;
        particle = null;
        if(turn>= 5){
          gameState = "end";
        }
      }
    }
  }
}


function mousePressed(){
  if(gameState!=="end"){
    turn++;
    particle = new Particle(mouseX,10,10,10);
  }
}

function gameOver(){
    strokeWeight(2);
    stroke("pink");
    textSize(45);
    fill("aqua");
    text("Game Over", width/2,height/2);
}
