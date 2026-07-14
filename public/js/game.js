// KIRO - Route To Prod
// Reach the end of each level without getting hit!

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  dom: {
    createContainer: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 900 },
      debug: false
    }
  },
  scene: [BootScene, NameEntryScene, MenuScene, GameScene, LevelCompleteScene, VictoryScene, GameOverScene]
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

  // PROD goal texture (green server/rocket icon)
  const flagGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  // Server box
  flagGraphics.fillStyle(0x00cc66, 1);
  flagGraphics.fillRoundedRect(2, 10, 36, 40, 4);
  flagGraphics.fillStyle(0x00ff88, 1);
  flagGraphics.fillRoundedRect(6, 14, 28, 10, 2);
  flagGraphics.fillRoundedRect(6, 28, 28, 10, 2);
  // Blinking lights
  flagGraphics.fillStyle(0xffffff, 1);
  flagGraphics.fillCircle(12, 19, 2);
  flagGraphics.fillCircle(12, 33, 2);
  flagGraphics.fillStyle(0x00ff00, 1);
  flagGraphics.fillCircle(28, 19, 2);
  flagGraphics.fillCircle(28, 33, 2);
  // PROD label at top
  flagGraphics.fillStyle(0x00ff88, 1);
  flagGraphics.fillRoundedRect(4, 0, 32, 10, 2);
  flagGraphics.generateTexture('flag', 40, 52);
  flagGraphics.destroy();

  // DEV start marker texture (blue terminal icon)
  const devGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  devGraphics.fillStyle(0x3498db, 1);
  devGraphics.fillRoundedRect(0, 5, 40, 35, 4);
  devGraphics.fillStyle(0x1a1a2e, 1);
  devGraphics.fillRoundedRect(3, 8, 34, 29, 3);
  // Terminal prompt >_
  devGraphics.fillStyle(0x00ff00, 1);
  devGraphics.fillTriangle(8, 18, 8, 26, 14, 22);
  devGraphics.fillRect(16, 24, 12, 2);
  // DEV label at top
  devGraphics.fillStyle(0x3498db, 1);
  devGraphics.fillRoundedRect(4, 0, 32, 10, 2);
  devGraphics.generateTexture('devMarker', 40, 42);
  devGraphics.destroy();

  // Checkpoint - Server Backup power-up
  const cpGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  // Server box (smaller, glowing)
  cpGraphics.fillStyle(0x00aaff, 1);
  cpGraphics.fillRoundedRect(4, 8, 32, 30, 4);
  cpGraphics.fillStyle(0x0088dd, 1);
  cpGraphics.fillRoundedRect(8, 12, 24, 10, 2);
  cpGraphics.fillRoundedRect(8, 25, 24, 10, 2);
  // Blinking lights
  cpGraphics.fillStyle(0x00ff00, 1);
  cpGraphics.fillCircle(14, 17, 2);
  cpGraphics.fillCircle(14, 30, 2);
  cpGraphics.fillStyle(0xffff00, 1);
  cpGraphics.fillCircle(26, 17, 2);
  cpGraphics.fillCircle(26, 30, 2);
  // Save icon (floppy disk shape at top)
  cpGraphics.fillStyle(0xffffff, 1);
  cpGraphics.fillRect(14, 0, 12, 8);
  cpGraphics.fillStyle(0x00aaff, 1);
  cpGraphics.fillRect(17, 1, 6, 5);
  cpGraphics.generateTexture('checkpoint', 40, 40);
  cpGraphics.destroy();

  // Woman sprite ("test") - dark hair, name tag
  const womanGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  // Body/dress
  womanGraphics.fillStyle(0x2255aa, 1);
  womanGraphics.fillTriangle(20, 28, 8, 60, 32, 60);
  // Arms
  womanGraphics.lineStyle(3, 0xf5c6a0, 1);
  womanGraphics.lineBetween(12, 34, 4, 48);
  womanGraphics.lineBetween(28, 34, 36, 48);
  // Head
  womanGraphics.fillStyle(0xf5c6a0, 1);
  womanGraphics.fillCircle(20, 16, 12);
  // Dark hair
  womanGraphics.fillStyle(0x1a1a1a, 1);
  womanGraphics.fillRoundedRect(9, 4, 22, 16, { tl: 11, tr: 11, bl: 0, br: 0 });
  womanGraphics.fillRect(8, 10, 4, 12);
  womanGraphics.fillRect(28, 10, 4, 12);
  // Eyes
  womanGraphics.fillStyle(0x000000, 1);
  womanGraphics.fillCircle(16, 17, 2);
  womanGraphics.fillCircle(24, 17, 2);
  // Smirk
  womanGraphics.lineStyle(1.5, 0x000000, 1);
  womanGraphics.lineBetween(17, 23, 24, 22);
  // Name tag
  womanGraphics.fillStyle(0xffffff, 1);
  womanGraphics.fillRect(10, 30, 20, 10);
  womanGraphics.fillStyle(0xff0000, 1);
  womanGraphics.fillRect(10, 30, 20, 3);
  womanGraphics.generateTexture('woman', 40, 62);
  womanGraphics.destroy();

  // Doubt ball
  const doubtGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  doubtGraphics.fillStyle(0x555588, 1);
  doubtGraphics.fillCircle(14, 14, 14);
  doubtGraphics.fillStyle(0x8888bb, 0.5);
  doubtGraphics.fillCircle(10, 10, 6);
  doubtGraphics.generateTexture('doubt', 28, 28);
  doubtGraphics.destroy();

  // Shade ball
  const shadeGraphics = this.make.graphics({ x: 0, y: 0, add: false });
  shadeGraphics.fillStyle(0x222222, 1);
  shadeGraphics.fillCircle(14, 14, 14);
  shadeGraphics.fillStyle(0x444444, 0.5);
  shadeGraphics.fillCircle(10, 10, 6);
  shadeGraphics.generateTexture('shade', 28, 28);
  shadeGraphics.destroy();

  this.scene.start('NameEntryScene');
};

// --- NAME ENTRY SCENE ---
function NameEntryScene() {
  Phaser.Scene.call(this, { key: 'NameEntryScene' });
}
NameEntryScene.prototype = Object.create(Phaser.Scene.prototype);
NameEntryScene.prototype.constructor = NameEntryScene;

NameEntryScene.prototype.create = function() {
  const { width, height } = this.cameras.main;
  this.cameras.main.setBackgroundColor('#1a1a2e');

  this.add.text(width / 2, 80, 'KIRO - ROUTE TO PROD', {
    fontSize: '42px',
    fontFamily: 'monospace',
    color: '#9b59b6',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  // Ghost preview (will change color)
  this.ghostPreview = this.add.image(width / 2, 180, 'kiro').setScale(2.2);

  this.add.text(width / 2, 250, 'Enter your name:', {
    fontSize: '18px',
    fontFamily: 'monospace',
    color: '#aaaacc'
  }).setOrigin(0.5);

  // Name input box
  this.add.dom(width / 2, 290).createFromHTML(
    '<input type="text" id="nameInput" maxlength="15" placeholder="Your name..." ' +
    'style="font-size:18px; padding:8px 16px; border:2px solid #9b59b6; ' +
    'border-radius:6px; background:#2a2a4e; color:#ffffff; text-align:center; ' +
    'font-family:monospace; outline:none; width:240px;">'
  );

  // Color picker
  this.add.text(width / 2, 340, 'Choose ghost colour:', {
    fontSize: '18px',
    fontFamily: 'monospace',
    color: '#aaaacc'
  }).setOrigin(0.5);

  const colors = [
    { name: 'Purple', hex: 0x9b59b6 },
    { name: 'Teal', hex: 0x00d4aa },
    { name: 'Blue', hex: 0x3498db },
    { name: 'Pink', hex: 0xe91e8a },
    { name: 'Orange', hex: 0xf39c12 },
    { name: 'Red', hex: 0xe74c3c },
    { name: 'Green', hex: 0x2ecc71 },
    { name: 'Yellow', hex: 0xf1c40f }
  ];

  this.selectedColor = 0x9b59b6;
  const startX = width / 2 - (colors.length * 44) / 2 + 22;

  colors.forEach((c, i) => {
    const swatch = this.add.circle(startX + i * 44, 390, 16, c.hex)
      .setInteractive({ useHandCursor: true })
      .setStrokeStyle(3, 0x333333);

    swatch.on('pointerdown', () => {
      this.selectedColor = c.hex;
      this.ghostPreview.setTint(c.hex);
      // Reset all borders, highlight selected
      colors.forEach((_, j) => {
        const otherSwatch = this.children.list.filter(
          child => child.type === 'Arc'
        )[j];
        if (otherSwatch) otherSwatch.setStrokeStyle(3, 0x333333);
      });
      swatch.setStrokeStyle(3, 0xffffff);
    });

    // Default selection highlight for purple
    if (i === 0) swatch.setStrokeStyle(3, 0xffffff);
  });

  const goText = this.add.text(width / 2, 470, '[ PRESS ENTER TO PLAY ]', {
    fontSize: '20px',
    fontFamily: 'monospace',
    color: '#00ffcc',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  this.tweens.add({
    targets: goText,
    alpha: 0.3,
    duration: 800,
    yoyo: true,
    repeat: -1
  });

  // Competitive mode toggle (auto-ticked)
  this.competitive = true;
  const checkBox = this.add.text(width / 2 - 100, 430, '☑', {
    fontSize: '22px',
    fontFamily: 'monospace',
    color: '#ffcc00'
  }).setInteractive({ useHandCursor: true });

  const compLabel = this.add.text(width / 2 - 75, 433, 'Competitive Mode (timed + leaderboard)', {
    fontSize: '12px',
    fontFamily: 'monospace',
    color: '#ffcc00'
  });

  checkBox.on('pointerdown', () => {
    this.competitive = !this.competitive;
    checkBox.setText(this.competitive ? '☑' : '☐');
    compLabel.setColor(this.competitive ? '#ffcc00' : '#667788');
  });

  this.add.text(width / 2, 550, 'Other players will appear as ghosts!', {
    fontSize: '14px',
    fontFamily: 'monospace',
    color: '#667788'
  }).setOrigin(0.5);

  // Listen for Enter key
  this.input.keyboard.on('keydown-ENTER', () => {
    const input = document.getElementById('nameInput');
    const name = (input && input.value.trim()) || 'Ghost';
    this.registry.set('playerName', name);
    this.registry.set('playerColor', this.selectedColor);
    this.registry.set('competitive', this.competitive);

    // Connect to Socket.io
    const socket = io();
    this.registry.set('socket', socket);
    socket.emit('playerJoin', { name: name, color: this.selectedColor });

    this.scene.start('MenuScene');
  });
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

  this.add.text(width / 2, 60, 'KIRO - ROUTE TO PROD', {
    fontSize: '42px',
    fontFamily: 'monospace',
    color: '#9b59b6',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  const kiro = this.add.image(180, 180, 'kiro').setScale(2.5);
  this.tweens.add({
    targets: kiro,
    y: 195,
    duration: 1000,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  this.add.text(180, 260, 'Get Kiro from DEV to PROD!\nAvoid bugs & manager shade\nONE HIT = GAME OVER', {
    fontSize: '12px',
    fontFamily: 'monospace',
    color: '#aaaacc',
    align: 'center'
  }).setOrigin(0.5);

  this.add.text(180, 320, 'Arrow Keys / WASD to move\nSPACE or UP to jump', {
    fontSize: '11px',
    fontFamily: 'monospace',
    color: '#667788',
    align: 'center'
  }).setOrigin(0.5);

  // Leaderboard on the right
  this.add.text(580, 110, '🏆 LEADERBOARD', {
    fontSize: '18px',
    fontFamily: 'monospace',
    color: '#ffcc00',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  // Request leaderboard from server
  const socket = this.registry.get('socket');
  if (socket) {
    socket.on('leaderboard', (entries) => {
      if (entries.length === 0) {
        this.add.text(580, 150, 'No entries yet!\nBe the first to compete!', {
          fontSize: '12px',
          fontFamily: 'monospace',
          color: '#667788',
          align: 'center'
        }).setOrigin(0.5);
      } else {
        const top10 = entries.slice(0, 10);
        top10.forEach((entry, i) => {
          const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1) + '.';
          const text = medal + ' ' + entry.name + ' - ' + entry.time.toFixed(2) + 's';
          this.add.text(580, 140 + i * 24, text, {
            fontSize: '13px',
            fontFamily: 'monospace',
            color: i < 3 ? '#ffcc00' : '#aaaacc'
          }).setOrigin(0.5);
        });
      }
    });
    socket.emit('getLeaderboard');
  } else {
    this.add.text(580, 150, 'Connecting...', {
      fontSize: '12px',
      fontFamily: 'monospace',
      color: '#667788'
    }).setOrigin(0.5);
  }

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

  // Show mode
  const isCompetitive = this.registry.get('competitive');
  this.add.text(width / 2, 560, isCompetitive ? '⚡ Competitive Mode' : '☕ Casual Mode', {
    fontSize: '13px',
    fontFamily: 'monospace',
    color: isCompetitive ? '#ffcc00' : '#667788'
  }).setOrigin(0.5);

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
  { // Level 2 - One very slow bug, wide platforms
    platforms: [
      { x: 180, y: 470, type: 'platform' },
      { x: 400, y: 420, type: 'platform' },
      { x: 620, y: 370, type: 'platform' },
      { x: 750, y: 310, type: 'platform' }
    ],
    bugs: [
      { x: 400, y: 380, vx: 25, vy: 0, bounceX: true, rangeX: [330, 470] }
    ],
    playerStart: { x: 60, y: 520 },
    flagPos: { x: 750, y: 265 }
  },
  { // Level 3 - Two slow bugs, generous platforms
    platforms: [
      { x: 150, y: 470, type: 'platform' },
      { x: 350, y: 420, type: 'platform' },
      { x: 550, y: 370, type: 'platform' },
      { x: 720, y: 310, type: 'platform' }
    ],
    bugs: [
      { x: 350, y: 380, vx: 30, vy: 0, bounceX: true, rangeX: [280, 420] },
      { x: 600, y: 330, vx: 25, vy: 0, bounceX: true, rangeX: [540, 680] }
    ],
    playerStart: { x: 60, y: 520 },
    flagPos: { x: 750, y: 265 }
  },
  { // Level 4 - Three bugs, still wide platforms
    platforms: [
      { x: 150, y: 470, type: 'platform' },
      { x: 350, y: 420, type: 'platform' },
      { x: 550, y: 370, type: 'platform' },
      { x: 450, y: 310, type: 'platform' },
      { x: 700, y: 310, type: 'platform' }
    ],
    bugs: [
      { x: 350, y: 380, vx: 35, vy: 0, bounceX: true, rangeX: [280, 420] },
      { x: 550, y: 330, vx: 30, vy: 0, bounceX: true, rangeX: [480, 620] },
      { x: 450, y: 270, vx: 0, vy: 30, bounceY: true, rangeY: [240, 310] }
    ],
    checkpoint: { x: 350, y: 390 },
    playerStart: { x: 60, y: 520 },
    flagPos: { x: 730, y: 265 }
  },
  { // Level 5 - BOSS: Managers throw doubt and shade
    platforms: [
      { x: 150, y: 470, type: 'platform' },
      { x: 350, y: 420, type: 'platform' },
      { x: 550, y: 370, type: 'platform' },
      { x: 720, y: 310, type: 'platform' }
    ],
    bugs: [],
    bossLevel: true,
    playerStart: { x: 60, y: 520 },
    flagPos: { x: 750, y: 265 }
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
  this.isCompetitive = this.registry.get('competitive') || false;

  // Start timer on level 1
  if (this.currentLevel === 1) {
    this.registry.set('startTime', Date.now());
  }

  const levelIndex = this.currentLevel - 1;
  const levelData = LEVELS[levelIndex];

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

  // DEV start marker
  this.add.image(levelData.playerStart.x, levelData.playerStart.y - 30, 'devMarker');
  this.add.text(levelData.playerStart.x, levelData.playerStart.y - 55, 'DEV', {
    fontSize: '11px',
    fontFamily: 'monospace',
    color: '#3498db',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  // PROD goal
  this.flag = this.physics.add.staticSprite(levelData.flagPos.x, levelData.flagPos.y, 'flag');
  this.add.text(levelData.flagPos.x, levelData.flagPos.y - 32, 'PROD', {
    fontSize: '11px',
    fontFamily: 'monospace',
    color: '#00ff88',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  // Checkpoint (server backup power-up)
  this.checkpointActivated = false;
  this.respawnPoint = { x: levelData.playerStart.x, y: levelData.playerStart.y };
  if (levelData.checkpoint) {
    this.checkpointSprite = this.physics.add.staticSprite(levelData.checkpoint.x, levelData.checkpoint.y - 20, 'checkpoint');
    this.checkpointLabel = this.add.text(levelData.checkpoint.x, levelData.checkpoint.y - 48, '💾 SERVER BACKUP', {
      fontSize: '10px',
      fontFamily: 'monospace',
      color: '#00aaff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    // Glow effect
    this.tweens.add({
      targets: this.checkpointSprite,
      alpha: 0.5,
      duration: 800,
      yoyo: true,
      repeat: -1
    });
    this.physics.add.overlap(this.player, this.checkpointSprite, this.activateCheckpoint, null, this);
  }

  // Bugs (patrol patterns)
  this.bugs = this.physics.add.group({ allowGravity: false });
  levelData.bugs.forEach(b => {
    const bug = this.bugs.create(b.x, b.y, 'bug');
    bug.setData('originX', b.x);
    bug.setData('originY', b.y);
    bug.setData('vx', b.vx);
    bug.setData('vy', b.vy);
    bug.setData('bounceX', b.bounceX || false);
    bug.setData('bounceY', b.bounceY || false);
    bug.setData('rangeX', b.rangeX || null);
    bug.setData('rangeY', b.rangeY || null);
    bug.setData('dirX', 1);
    bug.setData('dirY', 1);
    bug.body.setAllowGravity(false);
  });

  // Projectiles group (for doubt/shade balls)
  this.projectiles = this.physics.add.group({ allowGravity: true });

  // Boss level - "test" woman throws doubt and shade
  this.isBossLevel = levelData.bossLevel || false;
  if (this.isBossLevel) {
    // Woman sprite at top center
    this.woman = this.add.image(400, 40, 'woman').setScale(1.3);
    // Name tag text that follows her
    this.womanLabel = this.add.text(400, 75, 'Angela & Pranjal', {
      fontSize: '12px',
      fontFamily: 'monospace',
      color: '#ff0000',
      fontStyle: 'bold',
      backgroundColor: '#ffffff',
      padding: { x: 4, y: 2 }
    }).setOrigin(0.5);

    // Woman moves side to side very slowly
    this.tweens.add({
      targets: this.woman,
      x: 600,
      duration: 6000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    // Label follows via update loop

    // Throw balls on a timer - generous gap
    this.throwTimer = this.time.addEvent({
      delay: 2800,
      callback: this.throwBall,
      callbackScope: this,
      loop: true
    });
  }

  // Collisions
  this.physics.add.collider(this.player, this.ground);
  this.physics.add.collider(this.player, this.platforms);
  this.physics.add.collider(this.projectiles, this.ground, this.ballHitGround, null, this);
  this.physics.add.collider(this.projectiles, this.platforms, this.ballHitGround, null, this);
  this.physics.add.overlap(this.player, this.bugs, this.hitBug, null, this);
  this.physics.add.overlap(this.player, this.projectiles, this.hitBug, null, this);
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
  this.add.text(16, 16, 'Sprint ' + this.currentLevel, {
    fontSize: '24px',
    fontFamily: 'monospace',
    color: '#9b59b6',
    fontStyle: 'bold'
  });

  this.add.text(16, 48, 'Get to PROD! Avoid bugs & shade!', {
    fontSize: '12px',
    fontFamily: 'monospace',
    color: '#667788'
  });

  // Skip level button (hidden in competitive mode)
  if (!this.isCompetitive) {
    const skipBtn = this.add.text(784, 16, '[ SKIP >> ]', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#ffcc00',
      backgroundColor: '#333333',
      padding: { x: 6, y: 4 }
    }).setOrigin(1, 0).setInteractive({ useHandCursor: true });

    skipBtn.on('pointerover', () => skipBtn.setColor('#ffffff'));
    skipBtn.on('pointerout', () => skipBtn.setColor('#ffcc00'));
    skipBtn.on('pointerdown', () => {
      if (!this.isGameOver) {
        this.isGameOver = true;
        if (this.currentLevel >= LEVELS.length) {
          this.scene.start('VictoryScene');
        } else {
          this.registry.set('currentLevel', this.currentLevel + 1);
          this.scene.start('LevelCompleteScene');
        }
      }
    });
  }

  // Home button
  const homeBtn = this.add.text(784, this.isCompetitive ? 16 : 46, '[ HOME ]', {
    fontSize: '12px',
    fontFamily: 'monospace',
    color: '#aaaaaa',
    backgroundColor: '#333333',
    padding: { x: 6, y: 3 }
  }).setOrigin(1, 0).setInteractive({ useHandCursor: true });

  homeBtn.on('pointerover', () => homeBtn.setColor('#ffffff'));
  homeBtn.on('pointerout', () => homeBtn.setColor('#aaaaaa'));
  homeBtn.on('pointerdown', () => {
    this.scene.start('NameEntryScene');
  });

  // Timer display (competitive mode)
  if (this.isCompetitive) {
    this.timerText = this.add.text(400, 16, '⏱ 0.00s', {
      fontSize: '18px',
      fontFamily: 'monospace',
      color: '#ffcc00',
      fontStyle: 'bold'
    }).setOrigin(0.5, 0);
  }

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

  // --- MULTIPLAYER SETUP ---
  this.otherPlayers = {};
  this.playerName = this.registry.get('playerName') || 'Ghost';
  this.playerColor = this.registry.get('playerColor') || 0x9b59b6;
  this.socket = this.registry.get('socket');

  // Tint player ghost with chosen color
  this.player.setTint(this.playerColor);

  // Show own name above player
  const colorHex = '#' + this.playerColor.toString(16).padStart(6, '0');
  this.playerLabel = this.add.text(this.player.x, this.player.y - 30, this.playerName, {
    fontSize: '12px',
    fontFamily: 'monospace',
    color: '#ffffff',
    backgroundColor: colorHex,
    padding: { x: 4, y: 2 }
  }).setOrigin(0.5);

  if (this.socket) {
    // Receive current players already in the game
    this.socket.on('currentPlayers', (players) => {
      Object.values(players).forEach(p => {
        if (p.id !== this.socket.id && p.level === this.currentLevel) {
          this.addOtherPlayer(p);
        }
      });
    });

    // New player joined
    this.socket.on('playerJoined', (p) => {
      if (p.level === this.currentLevel) {
        this.addOtherPlayer(p);
      }
    });

    // Player moved
    this.socket.on('playerMoved', (p) => {
      if (p.level === this.currentLevel) {
        if (!this.otherPlayers[p.id]) {
          this.addOtherPlayer(p);
        }
        const op = this.otherPlayers[p.id];
        if (op) {
          op.sprite.x = p.x;
          op.sprite.y = p.y;
          op.sprite.setFlipX(p.flipX);
          op.label.x = p.x;
          op.label.y = p.y - 30;
          op.sprite.setAlpha(p.alive ? 0.6 : 0.2);
        }
      } else {
        // Player moved to different level, remove from view
        this.removeOtherPlayer(p.id);
      }
    });

    // Player died
    this.socket.on('playerDied', (id) => {
      if (this.otherPlayers[id]) {
        this.otherPlayers[id].sprite.setAlpha(0.2);
        this.otherPlayers[id].sprite.setTint(0xff0000);
      }
    });

    // Player restarted
    this.socket.on('playerRestarted', (p) => {
      this.removeOtherPlayer(p.id);
    });

    // Player left
    this.socket.on('playerLeft', (id) => {
      this.removeOtherPlayer(id);
    });

    // Player changed level
    this.socket.on('playerLevelChanged', (data) => {
      if (data.level !== this.currentLevel) {
        this.removeOtherPlayer(data.id);
      }
    });

    // Notify server of our level
    this.socket.emit('playerLevelChange', this.currentLevel);
  }
};

GameScene.prototype.addOtherPlayer = function(p) {
  if (this.otherPlayers[p.id]) return;
  const sprite = this.add.image(p.x, p.y, 'kiro').setAlpha(0.6).setFlipX(p.flipX);
  if (p.color) sprite.setTint(p.color);
  const colorHex = p.color ? '#' + p.color.toString(16).padStart(6, '0') : '#555577';
  const label = this.add.text(p.x, p.y - 30, p.name, {
    fontSize: '11px',
    fontFamily: 'monospace',
    color: '#ffffff',
    backgroundColor: colorHex,
    padding: { x: 3, y: 1 }
  }).setOrigin(0.5).setAlpha(0.8);
  this.otherPlayers[p.id] = { sprite, label };
};

GameScene.prototype.removeOtherPlayer = function(id) {
  if (this.otherPlayers[id]) {
    this.otherPlayers[id].sprite.destroy();
    this.otherPlayers[id].label.destroy();
    delete this.otherPlayers[id];
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

  // Update projectile labels to follow balls
  this.projectiles.getChildren().forEach(ball => {
    const lbl = ball.getData('label');
    if (lbl && lbl.active) {
      lbl.x = ball.x;
      lbl.y = ball.y - 20;
    }
  });

  // Update woman name tag to follow her
  if (this.isBossLevel && this.woman && this.womanLabel) {
    this.womanLabel.x = this.woman.x;
    this.womanLabel.y = this.woman.y + 35;
  }

  // Update own name label position
  if (this.playerLabel) {
    this.playerLabel.x = this.player.x;
    this.playerLabel.y = this.player.y - 30;
  }

  // Update timer display
  if (this.isCompetitive && this.timerText && !this.isGameOver) {
    const elapsed = ((Date.now() - this.registry.get('startTime')) / 1000).toFixed(2);
    this.timerText.setText('⏱ ' + elapsed + 's');
  }

  // Broadcast position to other players
  if (this.socket) {
    this.socket.emit('playerMove', {
      x: this.player.x,
      y: this.player.y,
      level: this.currentLevel,
      flipX: this.player.flipX,
      alive: !this.isGameOver
    });
  }
};

GameScene.prototype.hitBug = function(player, bug) {
  if (this.isGameOver) return;

  if (this.checkpointActivated) {
    // Respawn at checkpoint instead of game over
    this.cameras.main.shake(200, 0.015);
    player.setPosition(this.respawnPoint.x, this.respawnPoint.y);
    player.setVelocity(0, 0);
    // Brief invincibility flash
    this.isGameOver = true;
    player.setAlpha(0.3);
    this.time.delayedCall(800, () => {
      player.setAlpha(1);
      this.isGameOver = false;
    });
    // Checkpoint used up
    this.checkpointActivated = false;
    if (this.checkpointLabel) {
      this.checkpointLabel.setText('💾 USED');
      this.checkpointLabel.setColor('#666666');
    }
    return;
  }

  this.isGameOver = true;
  this.physics.pause();
  player.setTint(0xff0000);
  this.cameras.main.shake(300, 0.02);

  this.registry.set('finalLevel', this.currentLevel);

  // Notify server of death
  if (this.socket) {
    this.socket.emit('playerDied');
  }

  this.time.delayedCall(1200, () => {
    this.scene.start('GameOverScene');
  });
};

GameScene.prototype.activateCheckpoint = function(player, checkpoint) {
  if (this.checkpointActivated) return;
  this.checkpointActivated = true;
  this.respawnPoint = { x: checkpoint.x, y: checkpoint.y };

  // Visual feedback
  checkpoint.setTint(0x00ff00);
  this.tweens.killTweensOf(checkpoint);
  checkpoint.setAlpha(1);
  if (this.checkpointLabel) {
    this.checkpointLabel.setText('✅ SAVED!');
    this.checkpointLabel.setColor('#00ff00');
  }
  this.cameras.main.flash(200, 0, 170, 255);
};

GameScene.prototype.reachGoal = function(player, flag) {
  if (this.isGameOver) return;
  this.isGameOver = true;

  player.setTint(0x00ff88);
  this.cameras.main.flash(500, 0, 255, 136);

  if (this.currentLevel >= LEVELS.length) {
    // Completed all levels!
    this.time.delayedCall(1000, () => {
      this.scene.start('VictoryScene');
    });
  } else {
    this.registry.set('currentLevel', this.currentLevel + 1);
    this.time.delayedCall(1000, () => {
      this.scene.start('LevelCompleteScene');
    });
  }
};

GameScene.prototype.throwBall = function() {
  if (this.isGameOver || !this.isBossLevel) return;

  const isDoubt = Phaser.Math.Between(0, 1) === 0;
  const texture = isDoubt ? 'doubt' : 'shade';
  const label = isDoubt ? '💭 DOUBT' : '🕶️ SHADE';

  const ball = this.projectiles.create(this.woman.x, this.woman.y + 30, texture);
  ball.setBounce(0.4);
  ball.setCollideWorldBounds(true);

  // Aim roughly toward the player - VERY SLOW gentle lob
  const angle = Phaser.Math.Angle.Between(this.woman.x, this.woman.y, this.player.x, this.player.y);
  const speed = Phaser.Math.Between(60, 100);
  ball.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed + 20);
  ball.setAngularVelocity(Phaser.Math.Between(-80, 80));

  // Big obvious floating label on the ball
  const ballLabel = this.add.text(ball.x, ball.y - 20, label, {
    fontSize: '14px',
    fontFamily: 'monospace',
    color: isDoubt ? '#aaaaff' : '#888888',
    fontStyle: 'bold',
    backgroundColor: isDoubt ? '#222244' : '#111111',
    padding: { x: 4, y: 2 }
  }).setOrigin(0.5);
  ball.setData('label', ballLabel);

  // Clean up after a while
  this.time.delayedCall(8000, () => {
    if (ball && ball.active) {
      const lbl = ball.getData('label');
      if (lbl) lbl.destroy();
      ball.destroy();
    }
  });
};

GameScene.prototype.ballHitGround = function(ball) {
  // Destroy ball label and ball after hitting ground/platform a couple times
  this.time.delayedCall(2000, () => {
    if (ball && ball.active) {
      const lbl = ball.getData('label');
      if (lbl) lbl.destroy();
      ball.destroy();
    }
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

  this.add.text(width / 2, 150, 'DEPLOYED TO PROD!', {
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

  this.add.text(width / 2, 380, 'Sprint ' + nextLevel + ' starting...', {
    fontSize: '18px',
    fontFamily: 'monospace',
    color: '#aaaacc'
  }).setOrigin(0.5);


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

// --- VICTORY SCENE ---
function VictoryScene() {
  Phaser.Scene.call(this, { key: 'VictoryScene' });
}
VictoryScene.prototype = Object.create(Phaser.Scene.prototype);
VictoryScene.prototype.constructor = VictoryScene;

VictoryScene.prototype.create = function() {
  const { width, height } = this.cameras.main;
  this.cameras.main.setBackgroundColor('#1a1a2e');

  const isCompetitive = this.registry.get('competitive') || false;
  const playerName = this.registry.get('playerName') || 'Ghost';
  const playerColor = this.registry.get('playerColor') || 0x9b59b6;
  const startTime = this.registry.get('startTime') || 0;
  const finishTime = Date.now();
  const totalTime = ((finishTime - startTime) / 1000).toFixed(2);

  this.add.text(width / 2, 60, '🚀 SHIPPED TO PROD! 🚀', {
    fontSize: '36px',
    fontFamily: 'monospace',
    color: '#00ff88',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  const kiro = this.add.image(width / 2, 150, 'kiro').setScale(2.5);
  kiro.setTint(playerColor);
  this.tweens.add({
    targets: kiro,
    y: 165,
    duration: 600,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  this.add.text(width / 2, 220, playerName + ' made it to PROD!', {
    fontSize: '20px',
    fontFamily: 'monospace',
    color: '#ffffff'
  }).setOrigin(0.5);

  if (isCompetitive) {
    this.add.text(width / 2, 260, 'Time: ' + totalTime + 's', {
      fontSize: '28px',
      fontFamily: 'monospace',
      color: '#ffcc00',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Submit to leaderboard
    const socket = this.registry.get('socket');
    if (socket) {
      socket.emit('submitTime', { name: playerName, time: parseFloat(totalTime), color: playerColor });
      // Request leaderboard
      socket.on('leaderboard', (entries) => {
        this.showLeaderboard(entries);
      });
      socket.emit('getLeaderboard');
    }
  } else {
    this.add.text(width / 2, 260, 'Time: ' + totalTime + 's (casual mode)', {
      fontSize: '18px',
      fontFamily: 'monospace',
      color: '#667788'
    }).setOrigin(0.5);

    this.add.text(width / 2, 290, 'Play in competitive mode to join the leaderboard!', {
      fontSize: '12px',
      fontFamily: 'monospace',
      color: '#998800'
    }).setOrigin(0.5);
  }

  // Play again button
  const playAgain = this.add.text(width / 2, 540, '[ PLAY AGAIN ]', {
    fontSize: '18px',
    fontFamily: 'monospace',
    color: '#00ffcc',
    fontStyle: 'bold'
  }).setOrigin(0.5).setInteractive({ useHandCursor: true });

  playAgain.on('pointerover', () => playAgain.setColor('#ffffff'));
  playAgain.on('pointerout', () => playAgain.setColor('#00ffcc'));
  playAgain.on('pointerdown', () => {
    this.registry.set('currentLevel', 1);
    const socket = this.registry.get('socket');
    if (socket) socket.emit('playerRestart');
    this.scene.start('GameScene');
  });

  // Home button
  const homeBtn = this.add.text(width / 2, 575, '[ HOME ]', {
    fontSize: '14px',
    fontFamily: 'monospace',
    color: '#aaaaaa'
  }).setOrigin(0.5).setInteractive({ useHandCursor: true });

  homeBtn.on('pointerover', () => homeBtn.setColor('#ffffff'));
  homeBtn.on('pointerout', () => homeBtn.setColor('#aaaaaa'));
  homeBtn.on('pointerdown', () => {
    this.scene.start('NameEntryScene');
  });
};

VictoryScene.prototype.showLeaderboard = function(entries) {
  const { width } = this.cameras.main;

  this.add.text(width / 2, 320, '🏆 LEADERBOARD', {
    fontSize: '18px',
    fontFamily: 'monospace',
    color: '#ffcc00',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  const top10 = entries.slice(0, 10);
  top10.forEach((entry, i) => {
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '  ';
    const text = medal + ' ' + entry.name + ' - ' + entry.time.toFixed(2) + 's';
    this.add.text(width / 2, 350 + i * 20, text, {
      fontSize: '13px',
      fontFamily: 'monospace',
      color: i < 3 ? '#ffcc00' : '#aaaacc'
    }).setOrigin(0.5);
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

  this.add.text(width / 2, 100, 'BUILD FAILED', {
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

  this.add.text(width / 2, 320, 'Bug found in Sprint ' + finalLevel, {
    fontSize: '28px',
    fontFamily: 'monospace',
    color: '#ff6666'
  }).setOrigin(0.5);

  this.add.text(width / 2, 370, 'Best: Sprint ' + bestLevel, {
    fontSize: '20px',
    fontFamily: 'monospace',
    color: '#ffcc00'
  }).setOrigin(0.5);

  const message = finalLevel >= 5 ? 'The managers got you!' :
    finalLevel >= 3 ? 'Almost made it to prod!' :
      'Back to the backlog...';

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
    const socket = this.registry.get('socket');
    if (socket) socket.emit('playerRestart');
    this.scene.start('GameScene');
  });
  this.input.keyboard.once('keydown-ENTER', () => {
    this.registry.set('currentLevel', 1);
    const socket = this.registry.get('socket');
    if (socket) socket.emit('playerRestart');
    this.scene.start('GameScene');
  });
};

// --- START THE GAME ---
const game = new Phaser.Game(config);
