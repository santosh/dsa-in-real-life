
function init() {
  const canvas = document.getElementById('snakeBoard')
  W = H = canvas.width = canvas.height = 1000;

  // gameOver = false;

  // image for food
  food_img = new Image()
  foodItems = ["assets/rat1.png", "assets/frog1.png", "assets/sparrow1.png"]
  const randomFood = foodItems[Math.floor(Math.random() * foodItems.length)];
  food_img.src = randomFood

  trophy = new Image()
  trophy.src = "assets/trophy.png"

  // canvas is used to draw graphics
  pen = canvas.getContext('2d')
  cellSize = 67;

  food = getFood()

  snake = {
    initLen: 5,
    color: "lightblue",
    cells: [],
    direction: "right",
    creatSnake: function () {
      for (let i = this.initLen; i > 0; i--) {
        this.cells.push({ x: i, y: 0 })
      }
    },
    drawSnake: function () {
      pen.fillStyle = this.color
      for (let i = 0; i < this.cells.length; i++) {
        pen.fillRect(this.cells[i].x * cellSize, this.cells[i].y * cellSize, cellSize - 2, cellSize - 2)
      }
    },
    updateSnake: function () {
      console.log("updating snake");

      var headX = this.cells[0].x
      var headY = this.cells[0].y

      if (headX == food.x && headY == food.y) {
        food = getFood()
      } else {
        this.cells.pop()
      }

      var nextX, nextY;

      // handle per frame update
      if (this.direction == "right") {
        nextX = headX + 1;
        nextY = headY;
      }

      else if (this.direction == "left") {
        nextX = headX - 1;
        nextY = headY;
      }

      else if (this.direction == "down") {
        nextX = headX;
        nextY = headY + 1;
      }

      else if (this.direction == "up") {
        nextX = headX;
        nextY = headY - 1;
      }

      // handle collision with wall
      if ((headX > 14 || headX < 0) || (headY > 14 || headY < 0)) {
        clearInterval(loop)
        alert("Game Over!")
      }
      this.cells.unshift({ x: nextX, y: nextY })
    }
  }

  snake.creatSnake()

  // Game controls
  document.addEventListener('keydown', navigateSnake)
}

function draw() {
  pen.clearRect(0, 0, W, H)
  snake.drawSnake()

  // draw food
  pen.drawImage(food_img, food.x * cellSize, food.y * cellSize, cellSize, cellSize)

  // draw score
  pen.drawImage(trophy, 20, 25, cellSize, cellSize)
  pen.fillStyle = "blue"
  pen.font = "15px bold"
  pen.fillText(snake.cells.length - snake.initLen, 50, 50)
}
function update() {
  snake.updateSnake()
}
function gameLoop() {
  draw()
  update()
}

init()
loop = setInterval(gameLoop, 300)

function navigateSnake(e) {
  if (e.key == "ArrowRight") {
    snake.direction = "right"
  }
  else if (e.key == "ArrowLeft") {
    snake.direction = "left"
  }
  else if (e.key == "ArrowUp") {
    snake.direction = "up"
  }
  else if (e.key == "ArrowDown") {
    snake.direction = "down"
  }
}

function getFood() {
  var foodX = Math.round(Math.random() * (W - cellSize - 0.5) / cellSize - 0.5)
  var foodY = Math.round(Math.random() * (H - cellSize - 0.5) / cellSize - 0.5)

  var food = {
    x: foodX,
    y: foodY,

    color: "magenta"
  }

  const randomFood = foodItems[Math.floor(Math.random() * foodItems.length)];
  food_img.src = randomFood
  return food
}
