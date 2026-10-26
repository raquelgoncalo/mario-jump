const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameBoard = document.querySelector('.game-board');
const gameOverScreen = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart-button');

let gameLoop;
let isGameOver = false;
let isJumping = false;

function jump() {
    if (isGameOver || isJumping) return;

    isJumping = true;
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
        isJumping = false;
    }, 500);
}

function endGame() {
    if (isGameOver) return;

    isGameOver = true;

    pipe.style.animation = 'none';
    pipe.style.left = `${pipe.offsetLeft}px`;
    pipe.style.right = 'auto';

    mario.style.animation = 'none';
    mario.src = './img/game-over.png';

    gameOverScreen.hidden = false;
    clearInterval(gameLoop);
}

function startGame() {
    clearInterval(gameLoop);

    isGameOver = false;
    isJumping = false;

    gameOverScreen.hidden = true;

    mario.src = './img/mario.gif';
    mario.classList.remove('jump');
    mario.style.animation = '';
    mario.style.bottom = '0';

    pipe.style.animation = 'none';
    pipe.style.left = 'auto';
    pipe.style.right = '-80px';

    // Reinicia a animação do cano.
    void pipe.offsetWidth;
    pipe.style.animation = '';

    gameLoop = setInterval(() => {
        const marioRect = mario.getBoundingClientRect();
        const pipeRect = pipe.getBoundingClientRect();

        const collision =
            marioRect.right > pipeRect.left &&
            marioRect.left < pipeRect.right &&
            marioRect.bottom > pipeRect.top + 20;

        if (collision) {
            endGame();
        }
    }, 10);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        jump();
    }
});

gameBoard.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.restart-button')) return;
    jump();
});

restartButton.addEventListener('click', startGame);

startGame();
