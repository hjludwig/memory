// DOM Elements
const cardArea = document.querySelector('.cards');
const newGameBtn = document.querySelector('#new-game');
const gameArea = document.querySelector('.game');

let numCards = 10;
let lastClick;
let correct = 0;
let clicks = 0;

// Functions
function startGame() {
    clicks = 0;
    correct = 0;
    if (document.querySelector('win')) {
        document.querySelector('win').remove();
    }
    generateCards(numCards);
}

function generateCards(num) {
    cardArea.innerHTML = '';
    let cards = [];
    // Create cards
    
    for(let j = 0; j < 2; j++) {
        // let subcards = [];
        for (let i=0; i < num; i++) {
            const markup = `
            <div class='card-wrapper'>    
                <div class='card' id='${i}'>
                    <div class='front'><img src="assets/card-front.png"/><p class="cheat">${i}</p></div>
                    <div class='back'><img src="assets/card-${i+1}.png"/></div>
                </div>
            </div>
            `;
            cards.push(markup);
        };
    };


    let random = randomizeArray(cards);

    random.map( card => {
        cardArea.insertAdjacentHTML('beforeend', card);
    })
}

function randomizeArray(array) {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array;
}
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function handleClick(e) {
    let clicked = e.target;    
    
    // Don't allow user to click same card twice
    if (clicked.classList.contains('show')) {
        return;
    }

    clicks++;

    // Don't allow user to click more than twice
    if (clicks > 2) {
        return;
    }


    // Event delegation
    if(!clicked.classList.contains('card')) {
        return;
    }

    // Evaluate on every second click
    if (clicks != 1 && clicks % 2 === 0) {
        clicked.classList.add('show');
        evaluate(lastClicked.id, clicked.id);

    } else {
        clicked.classList.add('show');
        lastClicked = clicked;
    }

    function evaluate(a, b) {
        a === b ? handleCorrect() : handleIncorrect();
    }


    async function handleCorrect() {
        await delay(1000);
        lastClicked.classList.add('remove');
        clicked.classList.add('remove');
        clicks = 0;
        correct++;
        checkWin(correct);
        
    }

    async function handleIncorrect() {
        await delay(1000);
        lastClicked.classList.remove('show');
        await delay(500);
        clicked.classList.remove('show');
        lastClicked = clicked;
        clicks = 0;
    }
}
function checkWin(num) {
    if (num === cardArea.childElementCount / 2) {
        let markup = `
            <div class="win">
                <p>You Win!</p>
            </div>
        `;
        gameArea.insertAdjacentHTML('beforeend', markup);
        // startGame();
    }
}




// Event Listeners
cardArea.addEventListener('click', handleClick);
newGameBtn.addEventListener('click', startGame);
