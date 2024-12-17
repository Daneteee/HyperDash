import { gameState } from './gameState.js';

function drawGrid() {
    const startX = Math.floor(camera.x / GRID_SIZE) * GRID_SIZE;
    const startY = Math.floor(camera.y / GRID_SIZE) * GRID_SIZE;
    const endX = startX + canvas.width + GRID_SIZE;
    const endY = startY + canvas.height + GRID_SIZE;
    
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 1;
    
    for (let x = startX; x < endX; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x - camera.x, 0);
      ctx.lineTo(x - camera.x, canvas.height);
      ctx.stroke();
    }
    
    for (let y = startY; y < endY; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y - camera.y);
      ctx.lineTo(canvas.width, y - camera.y);
      ctx.stroke();
    }
  
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(-camera.x, -camera.y, MAP_WIDTH, MAP_HEIGHT);
}

export function drawPlayer(ctx, camera) {
    const player = gameState.player;
    ctx.beginPath();
    ctx.arc(player.x - camera.x, player.y - camera.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.isDashing ? '#00ff00' : 'white';
    ctx.fill();
}


