const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const gameBoard = document.querySelector(".game-board");
const gameOverScreen = document.querySelector(".game-over");
const restartButton = document.querySelector(".restart-button");

let gameLoop;
let isGameOver = false;
let isJumping = false;

function jump() {
  if (isGameOver || isJumping) return;

  isJumping = true;
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
    isJumping = false;
  }, 500);
}

function endGame() {
  if (isGameOver) return;

  isGameOver = true;

  // Para o movimento do cano.
  pipe.style.animation = "none";
  pipe.style.left = `${pipe.offsetLeft}px`;
  pipe.style.right = "auto";

  // Exibe a imagem de fim de jogo.
  mario.style.animation = "none";
  mario.src = "./img/game-over.png";

  // Exibe a tela de fim de jogo.
  gameOverScreen.hidden = false;

  // Para a verificação de colisões.
  clearInterval(gameLoop);
}

function startGame() {
  // Limpa o intervalo anterior.
  clearInterval(gameLoop);

  isGameOver = false;
  isJumping = false;

  // Esconde a tela de fim de jogo.
  gameOverScreen.hidden = true;

  // Restaura o Mario.
  mario.src = "./img/mario.gif";
  mario.classList.remove("jump");
  mario.style.animation = "";
  mario.style.bottom = "0";

  // Reinicia a animação do cano.
  pipe.style.animation = "none";
  pipe.style.left = "auto";
  pipe.style.right = "-80px";

  // Força o navegador a reiniciar a animação.
  void pipe.offsetWidth;

  pipe.style.animation = "";

  // Verifica colisões durante o jogo.
  gameLoop = setInterval(() => {
    if (isGameOver) return;

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

// Pula usando a barra de espaço ou a seta para cima.
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    event.preventDefault();
    jump();
  }
});

// Permite pular com clique ou toque na tela.
gameBoard.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".restart-button")) return;

  jump();
});

// Reinicia o jogo pelo botão.
restartButton.addEventListener("click", startGame);

// Inicia o jogo ao carregar a página.
startGame();
