
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

//Initialize menu objects and game objects.
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

//Initiate objects for snake game.
function snakeInit(){
	score = 0;

	grid.init(EMPTY, COLS, ROWS);

	var sp = {x:Math.floor(COLS/2), y:ROWS-1};
	snake.init(UP, sp.x, sp.y);
	grid.set(SNAKE, sp.x, sp.y);

	setFood();
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
    
    if(gameChoice === 'G'){
     var

        /**
         * Constats
         */
        COLS = 26,
        ROWS = 26,

        EMPTY = 0,
        SNAKE = 1,
        FRUIT = 2,

        LEFT  = 0,
        UP    = 1,
        RIGHT = 2,
        DOWN  = 3,

        KEY_LEFT  = 37,
        KEY_UP    = 38,
        KEY_RIGHT = 39,
        KEY_DOWN  = 40,


        /**
         * Game objects
         */
        canvas,	  /* HTMLCanvas */
        ctx,	  /* CanvasRenderingContext2d */
        keystate, /* Object, used for keyboard inputs */
        frames,   /* number, used for animation */
        score;	  /* number, keep track of the player score */


        /**
         * Grid datastructor, usefull in games where the game world is
         * confined in absolute sized chunks of data or information.
         * 
         * @type {Object}
         */
        grid = {

            width: null,  /* number, the number of columns */
            height: null, /* number, the number of rows */
            _grid: null,  /* Array<any>, data representation */

            /**
             * Initiate and fill a c x r grid with the value of d
             * @param  {any}    d default value to fill with
             * @param  {number} c number of columns
             * @param  {number} r number of rows
             */
            init: function(d, c, r) {
                this.width = c;
                this.height = r;

                this._grid = [];
                for (var x=0; x < c; x++) {
                    this._grid.push([]);
                    for (var y=0; y < r; y++) {
                        this._grid[x].push(d);
                    }
                }
            },

            /**
             * Set the value of the grid cell at (x, y)
             * 
             * @param {any}    val what to set
             * @param {number} x   the x-coordinate
             * @param {number} y   the y-coordinate
             */
            set: function(val, x, y) {
                this._grid[x][y] = val;
            },

            /**
             * Get the value of the cell at (x, y)
             * 
             * @param  {number} x the x-coordinate
             * @param  {number} y the y-coordinate
             * @return {any}   the value at the cell
             */
            get: function(x, y) {
                return this._grid[x][y];
            }
        }

        /**
         * The snake, works as a queue (FIFO, first in first out) of data
         * with all the current positions in the grid with the snake id
         * 
         * @type {Object}
         */
        snake = {

            direction: null, /* number, the direction */
            last: null,		 /* Object, pointer to the last element in
                                the queue */
            _queue: null,	 /* Array<number>, data representation*/

            /**
             * Clears the queue and sets the start position and direction
             * 
             * @param  {number} d start direction
             * @param  {number} x start x-coordinate
             * @param  {number} y start y-coordinate
             */
            init: function(d, x, y) {
                this.direction = d;

                this._queue = [];
                this.insert(x, y);
            },

            /**
             * Adds an element to the queue
             * 
             * @param  {number} x x-coordinate
             * @param  {number} y y-coordinate
             */
            insert: function(x, y) {
                // unshift prepends an element to an array
                this._queue.unshift({x:x, y:y});
                this.last = this._queue[0];
            },

            /**
             * Removes and returns the first element in the queue.
             * 
             * @return {Object} the first element
             */
            remove: function() {
                // pop returns the last element of an array
                return this._queue.pop();
            }
        };

/**
 * Set a food id at a random free cell in the grid
 */   
    
    }
    
} //End of draw function

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

//Functions used in the snake game.
function playSnakeGame(){
    document.write("This works!"); 
}

function setFood() {
	var empty = [];
	// iterate through the grid and find all empty cells
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			if (grid.get(x, y) === EMPTY) {
				empty.push({x:x, y:y});
			}
		}
	}
	// chooses a random cell
	var randpos = empty[Math.round(Math.random()*(empty.length - 1))];
	grid.set(FRUIT, randpos.x, randpos.y);
}

/**
 * Starts the game
 */
function SnakeMain() {
	// create and initiate the canvas element
	canvas = document.createElement("canvas");
	canvas.width = COLS*20;
	canvas.height = ROWS*20;
	ctx = canvas.getContext("2d");
	// add the canvas element to the body of the document
	document.body.appendChild(canvas);

	// sets an base font for bigger score display
	ctx.font = "12px Helvetica";

	frames = 0;
	keystate = {};
	// keeps track of the keybourd input
	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt) {
		delete keystate[evt.keyCode];
	});

	// intatiate game objects and starts the game loop
	snakeInit();
	loop();
}

/**
 * The game loop function, used for game updates and rendering
 */
function loop() {
	update();
	drawSnake();
	// When ready to redraw the canvas call the loop function
	// first. Runs about 60 frames a second
	window.requestAnimationFrame(loop, canvas);
}

/**
 * Updates the game logic
 */
function update() {
	frames++;

	// changing direction of the snake depending on which keys
	// that are pressed
	if (keystate[KEY_LEFT] && snake.direction !== RIGHT) {
		snake.direction = LEFT;
	}
	if (keystate[KEY_UP] && snake.direction !== DOWN) {
		snake.direction = UP;
	}
	if (keystate[KEY_RIGHT] && snake.direction !== LEFT) {
		snake.direction = RIGHT;
	}
	if (keystate[KEY_DOWN] && snake.direction !== UP) {
		snake.direction = DOWN;
	}

	// each five frames update the game state.
	if (frames%5 === 0) {
		// pop the last element from the snake queue i.e. the
		// head
		var nx = snake.last.x;
		var ny = snake.last.y;

		// updates the position depending on the snake direction
		switch (snake.direction) {
			case LEFT:
				nx--;
				break;
			case UP:
				ny--;
				break;
			case RIGHT:
				nx++;
				break;
			case DOWN:
				ny++;
				break;
		}

		// checks all gameover conditions
		if (0 > nx || nx > grid.width-1  ||
			0 > ny || ny > grid.height-1 ||
			grid.get(nx, ny) === SNAKE
		) {
			return init();
		}

		// check wheter the new position are on the fruit item
		if (grid.get(nx, ny) === FRUIT) {
			// increment the score and sets a new fruit position
			score++;
			setFood();
		} else {
			// take out the first item from the snake queue i.e
			// the tail and remove id from grid
			var tail = snake.remove();
			grid.set(EMPTY, tail.x, tail.y);
		}

		// add a snake id at the new position and append it to 
		// the snake queue
		grid.set(SNAKE, nx, ny);
		snake.insert(nx, ny);
	}
}

/**
 * Render the grid to the canvas.
 */
function drawSnake() {
	// calculate tile-width and -height
	var tw = canvas.width/grid.width;
	var th = canvas.height/grid.height;
	// iterate through the grid and draw all cells
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			// sets the fillstyle depending on the id of
			// each cell
			switch (grid.get(x, y)) {
				case EMPTY:
					ctx.fillStyle = "#fff";
					break;
				case SNAKE:
					ctx.fillStyle = "#0ff";
					break;
				case FRUIT:
					ctx.fillStyle = "#f00";
					break;
			}
			ctx.fillRect(x*tw, y*th, tw, th);
		}
	}
	// changes the fillstyle once more and draws the score
	// message to the canvas
	ctx.fillStyle = "#000";
	ctx.fillText("SCORE: " + score, 10, canvas.height-10);
}

window.onload = init(); 
SnakeMain();