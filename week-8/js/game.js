function Game() {
  this.missiles = [];
  this.enemy_missiles = [];
  // for(var i = 0; i < 5; i++){
    this.missiles.push(new Missile(0, 200, 0, 2));
    // this.missiles.push(new Missile(5, 100, 0, -1));
    // this.enemy_missiles.push(new Missile(5, 100, 0, -1));
  // }
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
  game.removeHit();
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
  // TUTORS: how can I reuse this code? Pass by reference?
  this.missiles = $.grep(this.missiles, function( missile, i ) {
    return !missile.done();
  });
  this.enemy_missiles = $.grep(this.enemy_missiles, function( enemy_missile, i ) {
    return !enemy_missile.done();
  });
  this.explosions = $.grep(this.explosions, function( explosion, i ) {
    return !explosion.done();
  });
  this.bunkers = $.grep(this.bunkers, function( bunker, i ) {
    return bunker.alive;
  });
  // this.removeFromList(this.missiles);
  // this.removeFromList(this.enemy_missiles);
  // this.removeFromList(this.explosions);
};

// Game.prototype.removeFromList = function(movableList) {
//   var len = movableList.length
//   var i = 0;
//   while (len--) {
//     if(movableList[i].done()){
//       movableList.splice(len, 1);
//       i--;
//     }
//     i++;
//   }
// };

Game.prototype.removeHit = function() {
  this.explosionsHitMissiles();
  this.missilesHitEnemyMissiles();
  this.missilesHitMissiles();
  this.missilesHitBunkers();
}

Game.prototype.explosionsHitMissiles = function() {
  var self = this;
  $.each(self.explosions, function(i, explosion){
    self.missiles = $.grep(self.missiles, function( missile, j ) {
      if (explosion.isHit(missile)){
        self.explosions.push(new Explosion(missile.x, missile.y));
        return false;
      } else {
        return true;
      }
    });
  });
};

Game.prototype.missilesHitEnemyMissiles = function() {
  var self = this;
  $.each(self.missiles, function(i, missile){
    self.enemy_missiles = $.grep(self.enemy_missiles, function( enemy_missile, j ) {
      if (missile.isHit(enemy_missile)){
        self.explosions.push(new Explosion(missile.x, missile.y));
        // I'd really like to delete the enemy_missile here
        // would that cause problems with the grep?
        // Doesn't need to happen b/c the explosion will take care of it next itteration
        return false;
      } else {
        return true;
      }
    });
  });
};
// so much code duplication... can I reuse? reference??
Game.prototype.missilesHitMissiles = function() {
  var self = this;
  $.each(self.missiles, function(i, missile){
    self.missiles = $.grep(self.missiles, function( friendly_missile, j ) {
      if (i == j){
        return true;
      } else if (missile.isHit(friendly_missile)){
        self.explosions.push(new Explosion(missile.x, missile.y));
        // I'd really like to delete the friendly_missile here
        // would that cause problems with the grep?
        // Doesn't need to happen b/c the explosion will take care of it next itteration
        return false;
      } else {
        return true;
      }
    });
  });
};

Game.prototype.missilesHitBunkers = function() {
  var self = this;
  $.each(self.bunkers, function(i, bunker){
    self.missiles = $.grep(self.missiles, function( missile, j ) {
      if (bunker.isHit(missile)){
        bunker.alive = false;
        return false;
      } else {
        return true;
      }
    });
  });
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