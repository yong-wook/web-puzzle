import { stopGameLoop, clearBoard, pauseGame } from '../gameplay/gameplay.js';

let showtimeOverlay;
let showtimeText;
let showtimeControlsInfo;
let gameBackground;

let backgroundZoom = 1;
let backgroundPosX = 0;
let backgroundPosY = 0;

let onShowtimeCompleteCallback = () => {};

function updateBackground() {
    if (!gameBackground) return;
    const scale = `scale(${backgroundZoom})`;
    const translate = backgroundZoom > 1 ? `translate(${backgroundPosX}px, ${backgroundPosY}px)` : '';
    gameBackground.style.transform = `${translate} ${scale}`;
}

// --- Action Functions ---
function toggleZoom() {
    backgroundZoom = backgroundZoom === 1 ? 2 : 1;
    updateBackground();
}

function panBackground(dx, dy) {
    if (backgroundZoom <= 1) return;
    const moveAmount = 10;
    const containerWidth = gameBackground.offsetWidth;
    const containerHeight = gameBackground.offsetHeight;
    const maxPanX = (containerWidth * backgroundZoom - containerWidth) / 2;
    const maxPanY = (containerHeight * backgroundZoom - containerHeight) / 2;

    backgroundPosX = Math.max(-maxPanX, Math.min(maxPanX, backgroundPosX + dx * moveAmount));
    backgroundPosY = Math.max(-maxPanY, Math.min(maxPanY, backgroundPosY + dy * moveAmount));
    updateBackground();
}

function proceedToNext() {
    document.removeEventListener('keydown', handleShowtimeKeys);
    showtimeOverlay.style.display = 'none';
    
    backgroundZoom = 1;
    backgroundPosX = 0;
    backgroundPosY = 0;
    updateBackground();
    
    if (onShowtimeCompleteCallback) {
        onShowtimeCompleteCallback();
    }
}

function handleShowtimeKeys(event) {
    const handledKeys = [13, 32, 37, 38, 39, 40];
    if (!handledKeys.includes(event.keyCode)) {
        return; 
    }
    event.preventDefault();

    switch (event.keyCode) {
        case 32: toggleZoom(); break; // Space
        case 13: proceedToNext(); break; // Enter
        case 37: panBackground(-1, 0); break; // Left
        case 38: panBackground(0, -1); break; // Up
        case 39: panBackground(1, 0); break; // Right
        case 40: panBackground(0, 1); break; // Down
    }
}

export function initShowtime() {
    showtimeOverlay = document.getElementById('showtime-overlay');
    showtimeText = document.getElementById('showtime-text');
    showtimeControlsInfo = document.getElementById('showtime-controls-info');
    gameBackground = document.getElementById('game-background');

    // --- Touch Controls Setup ---
    document.getElementById('showtime-ctrl-zoom').addEventListener('click', toggleZoom);
    document.getElementById('showtime-ctrl-next').addEventListener('click', proceedToNext);
    document.getElementById('showtime-ctrl-up').addEventListener('click', () => panBackground(0, -1));
    document.getElementById('showtime-ctrl-down').addEventListener('click', () => panBackground(0, 1));
    document.getElementById('showtime-ctrl-left').addEventListener('click', () => panBackground(-1, 0));
    document.getElementById('showtime-ctrl-right').addEventListener('click', () => panBackground(1, 0));
}

export function startShowtime(onComplete) {
    onShowtimeCompleteCallback = onComplete;

    pauseGame(); // Pause gameplay controls
    stopGameLoop();
    clearBoard(); // Clear the board to only show the background

    showtimeOverlay.style.display = 'flex';
    showtimeText.style.display = 'block';
    showtimeControlsInfo.style.display = 'block';
    gameBackground.classList.add('showtime');

    // Hide "SHOWTIME" text after a delay
    setTimeout(() => {
        showtimeText.style.display = 'none';
    }, 1000);

    document.addEventListener('keydown', handleShowtimeKeys);
} 