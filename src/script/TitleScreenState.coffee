TitleScreenState =
  preload: () ->
  load: () ->
  create: () ->
  update: () ->
    if game.input.activePointer.isDown
      game.state.start('Gameplay')
      score = 0
      lives = 3

  render: () ->
    game.debug.text('title screen - touch to start', 100, 100)
