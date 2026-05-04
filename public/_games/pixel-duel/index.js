//cria uma tela onde o nosso jogo irá rodar
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//define o tamanho da tela
canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7;
const startScreen = document.querySelector("#startScreen");
const startButton = document.querySelector("#startButton");
const resultText = document.querySelector("#resultText");
const timerElement = document.querySelector("#timer");
const playerScoreElement = document.querySelector("#playerScore");
const enemyScoreElement = document.querySelector("#enemyScore");
const modeInputs = document.querySelectorAll("input[name='gameMode']");
const timeInputs = document.querySelectorAll("input[name='roundTime']");
let gameStarted = false;
let animationStarted = false;
let roundOver = false;
let roundAction = null;
let menuAction = null;

const DEFAULT_ROUND_TIME = 30;
const playerSpawn = { x: 120, y: 0 };
const enemySpawn = { x: 820, y: 0 };
const score = {
  player: 0,
  enemy: 0,
};

const modeConfigs = {
  md3: { label: "MD3", targetWins: 2 },
  md5: { label: "MD5", targetWins: 3 },
  livre: { label: "Livre", targetWins: null },
};

let currentMode = "md3";
let currentRoundTime = DEFAULT_ROUND_TIME;

//preenche a tela, da posição x1,y1 até a posição x2,y2
c.fillRect(0, 0, canvas.width, canvas.height);

const shop = new Sprite({
  position: {
    x: 600,
    y: 128,
  },
  imageSrc: "./assets/shop.png",
  scale: 2.75,
  framesMax: 6,
});

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/background.png",
});

//cria um objeto player da classe Sprite
const player = new Fighter({
  position: {
    x: playerSpawn.x,
    y: playerSpawn.y,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "blue",
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/samuraiMack/Idle.png",
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157,
  },
  sprites: {
    idle: {
      imageSrc: "./assets/samuraiMack/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./assets/samuraiMack/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./assets/samuraiMack/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./assets/samuraiMack/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./assets/samuraiMack/Attack1.png",
      framesMax: 6,
    },
    takeHit: {
      imageSrc: "./assets/samuraiMack/Take Hit - white silhouette.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./assets/samuraiMack/Death.png",
      framesMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 160,
    height: 50,
  },
});
//cria um objeto enemy da classe Sprite
const enemy = new Fighter({
  position: {
    x: enemySpawn.x,
    y: enemySpawn.y,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "red",
  offset: {
    x: -50,
    y: 0,
  },
  imageSrc: "./assets/kenji/Idle.png",
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167,
  },
  sprites: {
    idle: {
      imageSrc: "./assets/kenji/Idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./assets/kenji/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./assets/kenji/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./assets/kenji/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./assets/kenji/Attack1.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./assets/kenji/Take hit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./assets/kenji/Death.png",
      framesMax: 7,
    },
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50,
    },
    width: 170,
    height: 50,
  },
});

//um objeto para controlar as teclas pressionadas
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

if (timerElement) {
  timerElement.innerHTML = String(currentRoundTime);
}

renderScore();

function updateHealthBar(selector, health) {
  const normalized = `${Math.max(0, Math.min(100, health))}%`;
  const element = document.querySelector(selector);

  if (!element) {
    return;
  }

  if (window.gsap && typeof window.gsap.to === "function") {
    window.gsap.to(selector, {
      width: normalized,
    });
    return;
  }

  element.style.width = normalized;
}

//função que roda em loop. Cada chamada dessa função é um frame do game
function animate() {
  //animate loop game
  window.requestAnimationFrame(animate);

  //a cada frame a tela é pintada de preto novamente e seu tamanho reniciado
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  //jogadores atualizados
  background.update();
  shop.update();
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0,0,canvas.width,canvas.height-94)
  player.update();
  enemy.update();

  //zera a velocidade x dos objetos
  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if (!gameStarted || roundOver) {
    return;
  }

  //movimento do player
  //verifica qual tecla está pressionada. Ela deve coincidir com a última tecla pressionada
  //para então gerar a velocidade no eixo X no personagem
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprit("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprit("run");
  } else {
    player.switchSprit("idle");
  }

  //jumpping player
  if (player.velocity.y < 0) {
    player.switchSprit("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprit("fall");
  }

  //movimento do enemy
  if (keys.ArrowLeft.pressed && enemy.lasKey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprit("run");
  } else if (keys.ArrowRight.pressed && enemy.lasKey === "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.switchSprit("run");
  } else {
    enemy.switchSprit("idle");
  }

  //jumping enemy
  if (enemy.velocity.y < 0) {
    enemy.switchSprit("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprit("fall");
  }

  //detectar colision
  //player attck
  if (
    rectangularCollision({ rectagle1: player, rectagle2: enemy }) &&
    player.isAttacking &&
    player.frameCurrent === 4
  ) {
    player.isAttacking = false;
    console.log("Atacando Player");
    enemy.takeHit();
    updateHealthBar("#enemyHealth", enemy.health);
  }

  //if player miss
  if (player.isAttacking && player.frameCurrent === 4) {
    player.isAttacking = false;
  }

  if (
    rectangularCollision({ rectagle1: enemy, rectagle2: player }) &&
    enemy.isAttacking &&
    enemy.frameCurrent === 2
  ) {
    enemy.isAttacking = false;
    console.log("Atacando Enemy");
    player.takeHit();
    updateHealthBar("#playerHealth", player.health);
  }

  //if enemy miss
  if (enemy.isAttacking && enemy.frameCurrent === 2) {
    enemy.isAttacking = false;
  }

  //end the game base on health
  if (enemy.health <= 0 || player.health <= 0) {
    if (player.health === enemy.health) {
      endRound("draw");
    } else if (player.health > enemy.health) {
      endRound("player");
    } else {
      endRound("enemy");
    }
  }
}

function startMatch() {
  if (gameStarted) {
    return;
  }

  const selectedMode = getSelectedMode();
  currentMode = modeConfigs[selectedMode] ? selectedMode : "md3";
  currentRoundTime = getSelectedRoundTime();

  gameStarted = true;
  if (startScreen) {
    startScreen.classList.add("hidden");
  }

  if (!animationStarted) {
    animationStarted = true;
    animate();
  }

  startSeries();
}

function getSelectedMode() {
  const checkedInput = document.querySelector("input[name='gameMode']:checked");
  return checkedInput ? checkedInput.value : "md3";
}

function getSelectedRoundTime() {
  const checkedInput = document.querySelector("input[name='roundTime']:checked");
  const parsed = Number(checkedInput ? checkedInput.value : DEFAULT_ROUND_TIME);

  if ([30, 60, 90].includes(parsed)) {
    return parsed;
  }

  return DEFAULT_ROUND_TIME;
}

function startSeries() {
  score.player = 0;
  score.enemy = 0;
  renderScore();
  resetRound();
}

function renderScore() {
  if (playerScoreElement) {
    playerScoreElement.textContent = String(score.player);
  }
  if (enemyScoreElement) {
    enemyScoreElement.textContent = String(score.enemy);
  }
}

function hideResultOverlay() {
  if (!resultText) {
    return;
  }

  resultText.style.display = "none";
  resultText.innerHTML = "";
  roundAction = null;
  menuAction = null;
}

function showResultOverlay(title, subtitle, buttonLabel, onAction, onMenuAction) {
  if (!resultText) {
    return;
  }

  resultText.style.display = "flex";
  resultText.innerHTML = `
    <div class="result-card">
      <p class="result-title">${title}</p>
      <p class="result-subtitle">${subtitle}</p>
      <div class="result-actions">
        <button id="playAgainButton" class="result-button" type="button">${buttonLabel}</button>
        <button id="backMenuButton" class="result-button result-button-secondary" type="button">Menu principal</button>
      </div>
    </div>
  `;

  roundAction = typeof onAction === "function" ? onAction : null;
  menuAction = typeof onMenuAction === "function" ? onMenuAction : null;

  const playAgainButton = document.querySelector("#playAgainButton");
  if (playAgainButton) {
    playAgainButton.addEventListener("click", () => {
      if (roundAction) {
        roundAction();
      }
    });
  }

  const backMenuButton = document.querySelector("#backMenuButton");
  if (backMenuButton) {
    backMenuButton.addEventListener("click", () => {
      if (menuAction) {
        menuAction();
      }
    });
  }
}

function resetFightersState() {
  keys.a.pressed = false;
  keys.d.pressed = false;
  keys.ArrowLeft.pressed = false;
  keys.ArrowRight.pressed = false;

  player.position.x = playerSpawn.x;
  player.position.y = playerSpawn.y;
  player.velocity.x = 0;
  player.velocity.y = 0;
  player.lastKey = "d";
  player.health = 100;
  player.dead = false;
  player.isAttacking = false;
  player.image = player.sprites.idle.image;
  player.framesMax = player.sprites.idle.framesMax;
  player.frameCurrent = 0;
  player.framesElapsed = 0;

  enemy.position.x = enemySpawn.x;
  enemy.position.y = enemySpawn.y;
  enemy.velocity.x = 0;
  enemy.velocity.y = 0;
  enemy.lasKey = "ArrowLeft";
  enemy.health = 100;
  enemy.dead = false;
  enemy.isAttacking = false;
  enemy.image = enemy.sprites.idle.image;
  enemy.framesMax = enemy.sprites.idle.framesMax;
  enemy.frameCurrent = 0;
  enemy.framesElapsed = 0;

  updateHealthBar("#playerHealth", player.health);
  updateHealthBar("#enemyHealth", enemy.health);
}

function resetRound() {
  roundOver = false;

  stopTimer();
  resetTimer(currentRoundTime);

  if (timerElement) {
    timerElement.innerHTML = String(currentRoundTime);
  }

  hideResultOverlay();
  resetFightersState();

  startTimer((timeLeft) => {
    if (timerElement) {
      timerElement.innerHTML = String(timeLeft);
    }
  }, () => {
    if (player.health === enemy.health) {
      endRound("draw");
    } else if (player.health > enemy.health) {
      endRound("player");
    } else {
      endRound("enemy");
    }
  });
}

function backToMainMenu() {
  stopTimer();
  hideResultOverlay();

  gameStarted = false;
  roundOver = false;

  currentRoundTime = getSelectedRoundTime();
  resetTimer(currentRoundTime);
  if (timerElement) {
    timerElement.innerHTML = String(currentRoundTime);
  }

  score.player = 0;
  score.enemy = 0;
  renderScore();

  resetFightersState();

  if (startScreen) {
    startScreen.classList.remove("hidden");
  }
}

function endRound(winner) {
  if (roundOver) {
    return;
  }

  roundOver = true;
  stopTimer();

  let title = "Empate";

  if (winner === "player") {
    score.player += 1;
    title = "Jogador 1 venceu a rodada";
  } else if (winner === "enemy") {
    score.enemy += 1;
    title = "Jogador 2 venceu a rodada";
  }

  renderScore();

  const modeConfig = modeConfigs[currentMode];
  const hasSeriesLimit = modeConfig && modeConfig.targetWins !== null;

  if (hasSeriesLimit && (score.player >= modeConfig.targetWins || score.enemy >= modeConfig.targetWins)) {
    const champion = score.player > score.enemy ? "Jogador 1" : "Jogador 2";
    const finalTitle = `${champion} venceu a série ${modeConfig.label}`;
    const finalSubtitle = `Placar final: ${score.player} x ${score.enemy}. Querem começar outra série?`;
    showResultOverlay(finalTitle, finalSubtitle, "Nova série", startSeries, backToMainMenu);
    return;
  }

  const subtitle = `Modo ${modeConfig.label} - Placar: ${score.player} x ${score.enemy}. Querem jogar de novo?`;
  showResultOverlay(title, subtitle, "Jogar de novo", resetRound, backToMainMenu);
}

if (modeInputs && modeInputs.length > 0) {
  modeInputs.forEach((input) => {
    input.addEventListener("change", (event) => {
      const target = event.target;
      if (target && target.value && modeConfigs[target.value]) {
        currentMode = target.value;
      }
    });
  });
}

if (timeInputs && timeInputs.length > 0) {
  timeInputs.forEach((input) => {
    input.addEventListener("change", (event) => {
      const target = event.target;
      const parsed = Number(target && target.value ? target.value : DEFAULT_ROUND_TIME);
      if ([30, 60, 90].includes(parsed)) {
        currentRoundTime = parsed;
      }
    });
  });
}

if (startButton) {
  startButton.addEventListener("click", startMatch);
}

//evento que fica escutando quais teclas são pressionadas
window.addEventListener("keydown", (event) => {
  if (!gameStarted) {
    if (event.key === "Enter") {
      startMatch();
    }
    return;
  }

  if (roundOver) {
    if (event.key === "Enter") {
      if (roundAction) {
        roundAction();
      }
    }
    return;
  }

  // console.log(event.key)
  if (!player.dead) {
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        player.velocity.y = -20;
        break;
      case " ":
        player.attack();
        break;
    }
  }
  if (!enemy.dead) {
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lasKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lasKey = "ArrowLeft";
        break;
      case "ArrowUp":
        enemy.velocity.y = -20;
        break;
      case "ArrowDown":
        enemy.attack();
        break;
    }
  }
});

//evento que escuta quais teclas deixam de ser pressionadas
//para o personagem não ficar andando para sempre, mesmo após parar de clicar
window.addEventListener("keyup", (event) => {
  if (!gameStarted) {
    return;
  }

  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }

  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
