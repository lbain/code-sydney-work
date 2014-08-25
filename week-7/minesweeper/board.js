// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(max) {
  return Math.floor(Math.random() * max);
}

function Board(size, bombCount) {
  this.gridSize = size;
  this.grid = [];
  this.bombCount = bombCount;

  this.setupGrid();
  this.generateBombs();
  return this;
}

Board.prototype.setupGrid = function() {
  for (var i = 0; i < this.gridSize; i++) {
    this.grid[i] = [];
    for (var j = 0; j < this.gridSize; j++) {
      this.grid[i][j] = new Cell;
    }
  }
}

Board.prototype.generateBombs = function() {
  for(var i = 0; i < this.bombCount; i++){
    var row = this.randomPosition();
    var col = this.randomPosition();
    var cell = this.cellAtPos(row, col);
    if (cell.bomb){
      i--; // if it's already a cell, try again
    }
    cell.bomb = true;
    this.updateCellCounts(row, col)
  }
}

Board.prototype.updateCellCounts = function(row, col) {
  for(var nearRow = (row - 1); nearRow <= (row + 1); nearRow++ ) {
    for(var nearCol = (col - 1); nearCol <= (col + 1); nearCol++ ) {
      var nearCell = this.cellAtPos(nearRow, nearCol);
      // console.log("nearRow = " + nearRow);
      // console.log("nearCol = " + nearCol);
      // console.log("nearCell = " + nearCell);
      if(nearCell){
        nearCell.count++;
      }
    }
  }
}

Board.prototype.makeMove = function(row, col) {
  var cell = this.cellAtPos(nearRow, nearCol);
  if(cell.bomb) {
    console.log('you lose')
  } else if(cell.count > 0) {
    cell.found = true;
  } else {
    this.revealNearCells(row, col);
  }
}


Board.prototype.randomPosition = function() {
  return getRandomArbitrary(this.gridSize);
}

Board.prototype.cellAtPos = function(row, col) {
  var full_row = this.grid[row];
  if(full_row){
    return this.grid[row][col];
  }
}

