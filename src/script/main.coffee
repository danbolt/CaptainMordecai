# This is the resolution of the iPhone 4/4s
GameResolution =
  width: 640
  height: 960

game = null

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
  load: () ->
  create: () ->
    this.setScaling()
    game.state.start('Gameplay')
  update: () ->


GameplayState =
  preload: () ->
  load: () ->
  update: () ->
  render: () -> game.debug.text('Hello, game!', GameResolution.width / 2, GameResolution.height / 2)


main = () ->
  game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, 'gameWindow')
  game.state.add('Gameplay', GameplayState, false)
  game.state.add('Loading', LoadingState, true)
