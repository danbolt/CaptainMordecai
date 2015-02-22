OptionsState =
  preload: () ->
  load: () ->
  create: () ->
    game.add.sprite(0, 0, 'background')
    game.add.sprite(0, waterHeight, 'water')

    @backButton = new Phaser.Button(game, GameResolution.width - 32 * 9, GameResolution.height - 6*32, 'small_button', @backButtonPress, @, 0, 0, 1, 0)
    @backButton.tint = 0xFF5555
    game.add.existing(@backButton)
    @backText = game.add.text(@backButton.x + @backButton.width / 2, @backButton.y + @backButton.height / 2, 'BACK', { font: "62px Karla", fill: 'white',  align: 'center'})
    @backText.anchor.set(0.5)

    @titleText = game.add.text(GameResolution.width / 2, 100, 'OPTIONS', { font: '72px Karla', fill: 'white', align: 'center'})
    @titleText.anchor.set(0.5)

    @startingLivesTitle = game.add.text(64, 200, 'STARTING LIVES', {font: '48px Karla', fill: 'white'})
    @decrementStartingLivesButton = game.add.button(396, 264, 'triangular_button', (->
      startingLives = Math.max(startingLives-1, 1)
      @lifeCountText.text = startingLives), @, 0, 0, 1, 0)
    @decrementStartingLivesButton.scale.x = -0.5
    @decrementStartingLivesButton.scale.y = 0.5
    @decrementStartingLivesButton.tint = 0x5555DD

    @incrementStartingLivesButton = game.add.button(496, 264, 'triangular_button', (->
      startingLives = Math.min(startingLives+1, 9)
      @lifeCountText.text = startingLives), @, 0, 0, 1, 0)
    @incrementStartingLivesButton.scale.x = @incrementStartingLivesButton.scale.y = 0.5
    @incrementStartingLivesButton.tint = 0x5555DD

    @lifeCountText = game.add.text(424, 272, startingLives, { font: '48px Karla', fill: 'white' })
  update: () ->

  render: () ->

  backButtonPress: () ->
    game.state.start('TitleScreen')
