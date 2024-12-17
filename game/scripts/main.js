import { gameState } from './gameState.js';
import { drawGrid, drawPlayer } from './graphics.js';
import { updatePlayer, getRandomSpawnPosition } from './player.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const dashCooldownFill = document.getElementById('dashCooldownFill');
const keys = {};
let lastTime = 0;

// Configuración inicial de la cámara
const camera = { x: 0, y: 0 };

// Configuración del canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Configuración de eventos de teclado
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Configuración inicial del jugador
const spawnPosition = getRandomSpawnPosition();
gameState.player.x = spawnPosition.x;
gameState.player.y = spawnPosition.y;

// Actualiza la cámara para seguir al jugador
function updateCamera() {
    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;

    camera.x = Math.max(0, Math.min(gameState.player.x - halfWidth, gameState.mapWidth - canvas.width));
    camera.y = Math.max(0, Math.min(gameState.player.y - halfHeight, gameState.mapHeight - canvas.height));
}

// Bucle principal del juego
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Limpia el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Actualiza la lógica del juego
    updatePlayer(keys, deltaTime);
    updateCamera();

    // Renderiza los elementos
    drawGrid(ctx, camera); // Dibuja la cuadrícula con la posición actual de la cámara
    drawPlayer(ctx, camera, gameState.player); // Dibuja al jugador principal

    // Actualiza la barra de enfriamiento del dash
    const cooldownPercent = Math.max(0, gameState.player.dashCooldownTimer / gameState.player.dashCooldown) * 100;
    dashCooldownFill.style.width = `${100 - cooldownPercent}%`;

    // Llama al siguiente frame
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
