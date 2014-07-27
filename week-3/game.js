var board;
var size = 18;
var timer = 0;
var food;
var snake;
var direction = 'r';

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


function hitEdge() {
  return (snake.head()[0] > size || // hit right
          snake.head()[0] < 0    || // hit left
          snake.head()[1] > size || // hit bottom
          snake.head()[1] < 0)      // hit top
}

function checkEndGame() {
  if (snake.hitSelf() || hitEdge()) {
    endGame();
  }
}

function endGame() {
  clearInterval(timer);
  displayFinal();
}

function displayFinal() {
  console.log('You lose :(');
  board.clear();
}

function delta() {
  return changePosition(direction);
}

function hitFood() {
  if(snake.hitCell(food.getLocation())) {
    snake.lengthen(delta());
    food.generate(size);
    return true;
  }
  return false;
}

function display() {
  snake.display();
  food.display();
}

function moveAndDisplay(){
  snake.move(delta());
  hitFood();
  checkEndGame();
  display();
}

function bindKeys() {
  $('body').keydown(function(e){
    var arrowKeys = { 37 : 'l',
                      38 : 'u',
                      39 : 'r',
                      40 : 'd'};
    newDirection = arrowKeys[e.keyCode];
    if (oppositeDirection(newDirection) && snake.hasBody()) {
      endGame();
    } else {
      direction = newDirection;
    }
  });
}

function init() {
  board = new Board('#board tbody', size);
  snake = new Snake(size);
  food = new Food(size);
  board.display();
  display();
  bindKeys();
  timer = setInterval(moveAndDisplay, 500);
}

$(function() {
  init();
});