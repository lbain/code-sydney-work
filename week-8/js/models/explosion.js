// $.extend( this, displayable );
function Explosion(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 20;
  this.dr = 1;
  this.maxR = 50;
}

Explosion.prototype.move = function() {
  this.radius += this.dr;
}

Explosion.prototype.done = function() {
  this.radius > this.maxR;
}