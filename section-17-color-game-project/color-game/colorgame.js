let rgbColors = [];
let colorSquare = document.getElementsByClassName('color-square');
let colorDisplay = document.getElementById('rgb-display');
let h1 = document.querySelector('h1');
let gameOver = false;
let feedback = document.querySelector('#game-feedback');
let correctColor = null;
let clickedColor = null;
let newGame = document.querySelector('#new-game');
// by default set to hard, ie, 9 squares
let maxGameSize = 9;
let gameSize = maxGameSize;
let switchHard = document.querySelector('#hard');
let switchEasy = document.querySelector('#easy');

// change stuff when the user wins
function gameEnd() {
    gameOver = true;
    for (let i = 0; i < gameSize; ++i) {
        colorSquare[i].style.backgroundColor = clickedColor;
        colorSquare[i].style.paddingTop = '30%';
    }
    h1.style.backgroundColor = clickedColor;
    feedback.style.color = clickedColor;
    feedback.textContent = 'Correct :-O';
    newGame.textContent = 'Play Again ?';
}

// resets the game board for a new game
function resetGame() {
    gameOver = false;
    generateRandomColors();
    pickColor(gameSize);
    // display the color to guess in the h1
    colorDisplay.textContent = correctColor;
    for (let i = 0; i < gameSize; ++i) {
        // add colors to the squares
        colorSquare[i].style.backgroundColor = rgbColors[i];
        h1.style.backgroundColor = rgbColors[Math.floor(Math.random() * 4)];
        newGame.textContent = 'New Colors';
        feedback.textContent = '';
    }
    for (let i = gameSize; i < maxGameSize; ++i) {
        colorSquare[i].style.backgroundColor = "transparent";
    }
}

// generate random colors darkgray
function generateRandomColors() {
    let rgb = [];
    rgbColors = [];
    for (let l = 0; l < gameSize; ++l) {
        rgb = [];
        for (let j = 0; j < 3; ++j) {
            rgb.push(Math.floor(Math.random() * 255));
        }
        rgbColors.push(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
    }
}

//pick random colors
function pickColor(maxvalue) {
    let num = Math.floor(Math.random() * maxvalue);
    correctColor = rgbColors[num];
}

// main code starts here

// initializing the game
resetGame();

// make squares go away or check if guess is correct on click
for (let i = 0; i < gameSize; ++i) {
    // add event listener to the squares
    colorSquare[i].addEventListener('click', function () {
        clickedColor = this.style.backgroundColor;
        // check if the color of the square clicked is equal to correctColor
        if (clickedColor === correctColor) {
            // do the necessary to end the game
            gameEnd();
        } else {
            colorSquare[i].style.backgroundColor = 'transparent';
            feedback.textContent = 'Try Again :-)';
        }
    });
}

// reset game
newGame.addEventListener('click', function() {
    // initializing the game again
    resetGame();
});

// set difficulty hard
switchHard.addEventListener('click', function() {
    gameSize = 9;
    this.classList.add('selected');
    switchEasy.classList.remove('selected');
    resetGame();
});
// set difficulty easy
switchEasy.addEventListener('click', function() {
    gameSize = 6;
    this.classList.add('selected');
    switchHard.classList.remove('selected');
    resetGame();
});
