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
rubyVelocity = 200

waterHeight = 748

GameplayState =
  preload: () ->

  load: () ->

  create: () ->
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.input.maxPointers = 1

    game.add.sprite(0, 0, 'background')
    @water = game.add.sprite(0, waterHeight, 'water')

    birdYPosition = Math.floor(Math.random() * (waterHeight - 10 + 1)) + 10
    @bird = new Phaser.Sprite(game,  -50, birdYPosition, 'bird')
    @bird.animations.add('bird', null, 28, true)
    @bird.animations.play('bird')
    game.physics.enable(@bird, Phaser.Physics.ARCADE)
    game.add.existing(@bird)
    @bird.body.immovable = true
    @bird.body.velocity.x = 150

    @scoreText = new Phaser.Text(game, 16, 16, "SCORE: " + score, {font: "24px Karla", fill: 'grey'})
    game.add.existing(@scoreText)
    @livesText = new Phaser.Text(game, GameResolution.width - 100, 16, "LIVES: " + lives, {font: "24px Karla", fill: 'grey'})
    game.add.existing(@livesText)

    @square = new Phaser.Sprite(game, 100, waterHeight - 48, 'paddle')
    game.add.existing(@square)
    game.physics.enable(@square, Phaser.Physics.ARCADE)
    @square.body.setSize(120, 32, 0, 37)
    @square.body.immovable = true

    @speechBubble = new Phaser.Sprite(game, 0, @square.position.y, 'speechBubble')
    @speechBubble.y -= @speechBubble.height;
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

    @ball = new Phaser.Sprite(game, 320, waterHeight - 64, 'ball')
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

          if Levels[currentLevel][j][i].grass
            image = 'blockWithGrass'
          else if Levels[currentLevel][j][i].treasure
            image = 'treasure'
          else
            image = 'block'

          box = @boxes.add(new Phaser.Sprite(game, 64 + (i * 32), 96 + (j * 32), image))

          lottery = Math.floor(Math.random() * (20 - 1 + 1)) + 1
          if lottery > 16
            unless Levels[currentLevel][j][i].treasure
              x = Math.floor(Math.random() * (15 - 5 + 1)) + 5
              y = Math.floor(Math.random() * (15 - 5 + 1)) + 5
              width = Math.floor(Math.random() * (20 - 5 + 1)) + 5
              @divit = new Phaser.Sprite(game, x, y, 'divit')
              box.addChild(@divit)
              game.physics.enable(@divit, Phaser.Physics.ARCADE)
              @divit.body.setSize(width, width, 0, 0)

          game.physics.enable(box, Phaser.Physics.ARCADE)
          box.body.setSize(32, 32)
          box.body.immovable = true
          if Levels[currentLevel][j][i].color then box.tint = Levels[currentLevel][j][i].color
    game.add.existing(@boxes)

    @bird.bringToTop()

    @waitingToStart = true
    @waitingToStartText = game.add.text(GameResolution.width / 2, GameResolution.height / 2, "TAP TO START", { font: '72px Karla', fill: 'white', align: 'center'})
    @waitingToStartText.anchor.set(0.5)

  update: () ->
    @square.body.position.x = Math.max(Math.min(game.input.activePointer.x - @square.body.width / 2, @wallRight.body.position.x - @square.body.width), @wallLeft.body.position.x + @wallLeft.body.width)

    if (@waitingToStart)
      @ball.body.position.x = @square.body.center.x
      @ball.body.position.y = @square.body.position.y - 32
      if (game.input.activePointer.justPressed(500))
        @waitingToStart = false
        @waitingToStartText.visible = false

    game.physics.arcade.overlap(@ball, @square, (ball, paddle) ->
      ball.body.velocity.x = 400 * Math.cos(Math.PI + (Math.PI / 4) + ((Math.PI / 2) * (ball.body.center.x - paddle.body.position.x) / paddle.body.width))
      ball.body.velocity.y = 400 * Math.sin(Math.PI + (Math.PI / 4) + ((Math.PI / 2) * (ball.body.center.x - paddle.body.position.x) / paddle.body.width)))
    game.physics.arcade.overlap(@ball, @wallTop, @collideY)
    game.physics.arcade.overlap(@ball, @wallLeft, @collideX)
    game.physics.arcade.overlap(@ball, @wallRight, @collideX)
    game.physics.arcade.collide(@ball, @boxes, @collideBlock, null, @)
    game.physics.arcade.collide(@square, @ruby, @collectRuby, null, @)
    game.physics.arcade.collide(@ball, @bird, @killBird, null, @)

    if @speechBubble.visible
      @speechBubble.body.position.x = @square.body.position.x + 120
    else
      @speechBubble.body.position.x = -1000

    if @bird.body.position.x > GameResolution.width
      @bird.body.position.x = -1000
      @bird.body.position.y = Math.floor(Math.random() * (waterHeight - 10 + 1)) + 10

    # If the ball falls below the level, lose a life!
    # If the player runs out of lives, take her back
    # to the title screen.
    if @ball.body.position.y > waterHeight + 13
      lives--
      @livesText.text = "LIVES: " + lives
      @splash = new Phaser.Sprite(game, @ball.body.position.x - 16, @water.y - 12, 'splash')
      @splash.animations.add('splash', null, 24)
      @splash.animations.play('splash')
      game.add.existing(@splash)

      game.add.existing(@speechBubble)
      @speechBubble.visible = true

      setTimeout =>
        @speechBubble.visible = false
        @speechBubble.body.position.x = -1000
      , 1000

      @ball.body.position.y = waterHeight - 64
      @ball.body.position.x = 320
      @ball.body.velocity.y = -400
      @ball.body.velocity.x = 0
      @waitingToStart = true
      @waitingToStartText.visible = true

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

    if block.key is 'treasure'
      @ruby = new Phaser.Sprite(game, block.body.position.x + 8, block.body.position.y + 11, 'ruby')
      game.add.existing(@ruby)
      game.physics.enable(@ruby, Phaser.Physics.ARCADE)
      @ruby.body.velocity.y = rubyVelocity

    block.kill()
    score += 100
    @scoreText.text = "SCORE: " + score

  collectRuby: (square, ruby) ->
    ruby.kill()
    score += 1000
    @scoreText.text = "SCORE: " + score

  killBird: (ball, bird) ->
    bird.body.position.x = -1000
    bird.body.position.y = Math.floor(Math.random() * (waterHeight - 10 + 1)) + 10
    score += 2000
    @scoreText.text = "SCORE: " + score
    @birdExplosion = new Phaser.Sprite(game,  @bird.body.position.x, @bird.body.position.y, 'birdExplosion')
    @birdExplosion.animations.add('birdExplosion', null, 24)
    @birdExplosion.animations.play('birdExplosion')
    game.add.existing(@birdExplosion)
