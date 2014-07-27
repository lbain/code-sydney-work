var board = [];
var $pageBoard = $('#board tbody');
var size = 28;
var timer = 0;
var food = [];
var snake = [];
var direction = 'r';

function createBoard() {
  board = new Array(size);
  for (var i = 0; i < size; i++) {
    board[i] = new Array(size);
  }
}

function createSnake() {
  snake = [[size/2, size/2]];
}

function moveSnake() {
  var delta = changePosition(direction);
  var newSnakeHead = snake[0]
  newSnakeHead = [newSnakeHead[0] + delta[0], newSnakeHead[1] + delta[1]]
  snake.unshift(newSnakeHead)
  snake.pop()
}

function changePosition(direction) {
  var deltas = {'r' : [1,0],
                'l' : [-1,0],
                'u' : [0,-1],
                'd' : [0,1]};
  return deltas[direction];
};

function oppositeDirection(newDirection) {
  var opposites = {
    'r': 'l',
    'l': 'r',
    'u': 'd',
    'd': 'u'
  }
  return opposites[direction] === newDirection
}

function displayBlankBoard() {
  $pageBoard.empty();
  for (var i = 0; i < board.length; i++) {
    $pageBoard.append('<tr>')
    for(var j = 0; j < board[i].length; j++) {
      $pageBoard.append('<td class="square" id="'+ j + '-' + i + '"></td>');
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
  for(var i = 1; i < snake.length; i++) {
    if(arraysEqual(snake[0], snake[i])) {
      return true
    }
  }
  return false;
}

function checkEndGame() {
  if (hitSnake() || hitEdge()) {
    endGame();
  }
}

function endGame() {
  clearInterval(timer);
  displayFinal();
}

function displayFinal() {
  console.log('You lose :(');
  $pageBoard.empty()
}

function removeSnake() {
  $('.snake').text('');
}

function displaySnake() {
  removeSnake();
  for (var i = 0; i < snake.length; i++) {
    cell(snake[i]).text('O').addClass('snake')
  }
}

function generateFood() {
  food = [randomNumber(size),randomNumber(size)];
}

function cell(positionArray){
  return $('#' + positionArray[0] + '-' + positionArray[1])
}

function displayFood(){
  cell(food).text('F');
}

function eatFood() {
  var delta = changePosition(direction);
  delta = [-1 * delta[0], -1 * delta[1]]
  var newSnakeSection = [food[0] + delta[0], food[1] + delta[1]]
  snake.push(newSnakeSection);
  generateFood();
}

function hitFood() {
  if(arraysEqual(snake[0], food)) {
    eatFood()
    return true;
  }
  return false;
}

function displayBoard() {
  displaySnake();
  displayFood();
}

function moveAndDisplay(){
  moveSnake();
  hitFood();
  checkEndGame();
  displayBoard();
}

function bindKeys() {
  $('body').keydown(function(e){
    var arrowKeys = { 37 : 'l',
                      38 : 'u',
                      39 : 'r',
                      40 : 'd'};
    newDirection = arrowKeys[e.keyCode];
    if (oppositeDirection(newDirection) && snake.length > 1) {
      endGame();
    } else {
      direction = newDirection;
    }
  });
}

function init() {
  createBoard();
  createSnake();
  generateFood();
  displayBlankBoard();
  displayBoard();
  bindKeys();
  timer = setInterval(moveAndDisplay, 500);
}

$(function() {
  init();
})


//Utils
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function randomNumber(lessThan){
  return Math.floor(Math.random()*lessThan)
}