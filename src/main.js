// src/main.js

// 다른 모듈에서 필요한 함수와 변수를 가져옵니다. (해당 파일들도 수정 예정)
// 'gameplay.js'는 게임의 핵심 로직(조각 이동, 줄 삭제, 게임 루프)을 담당합니다.
import { initGameplay, addKeydownListener, startGameLoop, stopGameLoop, setStageClearCallback, resetGameState, resumeGame } from './gameplay/gameplay.js';
// 'stage.js'는 스테이지 데이터와 로드 로직을 담당합니다.
import { loadStage } from './stage/stage.js';
import { initShowtime, startShowtime } from './showtime/showtime.js';

// --- DOM 요소 가져오기 ---
const stageSelectionContainer = document.getElementById('stage-selection-container');
const gameContainer = document.getElementById('game-container');
const stageOptionsContainer = document.querySelector('.stage-options'); // 컨테이너를 직접 선택
const gameOverScreen = document.getElementById('game-over-screen');
const pauseMessage = document.getElementById('pause-message');

// --- 게임 상태 변수 ---
let selectedMajorStage;
let currentMinorStage;

// --- 함수 정의 ---

/**
 * 'images/backgrounds' 폴더를 스캔하여 존재하는 스테이지를 찾아
 * 동적으로 스테이지 선택 버튼을 생성합니다.
 */
async function setupStageSelection() {
    gameContainer.style.display = 'none';
    stageSelectionContainer.style.display = 'flex';
    gameOverScreen.style.display = 'none';
    stageOptionsContainer.innerHTML = ''; // 기존 버튼 초기화

    let stageNum = 1;
    while (true) {
        const imagePath = `images/backgrounds/stage-${stageNum}/1.jpg`;
        try {
            const response = await fetch(imagePath);
            if (!response.ok) {
                // 이미지를 찾지 못하면 루프를 중단합니다 (404 Not Found).
                break;
            }

            // 스테이지가 존재하면 버튼을 생성합니다.
            const button = document.createElement('button');
            button.classList.add('stage-option');
            button.dataset.stage = stageNum;
            button.textContent = `Stage ${stageNum}`;
            
            // 버튼 스타일 설정
            button.style.backgroundImage = `url('${imagePath}')`;
            button.style.backgroundSize = 'cover';
            button.style.backgroundPosition = 'center';
            button.style.color = 'white';
            button.style.textShadow = '2px 2px 4px rgba(0,0,0,0.7)';
            
            // 버튼 클릭 이벤트 핸들러
            button.onclick = () => {
                selectedMajorStage = parseInt(button.dataset.stage, 10);
                currentMinorStage = 1;
                startGame();
            };
            
            stageOptionsContainer.appendChild(button);
            stageNum++;

        } catch (error) {
            console.error('Error checking for stage:', error);
            break; // 네트워크 오류 등이 발생하면 중단
        }
    }
}

/**
 * 게임을 시작하는 함수
 */
function startGame() {
    stageSelectionContainer.style.display = 'none';
    gameContainer.style.display = 'flex';
    pauseMessage.style.display = 'none';
    
    resetGameState(); // 점수, 보드 등 게임 상태 초기화
    addKeydownListener(); // 키보드 컨트롤 이벤트 리스너 추가

    // 스테이지가 클리어되었을 때 호출될 콜백 함수를 설정합니다.
    setStageClearCallback(onStageClear);

    // 선택한 스테이지의 첫 번째 레벨을 로드합니다.
    if (loadStage(selectedMajorStage, currentMinorStage)) {
        startGameLoop(); // 게임 루프를 시작합니다.
    }
}

/**
 * 스테이지가 클리어되었을 때 호출되는 콜백 함수
 */
function onStageClear() {
    // 게임 루프를 멈추고 'Showtime'을 시작합니다.
    // 쇼타임이 끝나면 advanceToNextStage 함수가 호출됩니다.
    stopGameLoop();
    startShowtime(advanceToNextStage);
}

/**
 * 쇼타임이 끝난 후 다음 스테이지로 진행하는 함수
 */
function advanceToNextStage() {
    currentMinorStage++;
    
    if (currentMinorStage > 12) {
        // 현재 Major Stage의 모든 마이너 스테이지를 클리어한 경우
        alert(`Stage ${selectedMajorStage} 클리어!`);
        setupStageSelection(); // 스테이지 선택 화면으로 돌아갑니다.
    } else {
        // 다음 마이너 스테이지 로드하고 게임 다시 시작
        if (loadStage(selectedMajorStage, currentMinorStage)) {
            resumeGame(); // Resume gameplay controls
            startGameLoop();
        }
    }
}

// --- 초기화 ---
// 페이지가 로드되면 스테이지 선택 화면을 설정합니다.
window.onload = () => {
    initGameplay(); // 게임 플레이 관련 DOM 요소를 먼저 초기화합니다.
    initShowtime(); // 쇼타임 관련 DOM 요소를 초기화합니다.
    setupStageSelection();
};

// 전역 스코프에 필요한 변수나 함수를 노출시켜야 할 경우,
// window 객체를 사용할 수 있습니다. (예: window.returnToMenu = setupStageSelection)
// 하지만 모듈 방식에서는 가급적 export/import를 사용하는 것이 좋습니다.