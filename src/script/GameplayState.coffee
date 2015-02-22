@square = null
@wallTop = null
@wallLeft = null
@wallRight = null
@ball = null
@boxes = null
@speechBubble = null

score = 0
lives = 3
startingLives = 3
currentLevel = 1
furthestUnlockedLevel = 12

GameplayState =
  preload: () ->

  load: () ->

  create: () ->
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.input.maxPointers = 1

    game.add.sprite(0, 0, 'background')
    game.add.sprite(0, 912, 'water')

    @scoreText = new Phaser.Text(game, 16, 16, "SCORE: " + score, {font: "24px Karla", fill: 'grey'})
    game.add.existing(@scoreText)
    @livesText = new Phaser.Text(game, GameResolution.width - 100, 16, "LIVES: " + lives, {font: "24px Karla", fill: 'grey'})
    game.add.existing(@livesText)

    @square = new Phaser.Sprite(game, 100, 864, 'paddle')
    game.add.existing(@square)
    game.physics.enable(@square, Phaser.Physics.ARCADE)
    @square.body.setSize(120, 32, 0, 37)
    @square.body.immovable = true

    @speechBubble = new Phaser.Sprite(game, 0, 720, 'speechBubble')
    game.physics.enable(@speechBubble, Phaser.Physics.ARCADE)
    @speechBubble.body.setSize(0, 960)

    @wallTop = new Phaser.Sprite(game, 0, 0, null)
    game.add.existing(@wallTop)
    game.physics.enable(@wallTop, Phaser.Physics.ARCADE)
    @wallTop.body.setSize(640, 0)
    @wallTop.body.immovable = true

    @wallLeft = new Phaser.Sprite(game, 0, 0, null)
    game.add.existing(@wallLeft)
    game.physics.enable(@wallLeft, Phaser.Physics.ARCADE)
    @wallLeft.body.setSize(0, 960)
    @wallLeft.body.immovable = true

    @wallRight = new Phaser.Sprite(game, 640, 0, null)
    game.add.existing(@wallRight)
    game.physics.enable(@wallRight, Phaser.Physics.ARCADE)
    @wallRight.body.setSize(0, 960)
    @wallRight.body.immovable = true

    @ball = new Phaser.Sprite(game, 320, 780, 'ball')
    game.add.existing(@ball)
    game.physics.enable(@ball, Phaser.Physics.ARCADE)
    @ball.body.bounce.x = 1
    @ball.body.bounce.y = 1
    @ball.body.setSize(16, 16)
    @ball.body.velocity.x = 0
    @ball.body.velocity.y = -400

    @boxes = new Phaser.Group(game, undefined, 'boxes')
    for i in [0..15] by 1
      for j in [0..6] by 1
        if Levels[currentLevel][j][i]
          box = @boxes.add(new Phaser.Sprite(game, 64 + (i * 32), 96 + (j * 32), 'block'))
          game.physics.enable(box, Phaser.Physics.ARCADE)
          box.body.setSize(32, 32)
          box.body.immovable = true
          if Levels[currentLevel][j][i].color then box.tint = Levels[currentLevel][j][i].color
    game.add.existing(@boxes)

  update: () ->
    @square.body.position.x = Math.max(Math.min(game.input.activePointer.x - @square.body.width / 2, @wallRight.body.position.x - @square.body.width), @wallLeft.body.position.x + @wallLeft.body.width)

    game.physics.arcade.overlap(@ball, @square, (ball, paddle) ->
      ball.body.velocity.x = 400 * Math.cos(Math.PI + (Math.PI * (ball.body.center.x - paddle.body.position.x) / paddle.body.width))
      ball.body.velocity.y = 400 * Math.sin(Math.PI + (Math.PI * (ball.body.center.x - paddle.body.position.x) / paddle.body.width)))
    game.physics.arcade.overlap(@ball, @wallTop, @collideY)
    game.physics.arcade.overlap(@ball, @wallLeft, @collideX)
    game.physics.arcade.overlap(@ball, @wallRight, @collideX)
    game.physics.arcade.collide(@ball, @boxes, @collideBlock, null, @)

    if @speechBubble.visible
      @speechBubble.body.position.x = @square.body.position.x + 120
    else
      @speechBubble.body.position.x = -1000

    # If the ball falls below the level, lose a life!
    # If the player runs out of lives, take her back
    # to the title screen.
    if @ball.body.position.y > 925
      lives--
      @livesText.text = "LIVES: " + lives
      @splash = new Phaser.Sprite(game, @ball.body.position.x - 16, 896, 'splash')
      @splash.animations.add('splash', null, 24)
      @splash.animations.play('splash')
      game.add.existing(@splash)

      game.add.existing(@speechBubble)
      @speechBubble.visible = true

      setTimeout =>
        @speechBubble.visible = false
        @speechBubble.body.position.x = -1000
      , 1000

      @ball.body.position.y = 780
      @ball.body.position.x = 320
      @ball.body.velocity.y = -400
      @ball.body.velocity.x = 0

      if lives <= 0
        @ball.body.velocity.y *= 0
        @ball.body.velocity.x *= 0

        game.state.start("TitleScreen")

    # If the player finishes all the blocks,
    # start the next level for him.
    if @boxes.countLiving() <= 0
      currentLevel = Math.max(Math.min(12, currentLevel + 1), 1)
      furthestUnlockedLevel = currentLevel
      game.state.start('Gameplay')


  render: () ->
    # game.debug.body(@square)
    # game.debug.body(@wallTop)
    # game.debug.body(@wallLeft)
    # game.debug.body(@wallRight)
    # game.debug.body(@ball)

    # @boxes.forEachAlive((box) -> game.debug.body(box, box.color))

  collideX: (ball, object) ->
    ball.body.velocity.x *= -1

  collideY: (ball, object) ->
    ball.body.velocity.y *= -1

  collideBlock: (ball, block) ->
    block.kill()
    score += 100
    @scoreText.text = "SCORE: " + score
