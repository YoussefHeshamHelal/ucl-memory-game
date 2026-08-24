var card_1 = null;
var card_2 = null;   
var lock = false;
var score = 0;
var tries = 0;
var len = 16;

var timeLeft = 60;
var timerInterval = null;
var gameStarted = false;

const cards = document.querySelectorAll('.game-card'); 
const timerDisplay = document.getElementById('timer');

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('flip') || lock) {  
            return;
        }

        if (!gameStarted) {
            startTimer();
            gameStarted = true;
        }
        
        card.classList.add('flip');

        if (card_1 === null) {
            card_1 = card;
        } else if (card_2 === null) {
            card_2 = card;
            lock = true;  
        }   

        if (card_1 !== null && card_2 !== null) {      
            var img_1 = card_1.firstElementChild.src;
            var img_2 = card_2.firstElementChild.src;
            
            if (img_1 === img_2) {
                lock = false;
                card_1 = null;
                card_2 = null;
                score++;
                if (score === len / 2) {
                    clearInterval(timerInterval); 
                    showWins();
                }
            } else {
                setTimeout(() => {    
                    card_1.classList.remove('flip');
                    card_2.classList.remove('flip');
                    card_1 = null;
                    card_2 = null;
                    lock = false;
                    wrongTries();
                }, 500);
            }
        }    
    });  
});

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        
        var seconds = timeLeft < 10 ? "0" + timeLeft : timeLeft;
        timerDisplay.textContent = `00:${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            lock = true; 
            setTimeout(() => {
                var lose = confirm("Time is up! You lost. Do you want to try again?");
                if (lose) {
                    restartGame();
                }
            }, 300);
        }
    }, 1000);
}

// Restart game   
const restart = document.querySelector('.restart-btn');
restart.addEventListener('click', restartGame);

function restartGame() {
    clearInterval(timerInterval);
    timeLeft = 60;
    gameStarted = false;
    timerDisplay.textContent = "01:00";

    lock = true;
    card_1 = null;
    card_2 = null;
    score = 0;
    tries = 0;

    cards.forEach(card => {
        card.classList.remove("flip");
    });

    wrongT.textContent = tries;
    setTimeout(() => {
        shuffle(len);
        lock = false;
    }, 500);
}

function showWins() {
    setTimeout(() => { 
        var win = confirm("You won! Do you want to play again?");
        if (win) {
            restartGame();
        }
    }, 1000);
}

const wrongT = document.querySelector('.tries-messages span');
function wrongTries() {
    tries++;
    wrongT.textContent = tries; 
}

// Shuffle cards
function shuffle(length = 16) {
    cards.forEach(card => {
        var order = Math.floor(Math.random() * length);
        card.style.order = order;   
    });
}

shuffle();