// Selecting items
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const players = {
  0: document.querySelector('.player--0'),
  1: document.querySelector('.player--1'),
}

const scoreEls = {
  0: document.querySelector('#score--0'),
  1: document.querySelector('#score--1'),
}

const currentScoreEls = {
  0: document.querySelector('#current--0'),
  1: document.querySelector('#current--1'),
}

let activePlayer, currentScore, scores, gameOn;

function updateCurrentScore(score) {
  currentScoreEls[activePlayer].textContent = score;
}

function updateScore(score) {
  scoreEls[activePlayer].textContent = score;
}

function switchPlayer() {
  currentScore = 0;
  updateCurrentScore(currentScore);
  players[0].classList.toggle('player--active');
  players[1].classList.toggle('player--active');
  activePlayer = activePlayer === 0? 1 : 0;
}

//Assigning start conditions
function gameInit () {

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameOn = true;

  scoreEls[0].textContent = 0;
  scoreEls[1].textContent = 0;
  currentScoreEls[0].textContent = 0;
  currentScoreEls[1].textContent = 0;

  diceEl.classList.add('hidden');
  players[0].classList.remove('player--winner', 'player--active');
  players[1].classList.remove('player--winner', 'player--active');
  players[0].classList.add('player--active');
  
}


btnRoll.addEventListener('click', function () {

  if (gameOn) {
    const diceValue = Math.trunc(Math.random()*5)+1;
    diceEl.classList.remove('hidden');
    diceEl.src = `./img/dice-${diceValue}.png`;

    if (diceValue !==1) {
      currentScore += diceValue
      updateCurrentScore(currentScore);
    } else {
      switchPlayer();
    }
  }

});

btnHold.addEventListener('click', function () {
  if (gameOn) {
    const totalScore = scores[activePlayer] += currentScore;
    updateScore(totalScore);
  
    if (totalScore >= 20) {
      diceEl.classList.add('hidden');
      players[activePlayer].classList.add('player--winner');
      players[activePlayer].classList.remove('player--active');
      gameOn = false;
      
    } else {
      switchPlayer()
    }
  }

});

btnNew.addEventListener('click', gameInit );

gameInit();