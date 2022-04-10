class Germ {
  /* Germ is a type of actor which oscilates on a pre-definite path.
   * @param {Integer} x - x coordinate of germ
   * @param {Integer} y - y coordinate of germ
   * @param {Integer} w - width of germ
   * @param {Integer} h - height of germ
   * @param {up|down} dir - initial direction the germ should head in
   */
  constructor(x, y, w, h, dir) {
    this.x = x,
    this.y = y,
    this.w = w,
    this.h = h,
    this.direction = dir
  }

  update() {
    if (this.y >= (H - (1.5 * this.h))) {
      this.direction = "up"
    } else if (this.y <= 0) {
      this.direction = "down"
    }
    console.log(this.y);
    if (this.direction === "down") {
      this.y += 30
    } else {
      this.y -= 30
    }
  }
}

function init() {
  // load images
  germ_image = new Image
  germ_image.src = "assets/img/germ_lo.webp"
  player_image = new Image
  player_image.src = "assets/img/player_lo.webp"
  gem_image = new Image
  gem_image.src = "assets/img/gem_lo.webp"

  const canvas = document.getElementById('mycanvas')
  W = 1280
  H = 768
  canvas.width = W
  canvas.height = H

  pen = canvas.getContext('2d')

  player = {
    x: 20,
    y: H/2,
    w: 40,
    h: 60,
    health: 100
  }

  gem = {
    x: W-100,
    y: H/2,
    w: 60,
    h: 60,
  }

  germ1 = new Germ(250, 50, 60, 60, "down")
  germ2 = new Germ(450, 150, 60, 60, "up")
  germ3 = new Germ(600, 250, 60, 60, "down")
  germ4 = new Germ(800, 350, 60, 60, "up")
  germ5 = new Germ(1000, 650, 60, 60, "down")

  germs = [germ1, germ2, germ3, germ4, germ5]

  document.addEventListener('keydown', navigatePlayer)
}

function draw() {
  pen.clearRect(0, 0, W, H)
  pen.fillStyle = "red"
  
  pen.drawImage(gem_image, gem.x, gem.y, gem.w, gem.h)
  pen.drawImage(player_image, player.x, player.y, player.w, player.h)

  for (let germ of germs) {
    pen.drawImage(germ_image, germ.x, germ.y, germ.w, germ.h)
  }

  pen.fillStyle = "white"
  pen.font = "20px bold"
  pen.fillText("Score " + player.health, W-150, 100)
}

function isCollision(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.w && 
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y) {
      return true
    }
    return false
}

function update() {
  germ1.update()
  germ2.update()
  germ3.update()
  germ4.update()
  germ5.update()

  for (let germ of germs) {
    if(isCollision(player, germ)) {
      draw()
      player.health -= 21;
      console.log("health", player.health);
    }
  }

  if (isCollision(player, gem)) {
    clearInterval(loop)
    draw()
    alert("You won!")
  }
}

// gameLoop runs on every frame
function gameLoop() {
  if (player.health < 1) {
    alert("Game over!")
    clearInterval(loop)
  }
  update()
  draw()
}

init()
// 1000ms / 100ms = 10fps
loop = setInterval(gameLoop, 100)

function navigatePlayer(e) {
  if (e.key === "ArrowRight") {
    player.x += 20
  }
  else if (e.key === "ArrowLeft") {
    player.x -= 20
  }
}
