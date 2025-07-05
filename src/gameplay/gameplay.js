import { ROW, COL, SQ, VACANT, PIECES, COLORS } from '../common/constants.js';
import { createEmptyBoard } from '../stage/stage.js';

// --- DOM Elements (declare, but don't assign) ---
let canvas, ctx, scoreDisplay, linesDisplay, nextCanvas, nextCtx, holdCanvas, holdCtx, gameOverScreen, finalScoreDisplay;

// --- Game State ---
let board = [];
let p; // current piece
let nextP;
let heldP = null;
let canHold = true;
let score = 0;
let totalClearedLines = 0;
let gameOver = false;
let paused = false;
let dropStart;

// --- Module State ---
let animationFrameId;
let gameLoopRunning = false;
let onStageClearCallback = () => {};
let linesToClearForStage = 1;
let clearedLinesInCurrentStage = 0;


// --- Exported initialization function ---
export function initGameplay() {
    canvas = document.getElementById('game-board');
    if (!canvas) { console.error("DOM Error: Cannot find element with id 'game-board'"); return; }
    ctx = canvas.getContext('2d');

    scoreDisplay = document.getElementById('score');
    if (!scoreDisplay) { console.error("DOM Error: Cannot find element with id 'score'"); }

    // linesDisplay = document.getElementById('lines');
    // if (!linesDisplay) { console.error("DOM Error: Cannot find element with id 'lines'"); }

    nextCanvas = document.getElementById('next-piece-board');
    if (!nextCanvas) { console.error("DOM Error: Cannot find element with id 'next-piece-board'"); return; }
    nextCtx = nextCanvas.getContext('2d');

    holdCanvas = document.getElementById('hold-piece-board');
    if (!holdCanvas) { console.error("DOM Error: Cannot find element with id 'hold-piece-board'"); return; }
    holdCtx = holdCanvas.getContext('2d');
    
    gameOverScreen = document.getElementById('game-over-screen');
    if (!gameOverScreen) { console.warn("DOM Warn: Cannot find element with id 'game-over-screen'"); }
    
    finalScoreDisplay = document.getElementById('final-score');
    if (!finalScoreDisplay) { console.warn("DOM Warn: Cannot find element with id 'final-score'"); }
}

// --- Core Drawing Functions ---
function drawSquare(x, y, color, context = ctx, squareSize = SQ) {
    context.fillStyle = color;
    context.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
    if (color !== VACANT) {
        context.strokeStyle = 'BLACK';
        context.lineWidth = 0.5;
        context.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
    }
}

export function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawBoard() {
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

// --- Helper function to convert hex color to rgba for transparency ---
function hexToRgba(hex, alpha) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})` : null;
}


// --- Piece Object ---
function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;
    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.x = 3;
    this.y = -2;
}

Piece.prototype.fill = function(color) {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino[r].length; c++) {
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

Piece.prototype.draw = function() { this.fill(this.color); }

Piece.prototype.drawGhost = function() {
    // Create a temporary ghost piece to avoid modifying the original piece
    const ghostPiece = {
        x: this.x,
        y: this.y,
        activeTetromino: this.activeTetromino
    };

    // Move the ghost piece down until it collides
    while (!this.collision(0, 1, ghostPiece)) {
        ghostPiece.y++;
    }

    // Draw the ghost piece at its final position
    const ghostColor = hexToRgba(this.color, 0.2);
    if (ghostColor) {
        for (let r = 0; r < ghostPiece.activeTetromino.length; r++) {
            for (let c = 0; c < ghostPiece.activeTetromino[r].length; c++) {
                if (ghostPiece.activeTetromino[r][c]) {
                    drawSquare(ghostPiece.x + c, ghostPiece.y + r, ghostColor);
                }
            }
        }
    }
}

Piece.prototype.collision = function(x, y, piece) {
    const shape = piece.activeTetromino || piece; // Handle both original piece and ghost object
    const pieceX = piece.x === undefined ? this.x : piece.x;
    const pieceY = piece.y === undefined ? this.y : piece.y;

    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (!shape[r][c]) continue;
            let newX = pieceX + c + x;
            let newY = pieceY + r + y;
            if (newX < 0 || newX >= COL || newY >= ROW) return true;
            if (newY < 0) continue;
            if (board[newY][newX] !== VACANT) return true;
        }
    }
    return false;
}

Piece.prototype.lock = function() {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino[r].length; c++) {
            if (!this.activeTetromino[r][c]) continue;
            if (this.y + r < 0) {
                gameOver = true;
                break;
            }
            board[this.y + r][this.x + c] = this.color;
        }
    }
    clearLines();
    randomPiece();
    drawNextPiece();
    canHold = true;
}

Piece.prototype.moveDown = function() {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.y++;
    } else {
        this.lock();
    }
}

Piece.prototype.moveLeft = function() {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.x--;
    }
}

Piece.prototype.moveRight = function() {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.x++;
    }
}

Piece.prototype.rotate = function() {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    let kick = 0;
    if (this.collision(0, 0, nextPattern)) {
        kick = 1; // Wall kick
        if (this.x > COL / 2) kick = -1;
    }
    if (!this.collision(kick, 0, nextPattern)) {
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
    }
}

// --- Internal Game Logic ---
function clearLines() {
    let clearedCount = 0;
    for (let r = ROW - 1; r >= 0; r--) {
        if (board[r].every(cell => cell !== VACANT)) {
            clearedCount++;
            for (let y = r; y > 0; y--) {
                board[y] = board[y - 1];
            }
            board[0] = Array(COL).fill(VACANT);
            r++;
        }
    }
    if (clearedCount > 0) {
        score += 10 * Math.pow(2, clearedCount - 1);
        totalClearedLines += clearedCount;
        clearedLinesInCurrentStage += clearedCount;
        if (clearedLinesInCurrentStage >= linesToClearForStage) {
            onStageClearCallback();
        }
    }
    scoreDisplay.textContent = score;
    // linesDisplay.textContent = totalClearedLines;
}

function randomPiece() {
    let r = Math.floor(Math.random() * PIECES.length);
    p = nextP ? nextP : new Piece(PIECES[r][0], COLORS[PIECES[r][1]]);
    
    r = Math.floor(Math.random() * PIECES.length);
    nextP = new Piece(PIECES[r][0], COLORS[PIECES[r][1]]);

    if (p.collision(0, 0, p.activeTetromino)) {
        gameOver = true;
    }
}

function drawNextPiece() {
    nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
    const piece = nextP.activeTetromino;
    const sq = nextCanvas.width / 4;
    const xOffset = (4 - piece[0].length) / 2;
    const yOffset = (4 - piece.length) / 2;
    for(let r = 0; r < piece.length; r++){
        for(let c = 0; c < piece[r].length; c++){
            if(piece[r][c]){
                drawSquare(c + xOffset, r + yOffset, nextP.color, nextCtx, sq);
            }
        }
    }
}

function drawHoldPiece() {
    holdCtx.clearRect(0, 0, holdCanvas.width, holdCanvas.height);
    if(heldP){
        const piece = heldP.activeTetromino;
        const sq = holdCanvas.width / 4;
        const xOffset = (4 - piece[0].length) / 2;
        const yOffset = (4 - piece.length) / 2;
        for(let r = 0; r < piece.length; r++){
            for(let c = 0; c < piece[r].length; c++){
                if(piece[r][c]){
                    drawSquare(c + xOffset, r + yOffset, heldP.color, holdCtx, sq);
                }
            }
        }
    }
}

function CONTROL(event) {
    if (event.keyCode === 80) { // 'P' for pause
        if (paused) {
            resumeGame();
        } else {
            pauseGame();
        }
        return;
    }

    if (event.keyCode === 107) { // Numpad + for cheat
        if (onStageClearCallback) {
            onStageClearCallback();
        }
        return;
    }

    if (gameOver || paused) return;

    if (event.keyCode === 37) movePieceLeft();
    else if (event.keyCode === 39) movePieceRight();
    else if (event.keyCode === 40) movePieceDown();
    else if (event.keyCode === 38) rotatePiece();
    else if (event.keyCode === 32) hardDropPiece();
    else if (event.keyCode === 67) holdPiece(); // 'C' for hold
}

function drawEverything() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    if(p) {
        p.drawGhost(); // Draw the ghost piece first
        p.draw();      // Then draw the actual piece over it
    }
}

function drop() {
    if (!gameLoopRunning) return;
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 1000) {
        p.moveDown();
        dropStart = Date.now();
    }

    drawEverything(); // Redraw the entire state every frame

    if (!gameOver) {
        animationFrameId = requestAnimationFrame(drop);
    } else {
        stopGameLoop();
        gameOverScreen.style.display = 'flex';
        finalScoreDisplay.textContent = "최종 점수: " + score;
    }
}

// --- Exported Control Functions ---
export function resetGameState() {
    score = 0;
    totalClearedLines = 0;
    gameOver = false;
    paused = false;
    board = createEmptyBoard();
    heldP = null;
    canHold = true;
    drawBoard();
    drawHoldPiece();
    scoreDisplay.textContent = score;
    // linesDisplay.textContent = totalClearedLines;
    clearedLinesInCurrentStage = 0;
}

export function addKeydownListener() {
    document.removeEventListener('keydown', CONTROL);
    document.addEventListener('keydown', CONTROL);
}

export function startGameLoop() {
    if (gameLoopRunning) return;
    gameLoopRunning = true;
    randomPiece();
    drawNextPiece();
    dropStart = Date.now();
    drop();
}

export function stopGameLoop() {
    if (!gameLoopRunning) return;
    gameLoopRunning = false;
    cancelAnimationFrame(animationFrameId);
}

export function pauseGame() {
    paused = true;
}

export function resumeGame() {
    paused = false;
}

export function setStageClearCallback(callback) {
    onStageClearCallback = callback;
}

export function setBoard(newBoard) {
    board = newBoard;
}

export function setLinesToClear(lines) {
    linesToClearForStage = lines;
    clearedLinesInCurrentStage = 0; // Reset counter for new stage
}

// These functions are needed for stage.js to interact with the piece state
export function getNewPiece() {
    randomPiece();
    drawNextPiece();
    return p;
}

export function setPiece(newPiece) {
    p = newPiece;
}

export function resetHold() {
    heldP = null;
    canHold = true;
    drawHoldPiece();
}

// --- NEW Exported Action Functions for Touch Controls ---
function executeMove(action) {
    if (gameOver || paused) return;
    action();
}

export function movePieceLeft() {
    executeMove(() => p.moveLeft());
}

export function movePieceRight() {
    executeMove(() => p.moveRight());
}

export function movePieceDown() {
    executeMove(() => p.moveDown());
}

export function rotatePiece() {
    executeMove(() => p.rotate());
}

export function hardDropPiece() {
    executeMove(() => {
        while (!p.collision(0, 1, p.activeTetromino)) {
            p.y++;
        }
        p.lock();
    });
}

export function holdPiece() {
    executeMove(() => {
        if (canHold) {
            if (heldP) {
                [p, heldP] = [heldP, p];
                p.x = 3;
                p.y = -2;
            } else {
                heldP = p;
                randomPiece();
            }
            canHold = false;
            drawHoldPiece();
        }
    });
} 