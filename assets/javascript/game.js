

// Create variables that hold references to the places in the HTML where we want to display things.
var directionsText = document.getElementById("directions");
var lettersGuessedText = document.getElementById("letters-guessed");
var wordText = document.getElementById("word");
var winText = document.getElementById("win");
var lossText = document.getElementById("loss");
var guessesRemainingText = document.getElementById("guesses-remaining");
var gameWordText = document.getElementById("game-word");


// Create Game variables
var words = ["bootcamp","javascript","bootstrap","object","function","array","float","github","browser","repository","method","gitlab","slack"];
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

    // Determine which key was pressed
    var letter = event.key.toLowerCase();

    //Has the letter already been guessed
    if (lettersGuessed.indexOf(letter) > -1){        
        alert("You already guessed that letter ! Please try again. ")
    } 
    else {

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
                console.log(pos);
                gameWordBlanks[pos]=letter;
                pos = gameWord.indexOf(letter, pos+1);         
            } 
         
            gameWordText.textContent = "Game Word:  " + gameWordBlanks;
            gameWordText.textContent = gameWordText.textContent.replace(/,/g , ''); 
        }

        //If no blanks remain, user has won by guessing all of the letters
        if (gameWordBlanks.indexOf("_ ") === -1){
            winCounter++;
            winText.textContent = "Wins: " + winCounter;
            alert("You Won ! " + "Please play again");

            //Reset game
            gameReset();          
        }

        //Have all of the allowed guesses been used
        if (guessCounter === 0) {
            lossCounter++;
            lossText.textContent = "Losses: " + lossCounter;
            alert("You Loss ! " + "Please play again");
            
            //Reset game
            gameReset();
        }  

        //End of proccessing a good letter guess
        }
    }
}




