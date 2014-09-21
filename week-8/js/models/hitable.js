var hitable = {
  isHit: function(hitable) {
    // console.log("this.x = " + this.x);
    // console.log("this.y = " + this.y);
    // console.log("this.radius = " + this.radius);

    // console.log("hitable.x = " + hitable.x);
    // console.log("hitable.y = " + hitable.y);
    // console.log("hitable.radius = " + hitable.radius);

    var dx = this.x - hitable.x;
    var dy = this.y - hitable.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    // if (distance < this.radius + hitable.radius) {
    //   debugger
    // }

    return (distance < this.radius + hitable.radius);
  },
  done: function() {
    return !this.alive;
  }
}