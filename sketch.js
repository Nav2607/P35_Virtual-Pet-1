//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;

function preload(){
  //load images here
  dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref ('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,300);
  dog.addImage(dogImg);
  dog.scale = 0.5;
}


function draw() {  
  background(46,139,87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  //add styles here
  fill("blue");
  textSize(20);
  stroke(5);
  text("Press Up Arrow Kew To Feed drago milk", 80, 100);
  text("You have: " + foodS + " Milk left", 100, 70);
  console.log(foodS);
}

function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}