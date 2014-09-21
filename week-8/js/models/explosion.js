function Explosion(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 20;
  this.dr = 0.5;
  this.maxR = 50;
  $.extend( this, hitable );
}

Explosion.prototype.move = function() {
  this.radius += this.dr;
}

Explosion.prototype.done = function() {
  debugger
  return this.radius > this.maxR;
}