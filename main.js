// Factory function for creating players
const Player = (name, marker) => {
    return { name, marker };
};

// Initialize variables
let player1, player2, currentPlayer;
let board = Array(9).fill(null);
let gameActive = true;

// Function to initialize players
function initializePlayers() {
    const name1 = document.getElementById("player1-name").value || "Player 1";
    const name2 = document.getElementById("player2-name").value || "Player 2";
    player1 = Player(name1, "X");
    player2 = Player(name2, "O");
    currentPlayer = player1;
    resetGame();
    document.querySelector(".player-form").style.display = "none";
}

// Function to handle a player's move
function handleMove(index) {
    if (board[index] === null && gameActive) {
        board[index] = currentPlayer.marker;
        const squareElement = document.querySelector(`.square${index + 1}`);
        squareElement.textContent = currentPlayer.marker;

        if (checkWin()) {
            gameActive = false;
            highlightWinningCombination(checkWin());
            setTimeout(() => alert(`${currentPlayer.name} wins!`), 100);
        } else if (board.every(cell => cell !== null)) {
            gameActive = false;
            setTimeout(() => alert("It's a draw!"), 100);
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            updateTurnDisplay();
        }
    }
}

// Function to check for a win
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.find(combination => {
        const [a, b, c] = combination;
        return board[a] === currentPlayer.marker &&
               board[b] === currentPlayer.marker &&
               board[c] === currentPlayer.marker;
    });
}

// Function to highlight the winning combination
function highlightWinningCombination(combination) {
    combination.forEach(index => {
        const squareElement = document.querySelector(`.square${index + 1}`);
        squareElement.classList.add("winning-square");
    });
}

// Function to reset the game
function resetGame() {
    board = Array(9).fill(null);
    gameActive = true;
    currentPlayer = player1;
    updateTurnDisplay();

    for (let i = 0; i < 9; i++) {
        const squareElement = document.querySelector(`.square${i + 1}`);
        squareElement.textContent = "";
        squareElement.classList.remove("winning-square");
    }
}

// Function to update the turn display
function updateTurnDisplay() {
    const info = document.querySelector(".info");
    info.textContent = `${currentPlayer.name}'s Turn (${currentPlayer.marker})`;
}

// Add event listeners to the squares
function initializeGame() {
    for (let i = 0; i < 9; i++) {
        const squareElement = document.querySelector(`.square${i + 1}`);
        squareElement.addEventListener("click", () => handleMove(i));
    }

    const startButton = document.querySelector(".start");
    startButton.addEventListener("click", initializePlayers);

    const restartButton = document.querySelector(".restart");
    restartButton.addEventListener("click", resetGame);
}

// Initialize the game
initializeGame();