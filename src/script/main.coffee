GameResolution =
  width: 320
  height: 240

game = null
GameplayState =
  preload: () ->
  load: () ->
  update: () ->
  render: () -> game.debug.text('Hello, world!', 16, 16);


main = () ->
  game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, 'gameWindow', GameplayState)
