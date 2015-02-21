@square = null
@wallTop = null
@wallLeft = null
@wallRight = null
@ball = null
@boxes = null

score = 0
lives = 3
currentLevel = 1

GameplayState =
  preload: () ->

  load: () ->

  create: () ->
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.input.maxPointers = 1

    @square = new Phaser.Sprite(game, 100, 920, null)
    game.add.existing(@square)
    game.physics.enable(@square, Phaser.Physics.ARCADE)
    @square.body.setSize(80, 10)
    @square.body.immovable = true

    @wallTop = new Phaser.Sprite(game, 20, 0, null)
    game.add.existing(@wallTop)
    game.physics.enable(@wallTop, Phaser.Physics.ARCADE)
    @wallTop.body.setSize(600, 20)
    @wallTop.body.immovable = true

    @wallLeft = new Phaser.Sprite(game, 0, 0, null)
    game.add.existing(@wallLeft)
    game.physics.enable(@wallLeft, Phaser.Physics.ARCADE)
    @wallLeft.body.setSize(20, 960)
    @wallLeft.body.immovable = true

    @wallRight = new Phaser.Sprite(game, 620, 0, null)
    game.add.existing(@wallRight)
    game.physics.enable(@wallRight, Phaser.Physics.ARCADE)
    @wallRight.body.setSize(20, 960)
    @wallRight.body.immovable = true

    @ball = new Phaser.Sprite(game, 320, 880, null)
    game.add.existing(@ball)
    game.physics.enable(@ball, Phaser.Physics.ARCADE)
    @ball.body.setSize(10, 10)
    @ball.body.velocity.x = -200
    @ball.body.velocity.y = -200

    @boxes = new Phaser.Group(game, undefined, 'boxes')
    for i in [0..7] by 1
      for j in [0..4] by 1
        if Levels[currentLevel][j][i]
          box = @boxes.add(new Phaser.Sprite(game, 80 + (i * 60), 50 + (j * 60), null))
          game.physics.enable(box, Phaser.Physics.ARCADE)
          box.body.setSize(30, 30)
    game.add.existing(@boxes)

  update: () ->
    @square.body.position.x = Math.max(Math.min(game.input.activePointer.x, 540), 20)

    game.physics.arcade.overlap(@ball, @square, (ball, paddle) ->
      ball.body.velocity.x = 400 * Math.cos(Math.PI + (Math.PI * (ball.body.center.x - paddle.body.position.x) / paddle.body.width))
      ball.body.velocity.y = 400 * Math.sin(Math.PI + (Math.PI * (ball.body.center.x - paddle.body.position.x) / paddle.body.width)))
    game.physics.arcade.overlap(@ball, @wallTop, @collideY)
    game.physics.arcade.overlap(@ball, @wallLeft, @collideX)
    game.physics.arcade.overlap(@ball, @wallRight, @collideX)
    game.physics.arcade.collide(@ball, @boxes, @collideBlock)

    if @ball.body.position.y > 1100
      lives--
      @ball.body.position.y = 880
      @ball.body.position.x = 320
      # @ball.body.velocity.y *= -1

      if lives is 0
        @ball.body.velocity.y *= 0
        @ball.body.velocity.x *= 0

        game.state.start("TitleScreen")

  render: () ->
    game.debug.body(@square)
    game.debug.body(@wallTop)
    game.debug.body(@wallLeft)
    game.debug.body(@wallRight)
    game.debug.body(@ball)
    game.debug.text(score, 80, 100)
    game.debug.text(lives, 520, 100)

    @boxes.forEachAlive((box) -> game.debug.body(box))

  collideX: (ball, object) ->
    ball.body.velocity.x *= -1

  collideY: (ball, object) ->
    ball.body.velocity.y *= -1

  collideBlock: (ball, block) ->
    block.kill()
    score += 100

    if ball.body.touching.up or ball.body.touching.down
      ball.body.velocity.y *= -2

    if ball.body.touching.left or ball.body.touching.right
      ball.body.velocity.x *= -2
