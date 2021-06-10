
var PLAY = 1
var END = 0
var gameState

var score = 0

var bird,pipe,pipe1,
bronze,diamond,silver,gold,
background,gameover,ground,menu,namee,ready,scoreboard,start,restart

var birdImg,bird1Img,pipeImg,pipe1Img,
bronzeImg,diamondImg,silverImg,goldImg,
backgroundImg,gameoverImg,groundImg,nameeImg,readyImg,scoreboardImg,stattImg,restartImg

function preload(){
backgroundImg=loadImage("background.png")
birdImg=loadImage("bird2.png")
bird1Img = loadImage("bird1.png")
groundImg=loadImage("ground.jpg")
pipeImg=loadImage("pipe fcedown.png")
pipe1Img=loadImage("pipe fce up.png")
restartImg=loadImage("restart.jpg")
nameeImg=loadImage("name.jpg")
startImg=loadImage("start.jpg")
}


function setup(){
createCanvas(500,800)



bird = createSprite(200,500,100,50)
bird.addImage("birdy",birdImg)
bird.addImage("birds",bird1Img )
bird.shapeColor = "red"
bird.velocityY =0
bird.scale = 0.3    
//bird.debug = true
bird.setCollider("rectangle",0,0,100,100,0)

restart=createSprite(250,400,50,50)
restart.addImage("rest",restartImg)
restart.scale = 3
restart.visible=false

namee=createSprite(100,30,20,20)
namee.addImage("na",nameeImg)
namee.scale = 2

bronze= createSprite(500,200,50,100)
bronze.shapeColor = "red"

silver= createSprite(50,200,50,100)
silver.shapeColor = "red"

gold= createSprite(250,200,50,100)
gold.shapeColor = "red"

diamond= createSprite(500,200,50,100)
diamond.shapeColor = "red"

ground= createSprite(250,800,500,100)
ground.shapeColor = "red"
ground.addImage(groundImg)
ground.scale = 3.3

gameover= createSprite(500,200,50,100)
gameover.shapeColor = "red"

ready= createSprite(500,200,50,100)
ready.shapeColor = "red"

scoreboard= createSprite(500,200,50,100)
scoreboard.shapeColor = "red"

start= createSprite(250,400,50,100)
start.shapeColor = "red"
start.addImage("star",startImg)
start.scale=4 

pipeGroup = new Group();
pipe1Group = new Group();

score = 0
}


function draw(){

 background(backgroundImg)
 text("Score: "+textSize(20),320,21);

 text("x: "+mouseX+"y: "+mouseY,mouseX,mouseY)

bird.collide(ground)

if(mousePressedOver(start)){
    gameState=PLAY
    start.visible = false
}

if(gameState===PLAY){


    restart.visible=false

    if(bird.isTouching(ground)){
       // console.log("touching ground")
        gameState=END
    }


    if(keyDown("space")){
        bird.velocityY=-6
        bird.changeImage("birds",bird1Img)
    }
     bird.velocityY = bird.velocityY+1
    
     if(keyWentUp("space")){
         bird.changeImage("birdy",birdImg)
     }
    
    spawnpipe();
    spawnpipe1();
    
    if(pipeGroup.isTouching(bird)||pipe1Group.isTouching(bird)){
    
      gameState=END
        
    }
    

}
else if(gameState===END){

    pipeGroup.setVelocityXEach(0)
    pipe1Group.setVelocityXEach(0)

    bird.velocityY=0

    restart.visible=true

if(mousePressedOver(restart)&&gameState===END){
    bird.x=250
  bird.y=400
    reset();
}

  
}

 drawSprites();
}

function reset(){
    pipeGroup.setLifetimeEach(-1)
    pipe1Group.setLifetimeEach(-1)
  gameState=PLAY

  pipeGroup.destroyEach()
 pipe1Group.destroyEach()

 restart.visible=false

}

function spawnpipe() {
    if(frameCount % 100 === 0){
        pipe = createSprite(400,50,20,70)
         pipe.velocityX = -3
         pipe.y = Math.round(random(50,100))
         pipe.addImage("pipes",pipeImg)
         pipe.scale = 0.8
pipe.lifetime= 100
//console.log("spawnpipe")
         pipeGroup.add(pipe)
    }
}

function spawnpipe1(){
    if(frameCount % 100 === 0){
        pipe1 = createSprite(400,347,20,70)
        pipe1.velocityX = -3
        pipe1.y = Math.round(random(600,750))
        pipe1.addImage("pipess",pipe1Img)
        pipe1.scale = 0.8
pipe1.lifetime=100

        pipe1Group.add(pipe1)
   }
}