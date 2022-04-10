let config = {

  type: Phaser.AUTO,

  scale: {
    mode: Phaser.Scale.FIT,
    width: 800,
    height: 600,
  },

  backgroundColor: 0xff7777,

  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 500,
      },
      debug: false,
    }
  },

  scene: {
    preload: preload,
    create: create,
    update: update,
  }
}

let game = new Phaser.Game(config)

function preload() {
  this.load.image('sky', 'assets/img/background.png')
  this.load.image('ray', 'assets/img/ray.png')
  this.load.image('apple', 'assets/img/apple.png')
  this.load.image('ground', 'assets/img/topground.png')
  this.load.spritesheet('dude', 'assets/img/dude.png',
    { frameWidth: 32, frameHeight: 48 }
  )
}

function create() {
  W = game.config.width;
  H = game.config.height;

  // const sky = this.add.tileSprite(0, 0, W, 475, 'sky')
  const sky = this.add.sprite(0, 0, 'sky')
  sky.setOrigin(0, 0)
  sky.displayWidth = W

  // create rays
  let rays = []
  for (let i = -10; i < 10; i++) {
    let ray = this.add.sprite(W / 2, H - 100, 'ray')
    ray.displayHeight = 1.2 * H
    ray.setOrigin(0.5, 1)
    ray.alpha = 0.2
    ray.angle = i * 10
    rays.push(ray)
  }
  // tween
  this.tweens.add({
    targets: rays,
    props: {
      angle: {
        value: "+=20"
      }
    },
    duration: 6000,
    repeat: -1
  })

  const ground = this.add.tileSprite(0, H-128, W, 128, 'ground')
  ground.setOrigin(0, 0)

  this.player = this.physics.add.sprite(100, 100, 'dude', 4)
  this.player.setBounce(0.3)
  this.player.setCollideWorldBounds(true)


  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'center',
    frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 4 }),
    frameRate: 10,
  })

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  })

  // player control
  this.cursors = this.input.keyboard.createCursorKeys()

  let fruits = this.physics.add.group({
    key: "apple",
    repeat: 8,
    setScale: { x: 0.2, y: 0.2 },
    setXY: { x: 10, y: 0, stepX: 100 }
  })
  // add bouncing effect in each apples
  fruits.children.iterate((f) => {
    f.setBounceY(Phaser.Math.FloatBetween(0.3, 0.4))
  })

  // more platforms
  let platforms = this.physics.add.staticGroup()
  platforms.create(600, 375, 'ground').setScale(2, 0.5).refreshBody()
  platforms.create(300, 250, 'ground').setScale(2, 0.5).refreshBody()
  platforms.create(150, 100, 'ground').setScale(2, 0.5).refreshBody()
  platforms.add(ground)

  // add ground to physics system, make static/immovable
  this.physics.add.existing(ground, true)

  // add collision detection between player and ground
  this.physics.add.collider(platforms, this.player)
  this.physics.add.collider(platforms, fruits)
  this.physics.add.overlap(this.player, fruits, eatFruit, null, this)

  // create camera
  this.cameras.main.setBounds(0, 0, W, H)
  this.physics.world.setBounds(0, 0, W, H)

  this.cameras.main.startFollow(this.player, true, true)
  this.cameras.main.setZoom(1.5)
}

function update() {
  // left right movement
  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-150)
    this.player.anims.play('left', true)
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(150)
    this.player.anims.play('right', true)
  } else {
    this.player.setVelocityX(0)
    this.player.anims.play('center', true)
  }

  // jump movement
  if (this.cursors.up.isDown && this.player.body.touching.down) {
    this.player.setVelocityY(-400)
  }
}

function eatFruit(player, fruit) {
  fruit.disableBody(true, true)
}
