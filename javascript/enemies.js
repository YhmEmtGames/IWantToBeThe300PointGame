// NOTE ENEMIES CAN GET SPEED VALUES 1,2,4,8,16,32 NOTHING ELSE!


var Enemy1 = function() {
  this.name = "enemy1"
  this.x = null;
  this.y = null;
  this.minx = null;
  this.maxx = null;
  this.speed = 2;
  this.direction = true;
};

Enemy1.prototype.initTiles = function() {
  this.minx = this.x;
  this.maxx = this.x;

  tiles = [];
  // Collecting tiles that are at 1 lower Y-coordinate
  for(var i=0; i < blocks.length; i++){
    if (blocks[i].y === this.y+32){
      var good = true;
      for (var j=0; j < blocks.length; j++){
        if (j === i){}
        else if (blocks[j].x === blocks[i].x && blocks[i].y === blocks[j].y+32){
          good = false;
        }
      }
      if (good){
        tiles.push(blocks[i].x);
      }
    }
  }
  var multiple = false;
  for(var j = 0; j < tiles.length-1; j++){
    if (tiles[j]+32 != tiles[j+1]){
      multiple = true;
    }
  }
  // Doing the path where enemy can move
  // Consistant checking that how many place in the map are where
  // tiles are next to each other and there are at the same hight as this enemy
  var consistant = [];
  // Start and End marks the indec of starting and ending point of tilewall
  var start = 0;
  var end = 0;
  // Just checking how much tiles are next to eachother
  for(var j=0; j < tiles.length; j++) {
    if (tiles[j]+32 === tiles[j+1]){
      end += 1;
    }
    else {
      consistant[consistant.length] = {"start": start, "end": end};
      if (multiple){
        end++;
      }
      start = j+1;
    }
  }
    // Checking where the enemy can move
    for (var k=0; k < consistant.length; k++){
      var min = tiles[consistant[k].start];
      var max = tiles[consistant[k].end];
      if (this.x >= min && this.x <= max){
        this.maxx = max;
        this.minx = min;
        break;
      }
    }
}

Enemy1.prototype.updateEnemy1 = function() {
  if (this.maxx === this.minx+32){
    return;
  }
  if (this.direction){
    if(this.x === this.maxx){
      this.direction = false;
    }
    else {
      this.x += this.speed;
    }
  }
  else {
     if(this.x === this.minx){
       this.direction = true;
     }
     else {
       this.x -= this.speed;
     }
  }
};


var Enemy2 = function() {
  this.name = "enemy2";
  this.origy = null;
  this.x = null;
  this.y = null;
  this.speed = 2;
  this.falling = false;
}

Enemy2.prototype.reset = function() {
  this.y = this.origy;
  this.falling = false;
  this.speed = 2;
}

Enemy2.prototype.updateEnemy2 = function() {
  if(this.y > 600){
    return;
  }
  if(this.falling){
    this.y += this.speed;
    this.speed += gravity;
    return;
  }
  if((player.x >= this.x && player.x <= this.x+32) && player.y <= this.y+300){
    this.falling = true;
  }
}
