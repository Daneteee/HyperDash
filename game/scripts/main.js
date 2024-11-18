import { gameState } from './gameState.js';
import { drawGrid, drawPlayer } from './graphics.js';
import { updatePlayer, getRandomSpawnPosition } from './player.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const dashCooldownFill = document.getElementById('dashCooldownFill');
const keys = {};
let lastTime = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

gameState.player.x = getRandomSpawnPosition().x;
gameState.player.y = getRandomSpawnPosition().y;

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePlayer(keys, deltaTime);
    drawGrid(ctx, { x: 0, y: 0 });
    drawPlayer(ctx, { x: 0, y: 0 });

    const cooldownPercent = Math.max(0, gameState.player.dashCooldownTimer / gameState.player.dashCooldown) * 100;
    dashCooldownFill.style.width = `${100 - cooldownPercent}%`;

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
