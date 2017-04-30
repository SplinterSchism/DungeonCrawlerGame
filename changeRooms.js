//changeRooms.js
//Andrew Ellis

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
		myBlocks.push(new component(1, 1, "images/Block.png", currentRoom.blockX[i], currentRoom.blockY[i], "Block"));
	}

	for (i = 0; i < currentRoom.numEnemies; i += 1) {
		myEnemies.push(new component(25, 30, "images/Enemy.png", currentRoom.enemyX[i], currentRoom.enemyY[i], "Enemy"));
	}
	
	for (i = 0; i < currentRoom.numGoals; i += 1) {
		myGoals.push(new component(1, 1, "images/Portal.png", currentRoom.goalX[i], currentRoom.goalY[i], "Goal"));
	}
	for (i = 0; i < currentRoom.numBoss; i += 1) {
		myBoss.push(new component(3, 3, "images/Boss.png", currentRoom.bossX[i], currentRoom.bossY[i], "Boss"));
	}
	
	for (i = 0; i < currentRoom.numDeadEnd; i += 1) {
		if (currentRoom.deadEnd[i] == "n"){
			myDeadEnds.push(new component(2, 1, "images/DeadEndNorth.png", 7, 2, "DeadEnd"));
		}
		if (currentRoom.deadEnd[i] == "e"){
			myDeadEnds.push(new component(1, 2, "images/DeadEndEast.png", 15, 6.5, "DeadEnd"));
		}
		if (currentRoom.deadEnd[i] == "s"){
			myDeadEnds.push(new component(2, 1, "images/DeadEndSouth.png", 7, 12, "DeadEnd"));
		}
		if (currentRoom.deadEnd[i] == "w"){
			myDeadEnds.push(new component(1, 2, "images/DeadEndWest.png", 0, 6.5, "DeadEnd"));
		}
	}
	
	for (i = 0; i < currentRoom.numDoors; i += 1) {
		if (currentRoom.door[i] == "n"){
			myDoors.push(new component(2, 1, "images/DoorNorth.png", 7, 2, "Door"));
		}
		if (currentRoom.door[i] == "e"){
			myDoors.push(new component(1, 2, "images/DoorEast.png", 15, 6.5, "Door"));
		}
		if (currentRoom.door[i] == "s"){
			myDoors.push(new component(2, 1, "images/DoorSouth.png", 7, 12, "Door"));
		}
		if (currentRoom.door[i] == "w"){
			myDoors.push(new component(1, 2, "images/DoorWest.png", 0, 6.5, "Door"));
		}
	}
    
	myChest = new component(1, 1, "images/Chest.png", currentRoom.chestX, currentRoom.chestY, "Chest");
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
	for (i = 0; i < currentRoom.numBoss; i += 1) {
		myBoss.pop();
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
	} else if (level == 3){
		myRooms = [];
		myJsonRooms = [];
		rooms3();
	}
	
	if(localStorage.getItem(myJsonRooms[roomX][roomY]) === null) {
		currentRoom = myRooms[roomX][roomY];
	}
	else{
		text = localStorage.getItem(myJsonRooms[roomX][roomY]);
		currentRoom = JSON.parse(text);
	}
}