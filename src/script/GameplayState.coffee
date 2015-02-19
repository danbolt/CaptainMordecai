GameplayState =
  preload: () ->
  load: () ->
  update: () ->
  render: () -> game.debug.text('Hello, game!', GameResolution.width / 2, GameResolution.height / 2)
