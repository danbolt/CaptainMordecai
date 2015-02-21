TitleScreenState =
  preload: () ->
  load: () ->
  create: () ->
  update: () ->
    if game.input.activePointer.isDown then game.state.start('Gameplay')
  render: () -> game.debug.text('title screen - touch to start', 100, 100)
