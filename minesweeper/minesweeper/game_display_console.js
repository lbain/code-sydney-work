function Display(board) {
  this.board = board;
  while(!board.isFinished()){
    this.showBoard();
    console.log(this.requestMove());
  }
  this.showBoard();
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
  board.makeMove(row, col);
  return [row, col];
}