const colorBox = document.getElementById('color-box');
const choicesDiv = document.getElementById('choices');
const scoreDiv = document.getElementById('score');
const messageDiv = document.getElementById('message');
const restartBtn = document.getElementById('restart');

let score = 0;
let targetColor = '';
let gameActive = true;
let roundActive = false;

function getRandomColor() {
    // Generate a random hex color
    const hex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    return hex;
}

function showColorToMemorize() {
    targetColor = getRandomColor();
    colorBox.style.background = targetColor;
    colorBox.textContent = '';
    messageDiv.textContent = 'Memorize this color!';
    choicesDiv.innerHTML = '';
    roundActive = false;
    setTimeout(() => {
        colorBox.style.background = '#fff';
        colorBox.textContent = '?';
        showColorScroll();
    }, 2500); // Show for 2.5 seconds
}

function showColorScroll() {
    messageDiv.textContent = 'Scroll to match the color!';
    choicesDiv.innerHTML = '';
    // Create a color input slider
    const input = document.createElement('input');
    input.type = 'color';
    input.value = '#888888';
    input.style.width = '120px';
    input.style.height = '60px';
    input.style.border = 'none';
    input.style.background = 'none';
    input.style.marginBottom = '12px';
    choicesDiv.appendChild(input);
    // Submit button
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = 'Submit';
    btn.onclick = () => guessColor(input.value);
    choicesDiv.appendChild(btn);
    roundActive = true;
}

function colorDistance(c1, c2) {
    // c1, c2: hex strings
    const rgb1 = [parseInt(c1.substr(1,2),16),parseInt(c1.substr(3,2),16),parseInt(c1.substr(5,2),16)];
    const rgb2 = [parseInt(c2.substr(1,2),16),parseInt(c2.substr(3,2),16),parseInt(c2.substr(5,2),16)];
    // Euclidean distance
    return Math.sqrt((rgb1[0]-rgb2[0])**2 + (rgb1[1]-rgb2[1])**2 + (rgb1[2]-rgb2[2])**2);
}

function guessColor(selected) {
    if (!gameActive || !roundActive) return;
    const dist = colorDistance(selected, targetColor);
    let points = 0;
    let feedback = '';
    if (dist < 10) {
        points = 20;
        feedback = '🎉 Perfect match! +20';
    } else if (dist < 40) {
        points = 10;
        feedback = '👍 Very close! +10';
    } else if (dist < 80) {
        points = 5;
        feedback = '🙂 Close! +5';
    } else {
        points = 0;
        feedback = `❌ Not close! (It was ${targetColor})`;
    }
    score += points;
    scoreDiv.textContent = `Score: ${score}`;
    messageDiv.textContent = feedback;
    roundActive = false;
    if (score >= 100) {
        endGame();
    } else {
        setTimeout(showColorToMemorize, 1500);
    }
}

function endGame() {
    gameActive = false;
    messageDiv.textContent = '🏆 You reached 100! Game Over!';
    choicesDiv.innerHTML = '';
    restartBtn.style.display = 'inline-block';
}

restartBtn.onclick = () => {
    score = 0;
    scoreDiv.textContent = 'Score: 0';
    gameActive = true;
    restartBtn.style.display = 'none';
    showColorToMemorize();
};

// Start the game
showColorToMemorize();
