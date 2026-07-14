// Kiro Bug Dodge - Level-Based Platformer
// Reach the end of each level without getting hit!

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 900 },
      debug: false
    }
  },
  scene: [BootScene, MenuScene, GameScene, LevelCompleteScene, GameOverScene]
};

// --- BOOT SCENE ---
function BootScene() {
  Phaser.Scene.call(this, { key: 'BootScene' });
}
BootScene.prototype = Object.create(Phaser.Scene.prototype);
BootScene.prototype.constructor = BootScene;

BootScene.prototype.create = function() {
  // Generate Kiro ghost logo sprite
  const kiroGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  kiroGraphics.fillStyle(0x9b59b6, 1);
  kiroGraphics.fillRoundedRect(8, 4, 32, 36, { tl: 16, tr: 16, bl: 0, br: 0 });
  kiroGraphics.fillTriangle(8, 40, 8, 48, 16, 40);
  kiroGraphics.fillTriangle(16, 40, 16, 48, 24, 40);
  kiroGraphics.fillTriangle(24, 40, 24, 48, 32, 40);
  kiroGraphics.fillTriangle(32, 40, 32, 48, 40, 40);
  kiroGraphics.fillRect(8, 36, 32, 6);
  kiroGraphics.fillStyle(0xc39bd3, 0.4);
  kiroGraphics.fillRoundedRect(12, 8, 24, 20, { tl: 12, tr: 12, bl: 0, br: 0 });
  kiroGraphics.fillStyle(0xffffff, 1);
  kiroGraphics.fillCircle(18, 20, 5);
  kiroGraphics.fillCircle(30, 20, 5);
  kiroGraphics.fillStyle(0x1a1a2e, 1);
  kiroGraphics.fillCircle(19, 21, 2.5);
  kiroGraphics.fillCircle(31, 21, 2.5);
  kiroGraphics.lineStyle(2, 0x1a1a2e, 1);
  kiroGraphics.beginPath();
  kiroGraphics.arc(24, 28, 6, 0.1 * Math.PI, 0.9 * Math.PI, false);
  kiroGraphics.strokePath();
  kiroGraphics.generateTexture('kiro', 48, 52);
  kiroGraphics.destroy();

  // Bug sprite
  const bugGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  bugGraphics.fillStyle(0xff4444, 1);
  bugGraphics.fillEllipse(16, 18, 24, 20);
  bugGraphics.fillStyle(0xcc0000, 1);
  bugGraphics.fillCircle(16, 6, 8);
  bugGraphics.fillStyle(0xffffff, 1);
  bugGraphics.fillCircle(13, 5, 3);
  bugGraphics.fillCircle(19, 5, 3);
  bugGraphics.fillStyle(0x000000, 1);
  bugGraphics.fillCircle(13, 5, 1.5);
  bugGraphics.fillCircle(19, 5, 1.5);
  bugGraphics.lineStyle(2, 0x880000, 1);
  bugGraphics.lineBetween(6, 14, 1, 20);
  bugGraphics.lineBetween(6, 18, 1, 26);
  bugGraphics.lineBetween(6, 22, 1, 30);
  bugGraphics.lineBetween(26, 14, 31, 20);
  bugGraphics.lineBetween(26, 18, 31, 26);
  bugGraphics.lineBetween(26, 22, 31, 30);
  bugGraphics.generateTexture('bug', 32, 32);
  bugGraphics.destroy();

  // Platform texture
  const platGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  platGraphics.fillStyle(0x334455, 1);
  platGraphics.fillRoundedRect(0, 0, 128, 20, 4);
  platGraphics.fillStyle(0x445566, 1);
  platGraphics.fillRoundedRect(2, 2, 124, 8, 3);
  platGraphics.generateTexture('platform', 128, 20);
  platGraphics.destroy();

  // Small platform
  const smallPlatGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  smallPlatGraphics.fillStyle(0x334455, 1);
  smallPlatGraphics.fillRoundedRect(0, 0, 80, 20, 4);
  smallPlatGraphics.fillStyle(0x445566, 1);
  smallPlatGraphics.fillRoundedRect(2, 2, 76, 8, 3);
  smallPlatGraphics.generateTexture('platformSmall', 80, 20);
  smallPlatGraphics.destroy();

  // Ground texture
  const groundGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  groundGraphics.fillStyle(0x2d4a3e, 1);
  groundGraphics.fillRect(0, 0, 800, 40);
  groundGraphics.fillStyle(0x3d5a4e, 1);
  groundGraphics.fillRect(0, 0, 800, 4);
  groundGraphics.generateTexture('ground', 800, 40);
  groundGraphics.destroy();

  // Goal flag texture
  const flagGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  flagGraphics.fillStyle(0xffffff, 1);
  flagGraphics.fillRect(2, 0, 4, 50);
  flagGraphics.fillStyle(0x00ff88, 1);
  flagGraphics.fillTriangle(6, 2, 6, 22, 32, 12);
  flagGraphics.generateTexture('flag', 34, 50);
  flagGraphics.destroy();

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
  this.cameras.main.setBackgroundColor('#1a1a2e');

  this.add.text(width / 2, 100, 'KIRO BUG DODGE', {
    fontSize: '48px',
    fontFamily: 'monospace',
    color: '#9b59b6',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  const kiro = this.add.image(width / 2, 230, 'kiro').setScale(3);
  this.tweens.add({
    targets: kiro,
    y: 250,
    duration: 1000,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  this.add.text(width / 2, 340, 'Reach the flag at the end of each level!\nAvoid all bugs - ONE HIT = GAME OVER', {
    fontSize: '16px',
    fontFamily: 'monospace',
    color: '#aaaacc',
    align: 'center'
  }).setOrigin(0.5);

  this.add.text(width / 2, 410, 'Controls: Arrow Keys / WASD to move\nSPACE or UP to jump', {
    fontSize: '14px',
    fontFamily: 'monospace',
    color: '#667788',
    align: 'center'
  }).setOrigin(0.5);

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
    this.registry.set('currentLevel', 1);
    this.scene.start('GameScene');
  });
  this.input.keyboard.once('keydown-ENTER', () => {
    this.registry.set('currentLevel', 1);
    this.scene.start('GameScene');
  });
};

// --- LEVEL DEFINITIONS ---
const LEVELS = [
  { // Level 1 - Tutorial, no bugs, just platforms
    platforms: [
      { x: 200, y: 480, type: 'platform' },
      { x: 400, y: 450, type: 'platform' },
      { x: 600, y: 420, type: 'platform' },
      { x: 750, y: 380, type: 'platform' }
    ],
    bugs: [],
    playerStart: { x: 60, y: 520 },
    flagPos: { x: 750, y: 335 }
  },
  { // Level 2 - One slow bug, wide platforms
    platforms: [
      { x: 180, y: 470, type: 'platform' },
      { x: 400, y: 420, type: 'platform' },
      { x: 620, y: 370, type: 'platform' },
      { x: 750, y: 310, type: 'platform' }
    ],
    bugs: [
      { x: 400, y: 380, vx: 50, vy: 0, bounceX: true, rangeX: [330, 470] }
    ],
    playerStart: { x: 60, y: 520 },
    flagPos: { x: 750, y: 265 }
  },
  { // Level 3 - Two slow bugs, still generous platforms
    platforms: [
      { x: 150, y: 470, type: 'platform' },
      { x: 350, y: 420, type: 'platform' },
      { x: 550, y: 360, type: 'platform' },
      { x: 720, y: 300, type: 'platform' }
    ],
    bugs: [
      { x: 350, y: 380, vx: 60, vy: 0, bounceX: true, rangeX: [280, 420] },
      { x: 600, y: 320, vx: 50, vy: 0, bounceX: true, rangeX: [530, 670] }
    ],
    playerStart: { x: 60, y: 520 },
    flagPos: { x: 750, y: 255 }
  },
  { // Level 4 - Getting harder, smaller platforms, faster bugs
    platforms: [
      { x: 120, y: 460, type: 'platform' },
      { x: 300, y: 400, type: 'platformSmall' },
      { x: 450, y: 340, type: 'platform' },
      { x: 300, y: 260, type: 'platformSmall' },
      { x: 550, y: 200, type: 'platform' },
      { x: 720, y: 260, type: 'platformSmall' }
    ],
    bugs: [
      { x: 300, y: 360, vx: 100, vy: 0, bounceX: true, rangeX: [240, 360] },
      { x: 450, y: 300, vx: 0, vy: 80, bounceY: true, rangeY: [260, 340] },
      { x: 550, y: 160, vx: 100, vy: 0, bounceX: true, rangeX: [490, 620] }
    ],
    playerStart: { x: 60, y: 520 },
    flagPos: { x: 740, y: 215 }
  },
  { // Level 5 - Vertical challenge
    platforms: [
      { x: 100, y: 480, type: 'platformSmall' },
      { x: 250, y: 420, type: 'platformSmall' },
      { x: 400, y: 360, type: 'platformSmall' },
      { x: 250, y: 280, type: 'platformSmall' },
      { x: 100, y: 200, type: 'platformSmall' },
      { x: 300, y: 140, type: 'platform' },
      { x: 550, y: 180, type: 'platformSmall' },
      { x: 700, y: 240, type: 'platformSmall' }
    ],
    bugs: [
      { x: 250, y: 380, vx: 110, vy: 0, bounceX: true, rangeX: [190, 310] },
      { x: 400, y: 320, vx: 0, vy: 100, bounceY: true, rangeY: [280, 360] },
      { x: 250, y: 240, vx: 130, vy: 0, bounceX: true, rangeX: [180, 320] },
      { x: 550, y: 140, vx: 90, vy: 0, bounceX: true, rangeX: [480, 620] }
    ],
    playerStart: { x: 60, y: 520 },
    flagPos: { x: 720, y: 195 }
  },
  { // Level 6 - Dense bugs
    platforms: [
      { x: 150, y: 470, type: 'platformSmall' },
      { x: 350, y: 430, type: 'platformSmall' },
      { x: 550, y: 380, type: 'platformSmall' },
      { x: 400, y: 300, type: 'platformSmall' },
      { x: 200, y: 240, type: 'platformSmall' },
      { x: 400, y: 180, type: 'platformSmall' },
      { x: 600, y: 240, type: 'platformSmall' },
      { x: 720, y: 180, type: 'platformSmall' }
    ],
    bugs: [
      { x: 350, y: 390, vx: 140, vy: 0, bounceX: true, rangeX: [280, 420] },
      { x: 550, y: 340, vx: 0, vy: 120, bounceY: true, rangeY: [300, 380] },
      { x: 400, y: 260, vx: 160, vy: 0, bounceX: true, rangeX: [320, 480] },
      { x: 200, y: 200, vx: 0, vy: 100, bounceY: true, rangeY: [160, 240] },
      { x: 600, y: 200, vx: 130, vy: 0, bounceX: true, rangeX: [530, 670] }
    ],
    playerStart: { x: 60, y: 520 },
    flagPos: { x: 740, y: 135 }
  },
  { // Level 7 - The gauntlet
    platforms: [
      { x: 120, y: 480, type: 'platformSmall' },
      { x: 280, y: 430, type: 'platformSmall' },
      { x: 440, y: 480, type: 'platformSmall' },
      { x: 580, y: 400, type: 'platformSmall' },
      { x: 400, y: 320, type: 'platformSmall' },
      { x: 200, y: 260, type: 'platformSmall' },
      { x: 400, y: 190, type: 'platformSmall' },
      { x: 600, y: 130, type: 'platformSmall' },
      { x: 740, y: 200, type: 'platformSmall' }
    ],
    bugs: [
      { x: 280, y: 390, vx: 150, vy: 0, bounceX: true, rangeX: [210, 350] },
      { x: 440, y: 440, vx: 0, vy: 130, bounceY: true, rangeY: [400, 480] },
      { x: 580, y: 360, vx: 160, vy: 0, bounceX: true, rangeX: [510, 650] },
      { x: 400, y: 280, vx: 0, vy: 140, bounceY: true, rangeY: [240, 320] },
      { x: 200, y: 220, vx: 170, vy: 0, bounceX: true, rangeX: [130, 270] },
      { x: 600, y: 90, vx: 180, vy: 0, bounceX: true, rangeX: [520, 680] }
    ],
    playerStart: { x: 60, y: 520 },
    flagPos: { x: 750, y: 155 }
  }
];

// --- GAME SCENE ---
function GameScene() {
  Phaser.Scene.call(this, { key: 'GameScene' });
}
GameScene.prototype = Object.create(Phaser.Scene.prototype);
GameScene.prototype.constructor = GameScene;

GameScene.prototype.create = function() {
  const { width, height } = this.cameras.main;
  this.cameras.main.setBackgroundColor('#16213e');

  this.currentLevel = this.registry.get('currentLevel') || 1;
  this.isGameOver = false;

  // Get level data (loop back with increased speed if past level 5)
  const levelIndex = ((this.currentLevel - 1) % LEVELS.length);
  const levelData = LEVELS[levelIndex];
  const speedMultiplier = 1 + Math.floor((this.currentLevel - 1) / LEVELS.length) * 0.3;

  // Ground
  this.ground = this.physics.add.staticGroup();
  this.ground.create(400, 590, 'ground').refreshBody();

  // Platforms
  this.platforms = this.physics.add.staticGroup();
  levelData.platforms.forEach(p => {
    this.platforms.create(p.x, p.y, p.type).refreshBody();
  });

  // Player
  this.player = this.physics.add.sprite(levelData.playerStart.x, levelData.playerStart.y, 'kiro');
  this.player.setCollideWorldBounds(true);
  this.player.setBounce(0.1);
  this.player.setDragX(600);

  // Goal flag
  this.flag = this.physics.add.staticSprite(levelData.flagPos.x, levelData.flagPos.y, 'flag');

  // Bugs (patrol patterns)
  this.bugs = this.physics.add.group({ allowGravity: false });
  levelData.bugs.forEach(b => {
    const bug = this.bugs.create(b.x, b.y, 'bug');
    bug.setData('originX', b.x);
    bug.setData('originY', b.y);
    bug.setData('vx', b.vx * speedMultiplier);
    bug.setData('vy', b.vy * speedMultiplier);
    bug.setData('bounceX', b.bounceX || false);
    bug.setData('bounceY', b.bounceY || false);
    bug.setData('rangeX', b.rangeX || null);
    bug.setData('rangeY', b.rangeY || null);
    bug.setData('dirX', 1);
    bug.setData('dirY', 1);
    bug.body.setAllowGravity(false);
  });

  // Collisions
  this.physics.add.collider(this.player, this.ground);
  this.physics.add.collider(this.player, this.platforms);
  this.physics.add.overlap(this.player, this.bugs, this.hitBug, null, this);
  this.physics.add.overlap(this.player, this.flag, this.reachGoal, null, this);

  // Controls
  this.cursors = this.input.keyboard.createCursorKeys();
  this.wasd = {
    up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  };
  this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  // UI
  this.add.text(16, 16, 'Level ' + this.currentLevel, {
    fontSize: '24px',
    fontFamily: 'monospace',
    color: '#9b59b6',
    fontStyle: 'bold'
  });

  this.add.text(16, 48, 'Reach the flag! One hit = Game Over', {
    fontSize: '12px',
    fontFamily: 'monospace',
    color: '#667788'
  });

  // Flag glow effect
  this.tweens.add({
    targets: this.flag,
    alpha: 0.6,
    duration: 600,
    yoyo: true,
    repeat: -1
  });

  // Background particles
  for (let i = 0; i < 15; i++) {
    const dot = this.add.circle(
      Phaser.Math.Between(0, 800),
      Phaser.Math.Between(0, 600),
      Phaser.Math.Between(1, 2),
      0x9b59b6, 0.15
    );
    this.tweens.add({
      targets: dot,
      y: dot.y - Phaser.Math.Between(20, 40),
      alpha: 0,
      duration: Phaser.Math.Between(2000, 4000),
      yoyo: true,
      repeat: -1,
      delay: Phaser.Math.Between(0, 3000)
    });
  }
};

GameScene.prototype.update = function() {
  if (this.isGameOver) return;

  const speed = 280;
  const jumpVelocity = -480;

  // Horizontal movement
  if (this.cursors.left.isDown || this.wasd.left.isDown) {
    this.player.setVelocityX(-speed);
    this.player.setFlipX(true);
  } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
    this.player.setVelocityX(speed);
    this.player.setFlipX(false);
  } else {
    const onGround = this.player.body.touching.down || this.player.body.blocked.down;
    if (onGround) {
      this.player.setVelocityX(this.player.body.velocity.x * 0.8);
    }
  }

  // Jump
  const onGround = this.player.body.touching.down || this.player.body.blocked.down;
  if ((this.cursors.up.isDown || this.wasd.up.isDown || this.spaceKey.isDown) && onGround) {
    this.player.setVelocityY(jumpVelocity);
  }

  // Update bug patrol movements
  this.bugs.getChildren().forEach(bug => {
    if (bug.getData('bounceX')) {
      const range = bug.getData('rangeX');
      const dir = bug.getData('dirX');
      const vx = bug.getData('vx');
      bug.x += vx * dir * (1/60);
      if (range && (bug.x >= range[1] || bug.x <= range[0])) {
        bug.setData('dirX', dir * -1);
      }
    }
    if (bug.getData('bounceY')) {
      const range = bug.getData('rangeY');
      const dir = bug.getData('dirY');
      const vy = bug.getData('vy');
      bug.y += vy * dir * (1/60);
      if (range && (bug.y >= range[1] || bug.y <= range[0])) {
        bug.setData('dirY', dir * -1);
      }
    }
    // Rotate bug for visual flair
    bug.angle += 2;
  });
};

GameScene.prototype.hitBug = function(player, bug) {
  if (this.isGameOver) return;
  this.isGameOver = true;

  this.physics.pause();
  player.setTint(0xff0000);
  this.cameras.main.shake(300, 0.02);

  this.registry.set('finalLevel', this.currentLevel);

  this.time.delayedCall(1200, () => {
    this.scene.start('GameOverScene');
  });
};

GameScene.prototype.reachGoal = function(player, flag) {
  if (this.isGameOver) return;
  this.isGameOver = true;

  player.setTint(0x00ff88);
  this.cameras.main.flash(500, 0, 255, 136);

  this.registry.set('currentLevel', this.currentLevel + 1);

  this.time.delayedCall(1000, () => {
    this.scene.start('LevelCompleteScene');
  });
};

// --- LEVEL COMPLETE SCENE ---
function LevelCompleteScene() {
  Phaser.Scene.call(this, { key: 'LevelCompleteScene' });
}
LevelCompleteScene.prototype = Object.create(Phaser.Scene.prototype);
LevelCompleteScene.prototype.constructor = LevelCompleteScene;

LevelCompleteScene.prototype.create = function() {
  const { width, height } = this.cameras.main;
  this.cameras.main.setBackgroundColor('#1a1a2e');

  const completedLevel = (this.registry.get('currentLevel') || 2) - 1;
  const nextLevel = completedLevel + 1;

  this.add.text(width / 2, 150, 'LEVEL ' + completedLevel + ' COMPLETE!', {
    fontSize: '40px',
    fontFamily: 'monospace',
    color: '#00ff88',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  const kiro = this.add.image(width / 2, 280, 'kiro').setScale(2.5);
  this.tweens.add({
    targets: kiro,
    y: 300,
    duration: 800,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  this.add.text(width / 2, 380, 'Get ready for Level ' + nextLevel + '...', {
    fontSize: '18px',
    fontFamily: 'monospace',
    color: '#aaaacc'
  }).setOrigin(0.5);

  if (nextLevel > LEVELS.length) {
    this.add.text(width / 2, 420, '(Levels repeat faster now!)', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#ffcc00'
    }).setOrigin(0.5);
  }

  const continueText = this.add.text(width / 2, 500, '[ PRESS SPACE TO CONTINUE ]', {
    fontSize: '20px',
    fontFamily: 'monospace',
    color: '#00ffcc',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  this.tweens.add({
    targets: continueText,
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

// --- GAME OVER SCENE ---
function GameOverScene() {
  Phaser.Scene.call(this, { key: 'GameOverScene' });
}
GameOverScene.prototype = Object.create(Phaser.Scene.prototype);
GameOverScene.prototype.constructor = GameOverScene;

GameOverScene.prototype.create = function() {
  const { width, height } = this.cameras.main;
  this.cameras.main.setBackgroundColor('#1a1a2e');

  const finalLevel = this.registry.get('finalLevel') || 1;

  // Save best level
  const bestLevel = Math.max(
    parseInt(localStorage.getItem('kiro_bestlevel') || '0'),
    finalLevel
  );
  localStorage.setItem('kiro_bestlevel', bestLevel.toString());

  this.add.text(width / 2, 100, 'GAME OVER', {
    fontSize: '56px',
    fontFamily: 'monospace',
    color: '#ff4444',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  const deadKiro = this.add.image(width / 2, 220, 'kiro').setScale(2.5);
  deadKiro.setTint(0x666666);
  this.tweens.add({
    targets: deadKiro,
    angle: 360,
    duration: 2000,
    repeat: -1
  });

  this.add.text(width / 2, 320, 'Squashed on Level ' + finalLevel, {
    fontSize: '28px',
    fontFamily: 'monospace',
    color: '#ff6666'
  }).setOrigin(0.5);

  this.add.text(width / 2, 370, 'Best: Level ' + bestLevel, {
    fontSize: '20px',
    fontFamily: 'monospace',
    color: '#ffcc00'
  }).setOrigin(0.5);

  const message = finalLevel >= 5 ? 'So close to mastering the bugs!' :
    finalLevel >= 3 ? 'Getting better!' :
      'Keep trying, you got this!';

  this.add.text(width / 2, 420, message, {
    fontSize: '16px',
    fontFamily: 'monospace',
    color: '#667788',
    fontStyle: 'italic'
  }).setOrigin(0.5);

  const restartText = this.add.text(width / 2, 520, '[ PRESS SPACE TO TRY AGAIN ]', {
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
    this.registry.set('currentLevel', 1);
    this.scene.start('GameScene');
  });
  this.input.keyboard.once('keydown-ENTER', () => {
    this.registry.set('currentLevel', 1);
    this.scene.start('GameScene');
  });
};

// --- START THE GAME ---
const game = new Phaser.Game(config);
