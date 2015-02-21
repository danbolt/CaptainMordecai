@square = null
@wallTop = null
@wallLeft = null
@wallRight = null
@ball = null

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

    @ball = new Phaser.Sprite(game, 480, 320, null)
    game.add.existing(@ball)
    game.physics.enable(@ball, Phaser.Physics.ARCADE)
    @ball.body.setSize(10, 10)
    @ball.body.velocity.x = 200
    @ball.body.velocity.y = 200

  update: () ->
    @square.body.position.x = Math.max(Math.min(game.input.activePointer.x, 540), 20)

    game.physics.arcade.overlap(@ball, @square, @collideY)
    game.physics.arcade.overlap(@ball, @wallTop, @collideY)
    game.physics.arcade.overlap(@ball, @wallLeft, @collideX)
    game.physics.arcade.overlap(@ball, @wallRight, @collideX)

  render: () ->
    game.debug.body(@square)
    game.debug.body(@wallTop)
    game.debug.body(@wallLeft)
    game.debug.body(@wallRight)
    game.debug.body(@ball)

  collideX: (ball, object) ->
    ball.body.velocity.x *= -1

  collideY: (ball, object) ->
    ball.body.velocity.y *= -1
