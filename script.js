const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

let playerSpeed = 5;
let bulletSpeed = 8;
let invaderSpeed = 1;
let score = 0;
let bullets = [];
let invaders = [];

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft" && player.offsetLeft > 0) {
        player.style.left = player.offsetLeft - playerSpeed + "px";
    }
    if (e.code === "ArrowRight" && player.offsetLeft < game.clientWidth - player.offsetWidth) {
        player.style.left = player.offsetLeft + playerSpeed + "px";
    }
    if (e.code === "Space") shoot();
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

function createInvaders() {
    for (let i = 0; i < 5; i++) {
        const invader = document.createElement("div");
        invader.classList.add("invader");
        invader.style.top = "10px";
        invader.style.left = 60 + i * 100 + "px";
        game.appendChild(invader);
        invaders.push(invader);
    }
}

function updateGame() {
    // Mover balas
    moveBullets();

    // Mover invasores
    invaders.forEach((invader, i) => {
        invader.style.top = invader.offsetTop + invaderSpeed + "px";

        // Verificar colisão
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

createInvaders();
updateGame();