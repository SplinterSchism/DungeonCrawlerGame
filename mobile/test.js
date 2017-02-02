//Dungeon Master Prototype 1: Keyboard Controls

//Variables for components
var myGamePiece;
var swordHitbox;
var direction;

//StartGame: Gets called when loaded. Calls the start method of myGameArea and create components 
function startGame() {
    myGameArea.start();
	myGamePiece = new component(30, 30, "red", 10, 120);
}

//myGameArea: class creates the canvas element and contains the functions to start, clear and stop the game
var myGameArea = {
    canvas : document.createElement("canvas"),
	
	//Create canvas and start game
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
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

//Class that creates a component object.
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
	this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;  
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
}

//updateGameArea: Clears screen then updates every frame.
function updateGameArea() {
	//Clear screen
    myGameArea.clear();
	
	//set myGamePiece initial speed to 0
	myGamePiece.speedX = 0;
    myGamePiece.speedY = 0; 
	
	//Detect Keystrokes and increase speed
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -2; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 2; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -2; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 2; }
	
	//Update direction variable
	if (myGameArea.keys && myGameArea.keys[37]) {direction = "l"; }
    if (myGameArea.keys && myGameArea.keys[39]) {direction =  "r"; }
    if (myGameArea.keys && myGameArea.keys[38]) {direction = "u"; }
    if (myGameArea.keys && myGameArea.keys[40]) {direction = "d"; }
	
	
	//Create swordHitbox when spacebar is pressed
	if (myGameArea.keys && myGameArea.keys[32]) {
		
		if (direction == "u") {
			swordHitbox = new component(8, 30, "blue", (myGamePiece.x + 3), (myGamePiece.y - 28));
		}
		else if (direction == "d") { 
			swordHitbox = new component(8, 30, "blue", (myGamePiece.x + 19), (myGamePiece.y + 28));
		}
		else if (direction == "l") {
			swordHitbox = new component(30, 8, "blue", (myGamePiece.x - 28), (myGamePiece.y  + 19));
		}
		else if (direction == "r") {
			swordHitbox = new component(30, 8, "blue", (myGamePiece.x + 28), (myGamePiece.y + 3));
		}
		
		swordHitbox.speedX = myGamePiece.speedX;
		swordHitbox.speedY = myGamePiece.speedY;
		swordHitbox.newPos();
		swordHitbox.update();
	}
	
	//Draw new positions
	myGamePiece.newPos();
    myGamePiece.update();
}

//Hide address bar
window.scrollTo(0,1);

//starts the game once the page is loaded.
window.addEventListener("load", startGame, false);