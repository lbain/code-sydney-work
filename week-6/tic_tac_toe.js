Game = {
  cells: null,
  turn: 'X',
  size: 5,

  init: function() {
    Game.cells = [];
    for (var i = 0; i < Game.size; i++) {
      Game.cells[i] = new Array(Game.size);
    }
    Game.generateBoard();
  },

  nextMove: function(col, row){
    Game.cells[col][row] = Game.turn;
    Game.makePlay();
  },

  display: function() {
    $('.cell').text('');
    for(var i = 0; i < Game.cells.length; i++) {
      for(var j = 0; j < Game.cells[i].length; j++) {
        $('#cell-'+i+'-'+j).text(Game.cells[i][j]);
      }
    }
  },

  generateBoard: function(){
    for(var i = 0; i < Game.cells.length; i++){
      $('#board').append('<div class="row"></div>')
      for(var j = 0; j < Game.cells[i].length; j++){
        $('#board .row:last-child').append("<div class='cell' id='cell-" + i + "-" + j + "' col='" + i + "' row='" + j + "'></div>")
      }
    }
  },

  isWon: function(){
    return (Game.columnWin() || Game.rowWin() || Game.diagonalWin());
  },

  makePlay: function() {
    Game.display();
    if (Game.isWon()){
      console.log('You won!')
    }
    Game.turn = (Game.turn === 'X') ? 'O' : 'X';
  },

  columnWin: function() {
    for(var i = 0; i < Game.cells.length; i++) {
      var result = Game.cells[0][i];
      for(var j = 1; j < Game.cells.length; j++) {
        result = result && Game.cells[0][i] === Game.cells[j][i];
      }
      if (result){
        console.log('COLUMN WIN');
        return result;
      }
    }
    return false;
  },

  rowWin: function() {
    for(var i = 0; i < Game.cells.length; i++) {
      var result = Game.cells[i][0];
      for(var j = 1; j < Game.cells.length; j++) {
        result = result && Game.cells[i][0] === Game.cells[i][j];
      }
      if (result){
        console.log('ROW WIN');
        return result;
      }
    }
    return false
  },

  diagonalWin: function() {
    return Game.leftDiagonalWin() || Game.rightDiagonalWin();
  },

  leftDiagonalWin: function() {
    var result = Game.cells[0][0];
    for(var i = 0; i < Game.cells.length; i++) {
      result = result && Game.cells[0][0] === Game.cells[i][i];
    }
    if (result){
      console.log('LEFT DIAGONAL WIN')
      return result;
    }
    return false;
  },

  rightDiagonalWin: function() {
    var lastElIndex = Game.cells.length-1;
    var result = Game.cells[0][lastElIndex];
    for(var i = 0; i < Game.cells.length; i++) {
      result = result && Game.cells[0][lastElIndex] === Game.cells[i][lastElIndex - i];
    }
    if (result){
      console.log('RIGHT DIAGONAL WIN')
      return result;
    }
    return false;
  }
}

$(function() {
  Game.init();
  $('.cell').on('click', function(event){
    col = parseInt($(event.target).attr('col'))
    row = parseInt($(event.target).attr('row'))
    Game.nextMove(col, row)
  })
});