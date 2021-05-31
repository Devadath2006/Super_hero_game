var Hero, HeroImage;
var Obstacle, ObstacleImage;
var StandingPoint, StandingPointImage;
var background1, backgroundImage;
var gameState = "play";

function preload(){
HeroImage1 = loadImage("sprites/Superman_image_1.png");
HeroImage2 = loadImage("sprites/Superman_image_2.png");
ObstacleImage = loadImage("sprites/Obstacle_blade.png");
StandingPointImage = loadImage("sprites/Standing_area.png");
backgroundImage = loadImage("sprites/sky_background_image.png");
}

function setup(){
    createCanvas(600,600)
Hero = createSprite(200,200,20,20);

background1 = createSprite(600,600);
background1.addImage(backgroundImage);
background1.velocityY = 3;

InvisibleBlockGroup = new Group();
StandingPointGroup = new Group();
ObstacleGroup = new Group();
}

function draw(){
background(0);
Hero.addImage(HeroImage1);

if (gameState=== "play"){
    if (background1.y>400){
        background1.y = 300
    }
    if (keyDown("space")){
        Hero.velocityY =  -10;
        Hero.addImage(HeroImage2);
    }

    if(keyDown("left_arrow")){
        Hero.x = Hero.x - 3;
    }

    if(keyDown("right_arrow")){
        Hero.x = Hero.x + 3;
    }

}
spawnObstacles();
spawnStandingArea();


if (Hero.isTouching(ObstacleGroup)|| Hero.y > 600){
    Hero.velocityY = 0;
    Hero.destroy();

    gameState = "end";
}

drawSprites();

if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250);
}


}

function spawnStandingArea(){
if (frameCount%200===0){

var StandingPoint = createSprite(150,-20);
var InvisibleBlock = createSprite(150,-10);

StandingPoint.x = Math.round(random(120,300));
StandingPoint.addImage(StandingPointImage);
InvisibleBlock.x = StandingPoint.x;
StandingPoint.velocityY = 2;
InvisibleBlock.velocityY = 2;

StandingPoint.lifeTime = 500;
InvisibleBlock.lifeTime = 500;

StandingPointGroup.add(StandingPoint);
InvisibleBlockGroup.add(InvisibleBlock);
}
}

function spawnObstacles(){
 if (frameCount%250===0){
    Obstacle = createSprite(250,300);

    Obstacle.x = Math.round(random(120, 250));
    Obstacle.addImage(ObstacleImage);

    Obstacle.velocityY = 2;

    Obstacle.lifeTime = 600;

    ObstacleGroup.add(Obstacle);
 }
}
