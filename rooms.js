function rooms1() {
	room1 = { 
	"numBlocks":12, "blockX":[9, 9, 9, 9, 9, 9, 8, 7, 6, 5, 2, 1], "blockY":[3, 4, 5, 6, 7, 8, 8, 8, 8, 8, 8, 8],
	"numEnemies":2, "enemyX":[3, 12], "enemyY":[7, 5],
	"door":["n"], "numDoors":1,
	"deadEnd":["s","w"], "numDeadEnd":2};
	
	room2 = { 
	"numBlocks":16, "blockX":[1, 4, 5, 5, 5, 1, 4, 5, 5, 5, 11, 11, 11, 11, 11, 11], "blockY":[9, 9, 9, 10, 11, 5, 5, 5, 4, 3, 3, 4, 5, 6, 7, 8],
	"numEnemies":2, "enemyX":[5, 13], "enemyY":[7, 7], 
	"chestX":1, "chestY": 11, "chestState":"unopened", "chestContents":"heart", "chestValue":1,
	"deadEnd":["w"], "numDeadEnd":1};
	
	room3 = { 
	"numBlocks":22, "blockX":[1, 2, 3, 4, 4, 4, 4, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11, 10, 9, 8, 7], "blockY":[5, 5, 5, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9, 8, 7, 6, 6, 6, 6, 6],
	"numEnemies":3, "enemyX":[4, 6, 13], "enemyY":[11, 4, 8], 
	"chestX":10, "chestY":8, "chestState":"unopened", "chestContents":"key", "chestValue":1,
	"deadEnd":["s","e"], "numDeadEnd":2};
	
	room4 = { 
	"numBlocks":15, "blockX":[5, 5 , 5, 5, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11, 11], "blockY":[11, 10, 9, 8, 7, 7, 7, 7, 7, 7, 7, 8, 9, 10, 11],
	"numEnemies":1, "enemyX":[8], "enemyY":[8], 
	"deadEnd":["e"], "numDeadEnd":1};
	
	room5 = {
	"numBlocks":16, "blockX":[5, 5, 5, 5, 6, 6, 6, 6, 9, 9, 9, 9, 10, 10, 10, 10], "blockY":[6, 5, 4, 3, 6, 5, 4, 3, 6, 5, 4, 3, 6, 5, 4, 3],
	"numEnemies":2, "enemyX":[2,13], "enemyY":[4,4],
	"door":["n"], "numDoors":1,
	"deadEnd":["w"], "numDeadEnd":1};
	
	room6 = { 
	"numBlocks":16, "blockX":[4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 6, 11, 11, 11, 11, 11], "blockY":[11, 10, 9, 8, 7, 6, 5, 4, 3, 7, 7, 11, 10, 9, 8, 7],
	"numEnemies":2, "enemyX":[7,13], "enemyY":[4,9], 
	"chestX":2, "chestY":3, "chestState":"unopened", "chestContents":"money", "chestValue":20};
	
	room7 = {
	"numBlocks":18, "blockX":[5, 5, 4, 3, 3, 3, 4, 5, 6, 10, 10, 11, 12, 12, 12, 11, 10, 9], "blockY":[11, 10, 9, 8, 7, 6, 5, 4, 3, 11, 10, 9, 8, 7, 6, 5, 4, 3],
	"deadEnd":["w", "e"], "numDeadEnd":2,
	"chestX":11, "chestY":7, "chestState":"unopened", "chestContents":"money", "chestValue":100,
	"numGoals":1, "goalX":[4], "goalY":[7]};

	
	room8 = { 
	"numBlocks":10, "blockX":[1, 2, 3, 4, 1, 2, 3, 4], "blockY":[9, 9, 9, 9, 5, 5, 5, 5],
	"numEnemies":3, "enemyX":[6, 9, 12], "enemyY":[7, 7, 7], 
	"deadEnd":["e", "s"], "numDeadEnd":2};
	
	room9 = { 
	"numBlocks":27, "blockX":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 3, 3, 3, 3, 12, 12, 12, 12, 6, 7, 8, 9, 9, 9, 9], "blockY":[9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 7, 6, 5, 8, 7, 6, 5, 6, 6, 6, 6, 5, 4, 3],
	"numEnemies":5, "enemyX":[1, 5, 8, 13, 13], "enemyY":[7, 4, 8, 4, 11],
	"chestX":8, "chestY":4, "chestState":"unopened", "chestContents":"heart", "chestValue":1,
	"deadEnd":["e", "n"], "numDeadEnd":2};
	
	room10 = { 
	"numBlocks":9, "blockX":[9, 9, 9, 9, 9, 9, 9, 9, 9], "blockY":[3, 4, 5, 6, 7, 8, 9, 10, 11],
	"numEnemies":1, "enemyX":[4], "enemyY":[7],
	"chestX":10, "chestY":7, "chestState":"unopened", "chestContents":"key", "chestValue":1,
	"deadEnd":["w", "n"], "numDeadEnd":2};
	
	myRooms = [[room1, room2, room5, room7],[room3, room4, room6,  room10], [ , , room8, room9]];
	myJsonRooms = [["room1", "room2", "room5", "room7"], ["room3", "room4", "room6", "room10"], ["", "", "room8", "room9"]];
}

function rooms2() {
	room1 = {
	"numEnemies":5, "enemyX":[1, 5, 8, 13, 13], "enemyY":[7, 4, 8, 4, 11]}
	
	myRooms = [[room1]];
	myJsonRooms = [["room1"]];

}