
        var randomNumber = getRandomNumber(10);
        var guess;
        var guessCount = 0;
        var correctGuess = false;

            
        function getRandomNumber(upper){
            var num = Math.floor(Math.random() * upper) + 1;
            return num;
        }
            while(true){
                guess = prompt("I am thinking of a number between 1 and 10, what is it?");
                guessCount+= 1;
                if(parseInt(guess) === randomNumber){
                    correctGuess = true;
                    break;
                }
            }

            
 
    
    