function Display(board) {
  this.board = board;
  this.showBoard();
  // console.log(this.requestMove());
}

Display.prototype.showBoard = function() {
  this.verticalDivider();
  for (var i = 0; i < board.gridSize; i++) {
    var row = '|';
    for (var j = 0; j < board.gridSize; j++) {
      row += board.cellAtPos(i, j).show();
      // row += '[' + i + ', ' + j + ']';
      row += '|';
    }
    console.log(row);
    this.verticalDivider();
  }
}

Display.prototype.verticalDivider = function() {
  var row = ''
  for (var i = 0; i < board.gridSize; i++) {
    row += '_';
  }
  console.log(row);
}

Display.prototype.requestMove = function() {
  var row = parseInt(prompt("row : "));
  var col = parseInt(prompt("column : "));
  return [row, col];
}