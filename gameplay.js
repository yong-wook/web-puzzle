function drawSquare(x, y, color, context = ctx, squareSize = SQ) {
    // Always clear the square first, including potential borders
    context.clearRect(x * squareSize, y * squareSize, squareSize, squareSize);

    if (color != VACANT) {
        context.fillStyle = color;
        context.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
        context.strokeStyle = 'BLACK';
        context.lineWidth = 0.5;
        context.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
    }
}

// create the board
function createBoard(initialBoardData) {
    for (r = 0; r < ROW; r++) {
        board[r] = [];
        for (c = 0; c < COL; c++) {
            if (initialBoardData && initialBoardData[r] && initialBoardData[r][c]) {
                board[r][c] = initialBoardData[r][c];
            } else {
                board[r][c] = VACANT;
            }
        }
    }
}

// draw the board
function drawBoard() {
    for (r = 0; r < ROW; r++) {
        for (c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

// The Tetrominoes and their rotations (unchanged)
const Z = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
    ]
];

const S = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
    ]
];

const T = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];

const O = [
    [
        [1, 1],
        [1, 1]
    ]
];

const L = [
    [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0]
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ]
];

const I = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
    ]
];

const J = [
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
    ]
];

const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T, "purple"],
    [O, "yellow"],
    [L, "orange"],
    [I, "cyan"],
    [J, "blue"]
];

// The Object Piece
function Piece(tetromino, color) {
    this.tetromino = tetromino; // This will be the array of 2D shapes for rotations
    this.color = color;

    this.tetrominoN = 0; // Start with the first rotation
    this.activeTetromino = this.tetromino[this.tetrominoN]; // The current active shape

    this.x = 3;
    this.y = 0;
}

// Draw a piece to the board
Piece.prototype.draw = function(context = ctx, squareSize = SQ) {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino[r].length; c++) {
            // We draw only occupied squares
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, this.color, context, squareSize);
            }
        }
    }
}

Piece.prototype.undraw = function(context = ctx, squareSize = SQ) {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino[r].length; c++) {
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, VACANT, context, squareSize);
            }
        }
    }
}

// generate random piece
function randomPiece() {
    if (p) {
        p = nextP;
    } else {
        let r = Math.floor(Math.random() * PIECES.length);
        p = new Piece(PIECES[r][0], PIECES[r][1]);
    }
    let r = Math.floor(Math.random() * PIECES.length);
    nextP = new Piece(PIECES[r][0], PIECES[r][1]);
    // Adjust nextP's position for display in the next piece canvas
    nextP.x = 0; // Reset x for next piece display
    nextP.y = 0; // Reset y for next piece display
}

// Draw the next piece on its dedicated canvas
function drawNextPiece() {
    nextPieceCtx.clearRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height); // Clear previous piece
    // Center the piece in the next piece canvas
    let offsetX = (nextPieceCanvas.width / NEXT_PIECE_SQ - nextP.activeTetromino[0].length) / 2;
    let offsetY = (nextPieceCanvas.height / NEXT_PIECE_SQ - nextP.activeTetromino.length) / 2;

    for (r = 0; r < nextP.activeTetromino.length; r++) {
        for (c = 0; c < nextP.activeTetromino[r].length; c++) {
            if (nextP.activeTetromino[r][c]) {
                drawSquare(c + offsetX, r + offsetY, nextP.color, nextPieceCtx, NEXT_PIECE_SQ);
            }
        }
    }
}

// Draw the held piece on its dedicated canvas
function drawHoldPiece() {
    holdPieceCtx.clearRect(0, 0, holdPieceCanvas.width, holdPieceCanvas.height); // Clear previous piece
    if (heldP) {
        // Center the piece in the hold piece canvas
        let offsetX = (holdPieceCanvas.width / HOLD_PIECE_SQ - heldP.activeTetromino[0].length) / 2;
        let offsetY = (holdPieceCanvas.height / HOLD_PIECE_SQ - heldP.activeTetromino.length) / 2;

        for (r = 0; r < heldP.activeTetromino.length; r++) {
            for (c = 0; c < heldP.activeTetromino[r].length; c++) {
                if (heldP.activeTetromino[r][c]) {
                    drawSquare(c + offsetX, r + offsetY, heldP.color, holdPieceCtx, HOLD_PIECE_SQ);
                }
            }
        }
    }
}

// Get the ghost piece's Y position
Piece.prototype.getGhostY = function() {
    let ghostY = this.y;
    while (!this.collision(0, ghostY - this.y + 1, this.activeTetromino)) {
        ghostY++;
    }
    return ghostY;
}

// Draw the ghost piece
function drawGhostPiece() {
    let ghostY = p.getGhostY();
    for (r = 0; r < p.activeTetromino.length; r++) {
        for (c = 0; c < p.activeTetromino[r].length; c++) {
            if (p.activeTetromino[r][c]) {
                drawSquare(p.x + c, ghostY + r, 'rgba(128,128,128,0.3)'); // Transparent gray
            }
        }
    }
}

// Undraw the ghost piece
function undrawGhostPiece() {
    let ghostY = p.getGhostY();
    for (r = 0; r < p.activeTetromino.length; r++) {
        for (c = 0; c < p.activeTetromino[r].length; c++) {
            if (p.activeTetromino[r][c]) {
                drawSquare(p.x + c, ghostY + r, VACANT); // Draw vacant to clear
            }
        }
    }
}

// collision function
Piece.prototype.collision = function(x, y, piece) {
    for (r = 0; r < piece.length; r++) {
        for (c = 0; c < piece.length; c++) {
            // if the square is empty, we skip it
            if (!piece[r][c]) {
                continue;
            }
            // coordinates of the piece after movement
            let newX = this.x + c + x;
            let newY = this.y + r + y;

            // conditions
            if (newX < 0 || newX >= COL || newY >= ROW) {
                return true;
            }
            // skip newY < 0; board[-2][j] will give an error
            if (newY < 0) {
                continue;
            }
            // check if there is a locked piece already in place
            if (board[newY][newX] != VACANT) {
                return true;
            }
        }
    }
    return false;
}

// clear lines
function clearLines() {
    console.log("clearLines called");
    for (r = ROW - 1; r >= 0; r--) {
        let isRowFull = true;
        for (c = 0; c < COL; c++) {
            if (board[r][c] == VACANT) {
                isRowFull = false;
                break;
            }
        }
        if (isRowFull) {
            console.log("A row is full and will be cleared.");
            // move all rows above it by one ROW
            for (y = r; y > 0; y--) {
                for (c = 0; c < COL; c++) {
                    board[y][c] = board[y - 1][c];
                }
            }
            // the top row has to be vacant
            for (c = 0; c < COL; c++) {
                board[0][c] = VACANT;
            }
            score += 10; // Increase score
            scoreDisplay.innerHTML = "점수: " + score; // Update score display
            clearedLinesInCurrentStage++;
            console.log(`Cleared lines in current stage: ${clearedLinesInCurrentStage}, Lines to clear for stage: ${linesToClearForStage}`);
            if (clearedLinesInCurrentStage >= linesToClearForStage) {
                startShowtime(); // Call showtime before loading next stage
                return; // Exit to prevent further processing of current piece drop
            }
            r++; // Recheck the same row, as new blocks have fallen into it
        }
    }
    drawBoard(); // Redraw the board after clearing lines
}

// lock the piece
Piece.prototype.lock = function() {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino[r].length; c++) {
            // we skip the vacant squares
            if (!this.activeTetromino[r][c]) {
                continue;
            }
            // pieces to lock on top of board = game over
            if (this.y + r < 0) {
                gameover = true;
                gameOverScreen.style.display = 'flex'; // Show game over screen
                finalScoreDisplay.innerHTML = "최종 점수: " + score; // Display final score
                break;
            }
            // lock the piece
            board[this.y + r][this.x + c] = this.color;
        }
    }
    // Check for game over after locking
    if (gameover) {
        return; // Stop further execution if game is over
    }
    clearLines(); // Check and clear lines after locking
    randomPiece(); // Generate a new piece (which becomes current p)
    drawNextPiece(); // Update next piece display
    canHold = true; // Allow holding again after a piece locks
}

// move Down the piece
Piece.prototype.moveDown = function() {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.y++;
    } else {
        this.lock();
    }
}

// move Left the piece
Piece.prototype.moveLeft = function() {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.x--;
    }
}

// move Right the piece
Piece.prototype.moveRight = function() {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.x++;
    }
    
}

// rotate the piece
Piece.prototype.rotate = function() {
    let nextN = (this.tetrominoN + 1) % this.tetromino.length;
    let nextPiece = this.tetromino[nextN];
    if (!this.collision(0, 0, nextPiece)) {
        this.tetrominoN = nextN;
        this.activeTetromino = this.tetromino[this.tetrominoN];
    }
}

// hard drop the piece
Piece.prototype.hardDrop = function() {
    while (!this.collision(0, 1, this.activeTetromino)) {
        this.y++;
    }
    this.lock();
}

// Hold the piece
Piece.prototype.hold = function() {
    if (!canHold) return; // Prevent holding multiple times per piece drop

    if (heldP) {
        // Swap current piece with held piece
        let temp = p;
        p = heldP;
        heldP = temp;
        // Reset position of the new current piece
        p.x = 3;
        p.y = -2;
        p.tetrominoN = 0; // Reset rotation for the new current piece
        p.activeTetromino = p.tetromino[p.tetrominoN];
    } else {
        // If no piece is held, hold current and get a new one
        heldP = p;
        randomPiece();
    }
    drawNextPiece(); // Update next piece display
    drawHoldPiece(); // Update hold piece display
    canHold = false; // Disable holding until next lock
    dropStart = Date.now(); // Reset drop timer
}

// Control the piece
document.addEventListener("keydown", CONTROL);

function CONTROL(event) {
    if (event.keyCode == 80) { // 'P' key for pause
        paused = !paused;
        if (paused) {
            pauseMessage.style.display = 'block';
            clearInterval(timerInterval); // Pause the timer
        } else {
            pauseMessage.style.display = 'none';
            timerInterval = setInterval(updateTimer, 1000); // Resume the timer
            drop(); // Resume game loop if unpaused
        }
        return; // Prevent other controls from activating
    }

    if (paused || gameover) { // If paused or gameover, prevent other controls
        return;
    }

    if (event.keyCode == 37) {
        p.moveLeft();
        dropStart = Date.now();
    } else if (event.keyCode == 38) {
        p.rotate();
        dropStart = Date.now();
    } else if (event.keyCode == 39) {
        p.moveRight();
        dropStart = Date.now();
    } else if (event.keyCode == 40) {
        p.moveDown();
    } else if (event.keyCode == 32) { // Spacebar for hard drop
        p.hardDrop();
        dropStart = Date.now();
    } else if (event.keyCode == 67) { // 'C' key for hold
        p.hold();
    }
}

// drop the piece every 1 sec
function drop() {
    if (paused || gameover) { // Do not drop if paused or gameover
        return;
    }

    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 1500) {
        p.moveDown();
        dropStart = Date.now();
    }

    // Redraw everything in every frame
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear entire canvas
    drawBoard(); // Redraw locked pieces
    drawGhostPiece(); // Redraw ghost piece
    p.draw(); // Redraw current piece

    requestAnimationFrame(drop);
}
