var board = [];
var $pageBoard = $('#board tbody');
var size = 20;

function createBoard() {
  board = new Array(size);
  for (var i = 0; i < size; i++) {
    board[i] = new Array(size);
  }
}

var snake = [[10,10]];

var direction = 'r';

function moveSnake() {
  for (var i = 0; i < snake.length; i++) {
    var delta = changePostion(direction);
    for(var j = 0; j < snake[i].length; j++){
      snake[i][j] += delta[j];
    }
  }
}

function changePosition(direction) {
  var deltas = {'r' : [1,0],
                'l' : [-1,0],
                'u' : [0,1],
                'd' : [0,-1]};
  return deltas[direction];
};

function displayBoard() {
  for (var i = 0; i < board.length; i++) {
    $pageBoard.append('<tr>')
    for(var j = 0; j < board[i].length; j++) {
      $pageBoard.append('<td class="square" id="'+ j + '-' + i + '">[' + j + ', ' + i + ']</td>');
    }
    $pageBoard.append('</tr>')
  }
}
function displaySnake() {
    for (var i = 0; i < snake.length; i++) {
      $('#' + snake[i][0] + '-' + snake[i][1]).text('O');
    }
}

function init() {
  createBoard();
  displayBoard();
  displaySnake();
}

$(function() {
  init();
})
