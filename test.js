//Dungeon Master Prototype 1: Keyboard Controls

//Variables for components
var myGamePiece;
var swordHitbox;

var myHud;

var myWalls = [];

var myBlock;
var myChest;
var myEnemy;

var direction = "u";

//StartGame: Gets called when loaded. Calls the start method of myGameArea and create components 
function startGame() {
    myGameArea.start();
	myGamePiece = new component(30, 30, "red", 225, 350, "Player");
	
	myHud = new component(16, 2, "black", 0, 0, "HUD")
	
	myWalls.push(new component(7, 1, "green", 0, 2));
	myWalls.push(new component(7, 1, "green", 9, 2));
	myWalls.push(new component(7, 1, "green", 0, 12));
	myWalls.push(new component(7, 1, "green", 9, 12));
	myWalls.push(new component(1, 3.5, "green", 0, 3));
	myWalls.push(new component(1, 3.5, "green", 0, 8.5));
	myWalls.push(new component(1, 3.5, "green", 15, 3));
	myWalls.push(new component(1, 3.5, "green", 15, 8.5));
	
	myBlock = new component(1, 1, "green", 7, 9, "Block");
	myChest = new component(1, 1, "purple", 4, 5, "Chest");
	myEnemy = new component(1, 1, "orange", 10, 7, "Enemy");
	
	controls();
}

//myGameArea: class creates the canvas element and contains the functions to start, clear and stop the game
var myGameArea = {
    canvas : document.createElement("canvas"),
	
	//Create canvas and start game
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 390;
        this.context = this.canvas.getContext("2d");
        var box = document.getElementById("box");
        box.insertBefore(this.canvas, box.childNodes[0]);
		
		
		this.interval = setInterval(updateGameArea, 20);
		
		//Event listeners to detect keystrokes
		window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false; 
        })
    },
	
	//Clears the screen
	clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function controls() {
	this.moveForward = false;
    this.moveBackward = false;
    this.turnLeft = false;
    this.turnRight = false;
    this.shooting = false;
}

//Class that creates a component object.
function component(width, height, color, x, y, type) {
	if(type == "Player" || type == "Sword") {
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;  
	} else {
		this.width = width * 30;
		this.height = height * 30;
		this.x = x * 30;
		this.y = y * 30;  
	}
	this.speedX = 0;
    this.speedY = 0;
	//Draws the component
    this.update = function(){	
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	//Increments the position by components speed
	this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY; 
    } 
	
	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) ||
			(mytop > otherbottom) ||
			(myright < otherleft) ||
			(myleft > otherright)) {
				crash = false;
		}
			return crash;
	}
	
	this.crashSide = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash;
		if (mybottom > othertop) {
			crash = "bottom";
		}if(mytop < otherbottom){
			crash = "top";
		}if(myright > otherleft){
			crash = "right";
		}if(myleft < otherright){
			crash = "left"
		}
		return crash;
	}
}

//updateGameArea: Clears screen then updates every frame.
function updateGameArea() {
	//Clear screen
    myGameArea.clear();
	
	//set myGamePiece initial speed to 0
	myGamePiece.speedX = 0;
    myGamePiece.speedY = 0; 
	
	//Detect touch input and increase speed for Mobile 
    if (controls.turnLeft) {myGamePiece.speedX = -2; }
    if (controls.turnRight) {myGamePiece.speedX = 2; }
    if (controls.moveForward) {myGamePiece.speedY = -2; }
    if (controls.moveBackward) {myGamePiece.speedY = 2; }
	
	//Update direction variable for Mobile
	if (controls.turnLeft) {direction = "l"; }
    if (controls.turnRight) {direction = "r"; }
    if (controls.moveForward) {direction = "u"; }
    if (controls.moveBackward) {direction = "d"; }
	
	//Detect Keystrokes and increase speed for Desktop
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -2; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 2; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -2; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 2; }
	
	//Update direction variable for Desktop
	if (myGameArea.keys && myGameArea.keys[37]) {direction = "l"; }
    if (myGameArea.keys && myGameArea.keys[39]) {direction =  "r"; }
    if (myGameArea.keys && myGameArea.keys[38]) {direction = "u"; }
    if (myGameArea.keys && myGameArea.keys[40]) {direction = "d"; }
	
	
	//Create swordHitbox when spacebar is pressed
	if (controls.shooting || (myGameArea.keys && myGameArea.keys[32])) {
		
		if (direction == "u") {
			swordHitbox = new component(8, 30, "blue", (myGamePiece.x + 3), (myGamePiece.y - 28), "Sword");
		}
		else if (direction == "d") { 
			swordHitbox = new component(8, 30, "blue", (myGamePiece.x + 19), (myGamePiece.y + 28), "Sword");
		}
		else if (direction == "l") {
			swordHitbox = new component(30, 8, "blue", (myGamePiece.x - 28), (myGamePiece.y  + 19), "Sword");
		}
		else if (direction == "r") {
			swordHitbox = new component(30, 8, "blue", (myGamePiece.x + 28), (myGamePiece.y + 3), "Sword");
		}
		
		swordHitbox.speedX = myGamePiece.speedX;
		swordHitbox.speedY = myGamePiece.speedY;
		swordHitbox.newPos();
		swordHitbox.update();
	}
	
	if (myGamePiece.crashWith(myBlock)) {
		if((myGamePiece.x > (myBlock.x + myBlock.width)-2) || (myBlock.x > (myGamePiece.x + myGamePiece.width) -2)) {
			if (myGamePiece.x > myBlock.x){
				if(myGamePiece.speedX < 0){
					myGamePiece.speedX = 0;
				}
			} else if (myGamePiece.x < myBlock.x){
				if(myGamePiece.speedX > 0){
					myGamePiece.speedX = 0;
				}
			}
		}
		else {
			if (myGamePiece.y < myBlock.y){
				if(myGamePiece.speedY > 0){
					myGamePiece.speedY = 0;
				}
			}
			if (myGamePiece.y > myBlock.y){
				if(myGamePiece.speedY < 0){
					myGamePiece.speedY = 0;
				}
			}
		}
      
	}
	
	
	
	
	//Draw new positions
	myGamePiece.newPos();
    myGamePiece.update();
	
	myHud.update();
	
	for (i = 0; i < myWalls.length; i += 1) {
		myWalls[i].update();
	}
	
	myEnemy.newPos();
    myEnemy.update();
	
	myBlock.update();
	myChest.update();
	
	
}


//starts the game once the page is loaded.
window.addEventListener("load", startGame, false);