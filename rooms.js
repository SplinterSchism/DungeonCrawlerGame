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
	"numBlocks":9, "blockX":[5, 5, 5, 6, 7, 8, 9, 9, 9], "blockY":[3, 4, 5, 5, 5, 5, 5, 4, 3],
	"numEnemies":1, "enemyX":[11], "enemyY":[7],
	"chestX":6, "chestY":4, "chestState":"unopened", "chestContents":"key", "chestValue":1,
	"deadEnd":["w", "s"], "numDeadEnd":2};
	
	room2 = {
	"numBlocks":8, "blockX":[11, 12, 13, 14, 11, 12, 13, 14], "blockY":[5, 5, 5, 5, 9, 9, 9, 9],
	"numEnemies":3, "enemyX":[6, 8, 8], "enemyY":[7, 9, 5],
	"chestX":14, "chestY":3, "chestState":"unopened", "chestContents":"heart", "chestValue":1,
	"door":["n"], "numDoors":1,
	"deadEnd":["s"], "numDeadEnd":1};
	
	room3 = {
	"numBlocks":18, "blockX":[3, 3, 3, 3, 3, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11], "blockY":[3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 7, 6],
	"numEnemies":4, "enemyX":[7, 7, 7, 13], "enemyY":[4, 7, 10, 6],
	"deadEnd":["s", "e"], "numDeadEnd":2};
	
	room4 = {
	"numBlocks":13, "blockX":[5, 5, 5, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9], "blockY":[11, 10, 9, 8, 8, 8, 8, 8, 7, 6, 5, 4, 3],
	"numEnemies":2, "enemyX":[12, 7], "enemyY":[9, 5],
	"chestX":4, "chestY":11, "chestState":"unopened", "chestContents":"money", "chestValue":50};
	
	room5 = {
	"numBlocks":7, "blockX":[9, 9, 9, 9, 9, 9, 9], "blockY":[3, 6, 7, 8, 9, 10, 11],
	"numEnemies":1, "enemyX":[12], "enemyY":[7],
	"chestX":12, "chestY":11, "chestState":"unopened", "chestContents":"heart", "chestValue":2,
	"deadEnd":["n", "e"], "numDeadEnd":2};

	room6 = {
	"numBlocks":16, "blockX":[5, 5, 5, 5, 5, 5, 6, 7, 8, 9, 10, 10, 10, 10, 10, 10], "blockY":[3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3],
	"chestX":7, "chestY":9, "chestState":"unopened", "chestContents":"key", "chestValue":1,
	"deadEnd":["s", "e", "w"], "numDeadEnd":3};
	
	room7 = {
	"numBlocks":12, "blockX":[1, 2, 3, 4, 5, 6, 9, 9, 9, 9, 9, 9], "blockY":[5, 5, 5, 5, 5, 5, 3, 4, 5, 9, 10, 11],
	"numEnemies":2, "enemyX":[4, 12], "enemyY":[8, 7],
	"deadEnd":["w"], "numDeadEnd":1};
	
	room8 = {
	"numBlocks":18, "blockX":[5, 5, 4, 3, 3, 3, 4, 5, 6, 10, 10, 11, 12, 12, 12, 11, 10, 9], "blockY":[11, 10, 9, 8, 7, 6, 5, 4, 3, 11, 10, 9, 8, 7, 6, 5, 4, 3],
	"numEnemies":4, "enemyX":[6, 6, 9, 9], "enemyY":[6, 8, 6, 8],
	"chestX":11, "chestY":7, "chestState":"unopened", "chestContents":"money", "chestValue":100,
	"door":["n"], "numDoors":1,
	"deadEnd":["w", "e"], "numDeadEnd":2};
	
	room9 = {
	"numBlocks":28, "blockX":[1, 2, 3, 4, 5, 5, 5, 1, 2, 3, 4, 5, 5, 5, 10, 10, 10, 11, 12, 13, 14, 10, 10, 10, 11, 12, 13, 14], "blockY":[9, 9, 9, 9, 9, 10, 11, 5, 5, 5, 5, 5, 4, 3, 11, 10, 9, 9, 9, 9, 9, 3, 4, 5, 5, 5, 5, 5],
	"deadEnd":["w", "s"], "numDeadEnd":2};
	
	room10 = {
	"numBlocks":9, "blockX":[9, 10, 11, 12, 13, 12, 11, 10, 9], "blockY":[11, 10, 9, 8, 7, 6, 5, 4, 3],
	"numEnemies":5, "enemyX":[6, 6, 6, 9, 9], "enemyY":[9, 7, 5, 9, 5],
	"chestX":12, "chestY":7, "chestState":"unopened", "chestContents":"key", "chestValue":1,
	"deadEnd":["e", "s", "n"], "numDeadEnd":3};
	
	room11 = {
	"numBlocks":20, "blockX":[4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 11, 11, 11, 11], "blockY":[11, 10, 8, 9, 8, 7, 6, 5, 4, 3, 8, 7, 6, 5, 4, 3, 11, 10, 9, 8],
	"numEnemies":2, "enemyX":[3, 12], "enemyY":[5, 5],
	"chestX":13, "chestY":11, "chestState":"unopened", "chestContents":"heart", "chestValue":2,
	"deadEnd":["e", "n"], "numDeadEnd":2};
	
	room12 = {
	"numBlocks":14, "blockX":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], "blockY":[11, 10, 9, 8, 7, 6, 6, 6, 6, 7, 8, 9, 10, 11],
	"numEnemies":2, "enemyX":[2, 12], "enemyY":[5, 5],
	"deadEnd":["n"], "numDeadEnd":1,
	"numGoals":1, "goalX":[7], "goalY":[7]};
	
	room13 = {
	"numBlocks":12, "blockX":[4, 4, 4, 4, 5, 6, 7, 8, 9, 9, 9, 9], "blockY":[5, 6, 7, 8, 8, 8, 8, 8, 8, 9, 10, 11],
	"numEnemies":3, "enemyX":[12, 6, 5], "enemyY":[9, 4, 10],
	"chestX":8, "chestY":9, "chestState":"unopened", "chestContents":"heart", "chestValue":2,
	"deadEnd":["n", "w"], "numDeadEnd":2};
	
	room14 = {
	"numEnemies":10, "enemyX":[2, 2, 4, 6, 6, 9, 9, 11, 13, 13], "enemyY":[5, 9, 7, 5, 9, 9, 5, 7, 9, 5],
	"chestX":1, "chestY":11, "chestState":"unopened", "chestContents":"money", "chestValue":50,
	"deadEnd":["e", "w"], "numDeadEnd":2};
	
	room15 = {
	"numBlocks":23, "blockX":[6, 6, 6, 6, 6, 6, 6, 6, 6, 10, 10, 10, 11, 12, 13, 14, 10, 10, 10, 11, 12, 13, 14], "blockY":[3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 10, 9, 9, 9, 9, 9, 3, 4, 5, 5, 5, 5, 5],
	"door":["e"], "numDoors":1,
	"deadEnd":["w"], "numDeadEnd":1};

	
	myRooms = [[room1, room15, room14, room13], [room2, room7, room8, room12], [room3, room4, room9, room11], [room6, room5, room10]];
	myJsonRooms = [["room1", "room15", "room14", "room13"], ["room2", "room7", "room8", "room12"], ["room3", "room4", "room9", "room11"], ["room6", "room5", "room10"]];

}

function rooms3() {

	room1 = {
	"numBoss":1, "bossX":[5], "bossY":[6],
	"door":["n"], "numDoors":1,
	"deadEnd":["s","w", "e"], "numDeadEnd":3};
	

	room2 = {"numGoals":1, "goalX":[7], "goalY":[7]};
	
	myRooms = [[room1, room2]];
	myJsonRooms = [["room1", "room2"]];
}