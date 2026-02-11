let playerName = '';
let stepCount = 0;
const symbols = ['🌸', '💖', '⭐', '🎈', '🐱', '💙', '🍕', '🎮', 
                 '🌸', '💖', '⭐', '🎈', '🐱', '💙', '🍕', '🎮'];

let cards = [...symbols];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function startGame() {
  playerName = document.getElementById('player-name').value.trim();
  if (!playerName) {
    alert('Silakan masukkan nama kamu!');
    return;
  }

  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';
  initializeGame();
}

function initializeGame() {
  stepCount = 0;
  updateStepDisplay();
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  const board = document.getElementById('board');
  board.innerHTML = '';

  cards.forEach((_, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.textContent = '?';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function updateStepDisplay() {
  document.getElementById('step-count').textContent = stepCount;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.textContent = cards[this.dataset.index];
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  stepCount++;
  updateStepDisplay();
  checkMatch();
}

function checkMatch() {
  const isMatch =
    cards[firstCard.dataset.index] === cards[secondCard.dataset.index];

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetCards();

    const matchedCards = document.querySelectorAll('.matched');
    if (matchedCards.length === cards.length) {
      setTimeout(() => {
        showWinScreen();
      }, 500);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.textContent = '?';
      secondCard.textContent = '?';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetCards();
    }, 500);
  }
}

function resetCards() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function showWinScreen() {
  document.getElementById('game-screen').style.display = 'none';
  document.getElementById('win-screen').style.display = 'block';
  document.getElementById('winner-name').textContent = playerName;
  document.getElementById('final-steps').textContent = stepCount;
}

function resetGame() {
  document.getElementById('win-screen').style.display = 'none';
  document.getElementById('start-screen').style.display = 'block';
  document.getElementById('player-name').value = '';
}
