import { gameState, MAP_WIDTH, MAP_HEIGHT } from './gameState.js';

export function getRandomSpawnPosition() {
    return {
        x: Math.random() * (MAP_WIDTH - 100) + 50,
        y: Math.random() * (MAP_HEIGHT - 100) + 50
    };
}

export function updatePlayer(keys, deltaTime) {
    const player = gameState.player;
    let dx = 0, dy = 0;

    if (keys.w) dy -= player.speed;
    if (keys.s) dy += player.speed;
    if (keys.a) dx -= player.speed;
    if (keys.d) dx += player.speed;

    if (dx !== 0 && dy !== 0) {
        dx *= Math.SQRT1_2;
        dy *= Math.SQRT1_2;
    }

    const speed = player.isDashing ? player.dashSpeed : player.speed;
    player.x = Math.max(0, Math.min(MAP_WIDTH, player.x + dx * speed));
    player.y = Math.max(0, Math.min(MAP_HEIGHT, player.y + dy * speed));

    if (player.dashCooldownTimer > 0) {
        player.dashCooldownTimer -= deltaTime;
    }

    if (player.attackCooldownTimer > 0) {
        player.attackCooldownTimer -= deltaTime;
    }
}
