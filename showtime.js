let backgroundZoom = 1;
let backgroundPosX = 50;
let backgroundPosY = 50;

const showtimeText = document.getElementById('showtime-text');
const showtimeControlsInfo = document.getElementById('showtime-controls-info');

function startShowtime() {
    console.log("Starting showtime...");
    paused = true; // Pause the game
    clearInterval(timerInterval); // Pause the timer

    // Clear the game board to show only the background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = 'rgba(255, 255, 255, 0)'; // Make background crisp for showtime

    showtimeOverlay.style.display = 'flex'; // Use flex to center the text
    showtimeText.style.display = 'block';
    showtimeControlsInfo.style.display = 'block';

    setTimeout(() => {
        showtimeText.style.display = 'none';
    }, 1000);

    function handleShowtimeKeys(event) {
        if (event.keyCode === 32) { // Spacebar
            backgroundZoom = backgroundZoom === 1 ? 2 : 1;
            updateBackground();
        }

        if (backgroundZoom > 1) {
            if (event.keyCode === 37) { // Left arrow
                backgroundPosX = Math.max(0, backgroundPosX - 5);
                updateBackground();
            } else if (event.keyCode === 38) { // Up arrow
                backgroundPosY = Math.max(0, backgroundPosY - 5);
                updateBackground();
            } else if (event.keyCode === 39) { // Right arrow
                backgroundPosX = Math.min(100, backgroundPosX + 5);
                updateBackground();
            } else if (event.keyCode === 40) { // Down arrow
                backgroundPosY = Math.min(100, backgroundPosY + 5);
                updateBackground();
            }
        }

        if (event.keyCode === 13) { // Enter key
            document.removeEventListener('keydown', handleShowtimeKeys);

            showtimeOverlay.style.display = 'none';
            showtimeControlsInfo.style.display = 'none';
            backgroundZoom = 1;
            backgroundPosX = 50;
            backgroundPosY = 50;
            updateBackground();

            paused = false; // Unpause the game
            timerInterval = setInterval(updateTimer, 1000); // Resume the timer
            currentStageIndex++; // Advance stage
            loadStage(currentStageIndex); // Load the next stage
            drop(); // Resume game loop
        }
    }

    document.addEventListener('keydown', handleShowtimeKeys);
}

function updateBackground() {
    canvas.style.backgroundSize = `${backgroundZoom * 100}%`;
    canvas.style.backgroundPosition = `${backgroundPosX}% ${backgroundPosY}%`;
}
