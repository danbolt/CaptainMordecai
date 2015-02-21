@square = null
@wallTop = null
@wallLeft = null
@wallRight = null
@boxes = null

GameplayState =
  preload: () ->

  load: () ->

  create: () ->
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.input.maxPointers = 1

    @square = new Phaser.Sprite(game, 100, 920, null)
    game.add.existing(@square)
    game.physics.enable(@square, Phaser.Physics.ARCADE)
    @square.body.setSize(80, 20)

    @wallTop = new Phaser.Sprite(game, 20, 0, null)
    game.add.existing(@wallTop)
    game.physics.enable(@wallTop, Phaser.Physics.ARCADE)
    @wallTop.body.setSize(600, 20)

    @wallLeft = new Phaser.Sprite(game, 0, 0, null)
    game.add.existing(@wallLeft)
    game.physics.enable(@wallLeft, Phaser.Physics.ARCADE)
    @wallLeft.body.setSize(20, 960)

    @wallRight = new Phaser.Sprite(game, 620, 0, null)
    game.add.existing(@wallRight)
    game.physics.enable(@wallRight, Phaser.Physics.ARCADE)
    @wallRight.body.setSize(20, 960)

    @boxes = new Phaser.Group(game, undefined, 'boxes')
    for i in [0..7] by 1
      for j in [0..5] by 1
        box = @boxes.add(new Phaser.Sprite(game, 80 + (i * 60), 50 + (j * 60), null))
        game.physics.enable(box, Phaser.Physics.ARCADE)
        box.body.setSize(30, 30)


  update: () ->
    @square.body.position.x = Math.max(Math.min(game.input.activePointer.x, 540), 20)

  render: () ->
    game.debug.body(@square)
    game.debug.body(@wallTop)
    game.debug.body(@wallLeft)
    game.debug.body(@wallRight)
    @boxes.forEach((box) -> game.debug.body(box))
