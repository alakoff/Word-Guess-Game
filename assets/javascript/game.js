

// Create variables that hold references to the places in the HTML where we want to display things.
var directionsText = document.getElementById("directions");
var lettersGuessedText = document.getElementById("letters-guessed");
var wordText = document.getElementById("word");
var winText = document.getElementById("win");
var lossText = document.getElementById("loss");
var guessesRemainingText = document.getElementById("guesses-remaining");
var gameWordText = document.getElementById("game-word");
var gameBorder =  document.getElementById("border1");
var winSound = document.getElementById("sound-win");
var loseSound = document.getElementById("sound-lose");
var gameMessage = document.getElementById("message");


// Create Game variables
var words = ["bootcamp","javascript","jumbotron","callback","bootstrap","developer","object","function","array","float","github","browser","repository","method","gitlab","slack"];
var winCounter = 0;
var lossCounter = 0;
var lettersGuessed = [];


//Pick a random word out of the words array used for the game
var gameWord = words[Math.floor(Math.random() * words.length)];
var gameWordLength = gameWord.length;
var guessCounter = gameWordLength + 5;
var guessCounterFixed = guessCounter;


//Configure a string of blanks to represent the game word
var gameWordBlanks = [];
for (i=0; i<gameWordLength; i++) {
    gameWordBlanks.push("_ ");
};


//Update HTML links with current values
directionsText.textContent = "Press a letter key to make a guess";
winText.textContent = "Wins: " + winCounter;
lossText.textContent = "Losses: " + lossCounter;
lettersGuessedText.textContent = "Guessed Letters: " + lettersGuessed;
guessesRemainingText.textContent = "Guesses Remaining: " + guessCounter;
gameWordText.textContent = "Game Word:  " + gameWordBlanks; 
gameWordText.textContent = gameWordText.textContent.replace(/,/g , '');


//Reset Game
function gameReset() {
    gameWord = words[Math.floor(Math.random() * words.length)];
    gameWordLength = gameWord.length;
    guessCounter = gameWordLength + 5;
    guessCounterFixed = guessCounter;  
    guessesRemainingText.textContent = "Guesses Remaining: " + guessCounter;
    
    gameWordBlanks = [];
    for (i=0; i<gameWordLength; i++) {
    gameWordBlanks.push("_ ");
    };

    gameWordText.textContent = "Game Word:  " + gameWordBlanks; 
    gameWordText.textContent = gameWordText.textContent.replace(/,/g , '');

    lettersGuessed = [];
    lettersGuessedText.textContent = "Guessed Letters: " + lettersGuessed;


}


//Game Play Starts Here

//alert(gameWord);

//Loop for the number of allowed guesses, one guess per loop
for (i = 0; i < guessCounterFixed; i++){
    
    // This function is run whenever the user presses a key
    document.onkeyup = function(event){

        gameBorder.style.borderColor = 'darkblue';
        gameMessage.textContent = '';

        // Determine which key was pressed
        var letter = event.key.toLowerCase();
        var letterCode = event.key.charCodeAt(0);

        //Is the key pressed  a letter 
        if  ((letterCode < 97) || (letterCode > 122)) {
            gameMessage.textContent = 'You did not pick a letter, please try again.';
        } else {

            //Has the letter already been guessed
            if (lettersGuessed.indexOf(letter) > -1){ 
                gameMessage.textContent = 'You already guessed that letter.';       
            } else {

                //Letter has not already been guessed code block

                //Decrement guess counter and refresh to show number of guesses remaining
                guessCounter--
                guessesRemainingText.textContent = "Guesses Remaining: " + guessCounter;

                //Add letter to letters guessed and update display
                lettersGuessed.push(letter);
                lettersGuessedText.textContent = "Guessed Letters: " + lettersGuessed;


                //Is letter in the game word, return the index position
                var pos = gameWord.indexOf(letter);

                //Find all positions of the letter in the word
                if (pos > -1){
                    while (pos > -1) {
                        gameWordBlanks[pos]=letter;
                        pos = gameWord.indexOf(letter, pos+1);         
                    } 
                
                    gameWordText.textContent = "Game Word:  " + gameWordBlanks;
                    gameWordText.textContent = gameWordText.textContent.replace(/,/g , ''); 
                }

                //If no blanks remain, user has won by guessing all of the letters
                if (gameWordBlanks.indexOf("_ ") === -1){
                    gameBorder.style.borderColor = 'green';
                    winCounter++;
                    winText.textContent = "Wins: " + winCounter;
                    winSound.pause();
                    winSound.currentTime = 0;
                    winSound.play();
                    gameMessage.textContent = 'You Won !  Great guessing. Press another letter to start a new game.';

                    //Reset game
                    gameReset();          
                } 

                //Have all of the allowed guesses been used
                if (guessCounter === 0) {
                    gameBorder.style.borderColor = 'red';
                    lossCounter++;
                    lossText.textContent = "Losses: " + lossCounter;
                    loseSound.pause();
                    loseSound.currentTime = 0;
                    loseSound.play();
                    gameMessage.textContent = 'You Loss !  Better luck next time. Press another letter to start a new game.';
                
                    //Reset game
                    gameReset();
                }  

            //End of proccessing a good letter guess
            }
        }
    }
}




