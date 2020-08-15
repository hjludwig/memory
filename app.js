// DOM Elements
const cardArea = document.querySelector('.cards');
const newGameBtn = document.querySelector('#new-game');

let numCards = 20;


// Functions
function startGame() {
    generateCards(numCards);
    console.log('hello')
}

function generateCards(num) {
    for (let i=0; i <= num; i++) {
        const markup = `
            <div class='card' id='${i}'></div>
        `;
        cardArea.insertAdjacentHTML('beforeend', markup);
    }
}

// Event Listeners
newGameBtn.addEventListener('click', startGame);
