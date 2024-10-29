// JavaScript code for Tic Tac Toe game logic

let currentPlayer = 'X';
let scores = { X: 0, O: 0 };
const statusDisplay = document.getElementById("status");
const drawMessage = document.getElementById("drawMessage");

// Function to update the scoreboard
function updateScore() {
    document.getElementById("scoreboard").innerText = `X: ${scores.X} | O: ${scores.O}`;
}

// Function to check for a winner
function checkWinner() {
    const cells = Array.from(document.getElementsByClassName('cell'));
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        if (cells[a].innerText === currentPlayer &&
            cells[a].innerText === cells[b].innerText &&
            cells[a].innerText === cells[c].innerText) {
            return true;
        }
        return false;
    });
}

// Function to check for a draw and display message if true
function checkDraw() {
    const cells = Array.from(document.getElementsByClassName('cell'));
    const isDraw = cells.every(cell => cell.innerText !== '');
    if (isDraw) {
        drawMessage.style.display = "block";
        setTimeout(resetBoard, 500); // Reduced delay to 500ms
        return true;
    }
    return false;
}

// Function to handle cell click
function handleCellClick(event) {
    const cell = event.target;
    if (cell.innerText !== '') return;

    cell.innerText = currentPlayer;

    if (checkWinner()) {
        scores[currentPlayer]++;
        updateScore();
        setTimeout(resetBoard, 100); // Reduced delay to 500ms
    } else if (!checkDraw()) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerText = `Current Player: ${currentPlayer}`;
    }
}

// Function to reset the board without resetting the scores
function resetBoard() {
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.innerText = '';
    }
    currentPlayer = 'X';
    statusDisplay.innerText = `Current Player: ${currentPlayer}`;
    drawMessage.style.display = "none";
}

// Function to fully reset the game including scores
document.getElementById("reset").addEventListener("click", function() {
    scores = { X: 0, O: 0 };
    updateScore();
    resetBoard();
});

// Attach event listeners to each cell
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
