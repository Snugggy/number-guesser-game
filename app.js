// GAME FUNCTION:
// - Player must guess a number between a min and max
// - Player gets a certain amount of guesses
// - Notify player of guesses remaining 
// - Notify the player of the correct answer if loose
// - Let player choose to play again

// Game values
let min = 1, 
    max = 10,
    winningNumber = getWinningNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again even listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    console.log(guess);
    // Validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } else {

        // Check if won
        if(guess === winningNumber) {
            // Game over, won
            gameOver(true, `${winningNumber} is correct, YOU WIN!`)
        } else {
            guessesLeft -= 1;

            if (guessesLeft === 0) {
                // Game over, lost 
                gameOver(false, `Game over, you lost. The winning number was ${winningNumber}`)
            } else {
                // Game continues, answer is wrong
                // Change border color
                guessInput.style.borderColor = 'red';
                // Clear Input
                guessInput.value = '';
                // Tell user how many guesses left
                setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
            }
        }
    }
});

// Game over
function gameOver(won, msg) {
    let color;
    if(won === true) {
        color = 'green';
    } else {
        color = 'red';
    }
    
    // Disable input
    guessInput.disabled = true;
    // Border change if won or lose
    guessInput.style.borderColor = color;
    message.style.color = color;
    // Let user know they won
    setMessage(msg);

    // Play again
    guessBtn.value = 'Play again';
    guessBtn.className += 'play-again';
}

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
    // If error message then call clearMessage
    if(msg === `Please enter a number between ${min} and ${max}`) {
        setTimeout(clearMessage, 3500);
    }
}

// Clear message
function clearMessage() {
    message.textContent = '';
}

// Get Winning Number
function getWinningNum(min, max) {
    return parseInt(Math.random()*(max-min+1)+min);
}

