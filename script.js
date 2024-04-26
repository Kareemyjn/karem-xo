// script.js
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.heightlet gameBoard = [];
let currentPlayer = 'X';
let score = { X: 0, O: 0 };
let gameOver = false;

// Initialize game board
for (let i = 0; i < 9; i++) {
    gameBoard.push('');
    document.getElementById(`cell-${i}`).addEventListener('click', handleCellClick);
}

// Handle cell click
function handleCellClick(event) {
    if (gameOver) return;
    const cellIndex = event.target.id.split('-')[1];
    if (gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = currentPlayer;
        event.target.innerHTML = currentPlayer;
        checkWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Check for win or tie
function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c] && gameBoard[a] !== '') {
            declareWinner(gameBoard[a]);
            return;
        }
    }
    if (!gameBoard.includes('')) {
        declareTie();
    }
}

// Declare winner or tie
function declareWinner(winner) {
    gameOver = true;
    document.getElementById('game-message').innerHTML = `Player ${winner} wins!`;
    score[winner]++;
    updateScore();
}

function declareTie() {
    gameOver = true;
    document.getElementById('game-message').innerHTML = 'It\'s a tie!';
}

// Update score
function updateScore() {
    document.getElementById('score').innerHTML = `Player X: ${score.X} - Player O: ${score.O}`;
}

// Restart game
document.getElementById('restart-button').addEventListener('click', restartGame);

function restartGame() {
    gameOver = false;
    gameBoard = [];
    for (let i = 0; i < 9; i++) {
        gameBoard.push('');
        document.getElementById(`cell-${i}`).innerHTML = '';
    }
    currentPlayer = 'X';
    document.getElementById('game-message').innerHTML = '';
}

// Reset score
document.getElementById('reset-score-button').addEventListener('click', resetScore);

function resetScore() {
    score = { X: 0, O: 0 };
    updateScore();
} = 400;

let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 }
];
let food = { x: 100, y: 100 };
let score = 0;
let direction = 'right';
let lastDirectionChange = 0;
const TOUCH_THRESHOLD = 50;
const DIRECTION_CHANGE_DELAY = 200;

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = { ...snake[i - 1] };
    }

    switch (direction) {
        case 'up':
            snake[0].y -= 10;
            break;
        case 'down':
            snake[0].y += 10;
            break;
        case 'left':
            snake[0].x -= 10;
            break;
        case 'right':
            snake[0].x += 10;
            break;
    }

    if (snake[0].x < 0 || snake[0].x > canvas.width - 10 || snake[0].y < 0 || snake[0].y > canvas.height - 10) {
        alert('Game Over!');
        return;
    }

    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * (canvas.width - 10)), y: Math.floor(Math.random() * (canvas.height - 10)) };
        snake.push({ ...snake[snake.length - 1] });
    }

    document.title = `Snake Game - Score: ${score}`;

    setTimeout(update, 100);
}

canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    const now = Date.now();
    if (now - lastDirectionChange > DIRECTION_CHANGE_DELAY) {
        lastDirectionChange = now;

        if (x < canvas.width / 2) {
            direction = 'left';
        } else if (x > canvas.width / 2) {
            direction = 'right';
        } else if (y < canvas.height / 2) {
            direction = 'up';
        } else {
            direction = 'down';
        }
    }
});

update();