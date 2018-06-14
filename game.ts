/// <reference path="build/Snake.ts"/>
/// <reference path="build/Arena.ts"/>
/// <reference path="build/Food.ts"/>

const cvs: any = document.getElementById('canvas');
const context = cvs.getContext('2d');

let score: any = document.getElementById('score');
let highScore: any = document.getElementById('highScore');
let timeLeft: any = document.getElementById('timeLeft');
score.innerHTML = '0';
highScore.innerHTML = '0';


let arena = new Arena();
let snake = new Snake();
let food = new Food();
timeLeft.innerHTML = arena.timeLeft;

function draw(): void {
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

document.addEventListener("keydown", (ev: any) => {
    if (ev.keyCode === 65) {
        if (snake.xSpeed === 0) {
            if (arena.directionChanged) {
                return
            } else {
                arena.directionChanged = true;
                snake.xSpeed = -10;
                snake.ySpeed = 0;
            }

        }
    }

    if (ev.keyCode === 68) {
        if (snake.xSpeed === 0) {
            if (arena.directionChanged) {
                return
            } else {
                arena.directionChanged = true;
                snake.xSpeed = 10;
                snake.ySpeed = 0;
            }
        }
    }
    if (ev.keyCode === 87) {
        if (snake.ySpeed === 0) {
            if (arena.directionChanged) {
                return
            } else {
                arena.directionChanged = true;
                snake.xSpeed = 0;
                snake.ySpeed = -10;
            }
        }
    }
    if (ev.keyCode === 83) {
        if (snake.ySpeed === 0) {
            if (arena.directionChanged) {
                return
            } else {
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
document.addEventListener("keyup", (ev: any) => {
    if (ev.keyCode === 32) {
        arena.speedMultiplier = 1;
    }
});


function gameOver(): void {
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
    }, 3000)
}


function update() {
    if (!arena.gameOver) {
        draw();

        setTimeout(() => {
            update()
        }, 100 / arena.speedMultiplier);
    }
}

function timeCalc(): void {
    arena.timeLeft--;
    if (arena.timeLeft <= 0) {
        gameOver();
    }
    timeLeft.innerHTML = arena.timeLeft;
}

let timer = setInterval(timeCalc, 1000);
update();