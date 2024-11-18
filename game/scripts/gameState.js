export const GRID_SIZE = 50;
export const MAP_WIDTH = 3000;
export const MAP_HEIGHT = 3000;

export const gameState = {
    player: {
        id: Math.random().toString(36).substr(2, 9),
        x: 0,
        y: 0,
        radius: 20,
        speed: 3,
        dashSpeed: speed * 4,
        isDashing: false,
        dashCooldown: 2000,
        dashCooldownTimer: 0,
        kills: 0,
        attackAngle: 0,
        isAttacking: false,
        attackCooldown: 750,
        attackCooldownTimer: 0
    },
    score: 0
};
