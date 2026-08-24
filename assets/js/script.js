var card_1 = null;
var card_2 = null;   
var lock = false;
var score = 0;
var len = 16;

const cards = document.querySelectorAll('.game-card'); 

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('flip')) {  
            return;
        }
        if (lock) {
            return;
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
                    showWins();
                }
            } else {
                setTimeout(() => {    
                    card_1.classList.remove('flip');
                    card_2.classList.remove('flip');
                    card_1 = null;
                    card_2 = null;
                    lock = false;
                }, 500);
            }
        }    
    });  
});

// Restart game  
const restart = document.querySelector('.restart-btn');
restart.addEventListener('click', restartGame);

function restartGame() {
    lock = true;
    card_1 = null;
    card_2 = null;
    score = 0;

    cards.forEach(card => {
        card.classList.remove("flip");
    });

    setTimeout(() => {
        shuffle(len);
        lock = false;
    }, 500);
}

function showWins() {
    setTimeout(() => { 
        var win = confirm("You won!");
        if (win) {
            restartGame();
        }
    }, 1000);
}

// Shuffle cards
function shuffle(length = 16) {
    cards.forEach(card => {
        var order = Math.floor(Math.random() * length);
        card.style.order = order;   
    });
}

// Initial Shuffle on Load
shuffle();