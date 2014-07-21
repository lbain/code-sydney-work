var board = [];

function createBoard() {
  var board = new Array(40);
  for (var i = 0; i < 40; i++) {
    board[i] = new Array(40);
  }
}

var snake = [[20,20]];

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



