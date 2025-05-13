const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

let playerSpeed = 5;
let moveDirection = null; // "left" ou "right"
let moveSpeed = 5;
let bulletSpeed = 8;
let invaderSpeed = 1;
let score = 0;
let bullets = [];
let invaders = [];

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") moveDirection = "left";
    if (e.code === "ArrowRight") moveDirection = "right";
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") shoot();
});
  
document.addEventListener("keyup", (e) => {
    if (
      (e.code === "ArrowLeft" && moveDirection === "left") ||
      (e.code === "ArrowRight" && moveDirection === "right")
    ) {
      moveDirection = null;
    }
});  

function shoot() {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
  
    const initialBottom = player.offsetTop + player.offsetHeight;
    const bulletLeft = player.offsetLeft + player.offsetWidth / 2 - 2;
  
    bullet.style.left = bulletLeft + "px";
    bullet.style.bottom = "30px";
    bullet.dataset.bottom = 30; // guardar a posição inicial em px
  
    game.appendChild(bullet);
    bullets.push(bullet);
}

function moveBullets() {
    bullets.forEach((bullet, index) => {
      let bottom = parseInt(bullet.dataset.bottom);
      bottom += bulletSpeed;
      bullet.dataset.bottom = bottom;
      bullet.style.bottom = bottom + "px";
  
      if (bottom > game.clientHeight) {
        bullet.remove();
        bullets.splice(index, 1);
      }
    });
}

function spawnInvader() {
    const invader = document.createElement("div");
    invader.classList.add("invader");

    const randomLeft = Math.floor(Math.random() * (game.clientWidth - 30)); // 30 = largura do invader
    invader.style.left = randomLeft + "px";
    invader.style.top = "0px";

    game.appendChild(invader);
    invaders.push(invader);
}

function movePlayer() {
    const playerRect = player.getBoundingClientRect();
    const gameRect = game.getBoundingClientRect();

    if (moveDirection === "left" && playerRect.left > gameRect.left) {
        player.style.left = player.offsetLeft - moveSpeed + "px";
    }

    if (moveDirection === "right" && playerRect.right < gameRect.right) {
        player.style.left = player.offsetLeft + moveSpeed + "px";
    }

    requestAnimationFrame(movePlayer);
}

function updateGame() {
    // Mover balas
    moveBullets();

    // Mover e verificar colisões dos invasores
    invaders.forEach((invader, i) => {
        invader.style.top = invader.offsetTop + invaderSpeed + "px";

        // Remover invasor se sair do jogo
        if (invader.offsetTop > game.clientHeight) {
            invader.remove();
            invaders.splice(i, 1);
            return;
        }

        // Colisão com balas
        bullets.forEach((bullet, j) => {
            if (
                bullet.offsetLeft >= invader.offsetLeft &&
                bullet.offsetLeft <= invader.offsetLeft + invader.offsetWidth &&
                bullet.offsetTop <= invader.offsetTop + invader.offsetHeight &&
                bullet.offsetTop >= invader.offsetTop
            ) {
                invader.remove();
                bullet.remove();
                invaders.splice(i, 1);
                bullets.splice(j, 1);
                score += 10;
                scoreDisplay.textContent = score;
            }
        });
    });

    requestAnimationFrame(updateGame);
}

movePlayer();
spawnInvader();
setInterval(spawnInvader, 1000);
updateGame();