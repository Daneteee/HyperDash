import { gameState } from './gameState.js';

export function drawGrid(ctx, camera) {
    // Implementation for drawing the grid
}

export function drawPlayer(ctx, camera) {
    const player = gameState.player;
    ctx.beginPath();
    ctx.arc(player.x - camera.x, player.y - camera.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.isDashing ? '#00ff00' : 'white';
    ctx.fill();
}
