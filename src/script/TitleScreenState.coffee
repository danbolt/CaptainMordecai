TitleScreenState =
  preload: () ->
  load: () ->
  create: () ->
    @startButton = new Phaser.Button(game, 100, 100, 'big_button', @onStartPress, @, 0, 0, 1, 0)
    @startButton.tint = 0xFF5555
    game.add.existing(@startButton)
  update: () ->

  render: () ->

  onStartPress: () ->
    game.state.start('Gameplay')
    score = 0
    lives = 3
