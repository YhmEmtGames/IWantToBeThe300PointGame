// Create the canvas
var gameEnded = false;
	//"use strict";
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
document.body.appendChild(canvas);

var score = 3000;
var displayScore = score;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.jpg";
/*
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
	playerReady = true;
};
playerImage.src = "images/player.png";
*/

// Tile image
var tileReady = false;
var tileImage = new Image();
tileImage.onload = function () {
	tileReady = true;
};
tileImage.src = "images/tile.jpg";

// Goal image
var goalReady = false;
var goalImage = new Image();
goalImage.onload = function () {
	goalReady = true;
};
goalImage.src = "images/goal.png"

// Enemy1 image
var enemy1Ready = false;
var enemy1Image = new Image();
enemy1Image.onload = function () {
	enemy1Ready = true;
};
enemy1Image.src = "images/enemy1.png"

var startReady = false;
var startImage = new Image();
startImage.onload = function () {
	startReady = true;
}
startImage.src = "images/starter.png"

// Enemy2 image
var enemy2Ready = false;
var enemy2Image = new Image();
enemy2Image.onload = function () {
	enemy2Ready = true;
};
enemy2Image.src = "images/enemy2.png"

// Handle keyboard controls
var keysDown = {};

var blocks = [];
var enemies = [];

var goal = {
	x: -32,
	y: 0
};

var initGame = function() {
	score = 3000
	curLevel = 0;
	gameEnded = false;
	loadLevel(levels[curLevel]);
	reset();
	initPlayer();
};

// Reset the game when the player catches a monster

// Update game objects
var update = function (modifier) {
	if(player.ready){
		updatePlayer(modifier);
	}
		for(var i=0; i < enemies.length; i++){
			if (enemies[i].name === "enemy1"){
				enemies[i].updateEnemy1();
			}
			else if (enemies[i].name === "enemy2"){
				enemies[i].updateEnemy2();
			}
		}

};

// Draw everything
var render = function () {
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (bgReady) {
		context.drawImage(bgImage, 0, 0);
	}
	if(!gameEnded)
	{
		if (gameOn){
			if (player.ready){
				context.drawImage(player.image, player.x, player.y);
			}

			if (goalReady) {
				if (curLevel === levels.length-1){
					goalImage.src = "images/300.png";
				}
				context.drawImage(goalImage, goal.x, goal.y);
			}
			for(var i=0;i < blocks.length; i++){
				if(tileReady) {
					context.drawImage(tileImage,blocks[i].x,blocks[i].y);
				}
			}
			for(var j=0; j < enemies.length; j++){

				if (enemies[j].name === "enemy1"){
					if(enemy1Ready){
						context.drawImage(enemy1Image, enemies[j].x, enemies[j].y);
					}
				}
				else {
					if(enemy2Ready && enemies[j].falling === true){
						context.drawImage(enemy2Image, enemies[j].x, enemies[j].y);
					}

				}
			}
			// Score
			context.fillStyle = "rgb(250, 250, 250)";
			context.font = "24px Helvetica";
			context.textAlign = "left";
			context.textBaseline = "top";
			context.fillText("Score:" + displayScore,0,0);
		}
		else {
			context.fillStyle = "rgb(250, 250, 250)";
			context.font = "24px Helvetica";
			context.textAlign = "left";
			context.textBaseline = "top";
			context.fillText("The evil assistants have kidnapped your 300 points and are hiding in space!",0,100);
			context.fillText("They have tried to hide their tracks but are fortunately failed at that, and ",0,150);
			context.fillText("have left portals, which they used to escape, behind.",0,175);
			context.fillText("Unfortunately those evil bastard have also left traps on your way, WATCH OUT!!",0,225);
			context.fillText("Can you follow the portals and rescue your well earned 300 points??",0,275)
			context.fillText("Are you woman (or man) enough to do it!?",0,300)
			context.fillText("PRESS START ('S') WHEN YOU ARE READY TO FIND OUT",0,450);
			if (startReady){
					context.drawImage(startImage,700,300);
			}
		}
	} else {
		context.fillStyle = "rgb(250, 250, 250)";
		context.font = "24px Helvetica";
		context.textAlign = "center";
		context.textBaseline = "center";
		context.fillText("Woohoo!\n Score:" + displayScore,canvas.width/2,canvas.height/2);
		if (startReady){
			context.drawImage(startImage,0,0);
			context.drawImage(startImage,0,300);
			context.drawImage(startImage,700,0);
			context.drawImage(startImage,700,300);
		}
	}
};

// The main game loop
var gameOn = false;
var main = function () {
	var now = Date.now();
	var delta = now - then;
	if (!gameOn){
		if (83 in keysDown){
			initGame();
			gameOn = true;
		}
	}
	else if(!gameEnded){
		update(delta / 1000);
		score -= delta*0.008;
		displayScore = score.toFixed(0)
	}
	else {
		  if(82 in keysDown) {
				gameOn = false;
		  }
	}
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
