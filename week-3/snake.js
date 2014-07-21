var board = [];
var $pageBoard = $('#board tbody');
var size = 20;
var timer = 0;

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
    var delta = changePosition(direction);
    for(var j = 0; j < snake[i].length; j++){
      snake[i][j] += delta[j];
    }
  }
}

function changePosition(direction) {
  var deltas = {'r' : [1,0],
                'l' : [-1,0],
                'u' : [0,-1],
                'd' : [0,1]};
  return deltas[direction];
};

function displayBlankBoard() {
  $pageBoard.empty();
  for (var i = 0; i < board.length; i++) {
    $pageBoard.append('<tr>')
    for(var j = 0; j < board[i].length; j++) {
      $pageBoard.append('<td class="square" id="'+ j + '-' + i + '">[' + j + ', ' + i + ']</td>');
    }
    $pageBoard.append('</tr>')
  }
}

function hitEdge() {
  var head = snake[0];
  return (head[0] > size || // hit right
          head[0] < 0    || // hit left
          head[1] > size || // hit bottom
          head[1] < 0)      // hit top
}

function hitSnake() {
  return false;
}

function endGame() {
  if (hitSnake() || hitEdge()) {
    clearInterval(timer);
    displayFinal();
  }
}

function displayFinal() {
  console.log('You lose :(')
}

function displaySnake() {
  for (var i = 0; i < snake.length; i++) {
    $('#' + snake[i][0] + '-' + snake[i][1]).text('O');
  }
}

function bindKeys() {
  $('body').keydown(function(e){
    var arrowKeys = { 37 : 'l',
                      38 : 'u',
                      39 : 'r',
                      40 : 'd'};
    direction = arrowKeys[e.keyCode]
  });
}

function displayBoard() {
  displayBlankBoard();
  displaySnake();
}

function moveAndDisplay(){
  moveSnake();
  displayBoard();
  endGame();
}

function init() {
  createBoard();
  displayBoard();
  bindKeys();
  timer = setInterval(moveAndDisplay, 500);
}

$(function() {
  init();
})
