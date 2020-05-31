/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses.
- Notify player of guesses remaining
- Notify the player of the correct answer if loose.
- Let player choose to play again
*/

// Game values

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI ELEMENTS
const gameWrapper = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input");
message = document.querySelector(".message");

// Asign UI min and max;
minNum.textContent = min;
maxNum.textContent = max;

//Play again event Listener
gameWrapper.addEventListener('mousedown', function(e){
  if (e.target.className === 'play-again'){
      window.location.reload();
  }
})

guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  //check if gues is not null or guess is less or greater than min and max
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else {
    if (guess === winningNum) {
      //notify to user
      gameOver(true, `${guess} is correct`);
    } else {
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        gameOver(
          false,
          `GameOver, you lost. The correct number was ${winningNum}`
        );
      } else {
        guessInput.value = "";

        setMessage(
          `${guess} is not correct, ${guessesLeft} guesses left`,
          "red"
        );
      }
    }
  }
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function gameOver(won, msg) {
  let color;

  won === true ? (color = "green") : (color = "red");

  guessInput.disabled = true;

  guessInput.style.borderColor = color;

  setMessage(msg, color);

  //Play again

  guessBtn.value = "Play Again";

  guessBtn.className += "play-again";
}


function getRandomNum(min,max) {
    return Math.floor(Math.random() * (max - min + 1)+min);
}
