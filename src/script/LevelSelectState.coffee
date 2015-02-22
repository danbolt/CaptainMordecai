LevelSelectState =
  preload: () ->
  load: () ->
  create: () ->
    game.add.sprite(0, 0, 'background')
    #game.add.sprite(0, 912, 'water')

    @backButton = new Phaser.Button(game, GameResolution.width - 32 * 9, GameResolution.height - 6*32, 'small_button', @backButtonPress, @, 0, 0, 1, 0)
    @backButton.tint = 0xFF5555
    game.add.existing(@backButton)
    @backText = game.add.text(@backButton.x + @backButton.width / 2, @backButton.y + @backButton.height / 2, 'BACK', { font: "62px Karla", fill: 'white',  align: 'center'})
    @backText.anchor.set(0.5)

    @titleText = game.add.text(GameResolution.width / 2, 100, 'LEVEL SELECT', { font: '72px Karla', fill: 'white', align: 'center'})
    @titleText.anchor.set(0.5)

    for i in [1..12] by 1
      levelButton = new Phaser.Button(game, 16 + (208 * ((i-1) % 3)), 224 + 128 * Math.floor((i-1)/3), 'small_button', @levelButtonPress, @, 0, 0, 1, 0)
      levelButton.scale.x = levelButton.scale.y = 0.75
      levelButton.index = i
      levelButton.tint = 0x5555DD
      game.add.existing(levelButton)
      buttonText = game.add.text(16 + (208 * ((i-1) % 3)) + (levelButton.width / 2), 224 + 128 * Math.floor((i-1)/3) + (levelButton.height / 2), i.toString(), { font: '48px Karla', fill: 'white', align: 'center'})
      buttonText.anchor.set(0.5)
  update: () ->

  render: () ->

  levelButtonPress: (button) ->
    currentLevel = button.index
    game.state.start('Gameplay')

  backButtonPress: () ->
    game.state.start('TitleScreen')
    score = 0
    lives = 3
