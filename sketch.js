//Create variables here
var dog, Happydog, normalDog;
var database;
var foodS, foodStock;
function preload()
{
  //load images here
  Happydog = loadImage("images/Dog.png");
  normalDog = loadImage("images/happydog.png");
}

function setup() {
	createCanvas(800, 700);
  dog = createSprite(400,350,50,50);
  dog.addImage(Happydog);
  dog.scale = 0.5;
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(normalDog);
  }

  drawSprites();
  //add styles here
  textSize(18);
  stroke("blue");
  text("Note: Press UP_ARROW to feed Drago milk!",300,50);
  text(foodS,50,350);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
   x = 0;
  } else {
    x = x - 1; 
  }

  database.ref('/').update({
    food: x
  })
}



