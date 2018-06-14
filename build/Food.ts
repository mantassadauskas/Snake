class Food {
    xPosition: number;
    yPosition: number;

    constructor() {
        this.xPosition = Math.floor(Math.random() * arena.width / 10) * 10;
        this.yPosition = Math.floor(Math.random() * arena.height / 10) * 10;
    }

    public checkFoodLocation() {
        for (let i = 0; i < snake.tail.length; i++) {
            if (food.xPosition === snake.tail[i][0] && food.yPosition === snake.tail[i][1]) {
                food = new Food();
                this.checkFoodLocation();
                return
            }
        }
    }

    public eat(): void {
        if (snake.xPosition === food.xPosition && snake.yPosition === food.yPosition) {
            food = new Food();
            food.checkFoodLocation();

            snake.tail.push([snake.xPosition, snake.yPosition]);
            arena.score++;
            arena.timeLeft += 5;
            score.innerHTML = arena.score;
            timeLeft.innerHTML = arena.timeLeft;
            if (arena.score > arena.highScore) {
                arena.highScore = arena.score;
                highScore.innerHTML = arena.highScore;
            }
        }
    }

}
