var blockSize = 25;
var rows = 25;
var cols = 25;
var board;
var context;

var snakeX = blockSize * 2;
var snakeY = blockSize * 2;

var foodX;
var foodY;

var velocityX = 0;
var velocityY = 0;


var velocitySpeed = 1;
var scoreIncreaseBy = 1;

let isGameOver = false;
var score_val = 0;

var snakeBody = [];

let msg = document.getElementById("msg-box");
let scoreElem = document.getElementById("score-gameover");
let selection = document.getElementById('levels');

// load the game
window.onload = function () {
    board = document.getElementById('gameConsole');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirections);
    let play = document.getElementById("play");
    play.addEventListener("click", startGame);
    setInterval(update, 1000/10);
}

function update () {

    // draw the game console 
    context.fillStyle = "rgb(6, 67, 84)";
    context.fillRect(0, 0, board.width, board.height);

    
    // draw the food
    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // get the collision of the food
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score_val += scoreIncreaseBy;
        place_score();
        placeFood();
    }
    
    // set the body to follow the head
    for (let i = snakeBody.length -1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    // set current position of the snake
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Boundary of the game
    if (snakeX > cols * blockSize) {
        snakeX =  -25;
    } else if (snakeY > rows * blockSize) {
        snakeY = -25;
    } else if (snakeX < 0) {
        snakeX = cols * blockSize;
    } else if (snakeY < 0) {
        snakeY = rows * blockSize;
    }

    // draw the food
    context.fillStyle = 'lime';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    
    // draw the snake body and get x and y from snake array
    for (let i =0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // game over
    for (let con of snakeBody) {
        if (con[0] == snakeX && con[1] == snakeY){
            msg.classList.add("active");

            // update the game score for the game over screen
            scoreElem.innerText = `Sorce: ${score_val}`;

            score_val = 0;
            place_score();
        }
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirections (e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -(velocitySpeed);

    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = velocitySpeed;

    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -(velocitySpeed);
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = velocitySpeed;
        velocityY = 0;
    }
}

function place_score() {
    soure_id = document.getElementById("score");
    soure_id.innerText = `Score: ${score_val}`;
}

function startGame() {
    snakeBody = [];
    score_val = 0;
    msg.classList.remove("active");
    update();
}
