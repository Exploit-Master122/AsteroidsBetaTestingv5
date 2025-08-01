const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const shipImg = new Image();
const asteroidImg = new Image();
const bulletImg = new Image();
shipImg.src = "assets/images/ship.png";
asteroidImg.src = "assets/images/asteroid.png";
bulletImg.src = "assets/images/bullet.png";

let ship = { x: canvas.width / 2, y: canvas.height / 2, angle: 0 };
let bullets = [];
let keys = {};
let lastTime = 0;

document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

canvas.onclick = () => {
  canvas.requestPointerLock();
};

function update(dt) {
  if (keys["ArrowLeft"]) ship.angle -= 3 * dt;
  if (keys["ArrowRight"]) ship.angle += 3 * dt;
  if (keys["ArrowUp"]) {
    ship.x += Math.cos(ship.angle) * 200 * dt;
    ship.y += Math.sin(ship.angle) * 200 * dt;
  }
  if (keys["Space"]) {
    bullets.push({
      x: ship.x, y: ship.y,
      dx: Math.cos(ship.angle) * 400,
      dy: Math.sin(ship.angle) * 400
    });
  }
  bullets.forEach(b => {
    b.x += b.dx * dt;
    b.y += b.dy * dt;
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(ship.x, ship.y);
  ctx.rotate(ship.angle);
  ctx.drawImage(shipImg, -32, -32, 64, 64);
  ctx.restore();

  bullets.forEach(b => {
    ctx.drawImage(bulletImg, b.x - 4, b.y - 4, 8, 8);
  });
}

function loop(time) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  update(dt);
  draw();

  if (window.settings?.showFPS) {
    document.getElementById("fpsCounter").textContent = "FPS: " + (1 / dt).toFixed(0);
  } else {
    document.getElementById("fpsCounter").textContent = "";
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);