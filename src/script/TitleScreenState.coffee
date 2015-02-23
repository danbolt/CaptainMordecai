TitleScreenState =
  preload: () ->
  load: () ->
  create: () ->
    game.add.sprite(0, 0, 'background')
    game.add.sprite(0, 0, 'titleScreen')

    @startButton = new Phaser.Button(game, 128, 416, 'big_button', @onStartPress, @, 0, 0, 1, 0)
    @startButton.tint = 0xFF5555
    game.add.existing(@startButton)
    text = game.add.text(@startButton.x + @startButton.width / 2, @startButton.y + @startButton.height / 2, 'PLAY', { font: "62px Karla", fill: 'white',  align: 'center'})
    text.anchor.set(0.5)

    @levelSelectButton = new Phaser.Button(game, 128, 416 + (128 * 1.25), 'big_button', @onLevelSelectPress, @, 0, 0, 1, 0)
    @levelSelectButton.tint = 0x55DD55
    game.add.existing(@levelSelectButton)
    text = game.add.text(@levelSelectButton.x + @levelSelectButton.width / 2, @levelSelectButton.y + @levelSelectButton.height / 2, 'LEVELS', { font: "62px Karla", fill: 'white',  align: 'center'})
    text.anchor.set(0.5)

    @optionsButton = new Phaser.Button(game, 128, 416 + (128 * 2.5), 'big_button', @onOptionsPress, @, 0, 0, 1, 0)
    @optionsButton.tint = 0x5555DD
    game.add.existing(@optionsButton)
    text = game.add.text(@optionsButton.x + @optionsButton.width / 2, @optionsButton.y + @optionsButton.height / 2, 'OPTIONS', { font: "62px Karla", fill: 'white',  align: 'center'})
    text.anchor.set(0.5)
  update: () ->

  render: () ->
    # game.debug.text("title here", 200, 200)

  onStartPress: () ->
    game.state.start('Gameplay')
    score = 0
    lives = startingLives

  onLevelSelectPress: () ->
    game.state.start('LevelSelect')

  onOptionsPress: () ->
    game.state.start('Options')
