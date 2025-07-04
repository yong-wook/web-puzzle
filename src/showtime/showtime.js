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

function handleShowtimeKeys(event) {
    const handledKeys = [13, 32, 37, 38, 39, 40];
    if (!handledKeys.includes(event.keyCode)) {
        return; // 우리가 처리하지 않는 키는 무시
    }

    event.preventDefault(); // 처리할 키에 대해서는 기본 동작을 항상 막음

    let needsUpdate = false;

    // 줌 인/아웃
    if (event.keyCode === 32) { // Space
        backgroundZoom = backgroundZoom === 1 ? 2 : 1;
        needsUpdate = true;
    }

    // 다음 스테이지로 진행
    if (event.keyCode === 13) { // Enter
        document.removeEventListener('keydown', handleShowtimeKeys);
        showtimeOverlay.style.display = 'none';
        gameBackground.classList.remove('showtime');
        
        backgroundZoom = 1;
        backgroundPosX = 0;
        backgroundPosY = 0;
        updateBackground();
        
        if (onShowtimeCompleteCallback) {
            onShowtimeCompleteCallback();
        }
        return;
    }

    // 확대된 상태에서만 화살표 키 작동
    if (backgroundZoom > 1) {
        const moveAmount = 10; // 이동량 (px)

        // 확대된 이미지가 컨테이너 밖으로 나가지 않도록 경계를 계산합니다.
        const containerWidth = gameBackground.offsetWidth;
        const containerHeight = gameBackground.offsetHeight;
        const maxPanX = (containerWidth * backgroundZoom - containerWidth) / 2;
        const maxPanY = (containerHeight * backgroundZoom - containerHeight) / 2;

        switch (event.keyCode) {
            case 37: // Left
                backgroundPosX = Math.max(-maxPanX, backgroundPosX - moveAmount);
                needsUpdate = true;
                break;
            case 38: // Up
                backgroundPosY = Math.max(-maxPanY, backgroundPosY - moveAmount);
                needsUpdate = true;
                break;
            case 39: // Right
                backgroundPosX = Math.min(maxPanX, backgroundPosX + moveAmount);
                needsUpdate = true;
                break;
            case 40: // Down
                backgroundPosY = Math.min(maxPanY, backgroundPosY + moveAmount);
                needsUpdate = true;
                break;
        }
    }

    if (needsUpdate) {
        updateBackground();
    }
}


export function initShowtime() {
    showtimeOverlay = document.getElementById('showtime-overlay');
    showtimeText = document.getElementById('showtime-text');
    showtimeControlsInfo = document.getElementById('showtime-controls-info');
    gameBackground = document.getElementById('game-background');
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