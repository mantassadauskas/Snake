var cvs = document.getElementById('canvas');
var context = cvs.getContext('2d');
var score = document.getElementById('score');
var highScore = document.getElementById('highScore');
var timeLeft = document.getElementById('timeLeft');
score.innerHTML = '0';
highScore.innerHTML = '0';
var Arena = /** @class */ (function () {
    function Arena() {
        this.width = 400;
        this.height = 300;
        this.speedMultiplier = 1;
        this.gameOver = false;
        this.directionChanged = false;
        this.timeLeft = 10;
        this.score = 0;
        this.highScore = 0;
    }
    return Arena;
}());
var Snake = /** @class */ (function () {
    function Snake() {
        this.xPosition = 50;
        this.yPosition = 50;
        this.xSpeed = 10;
        this.ySpeed = 0;
        this.width = 10;
        this.height = 10;
        // this.tailLength = 0;
        this.tail = [];
    }
    return Snake;
}());
var Food = /** @class */ (function () {
    function Food() {
        this.xPosition = Math.floor(Math.random() * arena.width / 10) * 10;
        this.yPosition = Math.floor(Math.random() * arena.height / 10) * 10;
    }
    return Food;
}());
var arena = new Arena();
var snake = new Snake();
var food = new Food();
timeLeft.innerHTML = arena.timeLeft;
function draw() {
    arena.directionChanged = false;
    snake.tail.push([snake.xPosition, snake.yPosition]);
    snake.xPosition += snake.xSpeed;
    snake.yPosition += snake.ySpeed;
    snake.tail.shift();
    selfBite();
    eat();
    checkBoundaries();
    context.clearRect(0, 0, 800, 600);
    context.fillStyle = 'green';
    context.fillRect(food.xPosition, food.yPosition, 10, 10);
    context.fillStyle = 'red';
    context.fillRect(snake.xPosition, snake.yPosition, snake.width, snake.height);
    for (var i = 0; i < snake.tail.length; i++) {
        context.fillRect(snake.tail[i][0], snake.tail[i][1], snake.width, snake.height);
    }
}
document.addEventListener("keydown", function (ev) {
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
document.addEventListener("keyup", function (ev) {
    if (ev.keyCode === 32) {
        arena.speedMultiplier = 1;
    }
});
function eat() {
    // snake.tailLength++;
    function checkFoodLocation() {
        for (var i = 0; i < snake.tail.length; i++) {
            if (food.xPosition === snake.tail[i][0] && food.yPosition === snake.tail[i][1]) {
                food = new Food();
                checkFoodLocation();
                return;
            }
        }
    }
    if (snake.xPosition === food.xPosition && snake.yPosition === food.yPosition) {
        food = new Food();
        checkFoodLocation();
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
function checkBoundaries() {
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
function selfBite() {
    for (var i = 1; i < snake.tail.length; i++) {
        if (snake.xPosition === snake.tail[i][0] && snake.yPosition === snake.tail[i][1]) {
            gameOver();
        }
    }
}
function gameOver() {
    clearInterval(timer);
    arena.gameOver = true;
    arena.score = 0;
    score.innerHTML = 0;
    setTimeout(function () {
        context.fillStyle = 'black';
        context.fillRect(0, 0, arena.width, arena.height);
    }, 1000);
    setTimeout(function () {
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
        setTimeout(function () {
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
var timer = setInterval(timeCalc, 1000);
update();
