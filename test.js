//Dungeon Master Prototype 1: Keyboard Controls

//Variables for components
var myGamePiece;
var swordHitbox;

var myHud;

var myWalls = [];

var myBlocks = [];
var myEnemies = [];

var myDeadEnds = [];
var myDoors = [];

var myChest = null;
var myGoals = [];

//HUD variables
var myHearts;
var numHearts = 3;
var myMoney;
var numMoney = 0;
var myKeys;
var numKeys = 0;

//Global variables
var roomX = 0;
var roomY = 0;
var level = 1;
var currentRoom;
var transitionDirection;
var direction = "u"; //FIXME make a part of the myGamePiece component?

//StartGame: Gets called when loaded. Calls the start method of myGameArea and create components
function startGame() {
	
	myGamePiece = new component(30, 30, "red", 225, 325, "Player");
    swordHitbox = new component(0, 0, "blue", 0, 0, "Sword");
	
	myHud = new component(16, 2, "black", 0, 0, "HUD");
	myHearts = new component("30px", "Consolas", "red", 40, 40, "text");
	myMoney = new component("30px", "Consolas", "green", 120, 40, "text");
	myKeys = new component("30px", "Consolas", "blue", 200, 40, "text");
	
	myWalls.push(new component(7, 1, "green", 0, 2));
	myWalls.push(new component(7, 1, "green", 9, 2));
	myWalls.push(new component(7, 1, "green", 0, 12));
	myWalls.push(new component(7, 1, "green", 9, 12));
	myWalls.push(new component(1, 3.5, "green", 0, 3));
	myWalls.push(new component(1, 3.5, "green", 0, 8.5));
	myWalls.push(new component(1, 3.5, "green", 15, 3));
	myWalls.push(new component(1, 3.5, "green", 15, 8.5));

	loadRoom();
	createObjects();
	controls();
	myGameArea.start();
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
		
		//Variable to count frames
		this.frameNo = 0;
		
		//Starts the game
		myGameArea.update();

		//Event listeners to detect keystrokes
		window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },

	//Runs main loop, update game area
	update : function() {
		clearInterval(this.interval);
		this.interval = setInterval(updateGameArea, 20);
	},

	//Runs transition loop
	transition : function() {
		clearInterval(this.interval);
		this.interval = setInterval(updateTransition, 20);
	},

	//Clears the screen
	clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	
	//Ends the game
	stop : function() {
		myGameArea.clear();
		clearInterval(this.interval);
		numHearts = 3;
		numMoney = 0;
		numKeys = 0;
		roomX = 0;
		roomY = 0;
		GoalsFlag = 0;
		window.localStorage.clear();
		deleteObjects();
		startGame();
	},
	
	next : function() {
		myGameArea.clear();
		level = level + 1;
		clearInterval(this.interval);
		numKeys = 0;
		roomX = 0;
		roomY = 0;
		Flag = false;
		window.localStorage.clear()
		deleteObjects();
		startGame();
	}
}

//Control flags for mobile
function controls() {
	this.moveForward = false;
    this.moveBackward = false;
    this.turnLeft = false;
    this.turnRight = false;
    this.shooting = false;
}

//Class that creates a component object.
function component(width, height, color, x, y, type) {
	if(type == "Player" || type == "Sword" || type == "text") {
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
	} 
	else {
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
		if (type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.strokeText(this.text, this.x, this.y)
			ctx.fillText(this.text, this.x, this.y);	
		} 
		else if (type == "Chest"){
			if(currentRoom.chestState == "opened"){
				ctx.fillStyle = "black"
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
			else {
				ctx.fillStyle = color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		}
		else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
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

}

//updateGameArea: Clears screen then updates every frame.
function updateGameArea() {
	//Condition to end game
	if (numHearts < 1) myGameArea.stop();
    
	//Clear screen
    myGameArea.clear();
	
	//Count frames
	myGameArea.frameNo += 1;

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
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -2; } //Left
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 2; }  //Right
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -2; } //Up
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 2; }  //Down
    if (myGameArea.keys && myGameArea.keys[65]) {myGamePiece.speedX = -2; }  //A
    if (myGameArea.keys && myGameArea.keys[68]) {myGamePiece.speedX = 2; }  //D
    if (myGameArea.keys && myGameArea.keys[87]) {myGamePiece.speedY = -2; }  //W
    if (myGameArea.keys && myGameArea.keys[83]) {myGamePiece.speedY = 2; }  //S

	//Update direction variable for Desktop
	if (myGameArea.keys && myGameArea.keys[37]) {direction = "l"; }     //Left
    if (myGameArea.keys && myGameArea.keys[39]) {direction =  "r"; }  //Right
    if (myGameArea.keys && myGameArea.keys[38]) {direction = "u"; }   //Up
    if (myGameArea.keys && myGameArea.keys[40]) {direction = "d"; }   //Down
    if (myGameArea.keys && myGameArea.keys[65]) {direction = "l"; }   //A
    if (myGameArea.keys && myGameArea.keys[68]) {direction =  "r"; }  //D
    if (myGameArea.keys && myGameArea.keys[87]) {direction = "u"; }   //W
    if (myGameArea.keys && myGameArea.keys[83]) {direction = "d"; }   //S

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

	//Sword and enemy Collision
	for (i = 0; i < currentRoom.numEnemies; i += 1) {
		if(swordHitbox.crashWith(myEnemies[i])){
			myEnemies.splice(i,1);
			currentRoom.numEnemies = currentRoom.numEnemies - 1;

		}
	}
	
	//Sword and wall Collision
	for (i = 0; i < myWalls.length; i += 1) {
		if(swordHitbox.crashWith(myWalls[i])){
			swordCollision(myWalls[i]);

		}
	}
	
		//Sword and block Collision
	for (i = 0; i < myBlocks.length; i += 1) {
		if(swordHitbox.crashWith(myBlocks[i])){
			swordCollision(myBlocks[i]);

		}
	}
	
	//Sword and door Collision
	for (i = 0; i < currentRoom.numDoors; i += 1) {
		if(swordHitbox.crashWith(myDoors[i])){
			if(numKeys > 0) {
				myDoors.splice(i,1);
				currentRoom.numDoors = currentRoom.numDoors - 1;
				numKeys = numKeys - 1;
			}
		}
	}
	
	//sword and chest collision
	if(currentRoom.chestState == "unopened"){
		if(swordHitbox.crashWith(myChest)){
			if (currentRoom.chestContents == "heart"){
				numHearts = numHearts + currentRoom.chestValue;
			}
			if (currentRoom.chestContents == "money"){
				numMoney = numMoney + currentRoom.chestValue;
			}
			if (currentRoom.chestContents == "key"){
				numKeys = numKeys + currentRoom.chestValue;
			}
			
			currentRoom.chestState = "opened"
		}
	}

	//Collision with Walls
	for (i = 0; i < myWalls.length; i += 1) {
		if(myGamePiece.crashWith(myWalls[i])){
			solidCollision(myWalls[i], myGamePiece);
		}
	}


	//Collision with Blocks
	for (i = 0; i < myBlocks.length; i += 1) {
		if (myGamePiece.crashWith(myBlocks[i])) {
			solidCollision(myBlocks[i], myGamePiece);
		}
	}
	
	//Collision with deadEnds
	for (i = 0; i < myDeadEnds.length; i += 1) {
		if (myGamePiece.crashWith(myDeadEnds[i])) {
			solidCollision(myDeadEnds[i], myGamePiece);
		}
	}
	
	//Collision with doors
	for (i = 0; i < myDoors.length; i += 1) {
		if (myGamePiece.crashWith(myDoors[i])) {
			solidCollision(myDoors[i], myGamePiece);
			
		}
	}
	
	//Collision with chests
	if (myGamePiece.crashWith(myChest)) {
			solidCollision(myChest, myGamePiece);
		}
		
		//Collision with Goals
	for(i = 0; i < myGoals.length; i+=1) {
		if (myGamePiece.crashWith(myGoals[i])) {
				solidCollision(myGoals[i], myGamePiece);
				myGameArea.next();
			}
	}


	//Collision with enemies
	for (i = 0; i < myEnemies.length; i += 1) {
		if (myGamePiece.crashWith(myEnemies[i])) {
			damageCollision(myEnemies[i], myGamePiece);
			enemyCollision(myGamePiece, myEnemies[i]);
			numHearts = numHearts - 1;
		}
	}
	
	//make enemies move
	enemyMovement();
	
	//Enemy Collision with Walls
	for (i = 0; i < myEnemies.length; i += 1) {
		for (j = 0; j < myWalls.length; j += 1) {
			if (myEnemies[i].crashWith(myWalls[j])) {
				solidCollision(myWalls[j], myEnemies[i]);
			}
		}
	}
	
	//Enemy Collision with Blocks
	for (i = 0; i < myEnemies.length; i += 1) {
		for (j = 0; j < myBlocks.length; j += 1) {
			if (myEnemies[i].crashWith(myBlocks[j])) {
				solidCollision(myBlocks[j], myEnemies[i]);
			}
		}
	}
	
	//Enemy Collision with deadEnds
	for (i = 0; i < myEnemies.length; i += 1) {
		for (j = 0; j < myDeadEnds.length; j += 1) {
			if (myEnemies[i].crashWith(myDeadEnds[j])) {
				solidCollision(myDeadEnds[j], myEnemies[i]);
			}
		}
	}
	
	//Enemy Collision with Walls
	for (i = 0; i < myEnemies.length; i += 1) {
		if (myEnemies[i].crashWith(myChest)) {
			solidCollision(myChest, myEnemies[i]);
		}
	}
	
	//Detect if entering a new room
	if(myGamePiece.y < 45) {
		changeRoom("North");
	}
	if(myGamePiece.y > 375) {
		changeRoom("South")
	}
	if(myGamePiece.x < -15) {
		changeRoom("West")
	}
	if(myGamePiece.x > 465) {
		changeRoom("East")
	}

	//Draw new positions
	myGamePiece.newPos();
    myGamePiece.update();
    
	//update HUD
	myHud.update();
	myHearts.text = numHearts;
	myHearts.update();
	myMoney.text = numMoney;
	myMoney.update();
	myKeys.text = numKeys;
	myKeys.update();

	for (i = 0; i < myWalls.length; i += 1) {
		myWalls[i].update();
	}

	for (i = 0; i < myBlocks.length; i += 1) {
		myBlocks[i].update();
	}
	for (i = 0; i < myEnemies.length; i += 1) {
		myEnemies[i].newPos();
		myEnemies[i].update();
	}
	for (i = 0; i < myDeadEnds.length; i += 1) {
		myDeadEnds[i].newPos();
		myDeadEnds[i].update();
	}
	for (i = 0; i < myDoors.length; i += 1) {
		myDoors[i].newPos();
		myDoors[i].update();
	}
	for (i = 0; i < myGoals.length; i += 1) {
		myGoals[i].update();
	}
	
	myChest.update();	

}

//everyInterval: Returns true if the frameNo is a multiple of the parameter.
function everyInterval(n) {
	if ((myGameArea.frameNo / n) % 1 == 0 ) {return true;}
	return false;
}

function updateTransition() {
	if (transitionDirection == "North") {
		if(myGamePiece.y < 370) {
			myGamePiece.speedY = 6;
			myGamePiece.speedX = 0;
			myGameArea.clear();
			myGamePiece.newPos();
			myGamePiece.update();
		}
		else {
			myGamePiece.speedY = 0;
			myGameArea.update();
		}
	}
	if (transitionDirection == "South") {
		if(myGamePiece.y > 50) {
			myGamePiece.speedY = -6;
			myGamePiece.speedX = 0;
			myGameArea.clear();
			myGamePiece.newPos();
			myGamePiece.update();
		}
		else {
			myGamePiece.speedY = 0;
			myGameArea.update();
		}
	}
	if (transitionDirection == "West") {
		if(myGamePiece.x < 460) {
			myGamePiece.speedX = 6;
			myGamePiece.speedY = 0;
			myGameArea.clear();
			myGamePiece.newPos();
			myGamePiece.update();
		}
		else {
			myGamePiece.speedX = 0;
			myGameArea.update();
		}
	}
	if (transitionDirection == "East") {
		if(myGamePiece.x > -10) {
			myGamePiece.speedX = -6;
			myGamePiece.speedY = 0;
			myGameArea.clear();
			myGamePiece.newPos();
			myGamePiece.update();
		}
		else {
			myGamePiece.speedX = 0;
			myGameArea.update();
		}
	}
}

//solidCollision: sets up collision properties for solid objects
function solidCollision(myObj, myObj2) {
	if((myObj2.x > (myObj.x + myObj.width)-2) || (myObj.x > (myObj2.x + myObj2.width) -2)) {
		if (myObj2.x > myObj.x){
			if(myObj2.speedX < 0){
				myObj2.speedX = 0;
			}
		} else if (myObj2.x < myObj.x){
			if(myObj2.speedX > 0){
				myObj2.speedX = 0;
			}
		}
	}
	
	else if((myObj2.y > (myObj.y + myObj.height) -2) || (myObj.y > (myObj2.y + myObj2.height) -2)){
		if (myObj2.y < myObj.y){
			if(myObj2.speedY > 0){
				myObj2.speedY = 0;
			}
		}
		if (myObj2.y > myObj.y){
			if(myObj2.speedY < 0){
				myObj2.speedY = 0;
			}
		}
	}
}

//damageCollision: sets up collision properties for damaging objects
function damageCollision(myObj, myObj2) {
	if((myObj2.x > (myObj.x + myObj.width)-2) || (myObj.x > (myObj2.x + myObj2.width) -2)) {
		if (myObj2.x > myObj.x){
			if(myObj2.speedX < 0){
				myObj2.speedX = 20;
			}
		} else if (myObj2.x < myObj.x){
			if(myObj2.speedX > 0){
				myObj2.speedX = -20;
			}
		}
	}
	else if((myObj2.y > (myObj.y + myObj.height) -2) || (myObj.y > (myObj2.y + myObj2.height) -2)){
		if (myObj2.y < myObj.y){
			if(myObj2.speedY > 0){
				myObj2.speedY = -20;
			}
		}
		if (myObj2.y > myObj.y){
			if(myObj2.speedY < 0){
				myObj2.speedY = 20;
			}
		}
	}
}

//enemyCollision: sets up collision properties for damaging objects
function enemyCollision(myObj, myObj2) {
	if((myObj2.x > (myObj.x + myObj.width)-2) || (myObj.x > (myObj2.x + myObj2.width) -2)) {
		if (myObj2.x > myObj.x){
			if(myObj2.speedX < 0){
				myObj.speedX = -20;
			}
		} else if (myObj2.x < myObj.x){
			if(myObj2.speedX > 0){
				myObj.speedX = 20;
			}
		}
	}
	else if((myObj2.y > (myObj.y + myObj.height) -2) || (myObj.y > (myObj2.y + myObj2.height) -2)){
		if (myObj2.y < myObj.y){
			if(myObj2.speedY > 0){
				myObj.speedY = 20;
			}
		}
		if (myObj2.y > myObj.y){
			if(myObj2.speedY < 0){
				myObj.speedY = -20;
			}
		}
	}
}

//swordCollision: sets up collision properties for sword collision with objects
function swordCollision(myObj) {
	if((swordHitbox.x > (myObj.x + myObj.width)-2) || (myObj.x > (swordHitbox.x + swordHitbox.width) -2)) {
		if (swordHitbox.x > myObj.x){
			if(swordHitbox.speedX < 0){
				myGamePiece.speedX = 5;
			}
		} else if (swordHitbox.x < myObj.x){
			if(swordHitbox.speedX > 0){
				myGamePiece.speedX = -5;
			}
		}
	}
	else if((swordHitbox.y > (myObj.y + myObj.height) -2) || (myObj.y > (swordHitbox.y + swordHitbox.height) -2)){
		if (swordHitbox.y < myObj.y){
			if(swordHitbox.speedY > 0){
				myGamePiece.speedY = -5;
			}
		}
		if (swordHitbox.y > myObj.y){
			if(swordHitbox.speedY < 0){
				myGamePiece.speedY = 5;
			}
		}
	}
}

function changeRoom(direction) {
	transitionDirection = direction;
	saveRoom();
	deleteObjects();
	myGameArea.transition();
	updateRoom();
	loadRoom();
	createObjects();
}

function createObjects() {
	for (i = 0; i < currentRoom.numBlocks; i += 1) {
		myBlocks.push(new component(1, 1, "green", currentRoom.blockX[i], currentRoom.blockY[i]));
	}

	for (i = 0; i < currentRoom.numEnemies; i += 1) {
		myEnemies.push(new component(1, 1, "orange", currentRoom.enemyX[i], currentRoom.enemyY[i]));
	}
	
	for (i = 0; i < currentRoom.numGoals; i += 1) {
		myGoals.push(new component(1, 1, "pink", currentRoom.goalX[i], currentRoom.goalY[i]));
	}
	
	for (i = 0; i < currentRoom.numDeadEnd; i += 1) {
		if (currentRoom.deadEnd[i] == "n"){
			myDeadEnds.push(new component(2, 1, "green", 7, 2));
		}
		if (currentRoom.deadEnd[i] == "e"){
			myDeadEnds.push(new component(1, 2, "green", 15, 6.5));
		}
		if (currentRoom.deadEnd[i] == "s"){
			myDeadEnds.push(new component(2, 1, "green", 7, 12));
		}
		if (currentRoom.deadEnd[i] == "w"){
			myDeadEnds.push(new component(1, 2, "green", 0, 6.5));
		}
	}
	
	for (i = 0; i < currentRoom.numDoors; i += 1) {
		if (currentRoom.door[i] == "n"){
			myDoors.push(new component(2, 1, "blue", 7, 2));
		}
		if (currentRoom.door[i] == "e"){
			myDoors.push(new component(1, 2, "blue", 15, 6.5));
		}
		if (currentRoom.door[i] == "s"){
			myDoors.push(new component(2, 1, "blue", 7, 12));
		}
		if (currentRoom.door[i] == "w"){
			myDoors.push(new component(1, 2, "blue", 0, 6.5));
		}
	}
    
	myChest = new component(1, 1, "purple", currentRoom.chestX, currentRoom.chestY, "Chest");
}

function deleteObjects() {
	for (i = 0; i < currentRoom.numBlocks; i += 1) {
		myBlocks.pop();
	}
	for (i = 0; i < currentRoom.numEnemies; i += 1) {
		myEnemies.pop();
	}
	for (i = 0; i < currentRoom.numDeadEnd; i += 1) {
		myDeadEnds.pop();
	}
	for (i = 0; i < currentRoom.numDoors; i += 1) {
		myDoors.pop();
	}
	for (i = 0; i < currentRoom.numGoals; i += 1) {
		myGoals.pop();
	}

	myChest = null;
}
	
function saveRoom() {
	text = JSON.stringify(currentRoom);
	localStorage.setItem(myJsonRooms[roomX][roomY], text);
}

function updateRoom(){
	if(transitionDirection == "North") {
		roomY = roomY + 1;
	}
	else if(transitionDirection == "South") {
		roomY = roomY - 1;
	}
	else if(transitionDirection == "East") {
		roomX = roomX + 1;
	}
	else if(transitionDirection == "West") {
		roomX = roomX - 1;
	}
}

function loadRoom() {
	
	if (level == 1){
		rooms1();
	} else if (level == 2){
		myRooms = [];
		myJsonRooms = [];
		rooms2();
	}
	
	if(localStorage.getItem(myJsonRooms[roomX][roomY]) === null) {
		currentRoom = myRooms[roomX][roomY];
	}
	else{
		text = localStorage.getItem(myJsonRooms[roomX][roomY]);
		currentRoom = JSON.parse(text);
	}
}

//Enemy Movement
function enemyMovement() {
	for (i = 0; i < myEnemies.length; i += 1) {
		rndDirection = Math.floor(Math.random() * 4) + 1;
		if(everyInterval(30)){
			if (rndDirection == 1) {
				myEnemies[i].speedX = 0;
				myEnemies[i].speedY = 1;
			}
			if (rndDirection == 2) {
				myEnemies[i].speedX = 0;
				myEnemies[i].speedY = -1;
			}
			if (rndDirection == 3) {
				myEnemies[i].speedY = 0;
				myEnemies[i].speedX = 1;
			}
			if (rndDirection == 4) {
				myEnemies[i].speedY = 0;
				myEnemies[i].speedX = -1;
			}
		}
 	}
}

//starts the game once the page is loaded.
window.addEventListener("load", startGame, false);