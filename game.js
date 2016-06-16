
var gCanvas;
var gCanvasSub;
var g2d;
var gSub2d;
var width = 854;
var height = 480;

var gameState = 0;
var gameTitle = "Adrienne's Worlds";
var gameMainMenu = "1. Play Again";
var gamePlayOption = "2. Choose A Game";
var gameExitOption = "3. Exit Completely";
var gameEndMessage = "Thanks for playing!!!";
var gameDevelopedBy = "Developed by Adrienne Bing";
var gameMakeAChoice = "Please select a game to play";
var gameGuessing = "Enter G for the Guessing Game";
var gameSnake = "Enter S for the Snake Game";
var gameChoice;
var gameSelected;

var randomNumber = getRandomNumber(10);
var guess;
var guessCount = 0;
var correctGuess = false;

function init() {
    gCanvas = document.getElementById("gameCanvas");
    gCanvas.width = width;
    gCanvas.height = height;
    
    g2d = gCanvas.getContext("2d");
    g2d.imageSmoothingEnabled = false;
    g2d.mozImageSmoothingEnabled = false;
    
    gCanvasSub = document.getElementById("gameCanvas");
    gCanvasSub.width = width;
    gCanvasSub.height = height;
    
    g2dSub = gCanvasSub.getContext("2d");
    g2dSub.imageSmoothingEnabled = false;
    g2dSub.mozImageSmoothingEnabled = false;
    
    console.log("All is initialized");
    draw();
}

function draw(){
    if (gameState === 0){
        g2d.fillStyle = "#ff0000";
        g2d.font = "50px Arial Black";
        g2d.textBaseline = 'bottom';
        g2d.fillText(gameTitle, (width / 2) - (g2d.measureText(gameTitle).width / 2), 100);
        
        g2d.font = "24px Courier New Bold";
        g2d.fillStyle = "#CCC";
        g2d.fillText(gameMainMenu, (width / 2) - (g2d.measureText(gameMainMenu).width / 2), 210);
        g2d.fillText(gamePlayOption, (width / 2) - (g2d.measureText(gamePlayOption).width / 2), 250);
        g2d.fillText(gameExitOption, (width / 2) - (g2d.measureText(gameExitOption).width / 2), 290);
        
        var input = new CanvasInput({
        canvas: gCanvas,
        x: 4,
        y: 425,
        width: 820,
        backgroundColor: "#000",
        borderWidth: 0,
        boxShadow: '0px 0px 0px #000',
        selectionColor: "#fff",
        fontColor: "#fff",
        fontSize: 20,
        fontFamily: "Courier New",
        placeHolder: "1 to reset - 2 to play games - 3 to exit",
        onsubmit: function(){
            var choice = parseInt(input._value);
            if (choice === 3){
                enterGameState(2);
            } else if (choice === 2){
                enterGameState(1);
            } else if (choice === 1){
                enterGameState(0);
            } 
        }
        
    });
        
        input.focus();
        console.log(input.placeHolder);
        
  }    
    
    if(gameState === 1) {
        g2dSub.fillStyle = "#ff0000";
        g2dSub.font = "40px Arial Black";
        g2dSub.textBaseline = 'bottom';
        g2dSub.fillText("Please select a game", (width / 2) - (g2dSub.measureText("Please select a game").width / 2), 100);
        
        g2dSub.font = "24px Courier New Bold";
        g2dSub.fillStyle = "#CCC";
        g2dSub.fillText(gameGuessing, (width / 2) - (g2dSub.measureText(gameGuessing).width / 2), 210);
        g2dSub.fillText(gameSnake, (width / 2) - (g2dSub.measureText(gameSnake).width / 2), 250);
        
    var inputGC = new CanvasInput({
        canvas: gCanvasSub,
        x: 4,
        y: 425,
        width: 820,
        backgroundColor: "#ff0000",
        borderWidth: 0,
        boxShadow: '0px 0px 0px #000',
        selectionColor: "#fff",
        fontColor: "#fff",
        fontSize: 20,
        fontFamily: "Courier New",
        placeHolder: "Enter your selection...",
        onsubmit: function(){
            var gameChoice = inputGC._value;
            if (gameChoice == 'G'){
                chooseGuessingGame();
            } else if (gameChoice == 'S'){
                chooseSnakeGame();
            } 
        }
        
     });
        inputGC.focus();
        console.log(inputGC.placeHolder);
  }
    
    if (gameState === 2){
        g2d.font = "40px Courier New Bold";
        g2d.fillStyle = "#fff";
        g2d.fillText(gameEndMessage, (width / 2) - (g2d.measureText(gameEndMessage).width / 2), 100);
        
        var thumbsgif = new Image();
        thumbsgif.src = "gameassets/thumbsup.gif"
        thumbsgif.onload = function(){
            g2d.drawImage(thumbsgif, (width / 2)-(thumbsgif.width / 2), 125);
        }
        

        g2d.font = "24px Courier New Bold";
        g2d.fillStyle = "#CCC";
        g2d.fillText(gameDevelopedBy, (width / 2) - (g2d.measureText(gameDevelopedBy).width / 2), 350);
  
    }
    console.log("Game is working!");
}

function clearCanvas(context, canvas) {
  context.clearRect(0, 0, gCanvas.width, gCanvas.height);
  var w = gCanvas.width;
  canvas.width = 1;
  canvas.width = w;
}

function enterGameState(currentState){
       gameState = currentState;
       clearCanvas(g2d, gCanvas);
       draw();
}

function getRandomNumber(upper){
    var num = Math.floor(Math.random() * upper) + 1;
        return num;
    }

function chooseGuessingGame(currentGameSelected){
       gameSelected = currentGameSelected;
       clearCanvas(g2d, gCanvas);
       makeGuesses();
}

function chooseSnakeGame(currentGameSelected){
       gameSelected = currentGameSelected;
       clearCanvas(g2d, gCanvas);
       playSnakeGame();
}

function makeGuesses(){
    while(true){
        guess = prompt("I am thinking of a number between 1 and 10, what is it?");
        guessCount+= 1;
        if(parseInt(guess) === randomNumber){
            correctGuess = true;
            break;
       }
   } 
    g2d.font = "24px Courier New Bold";
    g2d.fillStyle = "#CCC";
    g2d.fillText("You guessed the number!", 10, 380);
    g2d.fillText("It took you " + guessCount + " tries to guess the number " + randomNumber, 10, 415);

}

function playSnakeGame(){
    document.write("This works!"); 
}

window.onload = init(); 