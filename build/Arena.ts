class Arena {
    width: number;
    height: number;
    speedMultiplier: number;
    gameOver: boolean;
    timeLeft: number;
    score: number;
    highScore: number;

    // This is needed to prevent self crash into neck(tails first segment) if directions changed twice in single frame
    directionChanged: boolean;

    constructor() {
        this.width = 400;
        this.height = 300;
        this.speedMultiplier = 1;
        this.gameOver = false;
        this.directionChanged = false;
        this.timeLeft = 10;
        this.score = 0;
        this.highScore = 0;
    }

    public checkBoundaries(): void {
        if (snake.xPosition >= arena.width) {
            snake.xPosition = 0;

        }
        if (snake.xPosition < 0) {
            snake.xPosition = arena.width - snake.width;

        }
        if (snake.yPosition < 0) {
            snake.yPosition = arena.height - snake.height;

        }
        if (snake.yPosition >= arena.height) {
            snake.yPosition = 0;

        }
    }


}
