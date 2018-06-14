class Snake {
    constructor() {
        this.xPosition = 50;
        this.yPosition = 50;
        this.xSpeed = 10;
        this.ySpeed = 0;
        this.width = 10;
        this.height = 10;
        this.tail = [];
    }
    selfBite() {
        for (let i = 1; i < snake.tail.length; i++) {
            if (snake.xPosition === snake.tail[i][0] && snake.yPosition === snake.tail[i][1]) {
                gameOver();
            }
        }
    }
}
class Arena {
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
    checkBoundaries() {
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
class Food {
    constructor() {
        this.xPosition = Math.floor(Math.random() * arena.width / 10) * 10;
        this.yPosition = Math.floor(Math.random() * arena.height / 10) * 10;
    }
    checkFoodLocation() {
        for (let i = 0; i < snake.tail.length; i++) {
            if (food.xPosition === snake.tail[i][0] && food.yPosition === snake.tail[i][1]) {
                food = new Food();
                this.checkFoodLocation();
                return;
            }
        }
    }
    eat() {
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
const cvs = document.getElementById('canvas');
const context = cvs.getContext('2d');
let score = document.getElementById('score');
let highScore = document.getElementById('highScore');
let timeLeft = document.getElementById('timeLeft');
score.innerHTML = '0';
highScore.innerHTML = '0';
let arena = new Arena();
let snake = new Snake();
let food = new Food();
timeLeft.innerHTML = arena.timeLeft;
function draw() {
    arena.directionChanged = false;
    snake.tail.push([snake.xPosition, snake.yPosition]);
    snake.xPosition += snake.xSpeed;
    snake.yPosition += snake.ySpeed;
    snake.tail.shift();
    snake.selfBite();
    food.eat();
    arena.checkBoundaries();
    context.clearRect(0, 0, 800, 600);
    context.fillStyle = 'green';
    context.fillRect(food.xPosition, food.yPosition, 10, 10);
    context.fillStyle = 'red';
    context.fillRect(snake.xPosition, snake.yPosition, snake.width, snake.height);
    for (let i = 0; i < snake.tail.length; i++) {
        context.fillRect(snake.tail[i][0], snake.tail[i][1], snake.width, snake.height);
    }
}
document.addEventListener("keydown", (ev) => {
    if (ev.keyCode === 65) {
        if (snake.xSpeed === 0) {
            if (arena.directionChanged) {
                return;
            }
            else {
                arena.directionChanged = true;
                snake.xSpeed = -10;
                snake.ySpeed = 0;
            }
        }
    }
    if (ev.keyCode === 68) {
        if (snake.xSpeed === 0) {
            if (arena.directionChanged) {
                return;
            }
            else {
                arena.directionChanged = true;
                snake.xSpeed = 10;
                snake.ySpeed = 0;
            }
        }
    }
    if (ev.keyCode === 87) {
        if (snake.ySpeed === 0) {
            if (arena.directionChanged) {
                return;
            }
            else {
                arena.directionChanged = true;
                snake.xSpeed = 0;
                snake.ySpeed = -10;
            }
        }
    }
    if (ev.keyCode === 83) {
        if (snake.ySpeed === 0) {
            if (arena.directionChanged) {
                return;
            }
            else {
                arena.directionChanged = true;
                snake.xSpeed = 0;
                snake.ySpeed = 10;
            }
        }
    }
    if (ev.keyCode === 32) {
        arena.speedMultiplier = 3;
    }
});
document.addEventListener("keyup", (ev) => {
    if (ev.keyCode === 32) {
        arena.speedMultiplier = 1;
    }
});
function gameOver() {
    clearInterval(timer);
    arena.gameOver = true;
    arena.score = 0;
    score.innerHTML = 0;
    setTimeout(() => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, arena.width, arena.height);
    }, 1000);
    setTimeout(() => {
        snake = new Snake();
        arena.gameOver = false;
        arena.timeLeft = 10;
        timeLeft.innerHTML = arena.timeLeft;
        timer = setInterval(timeCalc, 1000);
        update();
    }, 3000);
}
function update() {
    if (!arena.gameOver) {
        draw();
        setTimeout(() => {
            update();
        }, 100 / arena.speedMultiplier);
    }
}
function timeCalc() {
    arena.timeLeft--;
    if (arena.timeLeft <= 0) {
        gameOver();
    }
    timeLeft.innerHTML = arena.timeLeft;
}
let timer = setInterval(timeCalc, 1000);
update();
