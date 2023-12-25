//board
let board;
let boardWidth = 700;
let boardHeight = 500;
let context;

//players
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
  x: 10,
  y: boardHeight / 2 - playerHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: playerVelocityY,
};

let player2 = {
  x: boardWidth - playerWidth - 10,
  y: boardHeight / 2 - playerHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: playerVelocityY,
};

let player1MovingUp = false;
let player1MovingDown = false;
let player2MovingUp = false;
let player2MovingDown = false;

// ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
  x: boardWidth / 2 - ballWidth / 2,
  y: boardHeight / 2 - ballHeight / 2,
  width: ballWidth,
  height: ballHeight,
  velocityX: 3,
  velocityY: 2,
};

// Score
let player1Score = 0;
let player2Score = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  //draw initial player1
  context.fillStyle = "skyblue";
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  requestAnimationFrame(update);

  document.addEventListener("keydown", movePlayer);
  document.addEventListener("keyup", movePlayer);
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  //player 1
  context.fillStyle = "skyblue";
  let nextPlayer1Y = player1.y + player1.velocityY;

  if (!outOfBounds(nextPlayer1Y)) {
    player1.y = nextPlayer1Y;
  }
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  //player 2
  let nextPlayer2Y = player2.y + player2.velocityY;
  if (!outOfBounds(nextPlayer2Y)) {
    player2.y = nextPlayer2Y;
  }
  context.fillRect(player2.x, player2.y, player2.width, player2.height);

  //ball
  context.fillStyle = "white";
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  context.fillRect(ball.x, ball.y, ballWidth, ballHeight);

  // if ball touches bottom or top of canvas
  if (ball.y <= 0 || ball.y + ball.height >= boardHeight) {
    ball.velocityY *= -1;
  }

  // bounce the ball back
  if (detectCollision(ball, player1)) {
    if (ball.x <= player1.x + player1.width) {
      ball.velocityX *= -1;
    }
  } else if (detectCollision(ball, player2)) {
    if (ball.x + ball.width >= player2.x) {
      ball.velocityX *= -1;
    }
  }

  // score and reset
  if (ball.x < 0) {
    player2Score++;
    resetGame(1);
  } else if (ball.x + ballWidth > boardWidth) {
    player1Score++;
    resetGame(-1);
  }

  // score font
  context.font = "45px sans-serif";
  context.fillText(player1Score, boardWidth / 5, 45);
  context.fillText(player2Score, (boardWidth * 4) / 5 - 45, 45);

  //dotted line in the middle
  for (let i = 10; i < board.height; i += 25) {
    context.fillRect(boardWidth / 2 - 10, i, 5, 10);
  }
}

function outOfBounds(yPosition) {
  return yPosition < 0 || yPosition + playerHeight > boardHeight;
}

function movePlayer(e) {
  // Player 1 movement
  if (e.code === "KeyW") {
    player1MovingUp = e.type === "keydown";
  } else if (e.code === "KeyS") {
    player1MovingDown = e.type === "keydown";
  }

  // Player 2 movement
  if (e.code === "ArrowUp") {
    player2MovingUp = e.type === "keydown";
  } else if (e.code === "ArrowDown") {
    player2MovingDown = e.type === "keydown";
  }

  // Update player velocities based on key states
  player1.velocityY = (player1MovingDown ? 3 : 0) + (player1MovingUp ? -3 : 0);
  player2.velocityY = (player2MovingDown ? 3 : 0) + (player2MovingUp ? -3 : 0);
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function resetGame(direction) {
  ball = {
    x: boardWidth / 2 - ballWidth / 2,
    y: boardHeight / 2 - ballHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ball.velocityX * direction,
    velocityY: ball.velocityY,
  };

  player1 = {
    x: 10,
    y: boardHeight / 2 - playerHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: playerVelocityY,
  };

  player2 = {
    x: boardWidth - playerWidth - 10,
    y: boardHeight / 2 - playerHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: playerVelocityY,
  };
}
