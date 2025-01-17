var blockSize = 25;
var rows = 20
var cols = 20;
var board;
var context;


//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
//food

var foodX;
var foodY;

var gameOver= false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");//used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    

    setInterval(update, 1000/10); // 
}

function update() {
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="lime";
    snakeX += velocityX * blockSize ;
    snakeY += velocityY * blockSize ;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX==foodX && snakeY==foodY){
        
        placeFood();
       
        
        
    }

    if( snakeX>500 || snakeY>500){
        context.fillStyle="lime";
        snakeX = blockSize * 5;
        snakeY = blockSize * 5;
        velocityX = 0;
        velocityY = 0;
        context.fillRect(snakeX, snakeY, blockSize, blockSize);
    }
} 

function changeDirection(e){
    if(e.code == "ArrowUp"){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown"){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft"){
        velocityX = -1;
        velocityY = 0;
    }
    if(e.code == "ArrowRight"){
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random()* rows ) * blockSize;
}


