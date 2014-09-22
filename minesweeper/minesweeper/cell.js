function Cell(row, col) {
  this.bomb = false;
  this.flagged = false;
  this.count = 0;
  this.found = false;
  this.row = row;
  this.col = col;
}

// Cell.prototype.show = function() {
//   if(this.found){
//     return this.displayed() + '-found';
//   } else {
//     return this.displayed();
//   }
// }

Cell.prototype.show = function() {
  if(this.found){
    return this.displayed();
  } else {
    return ' ';
  }
}

Cell.prototype.displayed = function() {
  if(this.bomb){
    return 'B'
  } else if(this.flagged){
    return 'F'
  } else if(this.count) {
    return this.count;
  } else {
    return '-';
  }
}