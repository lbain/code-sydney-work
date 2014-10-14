function DisplayDom(board) {
  var self = this;
  this.board = board;
  this.$board = $('#board');
  this.showBoard();

  this.$board.on("contextmenu", ".cell", function(e){
    self.rightMouseClick(event);
    return false;
  });

  this.$board.on('click', function(event){
    if($(event.target).hasClass('cell')) {
      event.preventDefault();
      if (event.which === 1){
        self.leftMouseClick(event);
      }
    }
  });

  $(document).on("displayCell", function(event){
    var displayCell = $('.cell[row=' + event.row + '][col=' + event.col + ']')

    displayCell.html(event.text);
    if(event.mark){
      displayCell.addClass('found');
    }
    var nearCount = parseInt(event.text);
    if(nearCount) {
      displayCell.addClass('near-count-'+nearCount);
    }
  });
}

DisplayDom.prototype.showBoard = function() {
  for (var i = 0; i < this.board.gridSize; i++) {
    this.$board.append('<div class="row"></div>');
    var $row = this.$board.find('.row:last-child')
    for (var j = 0; j < this.board.gridSize; j++) {
      $row.append('<div class="cell" row="' + i +'" col="' + j + '">&nbsp</div>');
    }
  }
}

DisplayDom.prototype.checkEndGame = function(event) {
  if(this.board.isFinished()){
    this.$board.off('click');
    this.$board.off('contextmenu');
  }
}

DisplayDom.prototype.rightMouseClick = function(event) {
  var position = this.posFromEvent(event)
  this.board.flagCell(position.row, position.col);
}

DisplayDom.prototype.leftMouseClick = function(event) {
  if($(event.target).hasClass('found')) {
    return;
  }
  var position = this.posFromEvent(event)
  this.board.makeMove(position.row, position.col);
  this.checkEndGame();
}

DisplayDom.prototype.posFromEvent = function(event) {
  var col = parseInt($(event.target).attr('col'))
  var row = parseInt($(event.target).attr('row'))
  return {row: row, col: col};
}