import { ROW, COL, VACANT, COLORS } from '../common/constants.js';
import * as gameplay from '../gameplay/gameplay.js';

export const LEVELS = [
    // Stage 1 levels
    {
        linesToClear: 3,
        timeLimit: 60,
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
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["red", "red", VACANT, "blue", "blue", VACANT, "green", "green", "red", "blue"], 
            ["red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red"],
        ]
    },
    {
        linesToClear: 3,
        timeLimit: 60,
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
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["orange", "orange", VACANT, "cyan", "cyan", VACANT, "purple", "purple", VACANT, VACANT],
            ["orange", VACANT, "cyan", "cyan", VACANT, "purple", "purple", VACANT, "orange", "orange"],
            [VACANT, "cyan", "cyan", VACANT, "purple", "purple", VACANT, "orange", "orange", VACANT]
        ]
    },
    {
        linesToClear: 3,
        timeLimit: 60,
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
        linesToClear: 3,
        timeLimit: 60,
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
        linesToClear: 3,
        timeLimit: 60,
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
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["red", "red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, VACANT], 
            ["red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red"],
        ]
    },
    {
        linesToClear: 3,
        timeLimit: 60,
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
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["orange", "orange", VACANT, "cyan", "cyan", VACANT, "purple", "purple", VACANT, VACANT],
            ["orange", VACANT, "cyan", "cyan", VACANT, "purple", "purple", VACANT, "orange", "orange"],
            [VACANT, "cyan", "cyan", VACANT, "purple", "purple", VACANT, "orange", "orange", VACANT]
        ]
    },
    {
        linesToClear: 3,
        timeLimit: 60,
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
        linesToClear: 3,
        timeLimit: 60,
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
        linesToClear: 3,
        timeLimit: 60,
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
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["red", "red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, VACANT], 
            ["red", VACANT, "blue", "blue", VACANT, "green", "green", VACANT, "red", "red"],
        ]
    },
    {
        linesToClear: 3,
        timeLimit: 60,
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
            [VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT, VACANT],
            ["orange", "orange", VACANT, "cyan", "cyan", VACANT, "purple", "purple", VACANT, VACANT],
            ["orange", VACANT, "cyan", "cyan", VACANT, "purple", "purple", VACANT, "orange", "orange"],
            [VACANT, "cyan", "cyan", VACANT, "purple", "purple", VACANT, "orange", "orange", VACANT]
        ]
    },
    {
        linesToClear: 4,
        timeLimit: 60,
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
        linesToClear: 5,
        timeLimit: 60,
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
];

function createEmptyInitialBoard() {
    const board = [];
    for (let i = 0; i < 20; i++) {
        board.push(Array(10).fill(VACANT));
    }
    return board;
}

export function loadStage(majorStage, minorStage) {
    const levelIndex = (majorStage - 1) * 4 + (minorStage - 1);

    if (levelIndex >= LEVELS.length) {
        console.log("All stages cleared!");
        showStageSelection(); // Go back to stage selection
        return false;
    }

    const level = LEVELS[levelIndex];
    if (!level) {
        console.error("Invalid level index:", levelIndex);
        return false;
    }

    // --- Update Gameplay State using imported functions ---
    const newBoard = createEmptyBoard();
    if (level.initialBoard) {
        const initialBoard = level.initialBoard;
        const boardHeight = newBoard.length;
        const initialHeight = initialBoard.length;

        for (let r = 0; r < initialHeight; r++) {
            for (let c = 0; c < initialBoard[r].length; c++) {
                const boardRow = boardHeight - initialHeight + r;
                const colorName = initialBoard[r][c];
                if (newBoard[boardRow] && colorName !== VACANT) {
                    newBoard[boardRow][c] = COLORS[colorName.toLowerCase()] || VACANT;
                }
            }
        }
    }
    gameplay.setBoard(newBoard);
    gameplay.setLinesToClear(level.linesToClear);
    gameplay.resetHold();
    
    // Update UI
    const stageDisplay = document.getElementById('stage-display');
    stageDisplay.textContent = `Stage ${majorStage}-${minorStage}`;
    
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.textContent = level.timeLimit;
    
    const gameBackground = document.getElementById('game-background');
    const backgroundImagePath = `images/backgrounds/stage-${majorStage}/${minorStage}.jpg`;
    gameBackground.style.backgroundImage = `url('${backgroundImagePath}')`;

    // Redraw board with new state
    gameplay.drawBoard();
    
    return true;
}

export function createEmptyBoard() {
    let newBoard = [];
    for (let r = 0; r < ROW; r++) {
        newBoard[r] = [];
        for (let c = 0; c < COL; c++) {
            newBoard[r][c] = VACANT;
        }
    }
    return newBoard;
}

export function showStageSelection() {
    const gameContainer = document.getElementById('game-container');
    const stageSelectionContainer = document.getElementById('stage-selection-container');

    if (gameContainer) gameContainer.style.display = 'none';
    if (stageSelectionContainer) stageSelectionContainer.style.display = 'flex';

    // Stop game timers and loops
    if (typeof timerInterval !== 'undefined') {
        clearInterval(timerInterval);
    }
    if (typeof gameOver !== 'undefined') {
        gameOver = true; // Prevent game loop from running
    }
}