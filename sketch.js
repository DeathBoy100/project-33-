 const Engine = Matter.Engine;
 const World = Matter.World;
 const Events = Matter.Events;
 const Bodies = Matter.Bodies;
 
var particle = null, grnd;
var plinkos = [];
var division = [];
var turn = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var divisionHeight=300;
var score =0;
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  grnd = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     division.push(new Division(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75,10));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175,10));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275,10));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375,10));
    }
  
}
 
function draw() {
  background("black");
  Engine.update(engine);
  if(gameState === PLAY){
  textSize(20)
  stroke("red")
  fill("orange")
  text("Score : "+score,20,30);
  stroke("blue")
  fill("red")
  text("500",22,550)
  text("500",105,550)
  text("500",185,550)
  text("500",260,550)
  text("200",340,550)
  text("200",420,550)
  text("200",500,550)
  text("100",580,550)
  text("100",660,550)
  text("100",740,550)

  
 
  grnd.display()
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   
   for (var k = 0; k < division.length; k++) {
     
     division[k].display();
   
   }

  if(particle !== null){
     particle.display()
     if(particle.body.position.y > 760){
       if(particle.body.position.x < 300){
         score = score+500
         particle = null
       } else if(particle.body.position.x > 300 && particle.body.position.x < 601){
        score = score + 200
        particle=null;
      } else if(particle.body.position.x > 601 && particle.body.position.x < 800){
        score = score + 100
        particle=null;
      }
       
         if(turn >= 5){
          gameState = END
        }
       }
     }
  } else if(gameState === END){
    textSize(30)
    text("GAME OVER",200,400)
    text("YOU SCORED " + score + " POINTS",100,500)
  }
}

function mousePressed(){
  if(gameState !== END){
    turn++
    particle = new Particle(mouseX,10,10)
  }
}