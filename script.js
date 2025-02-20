// Array de cartas (pares)
const cardsArray = ['🍎', '🍊', '🍇', '🍌', '🍉', '🍓', '🍒', '🥝'];
let shuffledCards = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random());
let firstCard = null;
let secondCard = null;
let matches = 0;
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

const gameBoard = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const player1ScoreDisplay = document.getElementById('player1-score'); // Mostrar aciertos Jugador 1
const player2ScoreDisplay = document.getElementById('player2-score'); // Mostrar aciertos Jugador 2

// Crear las cartas
function createBoard() {
    gameBoard.innerHTML = ''; // Limpiar el tablero antes de generar uno nuevo
    shuffledCards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

createBoard();

// Función para voltear una carta
function flipCard() {
    if (this.classList.contains('flipped') || secondCard) return;
    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}

// Función para verificar si hay coincidencia
function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        matches++;
        if (currentPlayer === 1) {
            player1Score++; // Incrementar el puntaje del Jugador 1
        } else {
            player2Score++; // Incrementar el puntaje del Jugador 2
        }
        // Actualizar la visualización de los aciertos
        player1ScoreDisplay.textContent = `Jugador 1: ${player1Score}`;
        player2ScoreDisplay.textContent = `Jugador 2: ${player2Score}`;
        resetTurn();
        if (matches === cardsArray.length) {
            declareWinner();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetTurn();
        }, 1000);
    }
}

// Función para declarar el ganador
function declareWinner() {
    let winner;
    if (player1Score > player2Score) {
        winner = 'Jugador 1';
    } else if (player2Score > player1Score) {
        winner = 'Jugador 2';
    } else {
        winner = 'Empate';  // En caso de empate, solo se asigna "Empate"
    }
    
    // Mostrar el mensaje adecuado según el resultado
    if (winner === 'Empate') {
        statusDisplay.textContent = '¡Es un empate!';  // Solo dice "Empate" en caso de empate
    } else {
        statusDisplay.textContent = `¡${winner} ha ganado con ${Math.max(player1Score, player2Score)} aciertos!`;  // Muestra al ganador y su puntaje
    }

    resetButton.classList.remove('hidden'); // Mostrar el botón de reinicio
}

// Función para resetear el turno
function resetTurn() {
    firstCard = null;
    secondCard = null;
    currentPlayer = currentPlayer === 1 ? 2 : 1; // Cambiar de jugador
    statusDisplay.textContent = `Turno del Jugador ${currentPlayer}`;
}

// Función para reiniciar el juego
function resetGame() {
    shuffledCards = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random());
    firstCard = null;
    secondCard = null;
    matches = 0;
    player1Score = 0;
    player2Score = 0;
    statusDisplay.textContent = `Turno del Jugador ${currentPlayer}`;
    player1ScoreDisplay.textContent = `Jugador 1: ${player1Score}`;
    player2ScoreDisplay.textContent = `Jugador 2: ${player2Score}`;
    resetButton.classList.add('hidden'); // Ocultar el botón de reinicio
    createBoard();
}

// Agregar un event listener para el botón de reinicio
resetButton.addEventListener('click', resetGame);
