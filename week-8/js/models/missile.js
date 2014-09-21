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

Missile.prototype.setDeltasFromBuilding = function(buildings){
  var building = this.closestBuilding(buildings);
  this.deltas(building);
}

Missile.prototype.closestBuilding = function(buildings) {
  var self = this;
  var distances = $.map(buildings, function(building, i){
    return Math.abs(building.x - self.x);
  });
  var buildingIndex = distances.indexOf(Math.min.apply(Math, distances))
  var building = buildings[buildingIndex]
  return building;
};

Missile.prototype.deltas = function(desintation){
  var deltaX = desintation.x - this.x
  var deltaY = desintation.y - this.y
  this.dx = deltaX / Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2))
  this.dy = deltaY / Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2))
}