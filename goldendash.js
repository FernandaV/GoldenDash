/*eslint-env browser */
// Set Up Variables
var canvas;
var context;
var WIDTH = 600;
var HEIGHT = 400;

var player = new Sprite();
var score = 0;

var splashScreenImage = new Image();
var splashScreenClicked = false;
splashScreenImage.src = "images/SplashScreen_FernandaV4761.png";


var backgroundImage = new Image();
backgroundImage.src = "images/Background_FernandaV4761.png";

var collectableImage = new Image();
collectableImage.src = "images/goodcollectables.png";

var enemyImage = new Image();
enemyImage.src = "images/badcollectables.png";

var playerImage = new Image();
playerImage.src = "images/GoldenDashHeart.png";

var enemySound = new Audio('sounds/enemySound.wav')
var collectableSound = new Audio('sounds/collectableSound.wav')

var health = 100;
var message2 = "Health:" + health; 
var scrollSpeed = 2;
var totalCollectables = 150;
var totalEnemies = 50;
var sceneLength = 5000;
var goalx = 1000;
var goalImage = new Image();
goalImage.src = 'images/GoalScreen_FernandaV4761.png';
goalImage.onLoad = function () {
    context.drawImage(goalImage, 69, 50);
}

//Declare an array variable called collectables. the opening and closing square brackets '[]' mean array in javascript
var collectables = [];
//Use a for loop to fill the array with collectable items
for (var i = 0; i < totalCollectables; i++) {
    collectables.push(new Sprite());
    collectables[i].x = Math.random() * sceneLength;
    collectables[i].y = Math.random() * 400;
    collectables[i].width = 25;
    collectables[i].height = 25;
}
//Declare an array variable called enemies.
var enemies = [];
//Use a for loop to fill the array with enemy items
for (var j = 0; j < totalEnemies; j++) {
    enemies.push(new Sprite());
    enemies[j].x = Math.random() * sceneLength;
    enemies[j].y = Math.random() * 400;
    enemies[j].width = 40;
    enemies[j].height = 40;
}

// Set Up Functions
function init (){
    // Get reference to canvas
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext('2d');
    //Call the update function every 10 milliseconds
setInterval(update, 10);
//Call the function movePlayer when the mouse moves
canvas.onmousemove = movePlayer;
//Listen for player click on splash screen
canvas.onmousedown = canvasClicked; 
function canvasClicked(event) {
  splashScreenClicked = true;
}
}

function update() {
	//Draw splash screen
context.drawImage(splashScreenImage, 0, 0);
//Check if the user has clicked to start playing
if(splashScreenClicked){

    //Clear canvas
clear();
 
context.drawImage(backgroundImage, 0, 0);

context.drawImage(goalImage, goalx, 0);
goalx -= scrollSpeed;

if(goalx == 0){
    //When the player reaches the goal, open the victory page
    window.open("00_victoryScreen.html", "_self");
}

//Draw collectables
for (var i = 0; i < totalCollectables; i++) {
    var collectable = collectables[i];
    collectable.x -= scrollSpeed;
    if (collectable.isVisible == true) {
        context.drawImage(collectableImage, collectable.x, collectable.y);
    }
 
    //Check for collisions between the player and collectable. Also check if the collectable is visible
    if(collectable.isVisible & collides(player, collectable)){
    score ++;
//Change the collectable's visibility to false so that it only get picked up once
	collectable.isVisible = false;
	collectableSound.play();

    }
}
//Draw enemies
for (var j = 0; j < totalEnemies; j++) {
    var enemy = enemies[j];
    enemy.x -= scrollSpeed;
    if (enemy.isVisible == true) {
    context.drawImage(enemyImage, enemy.x, enemy.y);

    }
 
    //Check for collisions between the player and enemy. Also check if the enemy is visible
    if(enemy.isVisible & collides(player, enemy)){
	//If a collision occurs and the enemy is visible, decrease the score
    health = health - 20;
    //Change the enemy visibility to false
    enemy.isVisible = false;
    enemySound.play();
    if(health < 1) {
     window.open("00_gameOverScreen.html", "_self");
}
}

}


//Draw player
context.drawImage(playerImage, player.x, player.y);
    
    //Score text font and color
context.font = "25px serif";
context.fillStyle = "#F6546A";



//health text box
context.font = "25px serif";
context.fillStyle = "#000000";
message2 = "Health: " + health;
context.fillText (message2, 5, 60); 
//end health text box

} //closing for if(splashScreenClicked)
} //End update function
function clear() {
 context.clearRect(0, 0, WIDTH, HEIGHT);
}
function Sprite() {
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 50;
    this.isVisible = true;
}
function movePlayer(event) {
    player.x = event.pageX - canvas.offsetLeft;
    player.y = event.pageY - canvas.offsetTop;
  
}
//Check if object a and object b are colliding
function collides(a, b) {
   var val = false;
 
   val = (a.x < b.x + b.width) &&
   (a.x + a.width > b.x) &&
   (a.y < b.y + b.height) &&
   (a.y + a.height > b.y);
 
   return val;        
}
//Call the init function as soon as the page has finished loading
window.onload = init;


