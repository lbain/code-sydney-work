function Game() {
  this.missiles = [];
  this.enemy_missiles = [];
  for(var i = 0; i < 5; i++){
    this.missiles.push(new Missile(5, 5, 3, 2));
    this.enemy_missiles.push(new Missile(20, 20, 1, 4));
  }
  this.explosions = [new Explosion(300, 300)];
  this.cities = [
    new City(100, 485),
    new City(450, 550),
    new City(600, 515) ];
  this.bunkers = [
    new Bunker(0, 560),
    new Bunker(275, 525),
    new Bunker(750, 535) ];
  this.renderer = new Renderer(this);
};


Game.prototype.step = function(timestamp){
  // update models
  game.updateLocations();
  game.removeFinished();
  game.renderer.draw(game);
  // setTimeout(game.step, 100);
  window.requestAnimationFrame(game.step);
};

Game.prototype.movables = function(){
  return this.missiles.concat(this.enemy_missiles).concat(this.explosions);
};

Game.prototype.updateLocations = function() {
  $.each(this.movables(), function(i, movable){
    movable.move();
  });
};

Game.prototype.removeFinished = function() {
  this.removeFromList(this.missiles);
  this.removeFromList(this.enemy_missiles);
  this.removeFromList(this.explosions);
};

Game.prototype.removeFromList = function(movableList) {
  var len = movableList.length
  var i = 0;
  while (len--) {
    if(movableList[i].done()){
      movableList.splice(len, 1);
      i--;
    }
    i++;
  }
};

Game.prototype.isGameOver = function(){
  return this.isGameLost() || this.isGameWon();
};

Game.prototype.isGameLost = function(){
  var dead_cities = 0;
  $.each(this.cities, function(city, i){
    if(!city.alive) {
      dead_cities++;
    }
  });
  return dead_cities === this.cities.length;
};

Game.prototype.isGameWon = function(){
  return this.enemy_missiles.length === 0;
};

var game = new Game();
game.step(0);