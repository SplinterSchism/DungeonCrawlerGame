//collision.js
//Jonathan Meehan
//Andrew Ellis


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
				swordHitWall.play();
			}
		} else if (swordHitbox.x < myObj.x){
			if(swordHitbox.speedX > 0){
				myGamePiece.speedX = -5;
				swordHitWall.play();
			}
		}
	}
	else if((swordHitbox.y > (myObj.y + myObj.height) -2) || (myObj.y > (swordHitbox.y + swordHitbox.height) -2)){
		if (swordHitbox.y < myObj.y){
			if(swordHitbox.speedY > 0){
				myGamePiece.speedY = -5;
				swordHitWall.play();
			}
		}
		if (swordHitbox.y > myObj.y){
			if(swordHitbox.speedY < 0){
				myGamePiece.speedY = 5;
				swordHitWall.play();
			}
		}
	}
}