function Missile(source_x, source_y, dx, dy) {
  this.x = source_x;
  this.y = source_y;
  this.souce_x = source_x;
  this.souce_y = source_y;
  this.dx = dx;
  this.dy = dy;
}

Missile.prototype.move = function() {
  this.x += this.dx;
  this.y += this.dy;
}