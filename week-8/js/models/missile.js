function Missile(source_x, source_y, dx, dy) {
  this.x = source_x;
  this.y = source_y
  this.radius = 5;
  this.souce_x = source_x;
  this.souce_y = source_y;
  this.dx = dx;
  this.dy = dy;
  this.alive = true;
  $.extend( this, hitable );
}

Missile.prototype.move = function() {
  this.x += this.dx;
  this.y += this.dy;
}

Missile.prototype.done = function() {
  return !this.alive;
}