class Snake {
    xPosition: number;
    yPosition: number;
    xSpeed: number;
    ySpeed: number;
    width: number;
    height: number;
    tail: number[][];

    constructor() {
        this.xPosition = 50;
        this.yPosition = 50;
        this.xSpeed = 10;
        this.ySpeed = 0;
        this.width = 10;
        this.height = 10;
        this.tail = [];
    }


    public selfBite(): void {
        for (let i = 1; i < snake.tail.length; i++) {
            if (snake.xPosition === snake.tail[i][0] && snake.yPosition === snake.tail[i][1]) {
                gameOver();
            }
        }
    }

}