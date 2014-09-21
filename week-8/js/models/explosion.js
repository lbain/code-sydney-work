function Explosion(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 20;
  this.dr = 0.5;
  this.maxR = 100;
  $.extend( this, hitable );
}

Explosion.prototype.move = function() {
  this.radius += this.dr;
}

Explosion.prototype.done = function() {
  return this.radius > this.maxR;
}