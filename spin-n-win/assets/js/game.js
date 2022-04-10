let prize_config = {
  count: 12,
  prize_names: [
    '3000 Credits',
    '35% off',
    'Hard luck',
    '75% off',
    'Swagpack',
    '100% off',
    'Netflix',
    '50% off',
    'Amazon voucher',
    '2 extra spin',
    'Tshirt',
    'Book'
  ]
}

let config = {
  type: Phaser.CANVAS,
  width: 1080,
  height: 720,
  backgroundColor: 0xabccdd,
  scene: {
    preload: preloadFunc,
    create: createFunc,
    update: updateFunc,
  }
}

let game = new Phaser.Game(config)

function preloadFunc() {
  this.load.image('background', './assets/img/back.jpg')
  this.load.image('wheel', './assets/img/wheel.webp')
  this.load.audio('wheelAudio', ['./assets/audio/spin.mp3'])
  this.load.audio('backgroundAudio', ['./assets/audio/background.mp3'])
  this.load.image('button', './assets/img/button.png')
  this.load.image('stand', './assets/img/stand.png')
  this.load.image('pin', './assets/img/pin.png')
}
function createFunc() {
  let W = game.config.width
  let H = game.config.height
  this.background = this.add.sprite(W / 2, H / 2, 'background')
  this.stand = this.add.sprite(W / 2, H / 2 + 260, 'stand')
  this.wheel = this.add.sprite(W / 2, H / 2, 'wheel')
  this.wheelAudio = this.sound.add('wheelAudio')
  this.backgroundAudio = this.sound.add('backgroundAudio')
  this.pin = this.add.sprite(W / 2, H / 2 - 260, 'pin')
  this.button = this.add.sprite(W - 100, 50, 'button').setInteractive()
  this.background.setScale(0.25)
  this.wheel.setScale(0.25)
  this.stand.setScale(0.4)
  this.pin.setScale(0.3)
  this.button.setScale(0.2)

  this.backgroundAudio.play()

  this.button.on('pointerdown', spinwheel, this)

  // hud
  font_style = {
    font: "bold 30px Arial",
    align: "center",
    color: "red"
  }
  this.logText = this.add.text(10, 10, "Welcome to Spin n Win", font_style)
  this.buttonText = this.add.text(W - 150, 40, "Tap to spin")
}
function updateFunc() {
}

function spinwheel() {
  this.logText.setText("Spinning...")
  this.button.disableInteractive()
  this.buttonText.setText("Wait!")
  this.wheelAudio.play()

  let rounds = Phaser.Math.Between(3, 5)
  let degrees = Phaser.Math.Between(0, 11) * 30

  let total_angle = rounds * 360 + degrees

  let idx = prize_config.count - 1 - Math.floor(degrees / (360 / prize_config.count))

  tween = this.tweens.add({
    targets: this.wheel,
    angle: total_angle,
    ease: "Cubic.easeOut",
    duration: 6000,
    callbackScope: this,
    onComplete: function () {
      this.logText.setText("You won " + prize_config.prize_names[idx])
      this.buttonText.setText("Tap to spin")
      this.button.setInteractive()
    }
  })
}
