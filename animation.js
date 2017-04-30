//animations.js
//Andrew Ellis

function animateDown() {
	
	if (spriteFrame != 0 && spriteFrame != 1) {
		spriteFrame = 0;
	}
	
	if (everyInterval(5)) {
		spriteFrame = myGameArea.frameNo % 2;
	}
}

function animateUp() {
	
	if (spriteFrame != 2 && spriteFrame != 3) {
		spriteFrame = 2;
	}
	
	if (everyInterval(5)) {
		spriteFrame = myGameArea.frameNo % 2;
		spriteFrame = spriteFrame + 2;
	}
}

function animateRight() {
	
	if (spriteFrame != 4 && spriteFrame != 5) {
		spriteFrame = 4;
	}
	
	if (everyInterval(5)) {
		spriteFrame = myGameArea.frameNo % 2;
		spriteFrame = spriteFrame + 4;
	}
}

function animateLeft() {
	
	if (spriteFrame != 6 && spriteFrame != 7) {
		spriteFrame = 6;
	}
	
	if (everyInterval(5)) {
		spriteFrame = myGameArea.frameNo % 2;
		spriteFrame = spriteFrame + 6;
	}
}

function animateSwordDown() {
	
	if (spriteFrame != 8 && spriteFrame != 9) {
		spriteFrame = 8;
	}
	
	if (everyInterval(5)) {
		spriteFrame = myGameArea.frameNo % 2;
		spriteFrame = spriteFrame + 8;
	}
}

function animateSwordUp() {
	
	if (spriteFrame != 10 && spriteFrame != 11) {
		spriteFrame = 10;
	}
	
	if (everyInterval(5)) {
		spriteFrame = myGameArea.frameNo % 2;
		spriteFrame = spriteFrame + 10;
	}
}

function animateSwordRight() {
	
	if (spriteFrame != 12 && spriteFrame != 13) {
		spriteFrame = 12;
	}
	
	if (everyInterval(5)) {
		spriteFrame = myGameArea.frameNo % 2;
		spriteFrame = spriteFrame + 12;
	}
}

function animateSwordLeft() {
	
	if (spriteFrame != 14 && spriteFrame != 15) {
		spriteFrame = 14;
	}
	
	if (everyInterval(5)) {
		spriteFrame = myGameArea.frameNo % 2;
		spriteFrame = spriteFrame + 14;
	}
}

function animateEnemy() {
	
	if (everyInterval(15)) {
		enemyFrame = myGameArea.frameNo % 2;
	}
}

function animateBossRight() {
	if (everyInterval(5)) {
		bossFrame = myGameArea.frameNo % 4;
	}

}

function animateBossLeft() {
	if (everyInterval(5)) {
		bossFrame = myGameArea.frameNo % 4;
		bossFrame = bossFrame + 4;
	}
}

function animateBossDamage() {
	if (everyInterval(10)) {
		bossFrame = myGameArea.frameNo % 8;
		bossFrame = bossFrame + 8;
	}
}

function animatePortal() {
	if (everyInterval(15)) {
		portalFrame = myGameArea.frameNo % 2;
	}
}

function animateSpin() {
	if (spriteFrame == 0) {
		spriteFrame = 4;
	}
	else if (spriteFrame == 4) {
		spriteFrame = 2;
	}
	else if (spriteFrame == 2) {
		spriteFrame = 6;
	}
	else if (spriteFrame == 6) {
		spriteFrame = 0;
	}
	else {
		spriteFrame = 0
	}
}