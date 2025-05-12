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
    bullet.style.left = player.offsetLeft + player.offsetWidth / 2 - 2 + "px";
    bullet.style.bottom = "30px";
    game.appendChild(bullet);
    bullets.push(bullet);
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