# This is the resolution of the iPhone 4/4s
GameResolution =
  width: 640
  height: 960

game = null

main = () ->
  game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, 'gameWindow')
  game.state.add('Gameplay', GameplayState, false)
  game.state.add('Loading', LoadingState, true)
