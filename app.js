// DOM Elements
const cardArea = document.querySelector('.cards');
const newGameBtn = document.querySelector('#new-game');

let numCards = 10;


// Functions
function startGame() {
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
                <div class='card' id='${i}'><img src="assets/card-${i+1}.png"/></div>
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

function handleClick(e) {
    if(!e.target.classList.contains('card')) {
        return;
    }
    console.log(e.target.id);
}

// Event Listeners
cardArea.addEventListener('click', handleClick);
newGameBtn.addEventListener('click', startGame);
