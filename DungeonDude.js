//DungeonDude.js
//Jonathan Meehan
//Andrew Elis

//Control Variables
var numHearts = 3;
var numKeys = 0;
var numMoney = 0;
var level = 1;
var enemySpeed = 1;

//Variables for components
var myBackground;
var myBlackScreen;
var screen;

var myGamePiece;
var swordHitbox;

var myHud;

var myWalls = [];
var myEnemyWalls = [];
var myBlocks = [];

var myEnemies = [];
var myBoss = [];
var bossDmg = 0;

var myDeadEnds = [];
var myDoors = [];

var myChest = null;
var myGoals = [];

//Animation Variables
var spriteFrame = 0;
var enemyFrame = 0;
var bossFrame = 0;
var portalFrame = 0;
var bossLeft;
var bossRight;

//HUD variables
var myHearts;
var myHeartIcon;

var myMoney;
var myMoneyIcon;

var myKeys;
var myKeyIcon;

var myHighScore;
var myHighScoreIcon;

//Sound Variables
var levelMusic;
var swordHitWall;
var enemyHitPlayer;
var playerHitEnemy;
var swordHitChest;
var openDoor;
var heartPickup;
var keyPickup;
var moneyPickup;
var nextLevelTeleport;
var bossGrunt;
var bossDeath;

//Misc. variables
var roomX = 0;
var roomY = 0;

var currentRoom;
var transitionDirection;
var direction = "u";

var opacity = 0;
var titleFlag = true;

//Set up high score
var highScore;
if(localStorage.getItem("HighScore") === null) {
		highScore = 0;
} else {
	text = localStorage.getItem("HighScore");
	highScore = JSON.parse(text);
}
window.localStorage.clear();
text = JSON.stringify(highScore);
localStorage.setItem("HighScore", text);


//StartGame: Gets called when loaded. Calls the start method of myGameArea and create components
function startGame() {
	
	myBackground = new component(480, 330, "images/Background.png", 0, 60, "Background");
	myBlackScreen = new component(480, 390, "images/BlackScreen.png", 0 , 0, "BlackScreen");
	myGamePiece = new component(22, 32, "images/DungeonMan.png", 225, 325, "Player");
    swordHitbox = new component(0, 0, "blue", -5, -5, "Sword");
	
	//Hud Components
		myHud = new component(16, 2, "black", 0, 0, "HUD");
		//Hearts
		myHeartIcon = new component(26, 24, "images/Heart.png", 12, 20, "Icon");
		myHearts = new component("30px", "Consolas", "red", 40, 40, "text");
		//Keys
		myKeyIcon = new component(44, 40, "images/Key.png", 80, 10, "Icon");
		myKeys = new component("30px", "Consolas", "blue", 120, 40, "text");
		//Money
		myMoneyIcon = new component(26, 24, "images/Coin.png", 160, 20, "Icon");
		myMoney = new component("30px", "Consolas", "green", 190, 40, "text");
		//High Score
		myHighScoreIcon = new component("15px", "Consolas", "yellow", 320, 15, "text");
		myHighScore = new component("30px", "Consolas", "yellow", 350, 40, "text");
	
	myWalls.push(new component(7, 1, "green", 0, 2));
	myWalls.push(new component(7, 1, "green", 9, 2));
	myWalls.push(new component(7, 1, "green", 0, 12));
	myWalls.push(new component(7, 1, "green", 9, 12));
	myWalls.push(new component(1, 3.5, "green", 0, 3));
	myWalls.push(new component(1, 3.5, "green", 0, 8.5));
	myWalls.push(new component(1, 3.5, "green", 15, 3));
	myWalls.push(new component(1, 3.5, "green", 15, 8.5));
	
	myEnemyWalls.push(new component(2, 1, "green", 7, 1));
	myEnemyWalls.push(new component(2, 1, "green", 7, 13));
	myEnemyWalls.push(new component(1, 2, "green", -1, 6.5));
	myEnemyWalls.push(new component(1, 2, "green", 16, 6.5));
	
	
	//Sounds
	swordHitWall = new sound("sounds/SwordHitWall.mp3");
	enemyHitPlayer = new sound("sounds/EnemyHitPlayer.mp3");
	enemyHitPlayer.sound.volume = 0.5;
	playerHitEnemy = new sound("sounds/PlayerHitEnemy.mp3");
	playerHitEnemy.sound.volume = 0.5;
	swordHitChest = new sound("sounds/SwordHitChest.mp3");
	openDoor = new sound("sounds/OpenDoor.mp3");
	heartPickup = new sound("sounds/heartPickup.mp3");
	keyPickup = new sound("sounds/keyPickup.mp3");
	moneyPickup = new sound("sounds/moneyPickup.mp3");
	nextLevelTeleport = new sound("sounds/nextLevelTeleport.mp3");
	bossGrunt = new sound("sounds/bossGrunt.wav");
	bossDeath = new sound("sounds/bossDeath.wav");
	
	if (level == 1) {
		levelMusic = new sound("music/TavernJig.wav");
	}
	if (level == 2) {
		levelMusic = new sound("music/Outcast.mp3");
	}
	if (level == 3) {
		levelMusic = new sound("music/Entombed.mp3");
	}
	levelMusic.sound.volume = 0.05;
	levelMusic.sound.loop = true;
	
	
	levelMusic.play();
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
		
		//To prevent the spacebar, up arrow, down arrow from scrolling the page.
		window.onkeydown = function(e) {
			if (e.keyCode == 32 && e.target == document.body) {
				e.preventDefault(); 
			}
			if (e.keyCode == 38 && e.target == document.body) {
				e.preventDefault(); 
			}
			if (e.keyCode == 40 && e.target == document.body) {
				e.preventDefault(); 
			}
		};

		//Event listeners to detect keystrokes
		window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
		
		if (titleFlag) {
			titleFlag = false;
		screen = new component(480, 390, "images/Title.png", 0 , 0, "LevelScreen");
		this.interval = setInterval(titleScreen);
		} else {
			//Starts the game
			myGameArea.update();
		}

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
		window.localStorage.clear();
		
		
		if (numMoney > highScore) {
			highScore = numMoney;
		}
		
		text = JSON.stringify(highScore);
		localStorage.setItem("HighScore", text);
		
		numHearts = 3;
		numMoney = 0;
		numKeys = 0;
		roomX = 0;
		roomY = 0;
		bossDmg = 0;
		deleteObjects();
		//Stop Music
		levelMusic.stop();
		
		screen = new component(480, 390, "images/GameOver.png", 0 , 0, "LevelScreen");
		
		this.interval = setInterval(showScreen);
	},
	
	next : function() {
		myGameArea.clear();
		level = level + 1;
		if (level == 4) {
			enemySpeed = enemySpeed + .5;
			level = 1;
		}
		clearInterval(this.interval);
		numKeys = 0;
		roomX = 0;
		roomY = 0;
		bossDmg = 0;
		window.localStorage.clear()
		text = JSON.stringify(highScore);
		localStorage.setItem("HighScore", text);
		deleteObjects();
		myGoals.splice(0,1);
		levelMusic.stop();
		
		this.interval = setInterval(nextLevel);
		
	},
	
	level : function() {
		clearInterval(this.interval);
		
		if (level == 1) {
			screen = new component(480, 390, "images/Level1.png", 0 , 0, "LevelScreen");
		}
		else if (level == 2) {
			screen = new component(480, 390, "images/Level2.png", 0 , 0, "LevelScreen");
		}
		else if (level == 3) {
			screen = new component(480, 390, "images/Level3.png", 0 , 0, "LevelScreen");
		}
		
			
		this.interval = setInterval(showScreen);
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

///////////////////////////////////////////
//Class that creates a component object.///
function component(width, height, color, x, y, type) {
	this.type = type;
	this.image = new Image();
	this.image.src = color;
	if(type == "Player" || type == "Sword" || type == "text" || type == "Background" || type == "BlackScreen" || type == "LevelScreen" || type == "Icon") {
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
	} else if (type == "Enemy") {
		this.width = width;
		this.height = height;
		this.x = x * 30;
		this.y = y * 30;
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
		
		if(type == "Background"){
			ctx.drawImage(this.image, 
				this.x, this.y, 
				this.width, this.height);
		}
		else if(type == "Player"){
			ctx.drawImage(this.image, 
				(spriteFrame * this.width), 0,
				this.width, this.height,
				this.x, this.y,
				this.width, this.height);
		}
		else if(type == "Enemy"){
			ctx.drawImage(this.image, 
				(enemyFrame * this.width), 0,
				this.width, this.height,
				this.x, this.y,
				this.width, this.height);
		}
		else if(type == "Boss"){
			ctx.drawImage(this.image, 
				(bossFrame * this.width), 0,
				this.width, this.height,
				this.x, this.y,
				this.width, this.height);
		}
		else if(type == "Goal"){
			ctx.drawImage(this.image, 
				(portalFrame * this.width), 0,
				this.width, this.height,
				this.x, this.y,
				this.width, this.height);
		}
		else if (type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.strokeText(this.text, this.x, this.y)
			ctx.fillText(this.text, this.x, this.y);	
		} 
		else if(type == "Sword" || type == "Block" || type == "DeadEnd" || type == "Door" || type == "BlackScreen" || type == "Icon"){
			ctx.drawImage(this.image, 
				this.x, this.y,
				this.width, this.height);
		}
		else if (type == "LevelScreen"){
			ctx.save();
			ctx.globalAlpha = opacity;
			ctx.drawImage(this.image,
				this.x, this.y,
				this.width, this.height);
			ctx.restore();
		}
		else if (type == "Chest"){
			if(currentRoom.chestState == "opened"){
				this.image.src = "images/Opened.png"
			}
			ctx.drawImage(this.image, 
				this.x, this.y,
				this.width, this.height);
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
	
	//Detect Collision
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

//Class for sound object
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
	this.loop = false;
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

/////////////////////////////////////////////////////////////
//updateGameArea: Clears screen then updates every frame.////
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
    
	//Animate enemies
	animateEnemy();
	animatePortal();
	if (bossLeft) {
		animateBossLeft();
	} else if (bossRight) {
		animateBossRight();
	}
	
	//Detect Keystrokes
	
	//Left Keys
    if ((myGameArea.keys && myGameArea.keys[37]) || (myGameArea.keys && myGameArea.keys[65]) || (controls.turnLeft)) {
		myGamePiece.speedX = -2;
		direction = "l"; 
		if (!(controls.shooting || (myGameArea.keys && myGameArea.keys[32])) 
			&& !((myGameArea.keys && myGameArea.keys[38]) || (myGameArea.keys && myGameArea.keys[87]) || (controls.moveForward)) 
			&& !((myGameArea.keys && myGameArea.keys[40]) || (myGameArea.keys && myGameArea.keys[83]) || (controls.moveBackward))) 
		{
			animateLeft();
		}
	}
	
	//Right Keys
    if ((myGameArea.keys && myGameArea.keys[39]) || (myGameArea.keys && myGameArea.keys[68]) || (controls.turnRight)) {
		myGamePiece.speedX = 2; 
		direction =  "r"; 
		if (!(controls.shooting || (myGameArea.keys && myGameArea.keys[32])) 
			&& !((myGameArea.keys && myGameArea.keys[38]) || (myGameArea.keys && myGameArea.keys[87]) || (controls.moveForward))
			&& !((myGameArea.keys && myGameArea.keys[40]) || (myGameArea.keys && myGameArea.keys[83]) || (controls.moveBackward))) 
		{
			animateRight();
		}
	}
	
	//Up Keys
    if ((myGameArea.keys && myGameArea.keys[38]) || (myGameArea.keys && myGameArea.keys[87]) || (controls.moveForward)) {
		myGamePiece.speedY = -2; 
		direction = "u";
		if (!(controls.shooting || (myGameArea.keys && myGameArea.keys[32]))) {
			animateUp();
		}
	} 
	
	//Down Keys
    if ((myGameArea.keys && myGameArea.keys[40]) || (myGameArea.keys && myGameArea.keys[83]) || (controls.moveBackward)) {
		myGamePiece.speedY = 2; 
		direction = "d";
		if (!(controls.shooting || (myGameArea.keys && myGameArea.keys[32]))) {
			animateDown();
		}
	}
	
	//Update Background Image
	myBackground.update();
	
    //Create swordHitbox when spacebar is pressed
	if (controls.shooting || (myGameArea.keys && myGameArea.keys[32])) {

		if (direction == "u") {
			swordHitbox = new component(4, 20, "images/SwordUp.png", (myGamePiece.x + 9), (myGamePiece.y - 20), "Sword");
			if ((myGameArea.keys && myGameArea.keys[38]) || (myGameArea.keys && myGameArea.keys[87]) || (controls.moveForward)) {
				animateSwordUp();				
			}
			else {
				spriteFrame = 10;
			}
		}
		else if (direction == "d") {
			swordHitbox = new component(4, 20, "images/SwordDown.png", (myGamePiece.x + 9), (myGamePiece.y + 32), "Sword");
			if ((myGameArea.keys && myGameArea.keys[40]) || (myGameArea.keys && myGameArea.keys[83]) || (controls.moveBackward)) {
				animateSwordDown();
			}
			else {
				spriteFrame = 8;
			}
		}
		else if (direction == "l") {
			swordHitbox = new component(20, 4, "images/SwordLeft.png", (myGamePiece.x - 20), (myGamePiece.y  + 15), "Sword");
			if ((myGameArea.keys && myGameArea.keys[37]) || (myGameArea.keys && myGameArea.keys[65]) || (controls.turnLeft)) {
				animateSwordLeft();
			}
			else {
				spriteFrame = 14;
			}
		}
		else if (direction == "r") {
			swordHitbox = new component(20, 4, "images/SwordRight.png", (myGamePiece.x + 22), (myGamePiece.y + 15), "Sword");
			if ((myGameArea.keys && myGameArea.keys[39]) || (myGameArea.keys && myGameArea.keys[68]) || (controls.turnRight)) {
				animateSwordRight();
			}
			else {
				spriteFrame = 12;
			}
		}
		swordHitbox.speedX = myGamePiece.speedX;
		swordHitbox.speedY = myGamePiece.speedY;
		swordHitbox.newPos();
		swordHitbox.update();
		
	} else if ((direction == "u") && !((myGameArea.keys && myGameArea.keys[38]) || (myGameArea.keys && myGameArea.keys[87]) || (controls.moveForward))){
		spriteFrame = 2;
	} else if ((direction == "d") && !((myGameArea.keys && myGameArea.keys[40]) || (myGameArea.keys && myGameArea.keys[83]) || (controls.moveBackward))){
		spriteFrame = 0;
	} else if ((direction == "l") && !((myGameArea.keys && myGameArea.keys[37]) || (myGameArea.keys && myGameArea.keys[65]) || (controls.turnLeft))){
		spriteFrame = 6;
	} else if ((direction == "r") && !((myGameArea.keys && myGameArea.keys[39]) || (myGameArea.keys && myGameArea.keys[68]) || (controls.turnRight))){
		spriteFrame = 4;
	} 
	

	//Sword and enemy Collision
	for (i = 0; i < currentRoom.numEnemies; i += 1) {
		if(swordHitbox.crashWith(myEnemies[i])){
			myEnemies.splice(i,1);
			currentRoom.numEnemies = currentRoom.numEnemies - 1;
			playerHitEnemy.play();
		}
	}
	
	//Sword and wall Collision
	for (i = 0; i < myWalls.length; i += 1) {
		if(swordHitbox.crashWith(myWalls[i])){
			swordCollision(myWalls[i]);
			swordHitbox = new component(0, 0, "blue", -5, -5, "Sword");
		}
	}
	
	//Sword and block Collision
	for (i = 0; i < myBlocks.length; i += 1) {
		if(swordHitbox.crashWith(myBlocks[i])){
			swordCollision(myBlocks[i]);
			swordHitbox = new component(0, 0, "blue", -5, -5, "Sword");
		}
	}
	
	//Sword and dead end Collision
	for (i = 0; i < myDeadEnds.length; i += 1) {
		if(swordHitbox.crashWith(myDeadEnds[i])){
			swordCollision(myDeadEnds[i]);
			swordHitbox = new component(0, 0, "blue", -5, -5, "Sword");
		}
	}
	
	//Sword and door Collision
	for (i = 0; i < currentRoom.numDoors; i += 1) {
		if(swordHitbox.crashWith(myDoors[i])){
			if(numKeys > 0) {
				myDoors.splice(i,1);
				currentRoom.numDoors = currentRoom.numDoors - 1;
				numKeys = numKeys - 1;
				openDoor.play();
			}
		}
	}
	
	//sword and chest collision
	if(currentRoom.chestState == "unopened"){
		if(swordHitbox.crashWith(myChest)){
			swordHitChest.play();
			if (currentRoom.chestContents == "heart"){
				numHearts = numHearts + currentRoom.chestValue;
				heartPickup.play();
			}
			if (currentRoom.chestContents == "money"){
				numMoney = numMoney + currentRoom.chestValue;
				moneyPickup.play();
			}
			if (currentRoom.chestContents == "key"){
				numKeys = numKeys + currentRoom.chestValue;
				keyPickup.play();
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
				nextLevelTeleport.play();
			}
	}


	//Collision with enemies
	for (i = 0; i < myEnemies.length; i += 1) {
		if (myGamePiece.crashWith(myEnemies[i])) {
			damageCollision(myEnemies[i], myGamePiece);
			enemyCollision(myGamePiece, myEnemies[i]);
			numHearts = numHearts - 1;
			enemyHitPlayer.play();
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
	
	//Enemy Collision with Enemy Walls
	for (i = 0; i < myEnemies.length; i += 1) {
		for (j = 0; j < myEnemyWalls.length; j += 1) {
			if (myEnemies[i].crashWith(myEnemyWalls[j])) {
				solidCollision(myEnemyWalls[j], myEnemies[i]);
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
	
	//Enemy Collision with doors
	for (i = 0; i < myEnemies.length; i += 1) {
		for (j = 0; j < myDoors.length; j += 1) {
			if (myEnemies[i].crashWith(myDoors[j])) {
				solidCollision(myDoors[j], myEnemies[i]);
			}
		}
	}
	
	//Enemy Collision with Chests
	for (i = 0; i < myEnemies.length; i += 1) {
		if (myEnemies[i].crashWith(myChest)) {
			solidCollision(myChest, myEnemies[i]);
		}
	}
	
	//Make boss move
	bossMovement();
	
	//Boss Collision with Walls
	for (i = 0; i < myBoss.length; i += 1) {
		for (j = 0; j < myWalls.length; j += 1) {
			if (myBoss[i].crashWith(myWalls[j])) {
				solidCollision(myWalls[j], myBoss[i]);
			}
		}
	}
	
	//Boss Collision with deadEnds
	for (i = 0; i < myBoss.length; i += 1) {
		for (j = 0; j < myDeadEnds.length; j += 1) {
			if (myBoss[i].crashWith(myDeadEnds[j])) {
				solidCollision(myDeadEnds[j], myBoss[i]);
			}
		}
	}

	//Collision with Boss
	for (i = 0; i < myBoss.length; i += 1) {
		if (myGamePiece.crashWith(myBoss[i])) {
			damageCollision(myBoss[i], myGamePiece);
			enemyCollision(myGamePiece, myBoss[i]);
			numHearts = numHearts - 1;
		}
	}
	
	//Sword and boss Collision
	for (i = 0; i < currentRoom.numBoss; i += 1) {
		if(swordHitbox.crashWith(myBoss[i])){
			bossDmg = bossDmg + 1;
			animateBossDamage();
			bossGrunt.play();
			console.log(bossDmg);
			if(bossDmg >= 100 * enemySpeed) {
				bossDeath.play();
				myBoss.splice(i,1);
				currentRoom.numBoss = currentRoom.numBoss - 1;
				numKeys = numKeys + 1;
				myGoals.push(new component(1, 1, "images/Portal.png", currentRoom.goalX = 11, currentRoom.goalY = 7, "Goal"));
			}
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
		myHighScoreIcon.text = "High Score:";
		myHighScore.text = highScore;
		myHighScore.update();
		//Icons
		myMoneyIcon.update();
		myKeyIcon.update();
		myHeartIcon.update();
		myHighScoreIcon.update();

	//Update objects
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
	for (i = 0; i < myBoss.length; i += 1) {
		myBoss[i].newPos();
		myBoss[i].update();
	}
	
	if (!(myChest === null)) {
		myChest.update();	
	}

}

/////////////////////////////////////////
//END of updateGameArea//////////////////


//everyInterval: Returns true if the frameNo is a multiple of the parameter.
function everyInterval(n) {
	if ((myGameArea.frameNo / n) % 1 == 0 ) {return true;}
	return false;
}


//Enemy Movement
function enemyMovement() {
	for (i = 0; i < myEnemies.length; i += 1) {
		rndDirection = Math.floor(Math.random() * 4) + 1;
		if(everyInterval(30 * (1/enemySpeed))){
			if (rndDirection == 1) {
				myEnemies[i].speedX = 0;
				myEnemies[i].speedY = 1  * enemySpeed;
			}
			if (rndDirection == 2) {
				myEnemies[i].speedX = 0;
				myEnemies[i].speedY = -1* enemySpeed;
			}
			if (rndDirection == 3) {
				myEnemies[i].speedY = 0;
				myEnemies[i].speedX = 1* enemySpeed;
			}
			if (rndDirection == 4) {
				myEnemies[i].speedY = 0;
				myEnemies[i].speedX = -1* enemySpeed;
			}
		}
 	}
}

//Boss Movement
function bossMovement() {
	for (i = 0; i < myBoss.length; i += 1) {
		rndDirection = Math.floor(Math.random() * 4) + 1;
		if(everyInterval(30)){
			if (rndDirection == 1) {
				myBoss[i].speedX = -1;
				myBoss[i].speedY = 1;
				bossLeft = true;
				bossRight = false;
			}
			if (rndDirection == 2) {
				myBoss[i].speedX = 1;
				myBoss[i].speedY = -1;
				animateBossRight();
				bossLeft = false;
				bossRight = true;
			}
			if (rndDirection == 3) {
				myBoss[i].speedY = 1;
				myBoss[i].speedX = 1;
				bossLeft = false;
				bossRight = true;
			}
			if (rndDirection == 4) {
				myBoss[i].speedY = -1;
				myBoss[i].speedX = -1;
				bossLeft = true;
				bossRight = false;
			}
		}
 	}
}

//room transition sequnce
function updateTransition() {
	
	myGameArea.clear();
	myBlackScreen.update();
	
	if (transitionDirection == "North") {
		if(myGamePiece.y < 370) {
			myGamePiece.speedY = 6;
			myGamePiece.speedX = 0;
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
			myGamePiece.newPos();
			myGamePiece.update();
		}
		else {
			myGamePiece.speedX = 0;
			myGameArea.update();
		}
	}
	
}

//level change sequence
function nextLevel() {
	myGameArea.clear();
	myBlackScreen.update();
	
	
	if(myGamePiece.y > 30) {
			myGamePiece.speedY = -1;
			myGamePiece.speedX = 0;
			myGamePiece.newPos();
			myGamePiece.update();
			animateSpin();
	}
	else {
		myGameArea.level();
	}
	
}

//screen fade in
function showScreen() {
	opacity = opacity + 0.01;
	screen.update();
	
	if (opacity > 5){
		opacity = 0;
		startGame();
	}
}

//Title screen sequence
function titleScreen() {
	opacity = 1;
	screen.update();
	
	if ((myGameArea.keys && myGameArea.keys[37]) || (myGameArea.keys && myGameArea.keys[65]) ||(controls.turnLeft)          //Left
		|| (myGameArea.keys && myGameArea.keys[39]) || (myGameArea.keys && myGameArea.keys[68]) || (controls.turnRight)     //Right
		|| (myGameArea.keys && myGameArea.keys[38]) || (myGameArea.keys && myGameArea.keys[87]) || (controls.moveForward)   //Up
		|| (myGameArea.keys && myGameArea.keys[40]) || (myGameArea.keys && myGameArea.keys[83]) || (controls.moveBackward)  //Down
		|| (controls.shooting) || (myGameArea.keys && myGameArea.keys[32])) {                                                //Sword
		
			opacity = 0;
			
			//Starts the game
			myGameArea.update();
		}
}

//starts the game once the page is loaded.
window.addEventListener("load", startGame, false);