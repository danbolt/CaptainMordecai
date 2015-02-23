var GameResolution, GameplayState, LevelSelectState, Levels, LoadingState, OptionsState, TitleScreenState, currentLevel, furthestUnlockedLevel, game, lives, main, numberOfLevels, rubyVelocity, score, startingLives, waterHeight;

this.square = null;

this.wallTop = null;

this.wallLeft = null;

this.wallRight = null;

this.ball = null;

this.boxes = null;

this.speechBubble = null;

score = 0;

lives = 3;

startingLives = 3;

currentLevel = 1;

furthestUnlockedLevel = 1;

numberOfLevels = 11;

rubyVelocity = 200;

waterHeight = 748;

GameplayState = {
  preload: function() {},
  load: function() {},
  create: function() {
    var birdYPosition, box, fish, i, image, j, k, l, lottery, m, width, x, y;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.input.maxPointers = 1;
    this.youWinSprite = null;
    game.add.sprite(0, 0, 'background');
    this.water = game.add.sprite(0, waterHeight, 'water');
    birdYPosition = Math.floor(Math.random() * (waterHeight - 10 + 1)) + 10;
    this.bird = new Phaser.Sprite(game, -50, birdYPosition, 'bird');
    this.bird.animations.add('bird', null, 28, true);
    this.bird.animations.play('bird');
    game.physics.enable(this.bird, Phaser.Physics.ARCADE);
    game.add.existing(this.bird);
    this.bird.body.immovable = true;
    this.bird.body.velocity.x = 150;
    this.scoreText = new Phaser.Text(game, 16, 16, "SCORE: " + score, {
      font: "24px Karla",
      fill: 'grey'
    });
    game.add.existing(this.scoreText);
    this.livesText = new Phaser.Text(game, GameResolution.width - 100, 16, "LIVES: " + lives, {
      font: "24px Karla",
      fill: 'grey'
    });
    game.add.existing(this.livesText);
    this.square = new Phaser.Sprite(game, 100, waterHeight - 48, 'paddle');
    game.add.existing(this.square);
    game.physics.enable(this.square, Phaser.Physics.ARCADE);
    this.square.body.setSize(120, 32, 0, 37);
    this.square.body.immovable = true;
    this.speechBubble = new Phaser.Sprite(game, 0, this.square.position.y, 'speechBubble');
    this.speechBubble.y -= this.speechBubble.height;
    game.physics.enable(this.speechBubble, Phaser.Physics.ARCADE);
    this.speechBubble.body.setSize(0, 960);
    this.wallTop = new Phaser.Sprite(game, 0, 0, null);
    game.add.existing(this.wallTop);
    game.physics.enable(this.wallTop, Phaser.Physics.ARCADE);
    this.wallTop.body.setSize(640, 0);
    this.wallTop.body.immovable = true;
    this.wallLeft = new Phaser.Sprite(game, 0, 0, null);
    game.add.existing(this.wallLeft);
    game.physics.enable(this.wallLeft, Phaser.Physics.ARCADE);
    this.wallLeft.body.setSize(0, 960);
    this.wallLeft.body.immovable = true;
    this.wallRight = new Phaser.Sprite(game, 640, 0, null);
    game.add.existing(this.wallRight);
    game.physics.enable(this.wallRight, Phaser.Physics.ARCADE);
    this.wallRight.body.setSize(0, 960);
    this.wallRight.body.immovable = true;
    this.ball = new Phaser.Sprite(game, 320, waterHeight - 64, 'ball');
    game.add.existing(this.ball);
    game.physics.enable(this.ball, Phaser.Physics.ARCADE);
    this.ball.body.bounce.x = 1;
    this.ball.body.bounce.y = 1;
    this.ball.body.setSize(16, 16);
    this.ball.body.velocity.x = 0;
    this.ball.body.velocity.y = -400;
    for (i = k = 0; k <= 3; i = ++k) {
      fish = new Phaser.Sprite(game, (i % 2 === 0 ? (Math.random() * -800) - 100 : GameResolution.width + (Math.random() * 800) + 100), waterHeight + 32 * (i + 1.5), 'fish', 0);
      game.physics.enable(fish, Phaser.Physics.ARCADE);
      fish.body.velocity.x = (i % 2 === 0 ? 20 : -20) + (Math.random() * 10) - 5;
      fish.scale.x = (i % 2 === 0 ? 1 : -1);
      fish.animations.add('swim', null, 4, true);
      fish.animations.play('swim');
      fish.update = function() {
        if (this.body.position.x < -1000) {
          return this.body.position.x = GameResolution.width + (Math.random() * 800) + 100;
        } else if (this.body.position.x > GameResolution.width + 1000) {
          return this.body.position.x = -(Math.random() * 800) - 100;
        }
      };
      game.add.existing(fish);
    }
    this.boxes = new Phaser.Group(game, void 0, 'boxes');
    for (i = l = 0; l <= 15; i = l += 1) {
      for (j = m = 0; m <= 6; j = m += 1) {
        if (Levels[currentLevel][j][i]) {
          if (Levels[currentLevel][j][i].grass) {
            image = 'blockWithGrass';
          } else if (Levels[currentLevel][j][i].treasure) {
            image = 'treasure';
          } else {
            image = 'block';
          }
          box = this.boxes.add(new Phaser.Sprite(game, 64 + (i * 32), 96 + (j * 32), image));
          lottery = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
          if (lottery > 16) {
            if (!Levels[currentLevel][j][i].treasure) {
              x = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
              y = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
              width = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
              this.divit = new Phaser.Sprite(game, x, y, 'divit');
              box.addChild(this.divit);
              game.physics.enable(this.divit, Phaser.Physics.ARCADE);
              this.divit.body.setSize(width, width, 0, 0);
            }
          }
          game.physics.enable(box, Phaser.Physics.ARCADE);
          box.body.setSize(32, 32);
          box.body.immovable = true;
          if (Levels[currentLevel][j][i].color) {
            box.tint = Levels[currentLevel][j][i].color;
          }
        }
      }
    }
    game.add.existing(this.boxes);
    this.bird.bringToTop();
    this.waitingToStart = true;
    this.waitingToStartText = game.add.text(GameResolution.width / 2, GameResolution.height / 2, "TAP TO START", {
      font: '72px Karla',
      fill: 'white',
      align: 'center'
    });
    return this.waitingToStartText.anchor.set(0.5);
  },
  update: function() {
    this.square.body.position.x = Math.max(Math.min(game.input.activePointer.x - this.square.body.width / 2, this.wallRight.body.position.x - this.square.body.width), this.wallLeft.body.position.x + this.wallLeft.body.width);
    if (this.waitingToStart) {
      this.ball.body.position.x = this.square.body.center.x;
      this.ball.body.position.y = this.square.body.position.y - 32;
      if (game.input.activePointer.justPressed(500)) {
        this.waitingToStart = false;
        this.waitingToStartText.visible = false;
      }
    }
    if (this.youWinSprite && game.input.activePointer.justPressed(500)) {
      game.state.start('TitleScreen');
    }
    game.physics.arcade.overlap(this.ball, this.square, function(ball, paddle) {
      ball.body.velocity.x = 400 * Math.cos(Math.PI + (Math.PI / 4) + ((Math.PI / 2) * (ball.body.center.x - paddle.body.position.x) / paddle.body.width));
      return ball.body.velocity.y = 400 * Math.sin(Math.PI + (Math.PI / 4) + ((Math.PI / 2) * (ball.body.center.x - paddle.body.position.x) / paddle.body.width));
    });
    game.physics.arcade.overlap(this.ball, this.wallTop, this.collideY);
    game.physics.arcade.overlap(this.ball, this.wallLeft, this.collideX);
    game.physics.arcade.overlap(this.ball, this.wallRight, this.collideX);
    game.physics.arcade.collide(this.ball, this.boxes, this.collideBlock, null, this);
    game.physics.arcade.collide(this.square, this.ruby, this.collectRuby, null, this);
    game.physics.arcade.collide(this.ball, this.bird, this.killBird, null, this);
    if (this.speechBubble.visible) {
      this.speechBubble.body.position.x = this.square.body.position.x + 120;
    } else {
      this.speechBubble.body.position.x = -1000;
    }
    if (this.bird.body.position.x > GameResolution.width) {
      this.bird.body.position.x = -1000;
      this.bird.body.position.y = Math.floor(Math.random() * (waterHeight - 10 + 1)) + 10;
    }
    if (this.ball.body.position.y > waterHeight + 13) {
      lives--;
      this.livesText.text = "LIVES: " + lives;
      this.splash = new Phaser.Sprite(game, this.ball.body.position.x - 16, this.water.y - 12, 'splash');
      this.splash.animations.add('splash', null, 24);
      this.splash.animations.play('splash');
      game.add.existing(this.splash);
      game.add.existing(this.speechBubble);
      this.speechBubble.visible = true;
      setTimeout((function(_this) {
        return function() {
          _this.speechBubble.visible = false;
          return _this.speechBubble.body.position.x = -1000;
        };
      })(this), 1000);
      this.ball.body.position.y = waterHeight - 64;
      this.ball.body.position.x = 320;
      this.ball.body.velocity.y = -400;
      this.ball.body.velocity.x = 0;
      this.waitingToStart = true;
      this.waitingToStartText.visible = true;
      if (lives <= 0) {
        this.ball.body.velocity.y *= 0;
        this.ball.body.velocity.x *= 0;
        game.state.start("TitleScreen");
      }
    }
    if (this.boxes.countLiving() <= 0 && !this.youWinSprite) {
      currentLevel = Math.max(currentLevel + 1, 1);
      furthestUnlockedLevel = Math.max(currentLevel, furthestUnlockedLevel);
      if (currentLevel > numberOfLevels) {
        currentLevel = 1;
        this.youWinSprite = game.add.sprite(GameResolution.width / 2, GameResolution.height / 2, 'youwin', 0);
        this.youWinSprite.animations.add('flash', null, 7, true);
        this.youWinSprite.animations.play('flash');
        this.youWinSprite.anchor.set(0.5);
        this.ball.body.velocity.x = 0;
        return this.ball.body.velocity.y = 0;
      } else {
        return game.state.start('Gameplay');
      }
    }
  },
  render: function() {},
  collideX: function(ball, object) {
    return ball.body.velocity.x *= -1;
  },
  collideY: function(ball, object) {
    return ball.body.velocity.y *= -1;
  },
  collideBlock: function(ball, block) {
    if (block.key === 'treasure') {
      this.ruby = new Phaser.Sprite(game, block.body.position.x + 8, block.body.position.y + 11, 'ruby');
      game.add.existing(this.ruby);
      game.physics.enable(this.ruby, Phaser.Physics.ARCADE);
      this.ruby.body.velocity.y = rubyVelocity;
    }
    block.kill();
    score += 100;
    return this.scoreText.text = "SCORE: " + score;
  },
  collectRuby: function(square, ruby) {
    ruby.kill();
    score += 1000;
    return this.scoreText.text = "SCORE: " + score;
  },
  killBird: function(ball, bird) {
    bird.body.position.x = -1000;
    bird.body.position.y = Math.floor(Math.random() * (waterHeight - 10 + 1)) + 10;
    score += 2000;
    this.scoreText.text = "SCORE: " + score;
    this.birdExplosion = new Phaser.Sprite(game, this.bird.body.position.x, this.bird.body.position.y, 'birdExplosion');
    this.birdExplosion.animations.add('birdExplosion', null, 24);
    this.birdExplosion.animations.play('birdExplosion');
    return game.add.existing(this.birdExplosion);
  }
};

LevelSelectState = {
  preload: function() {},
  load: function() {},
  create: function() {
    var buttonText, i, k, levelButton, numberColor, ref, results;
    game.add.sprite(0, 0, 'background');
    game.add.sprite(0, waterHeight, 'water');
    this.backButton = new Phaser.Button(game, GameResolution.width - 32 * 9, GameResolution.height - 6 * 32, 'small_button', this.backButtonPress, this, 0, 0, 1, 0);
    this.backButton.tint = 0xFF5555;
    game.add.existing(this.backButton);
    this.backText = game.add.text(this.backButton.x + this.backButton.width / 2, this.backButton.y + this.backButton.height / 2, 'BACK', {
      font: "62px Karla",
      fill: 'white',
      align: 'center'
    });
    this.backText.anchor.set(0.5);
    this.titleText = game.add.text(GameResolution.width / 2, 100, 'LEVEL SELECT', {
      font: '72px Karla',
      fill: 'white',
      align: 'center'
    });
    this.titleText.anchor.set(0.5);
    results = [];
    for (i = k = 1, ref = numberOfLevels; k <= ref; i = k += 1) {
      levelButton = new Phaser.Button(game, 16 + (208 * ((i - 1) % 3)), 224 + 128 * Math.floor((i - 1) / 3), 'small_button', this.levelButtonPress, this, 0, 0, 1, 0);
      levelButton.scale.x = levelButton.scale.y = 0.75;
      levelButton.index = i;
      levelButton.tint = i <= furthestUnlockedLevel ? 0x5555DD : 0x333388;
      numberColor = i <= furthestUnlockedLevel ? 'white' : 'black';
      game.add.existing(levelButton);
      buttonText = game.add.text(16 + (208 * ((i - 1) % 3)) + (levelButton.width / 2), 224 + 128 * Math.floor((i - 1) / 3) + (levelButton.height / 2), i.toString(), {
        font: '48px Karla',
        fill: numberColor,
        align: 'center'
      });
      results.push(buttonText.anchor.set(0.5));
    }
    return results;
  },
  update: function() {},
  render: function() {},
  levelButtonPress: function(button) {
    if (furthestUnlockedLevel >= button.index) {
      currentLevel = button.index;
      lives = startingLives;
      score = 0;
      return game.state.start('Gameplay');
    }
  },
  backButtonPress: function() {
    return game.state.start('TitleScreen');
  }
};

LoadingState = {
  resizeGame: function() {
    var scale;
    scale = 1;
    if (window.innerWidth > window.innerHeight) {
      scale = window.innerHeight / GameResolution.height;
    } else {
      scale = window.innerWidth / GameResolution.width;
    }
    game.scale.setUserScale(scale, scale);
    return game.scale.refresh();
  },
  setScaling: function() {
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.setResizeCallback(this.resizeGame, this);
    return this.resizeGame();
  },
  preload: function() {
    game.load.image('background', 'img/background1.png');
    game.load.image('paddle', 'img/paddle.png');
    game.load.image('ball', 'img/cannonball.png');
    game.load.image('block', 'img/block.png');
    game.load.image('water', 'img/water.png');
    game.load.image('speechBubble', 'img/dang.png');
    game.load.image('captain', 'img/captain.png');
    game.load.spritesheet('big_button', 'img/big_button.png', 32 * 12, 32 * 4);
    game.load.spritesheet('small_button', 'img/small_button.png', 32 * 8, 2 * 64);
    game.load.spritesheet('triangular_button', 'img/triangular_button.png', 128, 128);
    game.load.spritesheet('splash', 'img/splash2.png', 48, 48);
    game.load.spritesheet('fish', 'img/fish.png', 32, 16);
    game.load.spritesheet('youwin', 'img/youwin.png', 166, 140);
    game.load.spritesheet('bird', 'img/bird.png', 32, 13);
    game.load.spritesheet('birdExplosion', 'img/birdExplosion1.png', 32, 32);
    game.load.image('blockWithGrass', 'img/blockGrassy.png');
    game.load.image('treasure', 'img/treasure.png');
    game.load.image('divit', 'img/divit1.png');
    game.load.image('ruby', 'img/ruby.png');
    return game.load.image('titleScreen', 'img/titleScreen3.png');
  },
  load: function() {},
  create: function() {
    this.setScaling();
    return game.state.start('TitleScreen');
  },
  update: function() {}
};

OptionsState = {
  preload: function() {},
  load: function() {},
  create: function() {
    game.add.sprite(0, 0, 'background');
    game.add.sprite(0, waterHeight, 'water');
    this.backButton = new Phaser.Button(game, GameResolution.width - 32 * 9, GameResolution.height - 6 * 32, 'small_button', this.backButtonPress, this, 0, 0, 1, 0);
    this.backButton.tint = 0xFF5555;
    game.add.existing(this.backButton);
    this.backText = game.add.text(this.backButton.x + this.backButton.width / 2, this.backButton.y + this.backButton.height / 2, 'BACK', {
      font: "62px Karla",
      fill: 'white',
      align: 'center'
    });
    this.backText.anchor.set(0.5);
    this.titleText = game.add.text(GameResolution.width / 2, 100, 'OPTIONS', {
      font: '72px Karla',
      fill: 'white',
      align: 'center'
    });
    this.titleText.anchor.set(0.5);
    this.startingLivesTitle = game.add.text(64, 200, 'STARTING LIVES', {
      font: '48px Karla',
      fill: 'white'
    });
    this.decrementStartingLivesButton = game.add.button(396, 264, 'triangular_button', (function() {
      startingLives = Math.max(startingLives - 1, 1);
      return this.lifeCountText.text = startingLives;
    }), this, 0, 0, 1, 0);
    this.decrementStartingLivesButton.scale.x = -0.5;
    this.decrementStartingLivesButton.scale.y = 0.5;
    this.decrementStartingLivesButton.tint = 0x5555DD;
    this.incrementStartingLivesButton = game.add.button(496, 264, 'triangular_button', (function() {
      startingLives = Math.min(startingLives + 1, 9);
      return this.lifeCountText.text = startingLives;
    }), this, 0, 0, 1, 0);
    this.incrementStartingLivesButton.scale.x = this.incrementStartingLivesButton.scale.y = 0.5;
    this.incrementStartingLivesButton.tint = 0x5555DD;
    return this.lifeCountText = game.add.text(424, 272, startingLives, {
      font: '48px Karla',
      fill: 'white'
    });
  },
  update: function() {},
  render: function() {},
  backButtonPress: function() {
    return game.state.start('TitleScreen');
  }
};

TitleScreenState = {
  preload: function() {},
  load: function() {},
  create: function() {
    var text;
    game.add.sprite(0, 0, 'background');
    game.add.sprite(0, 0, 'titleScreen');
    this.startButton = new Phaser.Button(game, 128, 416, 'big_button', this.onStartPress, this, 0, 0, 1, 0);
    this.startButton.tint = 0xFF5555;
    game.add.existing(this.startButton);
    text = game.add.text(this.startButton.x + this.startButton.width / 2, this.startButton.y + this.startButton.height / 2, 'PLAY', {
      font: "62px Karla",
      fill: 'white',
      align: 'center'
    });
    text.anchor.set(0.5);
    this.levelSelectButton = new Phaser.Button(game, 128, 416 + (128 * 1.25), 'big_button', this.onLevelSelectPress, this, 0, 0, 1, 0);
    this.levelSelectButton.tint = 0x55DD55;
    game.add.existing(this.levelSelectButton);
    text = game.add.text(this.levelSelectButton.x + this.levelSelectButton.width / 2, this.levelSelectButton.y + this.levelSelectButton.height / 2, 'LEVELS', {
      font: "62px Karla",
      fill: 'white',
      align: 'center'
    });
    text.anchor.set(0.5);
    this.optionsButton = new Phaser.Button(game, 128, 416 + (128 * 2.5), 'big_button', this.onOptionsPress, this, 0, 0, 1, 0);
    this.optionsButton.tint = 0x5555DD;
    game.add.existing(this.optionsButton);
    text = game.add.text(this.optionsButton.x + this.optionsButton.width / 2, this.optionsButton.y + this.optionsButton.height / 2, 'OPTIONS', {
      font: "62px Karla",
      fill: 'white',
      align: 'center'
    });
    return text.anchor.set(0.5);
  },
  update: function() {},
  render: function() {},
  onStartPress: function() {
    game.state.start('Gameplay');
    score = 0;
    return lives = startingLives;
  },
  onLevelSelectPress: function() {
    return game.state.start('LevelSelect');
  },
  onOptionsPress: function() {
    return game.state.start('Options');
  }
};

GameResolution = {
  width: 640,
  height: 960
};

game = null;

main = function() {
  game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, 'gameWindow');
  game.state.add('LevelSelect', LevelSelectState, false);
  game.state.add('Gameplay', GameplayState, false);
  game.state.add('TitleScreen', TitleScreenState, false);
  game.state.add('Options', OptionsState, false);
  return game.state.add('Loading', LoadingState, true);
};

Levels = [];

Levels[1] = [[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]];

Levels[2] = [
  [
    null, null, null, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, null, null, null, null, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, null, null, null
  ], [
    null, null, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, null, null, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF9999
    }, {
      color: 0xFF9999
    }, {
      color: 0xFF5555
    }, null, null
  ], [
    null, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF9999
    }, {
      color: 0xFF9999
    }, {
      color: 0xFF5555
    }, null
  ], [
    null, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF9999
    }, {
      color: 0xFF5555
    }, null
  ], [
    null, null, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, null, null
  ], [
    null, null, null, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, null, null, null
  ], [
    null, null, null, null, null, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, null, null, null, null, null
  ]
];

Levels[3] = [
  [{}, 0, {}, {}, 0, {}, 0, 0, 0, 0, {}, 0, {}, {}, 0, {}], [{}, {}, {}, {}, {}, {}, 0, 0, 0, 0, {}, {}, {}, {}, {}, {}], [
    0, {}, {}, {}, {}, 0, {
      treasure: true
    }, 0, 0, {
      treasure: true
    }, 0, {}, {}, {}, {}, 0
  ], [
    0, {}, {}, {
      color: 0x6AC6E1
    }, {}, {}, {}, {}, {}, {}, {}, {}, {
      color: 0x6AC6E1
    }, {}, {}, 0
  ], [0, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, 0], [
    0, {}, {}, {}, {}, {}, {}, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {}, {}, {}, {}, {}, {}, 0
  ], [
    0, {}, {}, {}, {}, {}, {}, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {}, {}, {}, {}, {}, {}, 0
  ]
];

Levels[4] = [
  [
    0, 0, 0, 0, 0, 0, 0, {
      color: 0x6AC6E1
    }, {
      color: 0x6AC6E1
    }, 0, 0, 0, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, 0, 0, {
      color: 0x6AC6E1
    }, {
      color: 0x84CEE6
    }, {
      color: 0x6AC6E1
    }, {
      color: 0x6AC6E1
    }, 0, 0, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, 0, {
      color: 0x6AC6E1
    }, {
      color: 0x84CEE6
    }, {
      color: 0x84CEE6
    }, {
      color: 0x6AC6E1
    }, {
      color: 0x6AC6E1
    }, {
      color: 0x51ADCD
    }, 0, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, {
      color: 0x6AC6E1
    }, {
      color: 0x6AC6E1
    }, {
      color: 0x6AC6E1
    }, {
      color: 0x6AC6E1
    }, {
      color: 0x6AC6E1
    }, {
      color: 0x6AC6E1
    }, {
      color: 0x51ADCD
    }, {
      color: 0x4CA1C0
    }, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, 0, {
      color: 0x6AC6E1
    }, {
      color: 0x6AC6E1
    }, {
      color: 0x6AC6E1
    }, {
      color: 0x6AC6E1
    }, {
      color: 0x51ADCD
    }, {
      color: 0x4CA1C0
    }, 0, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, 0, 0, {
      color: 0x6AC6E1
    }, {
      color: 0x6AC6E1
    }, {
      color: 0x51ADCD
    }, {
      color: 0x4CA1C0
    }, 0, 0, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, 0, 0, 0, {
      color: 0x51ADCD
    }, {
      color: 0x4CA1C0
    }, 0, 0, 0, 0, 0, 0, 0
  ]
];

Levels[5] = [
  [
    0, 0, 0, 0, 0, 0, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xCABFA7
    }, 0, 0, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, 0, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xCABFA7
    }, 0, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, {
      color: 0xEDE1CC
    }, {
      color: 0x333333
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0x333333
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xD9CCB3
    }, {
      color: 0xCABFA7
    }, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xD9CCB3
    }, {
      color: 0xCABFA7
    }, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0x333333
    }, {
      color: 0x333333
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xD9CCB3
    }, {
      color: 0xCABFA7
    }, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, 0, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xCABFA7
    }, 0, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, 0, 0, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xEDE1CC
    }, {
      color: 0xCABFA7
    }, 0, 0, 0, 0, 0, 0
  ]
];

Levels[6] = [
  [
    0, 0, 0, 0, {
      color: 0x00FF7B
    }, 0, 0, 0, 0, 0, 0, {
      color: 0x00FF7B
    }, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, 0, {
      color: 0x00FF7B
    }, 0, 0, 0, 0, {
      color: 0x00FF7B
    }, 0, 0, 0, 0, 0
  ], [
    0, 0, 0, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, 0, 0, 0
  ], [
    0, 0, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x333333
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x333333
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, 0, 0
  ], [
    0, 0, {
      color: 0x00FF7B
    }, 0, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, 0, {
      color: 0x00FF7B
    }, 0, 0
  ], [
    0, 0, {
      color: 0x00FF7B
    }, 0, {
      color: 0x00FF7B
    }, 0, 0, 0, 0, 0, 0, {
      color: 0x00FF7B
    }, 0, {
      color: 0x00FF7B
    }, 0, 0
  ], [
    0, 0, 0, 0, 0, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, 0, 0, {
      color: 0x00FF7B
    }, {
      color: 0x00FF7B
    }, 0, 0, 0, 0, 0
  ]
];

Levels[7] = [
  [
    0, 0, 0, {
      color: 0x191E24
    }, 0, 0, 0, 0, {
      color: 0x191E24
    }, 0, 0, 0, 0, 0
  ], [
    0, 0, 0, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, 0, 0, {
      color: 0x191E24
    }, 0, 0, 0, 0
  ], [
    0, 0, {
      color: 0x191E24
    }, {
      color: 0xECFB4E
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0xECFB4E
    }, {
      color: 0x191E24
    }, 0, {
      color: 0x191E24
    }, 0, 0, 0, 0
  ], [
    0, 0, 0, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0xF568B0
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, 0, 0, 0, {
      color: 0x191E24
    }, 0, 0, 0
  ], [
    0, 0, 0, 0, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, 0, 0, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, {
      color: 0x191E24
    }, 0, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, 0, {
      treasure: true
    }, {
      color: 0x191E24
    }, 0, {
      color: 0x191E24
    }, 0, {
      color: 0x191E24
    }, 0, 0, 0, 0, 0
  ]
];

Levels[8] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [
    {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }
  ], [
    0, {
      color: 0xFF8282
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF5555
    }, {
      color: 0xFF8282
    }, 0
  ], [
    0, 0, {
      color: 0xFF8282
    }, {
      color: 0x00E855
    }, {
      color: 0xFF8282
    }, {
      color: 0xFF8282
    }, {
      color: 0xFF8282
    }, {
      color: 0xFF8282
    }, {
      color: 0xFF8282
    }, {
      color: 0xFF8282
    }, {
      color: 0xFF8282
    }, {
      color: 0xFF8282
    }, {
      color: 0x00E855
    }, {
      color: 0xFF8282
    }, {
      color: 0xFF8282
    }, 0
  ], [
    0, 0, {
      color: 0x00E855
    }, {
      color: 0xA6A6A6
    }, {
      color: 0x00E855
    }, 0, 0, 0, 0, 0, 0, {
      color: 0x00E855
    }, {
      color: 0xA6A6A6
    }, {
      color: 0x00E855
    }, 0, 0
  ], [
    0, 0, 0, {
      color: 0x00E855
    }, 0, 0, 0, 0, 0, 0, 0, 0, {
      color: 0x00E855
    }, 0, 0, 0
  ], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

Levels[9] = [
  [
    0, 0, 0, 0, 0, 0, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, 0, 0, 0, 0, 0, 0
  ], [
    0, 0, 0, 0, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, 0, 0, 0, 0
  ], [
    0, 0, 0, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, {
      color: 0xCFCFCF
    }, {
      color: 0xCFCFCF
    }, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, {
      color: 0xFC3F3F
    }, 0, 0, 0
  ], [
    0, 0, 0, {
      color: 0xCFCFCF
    }, {
      color: 0xCFCFCF
    }, {
      color: 0xCFCFCF
    }, {
      color: 0xCFCFCF
    }, {
      color: 0xF0F0F0
    }, {
      color: 0xF0F0F0
    }, {
      color: 0xCFCFCF
    }, {
      color: 0xCFCFCF
    }, {
      color: 0xCFCFCF
    }, {
      color: 0xCFCFCF
    }, 0, 0, 0
  ], [
    0, 0, 0, {}, {}, {}, {}, {
      color: 0xCFCFCF
    }, {
      color: 0xCFCFCF
    }, {}, {}, {}, {}, 0, 0, 0
  ], [0, 0, 0, 0, {}, {}, {}, {}, {}, {}, {}, {}, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, {}, {}, {}, {}, 0, 0, 0, 0, 0, 0]
];

Levels[10] = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {
      treasure: true
    }, {
      treasure: true
    }, {
      treasure: true
    }, 0, 0, 0
  ], [
    {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0x82562F
    }
  ], [
    {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0x82562F
    }
  ], [
    0, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0x4F4F4F
    }, {
      color: 0x4F4F4F
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0x4F4F4F
    }, {
      color: 0x4F4F4F
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0x4F4F4F
    }, {
      color: 0x4F4F4F
    }, {
      color: 0xB3753E
    }, {
      color: 0x82562F
    }, 0
  ], [
    0, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0x4F4F4F
    }, {
      color: 0x4F4F4F
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0x4F4F4F
    }, {
      color: 0x4F4F4F
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0x4F4F4F
    }, {
      color: 0x4F4F4F
    }, {
      color: 0xB3753E
    }, {
      color: 0x82562F
    }, 0
  ], [
    0, 0, {
      color: 0xB3753E
    }, {
      treasure: true
    }, {
      treasure: true
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      treasure: true
    }, {
      treasure: true
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      treasure: true
    }, {
      treasure: true
    }, {
      color: 0x82562F
    }, 0, 0
  ], [
    0, 0, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0xB3753E
    }, {
      color: 0x82562F
    }, 0, 0
  ]
];

Levels[11] = [
  [
    0, 0, 0, 0, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x9CE9FF
    }, 0, 0, 0, 0, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x9CE9FF
    }, 0, 0
  ], [
    0, 0, 0, 0, {
      color: 0x6DCCFC
    }, 0, {
      color: 0x6DCCFC
    }, {
      color: 0x9CE9FF
    }, 0, 0, 0, {
      color: 0x6DCCFC
    }, 0, {
      color: 0x6DCCFC
    }, {
      color: 0x9CE9FF
    }, 0
  ], [
    0, 0, 0, 0, 0, 0, {
      color: 0x6DCCFC
    }, {
      color: 0x9CE9FF
    }, 0, 0, 0, 0, 0, {
      color: 0x6DCCFC
    }, {
      color: 0x9CE9FF
    }, 0
  ], [
    0, 0, 0, 0, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x9CE9FF
    }, 0, 0, 0, 0, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x9CE9FF
    }, 0
  ], [
    0, 0, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x9CE9FF
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x9CE9FF
    }
  ], [
    {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x9CE9FF
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x9CE9FF
    }
  ], [
    {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x9CE9FF
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x6DCCFC
    }, {
      color: 0x9CE9FF
    }, 0
  ]
];

Levels[19] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

Levels[20] = [[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]];
