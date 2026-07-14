// Kiro Bug Dodge - A Phaser.js Platformer Game
// Kiro must avoid bugs falling from the sky!

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  scene: [BootScene, MenuScene, GameScene, GameOverScene]
};

// --- BOOT SCENE: Generate sprites programmatically ---
function BootScene() {
  Phaser.Scene.call(this, { key: 'BootScene' });
}
BootScene.prototype = Object.create(Phaser.Scene.prototype);
BootScene.prototype.constructor = BootScene;

BootScene.prototype.create = function() {
  // Generate Kiro logo sprite (a stylized "K" in a circle - representing Kiro)
  const kiroGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  // Circle body
  kiroGraphics.fillStyle(0x00d4aa, 1);
  kiroGraphics.fillCircle(24, 24, 24);
  // Inner glow
  kiroGraphics.fillStyle(0x00ffcc, 0.6);
  kiroGraphics.fillCircle(24, 24, 18);
  // K letter
  kiroGraphics.fillStyle(0x1a1a2e, 1);
  kiroGraphics.fillRect(14, 10, 5, 28);
  // K diagonals
  kiroGraphics.lineStyle(5, 0x1a1a2e, 1);
  kiroGraphics.lineBetween(19, 24, 32, 10);
  kiroGraphics.lineBetween(19, 24, 34, 38);
  kiroGraphics.generateTexture('kiro', 48, 48);
  kiroGraphics.destroy();

  // Generate bug sprite
  const bugGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  // Bug body
  bugGraphics.fillStyle(0xff4444, 1);
  bugGraphics.fillEllipse(16, 18, 24, 20);
  // Bug head
  bugGraphics.fillStyle(0xcc0000, 1);
  bugGraphics.fillCircle(16, 6, 8);
  // Bug eyes
  bugGraphics.fillStyle(0xffffff, 1);
  bugGraphics.fillCircle(13, 5, 3);
  bugGraphics.fillCircle(19, 5, 3);
  bugGraphics.fillStyle(0x000000, 1);
  bugGraphics.fillCircle(13, 5, 1.5);
  bugGraphics.fillCircle(19, 5, 1.5);
  // Bug legs
  bugGraphics.lineStyle(2, 0x880000, 1);
  bugGraphics.lineBetween(6, 14, 1, 20);
  bugGraphics.lineBetween(6, 18, 1, 26);
  bugGraphics.lineBetween(6, 22, 1, 30);
  bugGraphics.lineBetween(26, 14, 31, 20);
  bugGraphics.lineBetween(26, 18, 31, 26);
  bugGraphics.lineBetween(26, 22, 31, 30);
  // Bug antennae
  bugGraphics.lineStyle(1.5, 0x880000, 1);
  bugGraphics.lineBetween(12, 0, 8, -4);
  bugGraphics.lineBetween(20, 0, 24, -4);
  bugGraphics.generateTexture('bug', 32, 32);
  bugGraphics.destroy();

  // Generate super bug sprite (larger, meaner)
  const superBugGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  superBugGraphics.fillStyle(0x9900ff, 1);
  superBugGraphics.fillEllipse(20, 22, 32, 28);
  superBugGraphics.fillStyle(0x6600cc, 1);
  superBugGraphics.fillCircle(20, 8, 10);
  superBugGraphics.fillStyle(0xffff00, 1);
  superBugGraphics.fillCircle(16, 7, 4);
  superBugGraphics.fillCircle(24, 7, 4);
  superBugGraphics.fillStyle(0xff0000, 1);
  superBugGraphics.fillCircle(16, 7, 2);
  superBugGraphics.fillCircle(24, 7, 2);
  superBugGraphics.lineStyle(2.5, 0x550088, 1);
  superBugGraphics.lineBetween(6, 16, 0, 24);
  superBugGraphics.lineBetween(6, 22, 0, 32);
  superBugGraphics.lineBetween(6, 28, 0, 38);
  superBugGraphics.lineBetween(34, 16, 40, 24);
  superBugGraphics.lineBetween(34, 22, 40, 32);
  superBugGraphics.lineBetween(34, 28, 40, 38);
  superBugGraphics.generateTexture('superBug', 40, 40);
  superBugGraphics.destroy();

  // Generate platform texture
  const platGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  platGraphics.fillStyle(0x334455, 1);
  platGraphics.fillRoundedRect(0, 0, 128, 20, 4);
  platGraphics.fillStyle(0x445566, 1);
  platGraphics.fillRoundedRect(2, 2, 124, 8, 3);
  platGraphics.generateTexture('platform', 128, 20);
  platGraphics.destroy();

  // Generate ground texture
  const groundGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  groundGraphics.fillStyle(0x2d4a3e, 1);
  groundGraphics.fillRect(0, 0, 800, 40);
  groundGraphics.fillStyle(0x3d5a4e, 1);
  groundGraphics.fillRect(0, 0, 800, 4);
  groundGraphics.generateTexture('ground', 800, 40);
  groundGraphics.destroy();

  // Generate particle
  const particleGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  particleGraphics.fillStyle(0x00ffcc, 1);
  particleGraphics.fillCircle(4, 4, 4);
  particleGraphics.generateTexture('particle', 8, 8);
  particleGraphics.destroy();

  this.scene.start('MenuScene');
};

// --- MENU SCENE ---
function MenuScene() {
  Phaser.Scene.call(this, { key: 'MenuScene' });
}
MenuScene.prototype = Object.create(Phaser.Scene.prototype);
MenuScene.prototype.constructor = MenuScene;

MenuScene.prototype.create = function() {
  const { width, height } = this.cameras.main;

  // Background
  this.cameras.main.setBackgroundColor('#1a1a2e');

  // Title
  this.add.text(width / 2, 120, 'KIRO BUG DODGE', {
    fontSize: '48px',
    fontFamily: 'monospace',
    color: '#00d4aa',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  // Kiro sprite display
  const kiro = this.add.image(width / 2, 240, 'kiro').setScale(3);
  this.tweens.add({
    targets: kiro,
    y: 260,
    duration: 1000,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // Instructions
  this.add.text(width / 2, 360, 'Avoid the bugs!\nJump between platforms to survive!', {
    fontSize: '18px',
    fontFamily: 'monospace',
    color: '#aaaacc',
    align: 'center'
  }).setOrigin(0.5);

  this.add.text(width / 2, 430, 'Controls: Arrow Keys / WASD to move\nSPACE or UP to jump', {
    fontSize: '14px',
    fontFamily: 'monospace',
    color: '#667788',
    align: 'center'
  }).setOrigin(0.5);

  // Start button
  const startText = this.add.text(width / 2, 520, '[ PRESS SPACE TO START ]', {
    fontSize: '22px',
    fontFamily: 'monospace',
    color: '#00ffcc',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  this.tweens.add({
    targets: startText,
    alpha: 0.3,
    duration: 800,
    yoyo: true,
    repeat: -1
  });

  this.input.keyboard.once('keydown-SPACE', () => {
    this.scene.start('GameScene');
  });

  this.input.keyboard.once('keydown-ENTER', () => {
    this.scene.start('GameScene');
  });
};

// --- GAME SCENE ---
function GameScene() {
  Phaser.Scene.call(this, { key: 'GameScene' });
}
GameScene.prototype = Object.create(Phaser.Scene.prototype);
GameScene.prototype.constructor = GameScene;

GameScene.prototype.create = function() {
  const { width, height } = this.cameras.main;

  this.cameras.main.setBackgroundColor('#16213e');

  // Game state
  this.score = 0;
  this.gameTime = 0;
  this.difficulty = 1;
  this.bugSpawnRate = 1500;
  this.isGameOver = false;
  this.invincible = false;
  this.lives = 3;

  // Ground
  this.ground = this.physics.add.staticGroup();
  const groundSprite = this.ground.create(400, 590, 'ground');
  groundSprite.refreshBody();

  // Platforms
  this.platforms = this.physics.add.staticGroup();
  this.createPlatforms();

  // Player (Kiro)
  this.player = this.physics.add.sprite(400, 500, 'kiro');
  this.player.setCollideWorldBounds(true);
  this.player.setBounce(0.1);
  this.player.setDragX(600);

  // Bugs group
  this.bugs = this.physics.add.group({
    bounceX: 0.8,
    bounceY: 0.6,
    collideWorldBounds: true
  });

  // Collisions
  this.physics.add.collider(this.player, this.ground);
  this.physics.add.collider(this.player, this.platforms);
  this.physics.add.collider(this.bugs, this.ground, this.bugHitGround, null, this);
  this.physics.add.collider(this.bugs, this.platforms);
  this.physics.add.collider(this.bugs, this.bugs);
  this.physics.add.overlap(this.player, this.bugs, this.hitBug, null, this);

  // Controls
  this.cursors = this.input.keyboard.createCursorKeys();
  this.wasd = {
    up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  };
  this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  // UI
  this.scoreText = this.add.text(16, 16, 'Score: 0', {
    fontSize: '24px',
    fontFamily: 'monospace',
    color: '#00d4aa',
    fontStyle: 'bold'
  });

  this.difficultyText = this.add.text(16, 48, 'Level: 1', {
    fontSize: '16px',
    fontFamily: 'monospace',
    color: '#667788'
  });

  this.livesText = this.add.text(width - 16, 16, '♥ ♥ ♥', {
    fontSize: '24px',
    fontFamily: 'monospace',
    color: '#ff4444'
  }).setOrigin(1, 0);

  // Bug spawn timer
  this.bugTimer = this.time.addEvent({
    delay: this.bugSpawnRate,
    callback: this.spawnBug,
    callbackScope: this,
    loop: true
  });

  // Score timer (score increases over time)
  this.scoreTimer = this.time.addEvent({
    delay: 100,
    callback: () => {
      if (!this.isGameOver) {
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
      }
    },
    callbackScope: this,
    loop: true
  });

  // Difficulty timer
  this.difficultyTimer = this.time.addEvent({
    delay: 8000,
    callback: this.increaseDifficulty,
    callbackScope: this,
    loop: true
  });

  // Background particles for ambiance
  this.createBackgroundParticles();
};

GameScene.prototype.createPlatforms = function() {
  // Static platform layout
  const platformPositions = [
    { x: 150, y: 460 },
    { x: 650, y: 460 },
    { x: 400, y: 380 },
    { x: 100, y: 300 },
    { x: 700, y: 300 },
    { x: 400, y: 220 },
    { x: 200, y: 150 },
    { x: 600, y: 150 }
  ];

  platformPositions.forEach(pos => {
    const plat = this.platforms.create(pos.x, pos.y, 'platform');
    plat.refreshBody();
  });
};

GameScene.prototype.createBackgroundParticles = function() {
  // Floating background dots for atmosphere
  for (let i = 0; i < 20; i++) {
    const dot = this.add.circle(
      Phaser.Math.Between(0, 800),
      Phaser.Math.Between(0, 600),
      Phaser.Math.Between(1, 2),
      0x00d4aa,
      0.2
    );
    this.tweens.add({
      targets: dot,
      y: dot.y - Phaser.Math.Between(20, 50),
      alpha: 0,
      duration: Phaser.Math.Between(2000, 5000),
      yoyo: true,
      repeat: -1,
      delay: Phaser.Math.Between(0, 3000)
    });
  }
};

GameScene.prototype.spawnBug = function() {
  if (this.isGameOver) return;

  const x = Phaser.Math.Between(50, 750);
  const isSuperBug = this.difficulty >= 3 && Phaser.Math.Between(1, 100) <= (this.difficulty * 8);
  const textureKey = isSuperBug ? 'superBug' : 'bug';

  const bug = this.bugs.create(x, -20, textureKey);
  bug.setBounce(0.7, 0.5);
  bug.setCollideWorldBounds(true);
  bug.setVelocityX(Phaser.Math.Between(-100, 100) * (1 + this.difficulty * 0.3));
  bug.setVelocityY(Phaser.Math.Between(50, 150));
  bug.setAngularVelocity(Phaser.Math.Between(-200, 200));

  if (isSuperBug) {
    bug.setData('super', true);
    bug.setScale(1.2);
  }

  // Spawn multiple bugs at higher difficulty
  if (this.difficulty >= 2 && Phaser.Math.Between(1, 100) <= 30) {
    const x2 = Phaser.Math.Between(50, 750);
    const extraBug = this.bugs.create(x2, -20, 'bug');
    extraBug.setBounce(0.7, 0.5);
    extraBug.setCollideWorldBounds(true);
    extraBug.setVelocityX(Phaser.Math.Between(-150, 150));
    extraBug.setVelocityY(Phaser.Math.Between(80, 200));
    extraBug.setAngularVelocity(Phaser.Math.Between(-200, 200));
  }

  // Clean up bugs that have been alive too long
  this.time.delayedCall(15000, () => {
    if (bug && bug.active) {
      bug.destroy();
    }
  });
};

GameScene.prototype.bugHitGround = function(bug) {
  // Make bugs bounce more aggressively at higher difficulties
  if (this.difficulty >= 4) {
    bug.setVelocityX(Phaser.Math.Between(-200, 200));
  }
};

GameScene.prototype.hitBug = function(player, bug) {
  if (this.invincible || this.isGameOver) return;

  this.lives--;
  this.updateLivesDisplay();

  // Flash effect
  this.invincible = true;
  this.tweens.add({
    targets: player,
    alpha: 0.3,
    duration: 100,
    yoyo: true,
    repeat: 8,
    onComplete: () => {
      this.invincible = false;
      player.setAlpha(1);
    }
  });

  // Camera shake
  this.cameras.main.shake(200, 0.01);

  // Destroy the bug that hit us
  bug.destroy();

  if (this.lives <= 0) {
    this.gameOver();
  }
};

GameScene.prototype.updateLivesDisplay = function() {
  const hearts = [];
  for (let i = 0; i < this.lives; i++) {
    hearts.push('♥');
  }
  this.livesText.setText(hearts.join(' '));
};

GameScene.prototype.increaseDifficulty = function() {
  if (this.isGameOver) return;

  this.difficulty++;
  this.difficultyText.setText('Level: ' + this.difficulty);

  // Increase spawn rate
  this.bugSpawnRate = Math.max(400, 1500 - (this.difficulty * 150));
  this.bugTimer.delay = this.bugSpawnRate;

  // Flash difficulty text
  this.tweens.add({
    targets: this.difficultyText,
    scaleX: 1.5,
    scaleY: 1.5,
    duration: 200,
    yoyo: true,
    onStart: () => {
      this.difficultyText.setColor('#ffcc00');
    },
    onComplete: () => {
      this.difficultyText.setColor('#667788');
    }
  });

  // At higher levels, make existing bugs faster
  if (this.difficulty >= 5) {
    this.bugs.getChildren().forEach(bug => {
      const vx = bug.body.velocity.x;
      const vy = bug.body.velocity.y;
      bug.setVelocity(vx * 1.2, vy * 1.1);
    });
  }
};

GameScene.prototype.gameOver = function() {
  this.isGameOver = true;
  this.physics.pause();
  this.player.setTint(0xff0000);

  // Stop timers
  this.bugTimer.remove();
  this.scoreTimer.remove();
  this.difficultyTimer.remove();

  // Store final score
  this.registry.set('finalScore', this.score);
  this.registry.set('finalLevel', this.difficulty);

  // Transition after a brief pause
  this.time.delayedCall(1500, () => {
    this.scene.start('GameOverScene');
  });
};

GameScene.prototype.update = function() {
  if (this.isGameOver) return;

  const speed = 300;
  const jumpVelocity = -450;

  // Horizontal movement
  if (this.cursors.left.isDown || this.wasd.left.isDown) {
    this.player.setVelocityX(-speed);
    this.player.setFlipX(true);
  } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
    this.player.setVelocityX(speed);
    this.player.setFlipX(false);
  } else {
    // Decelerate
    if (this.player.body.touching.down || this.player.body.blocked.down) {
      this.player.setVelocityX(this.player.body.velocity.x * 0.8);
    }
  }

  // Jump
  const onGround = this.player.body.touching.down || this.player.body.blocked.down;
  if ((this.cursors.up.isDown || this.wasd.up.isDown || this.spaceKey.isDown) && onGround) {
    this.player.setVelocityY(jumpVelocity);
  }

  // Wall jump (if touching walls mid-air)
  if (!onGround) {
    if (this.player.body.blocked.left && (this.cursors.right.isDown || this.wasd.right.isDown)) {
      this.player.setVelocityY(jumpVelocity * 0.8);
      this.player.setVelocityX(200);
    }
    if (this.player.body.blocked.right && (this.cursors.left.isDown || this.wasd.left.isDown)) {
      this.player.setVelocityY(jumpVelocity * 0.8);
      this.player.setVelocityX(-200);
    }
  }
};

// --- GAME OVER SCENE ---
function GameOverScene() {
  Phaser.Scene.call(this, { key: 'GameOverScene' });
}
GameOverScene.prototype = Object.create(Phaser.Scene.prototype);
GameOverScene.prototype.constructor = GameOverScene;

GameOverScene.prototype.create = function() {
  const { width, height } = this.cameras.main;
  this.cameras.main.setBackgroundColor('#1a1a2e');

  const finalScore = this.registry.get('finalScore') || 0;
  const finalLevel = this.registry.get('finalLevel') || 1;

  // Save high score
  const highScore = Math.max(
    parseInt(localStorage.getItem('kiro_highscore') || '0'),
    finalScore
  );
  localStorage.setItem('kiro_highscore', highScore.toString());

  this.add.text(width / 2, 100, 'GAME OVER', {
    fontSize: '56px',
    fontFamily: 'monospace',
    color: '#ff4444',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  // Dead Kiro
  const deadKiro = this.add.image(width / 2, 200, 'kiro').setScale(2.5);
  deadKiro.setTint(0x666666);
  this.tweens.add({
    targets: deadKiro,
    angle: 360,
    duration: 2000,
    repeat: -1
  });

  this.add.text(width / 2, 300, 'Score: ' + finalScore, {
    fontSize: '32px',
    fontFamily: 'monospace',
    color: '#00d4aa'
  }).setOrigin(0.5);

  this.add.text(width / 2, 345, 'Level Reached: ' + finalLevel, {
    fontSize: '20px',
    fontFamily: 'monospace',
    color: '#8899aa'
  }).setOrigin(0.5);

  this.add.text(width / 2, 390, 'High Score: ' + highScore, {
    fontSize: '20px',
    fontFamily: 'monospace',
    color: '#ffcc00'
  }).setOrigin(0.5);

  // Bugs killed display
  const bugsMessage = finalLevel >= 5 ? 'The bugs overwhelmed Kiro!' :
    finalLevel >= 3 ? 'Those bugs were tough!' :
      'Better luck next time!';

  this.add.text(width / 2, 440, bugsMessage, {
    fontSize: '16px',
    fontFamily: 'monospace',
    color: '#667788',
    fontStyle: 'italic'
  }).setOrigin(0.5);

  // Restart prompt
  const restartText = this.add.text(width / 2, 530, '[ PRESS SPACE TO PLAY AGAIN ]', {
    fontSize: '20px',
    fontFamily: 'monospace',
    color: '#00ffcc',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  this.tweens.add({
    targets: restartText,
    alpha: 0.3,
    duration: 800,
    yoyo: true,
    repeat: -1
  });

  this.input.keyboard.once('keydown-SPACE', () => {
    this.scene.start('GameScene');
  });

  this.input.keyboard.once('keydown-ENTER', () => {
    this.scene.start('GameScene');
  });
};

// --- START THE GAME ---
const game = new Phaser.Game(config);
