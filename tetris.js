const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

const grid = 32;
const tetrominoes = [
    [1, 1, 1, 1], // I
    [1, 1, 1, 0, 1], // T
    [1, 1, 0, 0, 1, 1], // Z
    [0, 1, 1, 1, 1], // L
    [1, 1, 1, 1] // O
];

let board = [];
let currentPiece;
let piecePosition = { x: 5, y: 0 };

function createBoard() {
    for (let row = 0; row < 20; row++) {
        board[row] = new Array(10).fill(0);
    }
}

function drawBoard() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === 1) {
                context.fillStyle = 'blue';
                context.fillRect(col * grid, row * grid, grid, grid);
            } else {
                context.clearRect(col * grid, row * grid, grid, grid);
            }
        }
    }
}

function drawPiece() {
    for (let i = 0; i < currentPiece.length; i++) {
        let x = (piecePosition.x + i % 2) * grid;
        let y = (piecePosition.y + Math.floor(i / 2)) * grid;
        context.fillStyle = 'red';
        context.fillRect(x, y, grid, grid);
    }
}

function update() {
    piecePosition.y++;
    drawBoard();
    drawPiece();
}

function randomPiece() {
    currentPiece = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
        piecePosition.x--;
    } else if (event.key === "ArrowRight") {
        piecePosition.x++;
    } else if (event.key === "ArrowDown") {
        piecePosition.y++;
    }
});

function startGame() {
    createBoard();
    randomPiece();
    setInterval(update, 1000);
}

startGame();
