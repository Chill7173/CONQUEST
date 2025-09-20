document.addEventListener('DOMContentLoaded', () => {
    const mainMenu = document.getElementById('main-menu');
    const gameWrapper = document.getElementById('game-wrapper');
    const gameContainer = document.getElementById('game-container');
    const uiPanel = document.getElementById('ui-panel');
    const pawnEl = document.getElementById('player-pawn');
    const rollButton = document.getElementById('roll-button');
    const gameLog = document.getElementById('game-log');
    const diceMovementEl = document.getElementById('dice-movement');
    const diceChallengeEl = document.getElementById('dice-challenge');
    const playGameBtn = document.getElementById('play-game-btn');
    
    let playerPositionIndex = 0;
    let isMoving = false;
    let currentLevelIndex = 0;
    
    const levels = [
        { name: "The Enchanted Forest", backgroundImage: 'https://i.ibb.co/sp7JfwDy/game-background.png', uiColor: '#5a4632', bgColor: 'rgba(30, 25, 20, 0.9)', pathCoordinates: [ { "x": 14.33, "y": 77.53, "type": "start" }, { "x": 18.06, "y": 70.47, "type": "empty" }, { "x": 19.57, "y": 58.97, "type": "challenge" }, { "x": 15.97, "y": 50.92, "type": "empty" }, { "x": 11.58, "y": 44.35, "type": "empty" }, { "x": 9.88, "y": 32.85, "type": "challenge" }, { "x": 13.68, "y": 21.02, "type": "empty" }, { "x": 20.42, "y": 11.99, "type": "empty" }, { "x": 29.06, "y": 5.42, "type": "challenge" }, { "x": 36.52, "y": 2.46, "type": "empty" }, { "x": 43.06, "y": 5.75, "type": "empty" }, { "x": 38.94, "y": 18.73, "type": "challenge" }, { "x": 37.17, "y": 32.03, "type": "empty" }, { "x": 39.27, "y": 45.83, "type": "empty" }, { "x": 39.2, "y": 61.93, "type": "challenge" }, { "x": 43.06, "y": 76.54, "type": "empty" }, { "x": 52.09, "y": 72.77, "type": "empty" }, { "x": 57.53, "y": 58.15, "type": "empty" }, { "x": 52.68, "y": 33.84, "type": "empty" }, { "x": 57.59, "y": 20.7, "type": "empty" }, { "x": 67.6, "y": 16.1, "type": "empty" }, { "x": 67.93, "y": 40.24, "type": "empty" }, { "x": 77.49, "y": 54.04, "type": "empty" }, { "x": 88.81, "y": 58.48, "type": "empty" }, { "x": 98.89, "y": 53.88, "type": "finish" } ] },
        { name: "Canyon of Trials", backgroundImage: 'https://i.ibb.co/99SqfPQB/game-lvl2.png', uiColor: '#5a4632', bgColor: 'rgba(30, 25, 20, 0.9)', pathCoordinates: [ { "x": 64.59, "y": 99.21, "type": "start" }, { "x": 60.73, "y": 94.94, "type": "empty" }, { "x": 56.54, "y": 89.68, "type": "challenge" }, { "x": 51.37, "y": 83.94, "type": "empty" }, { "x": 46.01, "y": 87.39, "type": "empty" }, { "x": 41.3, "y": 92.97, "type": "challenge" }, { "x": 37.43, "y": 98.23, "type": "empty" }, { "x": 32, "y": 94.61, "type": "empty" }, { "x": 29.12, "y": 87.55, "type": "challenge" }, { "x": 26.83, "y": 79.17, "type": "empty" }, { "x": 31.09, "y": 75.23, "type": "empty" }, { "x": 35.6, "y": 69.97, "type": "challenge" }, { "x": 40.31, "y": 64.72, "type": "empty" }, { "x": 45.68, "y": 66.36, "type": "empty" }, { "x": 51.05, "y": 65.05, "type": "challenge" }, { "x": 56.02, "y": 57.82, "type": "empty" }, { "x": 59.95, "y": 50.59, "type": "empty" }, { "x": 63.29, "y": 45.17, "type": "challenge" }, { "x": 67.34, "y": 37.78, "type": "empty" }, { "x": 71.2, "y": 32.03, "type": "empty" }, { "x": 74.8, "y": 26.77, "type": "challenge" }, { "x": 78.53, "y": 21.35, "type": "empty" }, { "x": 81.94, "y": 15.28, "type": "empty" }, { "x": 85.54, "y": 9.86, "type": "challenge" }, { "x": 89.2, "y": 4.27, "type": "finish" } ] },
        { name: "Volcanic Vista", backgroundImage: 'https://i.ibb.co/gLmZrJ7n/level3.png', uiColor: '#8c2f39', bgColor: 'rgba(40, 25, 25, 0.9)', pathCoordinates: [ { "x": 60.6, "y": 98.39, "type": "start" }, { "x": 56.28, "y": 94.12, "type": "empty" }, { "x": 51.57, "y": 87.88, "type": "challenge" }, { "x": 48.1, "y": 83.61, "type": "empty" }, { "x": 44.96, "y": 77.04, "type": "empty" }, { "x": 42.41, "y": 70.96, "type": "challenge" }, { "x": 38.61, "y": 75.39, "type": "empty" }, { "x": 34.82, "y": 81.14, "type": "empty" }, { "x": 29.38, "y": 76.87, "type": "challenge" }, { "x": 26.24, "y": 70.3, "type": "empty" }, { "x": 25.33, "y": 59.46, "type": "empty" }, { "x": 28.14, "y": 50.26, "type": "challenge" }, { "x": 30.69, "y": 43.53, "type": "empty" }, { "x": 35.14, "y": 43.2, "type": "empty" }, { "x": 38.87, "y": 47.63, "type": "challenge" }, { "x": 43.19, "y": 53.38, "type": "empty" }, { "x": 46.92, "y": 59.13, "type": "empty" }, { "x": 50.79, "y": 65.05, "type": "empty" }, { "x": 55.37, "y": 70.8, "type": "empty" }, { "x": 59.42, "y": 75.89, "type": "empty" }, { "x": 63.29, "y": 81.64, "type": "empty" }, { "x": 68, "y": 84.43, "type": "empty" }, { "x": 72.25, "y": 89.52, "type": "empty" }, { "x": 75.98, "y": 93.96, "type": "empty" }, { "x": 80.43, "y": 96.25, "type": "finish" } ] },
        { name: "The Mystic Marsh", backgroundImage: 'https://i.ibb.co/RGwtKGQ7/lvl4.png', uiColor: '#134e4a', bgColor: 'rgba(20, 40, 35, 0.9)', pathCoordinates: [ { "x": 50.26, "y": 99.44, "type": "start" }, { "x": 53.27, "y": 94.69, "type": "empty" }, { "x": 56.28, "y": 90.76, "type": "challenge" }, { "x": 59.82, "y": 88.79, "type": "empty" }, { "x": 63.09, "y": 93.87, "type": "empty" }, { "x": 66.23, "y": 90.76, "type": "challenge" }, { "x": 69.57, "y": 87.32, "type": "empty" }, { "x": 72.58, "y": 82.08, "type": "empty" }, { "x": 75.59, "y": 77, "type": "challenge" }, { "x": 79.12, "y": 72.41, "type": "empty" }, { "x": 75.98, "y": 67.82, "type": "empty" }, { "x": 73.23, "y": 62.58, "type": "challenge" }, { "x": 69.44, "y": 61.27, "type": "empty" }, { "x": 66.23, "y": 57.83, "type": "empty" }, { "x": 63.15, "y": 53.41, "type": "challenge" }, { "x": 60.21, "y": 48.98, "type": "empty" }, { "x": 57.66, "y": 44.23, "type": "empty" }, { "x": 54.52, "y": 41.61, "type": "challenge" }, { "x": 50.65, "y": 37.84, "type": "empty" }, { "x": 47.38, "y": 33.09, "type": "empty" }, { "x": 43.98, "y": 28.34, "type": "challenge" }, { "x": 40.71, "y": 23.26, "type": "empty" }, { "x": 42.02, "y": 14.25, "type": "empty" }, { "x": 44.83, "y": 9.01, "type": "challenge" }, { "x": 47.97, "y": 3.6, "type": "finish" } ] }
    ];

    function endTurn(success, customMessage = null, penalty = 0) {
        pawnEl.classList.remove('running');
        pawnEl.classList.add('idle');
        if (!success && penalty > 0) {
            gameLog.textContent = `Challenge failed! Moving back ${penalty} step${penalty > 1 ? 's' : ''}.`;
            playerPositionIndex = Math.max(0, playerPositionIndex - penalty);
            setTimeout(() => {
                updatePawnPosition();
                gameLog.textContent += ' Roll again.';
                isMoving = false;
                rollButton.disabled = false;
                rollButton.classList.remove('opacity-50');
            }, 500);
        } else {
            gameLog.textContent = customMessage || `Challenge ${success ? 'succeeded' : 'failed'}! Roll again.`;
            isMoving = false;
            rollButton.disabled = false;
            rollButton.classList.remove('opacity-50');
        }
    }
    
    function movePlayer(steps, challengeDifficulty = null) {
        pawnEl.classList.remove('idle');
        pawnEl.classList.add('running');
        let currentStep = 0;
        const moveInterval = setInterval(() => {
            if (currentStep >= steps) {
                clearInterval(moveInterval);
                checkCurrentTile(challengeDifficulty);
                return;
            }
            playerPositionIndex++;
            const currentPath = levels[currentLevelIndex].pathCoordinates;
            if (playerPositionIndex >= currentPath.length) {
                playerPositionIndex = currentPath.length - 1;
                clearInterval(moveInterval);
                checkCurrentTile(challengeDifficulty);
                return;
            }
            updatePawnPosition();
            currentStep++;
        }, 350);
    }

    function checkCurrentTile(challengeDifficulty) {
        const currentPath = levels[currentLevelIndex].pathCoordinates;
        const currentTile = currentPath[playerPositionIndex];
        
        if (currentTile.type === 'finish') {
            if (currentLevelIndex < levels.length - 1) { handleLevelComplete(); } else { handleGameVictory(); }
            return;
        }

        if (challengeDifficulty) {
            triggerChallenge(challengeDifficulty);
            return;
        }

        endTurn(true, "The path is clear... for now. Roll again.");
    }

    function triggerChallenge(difficulty) { Minigames.start(difficulty); }

    function handleLevelComplete() {
        const challengeModal = document.getElementById('challenge-modal');
        gameLog.textContent = "Level Complete!";
        challengeModal.classList.remove('hidden');
        challengeModal.querySelector('#challenge-title').textContent = "Level Complete!";
        challengeModal.querySelector('#challenge-desc').textContent = "You've found the way to the next area!";
        challengeModal.querySelector('#challenge-buttons').innerHTML = `<button id="next-level-btn" class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded">Next Level</button>`;
        document.getElementById('next-level-btn').addEventListener('click', () => {
            challengeModal.classList.add('hidden');
            loadLevel(currentLevelIndex + 1);
        }, { once: true });
    }

    function handleGameVictory() {
        const challengeModal = document.getElementById('challenge-modal');
        gameLog.textContent = "Congratulations! You've completed the adventure!";
        challengeModal.classList.remove('hidden');
        challengeModal.querySelector('#challenge-title').textContent = "Victory!";
        challengeModal.querySelector('#challenge-desc').textContent = "You have navigated all the paths!";
        challengeModal.querySelector('#challenge-buttons').innerHTML = `<button onclick="location.reload()" class="bg-amber-600 hover:bg-amber-700 px-6 py-2 rounded">Play Again</button>`;
        pawnEl.classList.remove('running');
        pawnEl.classList.add('idle');
    }

    function loadLevel(index) {
        mainMenu.classList.add('hidden');
        gameWrapper.classList.remove('hidden');
        gameWrapper.classList.add('flex');
        currentLevelIndex = index;
        const levelData = levels[currentLevelIndex];
        gameContainer.style.backgroundImage = `url('${levelData.backgroundImage}')`;
        uiPanel.style.backgroundColor = levelData.bgColor;
        uiPanel.style.borderColor = levelData.uiColor;
        playerPositionIndex = 0;
        createPath();
        updatePawnPosition();
        endTurn(true, `Welcome to Level ${currentLevelIndex + 1}!`);
    }

    function createPath() {
        document.querySelectorAll('.path-marker').forEach(marker => marker.remove());
        const currentPath = levels[currentLevelIndex].pathCoordinates;
        currentPath.forEach((coord, index) => {
            const marker = document.createElement('div');
            marker.classList.add('path-marker');
            marker.style.left = `${coord.x}%`;
            marker.style.top = `${coord.y}%`;
            gameContainer.insertBefore(marker, pawnEl);
        });
    }
    
    function updatePawnPosition() {
        const currentCoord = levels[currentLevelIndex].pathCoordinates[playerPositionIndex];
        pawnEl.style.left = `${currentCoord.x}%`;
        pawnEl.style.top = `${currentCoord.y}%`;
    }
    
    function rollDice() {
        if (isMoving) return;
        isMoving = true;
        rollButton.disabled = true;
        rollButton.classList.add('opacity-50');
        gameLog.textContent = "The dice are tumbling...";
        let randomSpins = 10 + Math.floor(Math.random() * 5);
        diceMovementEl.style.transform = `rotateX(${randomSpins * 90}deg) rotateY(${randomSpins * 90}deg)`;
        diceChallengeEl.style.transform = `rotateX(${randomSpins * 90}deg) rotateY(${randomSpins * 90}deg)`;
        setTimeout(() => {
            const movementRoll = Math.floor(Math.random() * 6) + 1;
            const challengeOptions = ['EASY', 'EASY', 'MEDIUM', 'MEDIUM', 'HARD', 'SAFE'];
            const challengeRoll = challengeOptions[Math.floor(Math.random() * 6)];
            setDiceFace(diceMovementEl, movementRoll);
            setDiceFace(diceChallengeEl, challengeRoll);
            if (challengeRoll === 'SAFE') {
                gameLog.textContent = `You rolled a ${movementRoll} and SAFE! Moving ${movementRoll} spaces.`;
                movePlayer(movementRoll);
            } else {
                gameLog.textContent = `You rolled ${movementRoll} for a ${challengeRoll} Challenge! Moving...`;
                movePlayer(movementRoll, challengeRoll);
            }
        }, 1000);
    }
    
    function setDiceFace(dice, value) {
        const rotations = { 1: 'rotateY(0deg)', 2: 'rotateY(-90deg)', 3: 'rotateY(-180deg)', 4: 'rotateY(90deg)', 5: 'rotateX(-90deg)', 6: 'rotateX(90deg)', 'SAFE': 'rotateX(90deg)', 'EASY': 'rotateY(0deg)', 'MEDIUM': 'rotateY(180deg)', 'HARD': 'rotateX(-90deg)'};
        dice.style.transform = rotations[value] || rotations[1];
    }

    const Minigames = (() => {
        const modal = document.getElementById('minigame-modal');
        const container = document.getElementById('minigame-container');
        const title = document.getElementById('minigame-title');
        const continueBtn = document.getElementById('minigame-continue');
        let gameAnimationFrameId = null;

        function clear() { if (gameAnimationFrameId) { cancelAnimationFrame(gameAnimationFrameId); gameAnimationFrameId = null; } container.innerHTML = ''; continueBtn.classList.add('hidden'); }
        function finish(success) { modal.classList.add('hidden'); endTurn(success, null, success ? 0 : 2); }
        
        function showEasyGame1() {
            clear(); title.textContent = "EASY: Memorize Sequence";
            let digits = Array.from({length: 3}, () => Math.floor(Math.random() * 10)); const correctSequence = digits.join('');
            container.innerHTML = `<div class="flex flex-col items-center justify-center space-y-4 h-48 font-pixel"><p class="text-xl text-center">Memorize!</p><p class="text-6xl font-bold text-yellow-300 tracking-widest">${digits.join(' ')}</p></div>`;
            setTimeout(() => {
                container.innerHTML = `<div class="flex flex-col items-center justify-center space-y-4 h-48 font-pixel"><p class="text-lg text-center">Enter sequence:</p><input type="text" id="guess-input" class="prediction-input p-2 text-2xl bg-gray-800 text-yellow-300 rounded-lg" maxlength="3" autofocus><button id="submit-guess-btn" class="px-6 py-3 bg-blue-500 rounded-full">Submit</button><p id="guess-feedback" class="h-6"></p></div>`;
                const guessInput = document.getElementById('guess-input'), submitBtn = document.getElementById('submit-guess-btn'), feedbackEl = document.getElementById('guess-feedback');
                const checkGuess = () => { if (submitBtn.disabled) return; submitBtn.disabled = true; const success = guessInput.value === correctSequence; feedbackEl.textContent = success ? `Correct!` : `Failed! It was ${correctSequence}.`; continueBtn.textContent = success ? 'Success!' : 'Continue'; continueBtn.classList.remove('hidden'); continueBtn.onclick = () => finish(success); };
                submitBtn.onclick = checkGuess;
                guessInput.onkeydown = (e) => { if (e.key === 'Enter') checkGuess(); };
            }, 2000);
        }

        function showEasyGame2() {
            clear(); title.textContent = "EASY: Survive!";
            container.innerHTML = `<div class="flex flex-col items-center justify-center space-y-2 w-full text-sm font-pixel"><p class="text-center">Survive 20s! Space to jump.</p><p>Time: <span id="time" class="text-yellow-300">20.0</span>s</p><canvas id="gameCanvas" width="500" height="250" class="bg-gray-800 border-2 border-gray-500"></canvas><p id="feedback" class="text-lg h-6"></p></div>`;
            const canvas = document.getElementById('gameCanvas'), ctx = canvas.getContext('2d'), timerDisplay = document.getElementById('time'), feedback = document.getElementById('feedback'), groundY = 180, gravity = 0.5, jumpForce = -10, speed = 4, gameDuration = 20000;
            let bike = { x: 50, y: groundY, width: 40, height: 25, vy: 0, isJumping: false }, obstacles = [], gameActive = true, lastObstacleTime = 0, startTime = Date.now();
            const handleKeyDown = (e) => { if (e.code === 'Space' && !bike.isJumping) { bike.vy = jumpForce; bike.isJumping = true; } };
            const endGame = (didWin) => { gameActive = false; document.removeEventListener('keydown', handleKeyDown); feedback.textContent = didWin ? "Survived!" : "Crashed!"; continueBtn.textContent = didWin ? 'Success!' : 'Continue'; continueBtn.classList.remove('hidden'); continueBtn.onclick = () => finish(didWin); };
            function gameLoop() {
                if (!gameActive) return;
                const elapsed = Date.now() - startTime; if (elapsed >= gameDuration) return endGame(true); timerDisplay.textContent = ((gameDuration - elapsed) / 1000).toFixed(1);
                bike.y += bike.vy; bike.vy += gravity; if (bike.y >= groundY) { bike.y = groundY; bike.vy = 0; bike.isJumping = false; }
                ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#34D399'; ctx.fillRect(0, groundY + bike.height, canvas.width, canvas.height);
                ctx.save(); ctx.translate(bike.x, bike.y); ctx.fillStyle = '#FBBF24'; ctx.beginPath(); ctx.moveTo(0, bike.height); ctx.lineTo(bike.width, bike.height); ctx.lineTo(bike.width - 10, bike.height - 15); ctx.lineTo(10, bike.height - 15); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(15, bike.height, 8, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(bike.width - 15, bike.height, 8, 0, Math.PI * 2); ctx.fill(); ctx.restore();
                if (Date.now() - lastObstacleTime > Math.random() * 1000 + 1000) { const h = Math.random() * 30 + 15; obstacles.push({ x: canvas.width, y: groundY + bike.height - h, width: 15, height: h }); lastObstacleTime = Date.now(); }
                obstacles.forEach((obs, i) => { obs.x -= speed; if (bike.x < obs.x + obs.width && bike.x + bike.width > obs.x && bike.y < obs.y + obs.height && bike.y + bike.height > obs.y) { endGame(false); } if (obs.x + obs.width < 0) obstacles.splice(i, 1); ctx.fillStyle = '#DC2626'; ctx.fillRect(obs.x, obs.y, obs.width, obs.height); });
                gameAnimationFrameId = requestAnimationFrame(gameLoop);
            }
            document.addEventListener('keydown', handleKeyDown); gameLoop();
        }
        function showMediumGame1() {
            clear(); title.textContent = "MEDIUM: Predict the Roll";
            container.innerHTML = `<div class="flex flex-col items-center justify-center space-y-4 font-pixel"><p class="text-lg text-center">Predict the next dice roll (1-6):</p><input type="number" id="prediction-input" min="1" max="6" class="prediction-input p-2 bg-gray-800 text-yellow-300 rounded-lg"><button id="predict-btn" class="px-6 py-3 bg-blue-500 rounded-full">Predict</button></div>`;
            document.getElementById('predict-btn').onclick = () => { const prediction = parseInt(document.getElementById('prediction-input').value); if (!prediction || prediction < 1 || prediction > 6) return; const actualRoll = Math.floor(Math.random() * 6) + 1; const success = prediction === actualRoll; container.innerHTML = `<p class="text-xl text-center font-pixel">The roll was ${actualRoll}. You were ${success ? "Correct!" : "Incorrect!"}</p>`; continueBtn.textContent = success ? 'Success!' : 'Continue'; continueBtn.classList.remove('hidden'); continueBtn.onclick = () => finish(success); };
        }
        function showMediumGame2() {
            clear(); title.textContent = "MEDIUM: Gold Catcher";
            container.innerHTML = `<div class="flex flex-col items-center justify-center space-y-2 text-sm font-pixel"><p>Catch 100 points! Arrow Keys to move, Space to drop.</p><div class="flex justify-between w-full px-4"><span id="score">Score: 0</span><span id="timer">Time: 30.0s</span></div><canvas id="gameCanvas" width="800" height="500" class="bg-blue-300"></canvas><p id="feedback" class="text-lg h-6"></p></div>`;
            const canvas = document.getElementById('gameCanvas'), ctx = canvas.getContext('2d'), scoreDisplay = document.getElementById('score'), timerDisplay = document.getElementById('timer'), feedback = document.getElementById('feedback'), gravity=0.2, goldDropInterval=1000, SCORE_TO_WIN=100, GAME_DURATION=30000;
            let score=0, gameActive=true, lastGoldDrop=0, keys={}, startTime = Date.now();
            let helicopter = { x: canvas.width/2, y: 50, width: 80, height: 40, shakeOffset: 0, shakeDirection: 1, targetX: canvas.width/2 };
            let boat = { x: canvas.width/2, y: canvas.height - 100, width: 100, height: 40, waveOffset: 0, waveAmplitude: 5, waveSpeed: 0.05, vx: 1.5 };
            let goldPieces = [];
            const drawSea=()=>{ctx.fillStyle='#3498db';ctx.fillRect(0,canvas.height-120,canvas.width,120);ctx.strokeStyle='#2980b9';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,canvas.height-120+boat.waveOffset);for(let i=0;i<canvas.width;i+=20){ctx.lineTo(i,canvas.height-120+boat.waveOffset+Math.sin(i*0.1+performance.now()*boat.waveSpeed)*boat.waveAmplitude);}ctx.lineTo(canvas.width,canvas.height-120+boat.waveOffset);ctx.stroke();};
            const drawHelicopter=()=>{ctx.save();ctx.translate(helicopter.x+helicopter.shakeOffset,helicopter.y);ctx.fillStyle='#c0392b';ctx.beginPath();ctx.ellipse(0,0,helicopter.width/2,helicopter.height/2,0,0,Math.PI*2);ctx.fill();ctx.fillRect(-helicopter.width/2-20,-10,20,10);ctx.fillStyle='#7f8c8d';ctx.fillRect(-helicopter.width/2,-helicopter.height/2-10,helicopter.width,5);ctx.restore();};
            const drawBoat=()=>{ctx.save();ctx.translate(boat.x,boat.y+boat.waveOffset);ctx.fillStyle='#9b59b6';ctx.beginPath();ctx.moveTo(-boat.width/2,0);ctx.lineTo(boat.width/2,0);ctx.quadraticCurveTo(boat.width/2+10,10,boat.width/2,boat.height);ctx.lineTo(-boat.width/2,boat.height);ctx.quadraticCurveTo(-boat.width/2-10,10,-boat.width/2,0);ctx.closePath();ctx.fill();ctx.fillStyle='#ecf0f1';ctx.fillRect(-20,-20,40,20);ctx.restore();};
            const drawGold=(gold)=>{ctx.fillStyle='#f1c40f';ctx.beginPath();ctx.arc(gold.x,gold.y,8,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#e67e22';ctx.lineWidth=1;ctx.stroke();};
            const endGame=(didWin)=>{gameActive=false;document.removeEventListener('keydown',handleKeyDown);document.removeEventListener('keyup',handleKeyUp);feedback.textContent=didWin?"Objective Complete!":"Time's up!";continueBtn.textContent=didWin?'Success!':'Continue';continueBtn.classList.remove('hidden');continueBtn.onclick=()=>finish(didWin);};
            const handleKeyDown=(e)=>{keys[e.key]=true;if(e.code==='Space')dropGold();};const handleKeyUp=(e)=>{keys[e.key]=false;};
            function dropGold(){goldPieces.push({x:helicopter.x,y:helicopter.y+helicopter.height/2,vy:0,vx:0});}
            function gameLoop() {
                if (!gameActive) return;
                const elapsed = Date.now()-startTime; const remaining=Math.max(0,GAME_DURATION-elapsed); timerDisplay.textContent=`Time: ${(remaining/1000).toFixed(1)}s`;
                if (elapsed >= GAME_DURATION) return endGame(score >= SCORE_TO_WIN);
                if (keys['ArrowLeft']) helicopter.targetX-=9; if(keys['ArrowRight']) helicopter.targetX+=9; helicopter.x+=(helicopter.targetX-helicopter.x)*0.1;
                if(helicopter.x<helicopter.width/2)helicopter.x=helicopter.width/2; if(helicopter.x>canvas.width-helicopter.width/2)helicopter.x=canvas.width-helicopter.width/2;
                helicopter.shakeOffset+=helicopter.shakeDirection*0.5; if(Math.abs(helicopter.shakeOffset)>5)helicopter.shakeDirection*=-1;
                boat.x+=boat.vx; if(boat.x<boat.width/2||boat.x>canvas.width-boat.width/2)boat.vx*=-1; boat.waveOffset=Math.sin(performance.now()*boat.waveSpeed)*boat.waveAmplitude;
                for(let i=goldPieces.length-1;i>=0;i--){ const g=goldPieces[i];g.y+=g.vy;g.x+=g.vx;g.vy+=gravity; if(g.y+8 > boat.y+boat.waveOffset && g.y < boat.y+boat.waveOffset + boat.height && g.x > boat.x - boat.width/2 && g.x < boat.x + boat.width/2){ score+=10;scoreDisplay.textContent=`Score: ${score}`;goldPieces.splice(i,1); if(score>=SCORE_TO_WIN)endGame(true); } else if(g.y>canvas.height){goldPieces.splice(i,1);} }
                const now=Date.now(); if(now-lastGoldDrop>goldDropInterval){dropGold();lastGoldDrop=now;}
                ctx.clearRect(0,0,canvas.width,canvas.height); drawSea();drawHelicopter();drawBoat();goldPieces.forEach(drawGold);
                gameAnimationFrameId=requestAnimationFrame(gameLoop);
            }
            document.addEventListener('keydown',handleKeyDown); document.addEventListener('keyup',handleKeyUp); gameLoop();
        }
        function showHardGame1() {
            clear(); title.textContent = "HARD: Guess the Number";
            container.innerHTML = `<div class="flex flex-col items-center justify-center space-y-4 font-pixel"><p>I'm thinking of a number between 1 and 25.</p><input type="number" id="guessInput" min="1" max="25" class="prediction-input p-2 bg-gray-800 text-yellow-300 rounded-lg"><button id="submitBtn" class="px-6 py-3 bg-blue-500 rounded-full">Guess</button><p id="feedback" class="h-6"></p><p id="guessCount">Guesses left: 5</p></div>`;
            let secretNumber = Math.floor(Math.random()*25)+1, guessCount=5;
            const guessInput = document.getElementById('guessInput'), submitBtn = document.getElementById('submitBtn'), feedback = document.getElementById('feedback'), guessCountDisplay = document.getElementById('guessCount');
            const checkGuess = () => {
                if (guessCount === 0 || submitBtn.disabled) return;
                const userGuess = parseInt(guessInput.value, 10);
                if(isNaN(userGuess)) { feedback.textContent="Enter a number."; return; }
                guessCount--; guessCountDisplay.textContent = `Guesses left: ${guessCount}`;
                if(userGuess===secretNumber){ feedback.textContent=`Correct! It was ${secretNumber}.`; submitBtn.disabled = true; continueBtn.textContent = 'Success!'; continueBtn.classList.remove('hidden'); continueBtn.onclick = () => finish(true); }
                else if(guessCount===0){ feedback.textContent=`Failed! The number was ${secretNumber}.`; submitBtn.disabled = true; continueBtn.textContent = 'Continue'; continueBtn.classList.remove('hidden'); continueBtn.onclick = () => finish(false); }
                else { feedback.textContent=`${userGuess < secretNumber ? 'Too low' : 'Too high'}!`; }
            };
            submitBtn.onclick = checkGuess; guessInput.onkeydown = (e) => {if(e.key==='Enter')checkGuess();};
        }
        function showHardGame2() {
            clear(); title.textContent = "HARD: Spell the Word";
            container.innerHTML = `<div class="flex flex-col items-center justify-center space-y-2 text-sm font-pixel"><p>Shoot letters to spell the target word!</p><div class="flex justify-between w-full px-4"><span>Target: <span id="word" class="text-yellow-300"></span></span><span>Time: <span id="time" class="text-yellow-300">60</span>s</span></div><canvas id="gameCanvas" width="500" height="300" class="cursor-crosshair bg-gray-800 border-2 border-gray-500"></canvas><p id="feedback" class="text-lg h-6"></p></div>`;
            const canvas = document.getElementById('gameCanvas'), ctx = canvas.getContext('2d'), wordDisplay = document.getElementById('word'), timerDisplay = document.getElementById('time'), feedback = document.getElementById('feedback');
            const WORDS=["APPLE","BANANA","ORANGE","GRAPE"], LETTER_SPEED=1, PROJECTILE_SPEED=7;
            let currentWord, currentLetterIndex=0, letters=[], projectiles=[], mouse={x:0,y:0}, gameRunning=true, timer=60, timerInterval;
            class Letter { constructor(x, y, letter) { this.x=x; this.y=y; this.letter=letter; this.width=25; this.height=25; this.vx=(Math.random()-.5)*LETTER_SPEED; this.vy=(Math.random()-.5)*LETTER_SPEED; } draw() { ctx.fillStyle='#f39c12'; ctx.fillRect(this.x,this.y,this.width,this.height); ctx.fillStyle='#fff'; ctx.font='14px "Press Start 2P"'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(this.letter,this.x+this.width/2,this.y+this.height/2); } update() { this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x+this.width>canvas.width)this.vx*=-1; if(this.y<0||this.y+this.height>canvas.height)this.vy*=-1; } }
            class Projectile { constructor(x, y, angle) { this.x=x; this.y=y; this.angle=angle; this.vx=Math.cos(angle)*PROJECTILE_SPEED; this.vy=Math.sin(angle)*PROJECTILE_SPEED; this.radius=4; } draw() { ctx.fillStyle='#e74c3c'; ctx.beginPath(); ctx.arc(this.x,this.y,this.radius,0,Math.PI*2); ctx.fill(); } update() { this.x+=this.vx; this.y+=this.vy; } }
            const handleMouseMove = (e)=>{const r=canvas.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;};
            const handleClick = ()=>{const a=Math.atan2(mouse.y-canvas.height+10,mouse.x-canvas.width/2);projectiles.push(new Projectile(canvas.width/2,canvas.height-10,a));};
            const endGame = (didWin) => { gameRunning=false; clearInterval(timerInterval); canvas.removeEventListener('mousemove',handleMouseMove); canvas.removeEventListener('click',handleClick); feedback.textContent = didWin ? "Success! Word spelled!" : "Failed!"; continueBtn.textContent = didWin ? 'Success!' : 'Continue'; continueBtn.classList.remove('hidden'); continueBtn.onclick = () => finish(didWin); };
            function gameLoop() {
                if(!gameRunning) return;
                ctx.fillStyle='#1a252f'; ctx.fillRect(0,0,canvas.width,canvas.height);
                projectiles.forEach((p,pi)=>{ p.update(); p.draw(); if(p.x<0||p.x>canvas.width||p.y<0||p.y>canvas.height) projectiles.splice(pi,1); });
                letters.forEach((l,li)=>{ l.update(); l.draw(); projectiles.forEach((p,pi)=>{ if(p.x>l.x && p.x<l.x+l.width && p.y>l.y && p.y<l.y+l.height){ projectiles.splice(pi,1); if(l.letter===currentWord[currentLetterIndex]){ letters.splice(li,1); currentLetterIndex++; if(currentLetterIndex===currentWord.length) endGame(true); } } }); });
                ctx.fillStyle='#7f8c8d'; ctx.fillRect(canvas.width/2-15,canvas.height-20,30,20);
                gameAnimationFrameId=requestAnimationFrame(gameLoop);
            }
            currentWord=WORDS[Math.floor(Math.random()*WORDS.length)]; wordDisplay.textContent=currentWord;
            const allLetters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            currentWord.split('').forEach(l=>letters.push(new Letter(Math.random()*(canvas.width-30),Math.random()*(canvas.height-30),l)));
            for(let i=0;i<15;i++) letters.push(new Letter(Math.random()*(canvas.width-30),Math.random()*(canvas.height-30),allLetters[Math.floor(Math.random()*26)]));
            timerInterval=setInterval(()=>{timer--;timerDisplay.textContent=timer;if(timer<=0)endGame(false);},1000);
            canvas.addEventListener('mousemove',handleMouseMove); canvas.addEventListener('click',handleClick);
            gameLoop();
        }

        return {
            start: (difficulty) => {
                modal.classList.remove('hidden');
                const gamesList = { 'EASY': [showEasyGame1, showEasyGame2], 'MEDIUM': [showMediumGame1, showMediumGame2], 'HARD': [showHardGame1, showHardGame2] }[difficulty];
                if (gamesList?.length > 0) { gamesList[Math.floor(Math.random() * gamesList.length)](); }
            }
        };
    })();
    
    function initialize() {
        playGameBtn.addEventListener('click', () => loadLevel(0));
        rollButton.addEventListener('click', rollDice);
    }
    initialize();
});