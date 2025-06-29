const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const startMenu = document.getElementById('start-menu');
const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-button');
const pauseMessage = document.getElementById('pause-message');
const nextPieceCanvas = document.getElementById('next-piece-board');
const nextPieceCtx = nextPieceCanvas.getContext('2d');
const holdPieceCanvas = document.getElementById('hold-piece-board');
const holdPieceCtx = holdPieceCanvas.getContext('2d');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreDisplay = document.getElementById('final-score');
const stageDisplay = document.getElementById('stage-display');
const timerDisplay = document.getElementById('timer-display');
const showtimeOverlay = document.getElementById('showtime-overlay');

const ROW = 20;
const COL = 10;
const SQ = 40; // size of a square
const VACANT = 'EMPTY'; // Represents an empty square

const NEXT_PIECE_SQ = 40; // Size of square for next piece display
const HOLD_PIECE_SQ = 40; // Size of square for hold piece display

let score = 0;
let board = [];
let p; // current piece
let nextP; // next piece
let heldP = null; // held piece
let canHold = true; // flag to prevent holding multiple times per piece drop
let dropStart;
let gameover = false;
let paused = false; // New variable for pause state

let currentStageIndex = 0;
let linesToClearForStage = 0;
let clearedLinesInCurrentStage = 0;

let timeLimit = 0; // in seconds
let timeLeft = 0;
let timerInterval; // To store the interval ID

const STAGES = [
    {
        name: "1-1",
        linesToClear: 3, // Reduced for easier difficulty
        timeLimit: 60, // 60 seconds
        backgroundImage: 'images/backgrounds/background1.jpg',
        initialBoard: [
            // Example initial board for stage 1-1 (bottom 2 rows filled with some blocks)
            // Reduced initial blocks for easier difficulty
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["red", "red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, VACANT], // Row 18
            ["red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red"], // Row 19
        ]
    },
    {
        name: "1-2",
        linesToClear: 5, // Reduced for easier difficulty
        timeLimit: 90, // 90 seconds
        backgroundImage: 'images/backgrounds/background2.jpg',
        initialBoard: [
            // Example initial board for stage 1-2
            // Reduced initial blocks for easier difficulty
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["orange", "orange", VACANT, "cyan", "cyan", VACANT, "purple", "purple", VACANT, VACANT],
            ["orange", VACANT, "cyan", "cyan", VACANT, "purple", "purple", VACANT, "orange", "orange"],
            [VACANT, "cyan", "cyan", VACANT, "purple", "purple", VACANT, "orange", "orange", VACANT]
        ]
    },
    {
        name: "1-3",
        linesToClear: 4,
        timeLimit: 75,
        backgroundImage: 'images/backgrounds/background3.jpg',
        initialBoard: [
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["red", "red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, VACANT],
            ["red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red"],
            [VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red", VACANT],
            ["purple", "purple", VACANT, "orange", "orange", VACANT, "cyan", "cyan", VACANT, VACANT],
            ["purple", VACANT, "orange", "orange", VACANT, "cyan", "cyan", VACANT, "purple", "purple"]
        ]
    },
    {
        name: "1-4",
        linesToClear: 4,
        timeLimit: 70,
        backgroundImage: 'images/backgrounds/background4.jpg',
        initialBoard: [
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["red", "red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, VACANT],
            ["red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red"],
            [VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red", VACANT],
            ["purple", "purple", VACANT, "orange", "orange", VACANT, "cyan", "cyan", VACANT, VACANT],
            ["purple", VACANT, "orange", "orange", VACANT, "cyan", "cyan", VACANT, "purple", "purple"],
            ["yellow", "yellow", VACANT, "red", "red", VACANT, "blue", "blue", VACANT, VACANT]
        ]
    },
    {
        name: "2-1",
        linesToClear: 5,
        timeLimit: 90,
        backgroundImage: 'images/backgrounds/background5.jpg',
        initialBoard: [
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
            ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"],
            ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green"],
            [VACANT, "red", "red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT],
            ["red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red"]
        ]
    },
    {
        name: "2-2",
        linesToClear: 5,
        timeLimit: 85,
        backgroundImage: 'images/backgrounds/background6.jpg',
        initialBoard: [
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
            ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"],
            ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green"],
            ["orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange"],
            [VACANT, "red", "red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT],
            ["red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red"]
        ]
    },
    {
        name: "2-3",
        linesToClear: 6,
        timeLimit: 80,
        backgroundImage: 'images/backgrounds/background7.jpg',
        initialBoard: [
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
            ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"],
            ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green"],
            ["orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange"],
            ["purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple"],
            [VACANT, "red", "red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT],
            ["red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red"]
        ]
    },
    {
        name: "2-4",
        linesToClear: 6,
        timeLimit: 75,
        backgroundImage: 'images/backgrounds/background8.jpg',
        initialBoard: [
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
            ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"],
            ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green"],
            ["orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange"],
            ["purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple"],
            ["cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan"],
            [VACANT, "red", "red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT],
            ["red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red"]
        ]
    },
    {
        name: "3-1",
        linesToClear: 7,
        timeLimit: 90,
        backgroundImage: 'images/backgrounds/background9.jpg',
        initialBoard: [
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
            ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"],
            ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green"],
            ["orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange"],
            ["purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple"],
            ["cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan"],
            ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"],
            [VACANT, "red", "red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT]
        ]
    },
    {
        name: "3-2",
        linesToClear: 7,
        timeLimit: 85,
        backgroundImage: 'images/backgrounds/background10.jpg',
        initialBoard: [
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
            ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"],
            ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green"],
            ["orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange"],
            ["purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple"],
            ["cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan"],
            ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"],
            [VACANT, "red", "red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT],
            ["red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red"]
        ]
    },
    {
        name: "3-3",
        linesToClear: 8,
        timeLimit: 80,
        backgroundImage: 'images/backgrounds/background11.jpg',
        initialBoard: [
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
            ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"],
            ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green"],
            ["orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange"],
            ["purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple"],
            ["cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan"],
            ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"],
            [VACANT, "red", "red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT],
            ["red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red"],
            [VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red", VACANT]
        ]
    },
    {
        name: "3-4",
        linesToClear: 8,
        timeLimit: 75,
        backgroundImage: 'images/backgrounds/background12.jpg',
        initialBoard: [
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
            ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"],
            ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green"],
            ["orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange"],
            ["purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple"],
            ["cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan", "cyan"],
            ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"],
            [VACANT, "red", "red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT],
            ["red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red"],
            [VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red", VACANT],
            ["purple", "purple", VACANT, "orange", "orange", VACANT, "cyan", "cyan", VACANT, VACANT]
        ]
    }
];

// Initialize and start the game
function initGame() {
    currentStageIndex = 0; // Start from the first stage
    loadStage(currentStageIndex);
    score = 0;
    scoreDisplay.innerHTML = "점수: " + score;
    gameover = false;
    paused = false; // Ensure game is not paused on start
    pauseMessage.style.display = 'none'; // Hide pause message
    gameOverScreen.style.display = 'none'; // Hide game over screen
    heldP = null; // Clear held piece on new game
    canHold = true; // Reset canHold flag
    holdPieceCtx.clearRect(0, 0, holdPieceCanvas.width, holdPieceCanvas.height); // Clear hold canvas
    randomPiece(); // Generate initial p and nextP
    drawNextPiece(); // Draw the next piece
    drawHoldPiece(); // Draw the held piece (will be empty initially)
    dropStart = Date.now();
    drop(); // Start the game loop
}

function loadStage(stageIndex) {
    if (stageIndex >= STAGES.length) {
        // All stages cleared, end game or show victory screen
        gameover = true;
        gameOverScreen.style.display = 'flex';
        finalScoreDisplay.innerHTML = "모든 스테이지 클리어! 최종 점수: " + score;
        clearInterval(timerInterval); // Stop the timer
        return;
    }

    const stage = STAGES[stageIndex];
    stageDisplay.innerHTML = `스테이지: ${stage.name}`;
    linesToClearForStage = stage.linesToClear;
    clearedLinesInCurrentStage = 0;

    timeLimit = stage.timeLimit;
    timeLeft = timeLimit;
    updateTimerDisplay();
    clearInterval(timerInterval); // Clear any existing timer
    timerInterval = setInterval(updateTimer, 1000); // Start new timer

    // Set background image for the game board and make it blurry instantly
    canvas.style.backgroundImage = `url('${stage.backgroundImage}')`;
    canvas.style.transition = 'none';
    canvas.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';

    // Restore the transition after a short delay so it works for the next showtime
    setTimeout(() => {
        canvas.style.transition = 'background-color 3s ease';
    }, 50);

    createBoard(stage.initialBoard);
    drawBoard();
    // Reset piece position for new stage
    p = null; // Force new piece generation
    randomPiece();
    drawNextPiece();
    drawHoldPiece();
    dropStart = Date.now();
}

function updateTimer() {
    if (paused || gameover) return;

    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        gameover = true;
        gameOverScreen.style.display = 'flex';
        finalScoreDisplay.innerHTML = "시간 초과! 최종 점수: " + score;
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.innerHTML = `시간: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Initial game start when the page loads
// initGame();

startButton.addEventListener('click', () => {
    startMenu.style.display = 'none';
    gameContainer.style.display = 'flex';
    initGame(); // Start the game
});
