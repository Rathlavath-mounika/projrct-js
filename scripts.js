const wordList = ['javascript', 'hangman', 'frontend', 'bootstrap', 'developer'];
let selectedWord = '';
let guessedLetters = [];
let wrongLetters = [];
const maxWrong = 6;

const wordDisplay = document.getElementById('wordDisplay');
const wrongGuesses = document.getElementById('wrongGuesses');
const message = document.getElementById('message');
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

function startGame() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  guessedLetters = [];
  wrongLetters = [];
  message.textContent = '';
  document.getElementById('letterInput').value = '';
  drawHangman(0);
  updateDisplay();
}

function updateDisplay() {
  let displayWord = selectedWord
    .split('')
    .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');
  wordDisplay.textContent = displayWord;
  wrongGuesses.textContent = 'Wrong guesses: ' + wrongLetters.join(', ');

  if (!displayWord.includes('_')) {
    message.textContent = '🎉 You won!';
    disableInput();
  } else if (wrongLetters.length >= maxWrong) {
    message.textContent = `💀 You lost! The word was "${selectedWord}"`;
    wordDisplay.textContent = selectedWord.split('').join(' ');
    disableInput();
  }
}

function disableInput() {
  document.getElementById('letterInput').disabled = true;
}

function enableInput() {
  document.getElementById('letterInput').disabled = false;
}

function guessLetter() {
  const input = document.getElementById('letterInput');
  const letter = input.value.toLowerCase();

  if (!letter.match(/[a-z]/i) || letter.length !== 1) {
    alert('Please enter a valid letter.');
    return;
  }

  if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
    alert('You already guessed that letter!');
    return;
  }

  if (selectedWord.includes(letter)) {
    guessedLetters.push(letter);
  } else {
    wrongLetters.push(letter);
    drawHangman(wrongLetters.length);
  }

  input.value = '';
  updateDisplay();
}

function drawHangman(stage) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Base
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(10, 240);
  ctx.lineTo(190, 240);
  ctx.stroke();

  // Pole
  ctx.beginPath();
  ctx.moveTo(50, 240);
  ctx.lineTo(50, 20);
  ctx.lineTo(150, 20);
  ctx.lineTo(150, 40);
  ctx.stroke();

  if (stage > 0) {
    // Head
    ctx.beginPath();
    ctx.arc(150, 60, 20, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (stage > 1) {
    // Body
    ctx.beginPath();
    ctx.moveTo(150, 80);
    ctx.lineTo(150, 140);
    ctx.stroke();
  }
  if (stage > 2) {
    // Left Arm
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(120, 120);
    ctx.stroke();
  }
  if (stage > 3) {
    // Right Arm
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(180, 120);
    ctx.stroke();
  }
  if (stage > 4) {
    // Left Leg
    ctx.beginPath();
    ctx.moveTo(150, 140);
    ctx.lineTo(120, 180);
    ctx.stroke();
  }
  if (stage > 5) {
    // Right Leg
    ctx.beginPath();
    ctx.moveTo(150, 140);
    ctx.lineTo(180, 180);
    ctx.stroke();
  }
}

// Auto-start game on page load
window.onload = () => {
  startGame();
  enableInput();
};
