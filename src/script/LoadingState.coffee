LoadingState =

  resizeGame: () ->
    scale = 1
    if (window.innerWidth > window.innerHeight)
      scale = window.innerHeight / GameResolution.height
    else
      scale = window.innerWidth / GameResolution.width
    game.scale.setUserScale(scale, scale)
    game.scale.refresh()

  setScaling: () ->
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true
    game.scale.setResizeCallback(this.resizeGame, this)
    this.resizeGame()

  preload: () ->
    game.load.image('background', 'img/background1.png')
    game.load.image('paddle', 'img/paddle.png')
    game.load.image('ball', 'img/cannonball.png')
    game.load.image('block', 'img/block.png')
    game.load.image('water', 'img/water.png')

  load: () ->

  create: () ->
    this.setScaling()
    game.state.start('TitleScreen')

  update: () ->
