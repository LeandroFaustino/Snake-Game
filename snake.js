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

var snakeBody=[]

var foodX;
var foodY;

gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");//used for drawing on the board

    placeFood();
    
    document.addEventListener("keyup", changeDirection);
    // update();

    setInterval(update, 1000/10); //atualiza o jogo executando a função update() 1x por 1000/10 segundos  
}

function update() {
    if(gameOver==true){
        location.reload();
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX==foodX && snakeY==foodY){
        snakeBody.push([foodX,foodY]);
        placeFood();
        
    } 

    for (let i = snakeBody.length-1; i>0; i--){
        snakeBody[i]=snakeBody[i-1];            //faz o movimento da cobra, decrescentemente define 
                                                //que as coordenadas do array atual vão ser iguais ao do array diretamente anterior
        }


    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];       //faz com que o primeiro array seja a cabeça da cobra definindo o seu valor iguais
                                               //ao percurso que ela faz (snakeX e snakeY)
    }
    
    if (snakeX > rows * blockSize || snakeX < 0 || snakeY > cols * blockSize || snakeY < 0){
        gameOver = true;
        alert("Game Over");
    }


    context.fillStyle="lime";
    snakeX += velocityX * blockSize ;
    snakeY += velocityY * blockSize ;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    
    for( let i= 0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1],blockSize,blockSize); //faz a impressão das coordenadas dentro dos arrays
    }
    
    
    /* (linha 83) define um dos motivos de Game Over, que diz se a coordenada da cabeça(snakeX, snakeY)
    for igual a alguma coordenada guardada no array snakeBody quer dizer que a cabeça atravessou o corpo.*/
    
    for(i=0; i < snakeBody.length; i++){
        if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1] ){ //  O [0] menciona o primeiro valor que está dentro do [i], 
                                                                 //  ou seja, se [i] = [350,75], o [0] está a mencionar o 350
                                                                 //  e consecutivamente o [1] está a mencionar o segundo valor que é 75.
            gameOver= true;
            alert("Game Over!")
            
        }

    }
    
    
} 

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY!=1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY!=-1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX!=1){
        velocityX = -1;
        velocityY = 0;
    }
    if(e.code == "ArrowRight" && velocityX!=-1){
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random()* rows ) * blockSize;
}


