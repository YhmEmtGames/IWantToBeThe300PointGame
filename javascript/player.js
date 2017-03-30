// Game objects
var gravity = 0.25;

var player = {
  velocity: 0,
	speed: 256, // movement in pixels per second
  jumpspeed: 500,
  onGround: false,
  rigth: true,
  ready: false,
  image: null
};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

function initPlayer(){
  player.image = new Image();
  player.image.src = "images/player.png";
  player.image.onload = function () {
  	player.ready = true;
  };
}

function updatePlayer(modifier){
  if ((32 in keysDown) && (player.onGround)) { // Player holding space
    player.velocity -= 9;
  }
  var movement = 0;
  if (37 in keysDown) { // Player holding left
    movement -= player.speed * modifier;
    if (player.rigth){
      player.rigth = false;
      player.image.src = "images/playerleft.png";
    }
  }
  if (39 in keysDown) { // Player holding right
    movement += player.speed * modifier;
    if (player.rigth == false){
      player.rigth = true;
      player.image.src = "images/player.png";
    }
  }

  if(82 in keysDown) {
    gameOn = false;
  }


  if((player.x <= (goal.x + 28)
    && player.x >= (goal.x - 28))
    && player.y >= goal.y - 28
    && player.y <= goal.y + 28)
    {
      if(curLevel >= levels.length-1)
      {
        var msg = {
          "messageType": "SCORE",
          "score": score
        };
        window.parent.postMessage(msg, "*");
        gameEnded = true;
      }else {
        curLevel++;
        loadLevel(levels[curLevel]);
        reset();
      }
    }
    for(var kk = 0;kk < enemies.length;kk++)
    {
      if((player.x <= (enemies[kk].x + 28)
        && player.x >= (enemies[kk].x - 28))
        && player.y >= enemies[kk].y - 28
        && player.y <= enemies[kk].y + 28)
        {
          reset();
        }
      }
  if (player.y > 600){
    reset();
  }
  player.velocity += gravity;
  player.onGround = false;

  for(var a=0;a < blocks.length; a++)
  {
    if (player.x <= (blocks[a].x + 28)
      && player.x >= (blocks[a].x - 28)
      && (((player.y + player.image.height + player.velocity) > (blocks[a].y) && player.y < (blocks[a].y + 16))
      || ((player.y + player.velocity) < (blocks[a].y + 28) && player.y > blocks[a].y)))
      {
      while((player.y + player.image.height) < blocks[a].y)
      {
        player.y += Math.sign(player.velocity)*1;
      }

      player.velocity = 0;
      player.onGround = true;
    }
  }
  player.y += player.velocity;
  for(var a=0;a < blocks.length; a++)
  {
    if (player.y < (blocks[a].y + 27)
      && player.y + player.image.height > (blocks[a].y + 5)
      &&
      ((((player.x + player.image.width + movement) >= blocks[a].x + 4) && (player.x < blocks[a].x + 4))
      || (player.x + movement <= blocks[a].x + 28 && player.x > blocks[a].x + 28)))
      {
        while((player.x + player.image.width) < blocks[a].x)
        {
          player.x += Math.sign(movement)*1;
        }
        movement = 0;
      }
  }
  player.x += movement;


}
var reset = function () {
  for (var i = 0; i < enemies.length; i++){
    if (enemies[i].name === "enemy2"){
      enemies[i].reset();
    }
  }
  player.x = 16;
	player.y = 500;
  player.velocity = 0;
};
