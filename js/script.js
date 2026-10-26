const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameBoard = document.querySelector('.game-board');

let isJumping = false;

// Faz o Mario pular.
function jump() {
    if (isJumping || !mario) return;

    isJumping = true;
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
        isJumping = false;
    }, 900);
}

// Pula usando a barra de espaço ou a seta para cima.
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        jump();
    }
});

// Permite pular com clique ou toque.
if (gameBoard) {
    gameBoard.addEventListener('pointerdown', jump);
}

