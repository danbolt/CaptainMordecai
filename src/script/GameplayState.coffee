@square = null
@wallLeft = null
@wallRight = null

GameplayState =
  preload: () ->

  load: () ->

  create: () ->
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.input.maxPointers = 1

    @square = new Phaser.Sprite(game, 100, 100, null)
    game.add.existing(@square)
    game.physics.enable(@square, Phaser.Physics.ARCADE)
    @square.body.setSize(80, 20)

    @wallLeft = new Phaser.Sprite(game, 0, 0, null)
    game.add.existing(@wallLeft)
    game.physics.enable(@wallLeft, Phaser.Physics.ARCADE)
    @wallLeft.body.setSize(20, 960)

    @wallRight = new Phaser.Sprite(game, 620, 0, null)
    game.add.existing(@wallRight)
    game.physics.enable(@wallRight, Phaser.Physics.ARCADE)
    @wallRight.body.setSize(20, 960)

  update: () ->
    @square.body.position.x = game.input.activePointer.x
    @square.body.position.y = game.input.activePointer.y

  render: () ->
    game.debug.text('Hello, game!', GameResolution.width / 2, GameResolution.height / 2)
    game.debug.body(@square)
    game.debug.body(@wallLeft)
    game.debug.body(@wallRight)
