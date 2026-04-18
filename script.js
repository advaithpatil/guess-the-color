const colorBox = document.getElementById('color-box');
const choicesDiv = document.getElementById('choices');
const scoreDiv = document.getElementById('score');
const messageDiv = document.getElementById('message');
const restartBtn = document.getElementById('restart');

let score = 0;
let currentColor = '';
let gameActive = true;

function getRandomColor() {
    // Generate a random hex color
    const hex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    return hex;
}

function getChoices(correctColor) {
    const choices = [correctColor];
    while (choices.length < 4) {
        const color = getRandomColor();
        if (!choices.includes(color)) choices.push(color);
    }
    // Shuffle
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    return choices;
}

function nextRound() {
    if (score >= 100) {
        endGame();
        return;
    }
    currentColor = getRandomColor();
    colorBox.style.background = currentColor;
    messageDiv.textContent = '';
    const choices = getChoices(currentColor);
    choicesDiv.innerHTML = '';
    choices.forEach(color => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = color;
        btn.onclick = () => guessColor(color);
        choicesDiv.appendChild(btn);
    });
}

function guessColor(selected) {
    if (!gameActive) return;
    if (selected === currentColor) {
        score += 10;
        messageDiv.textContent = '🎉 Correct! +10';
    } else {
        score -= 5;
        messageDiv.textContent = `❌ Wrong! -5 (It was ${currentColor})`;
    }
    scoreDiv.textContent = `Score: ${score}`;
    setTimeout(nextRound, 900);
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
    nextRound();
};

// Start the game
nextRound();
