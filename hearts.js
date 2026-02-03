
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

let hearts = [];
const colors = ["#e63946", "#ff6b6b", "#ff9a9e", "#fad0c4"];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createHeart() {
  const size = Math.random() * 20 + 10;
  hearts.push({
    x: Math.random() * canvas.width,
    y: canvas.height + size,
    size: size,
    speed: Math.random() * 2 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: Math.random() * 0.5 + 0.5
  });
}

function drawHeart(x, y, size, color, opacity) {
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y - size/2, x - size, y - size/2, x - size, y);
  ctx.bezierCurveTo(x - size, y + size/2, x, y + size/1.5, x, y + size);
  ctx.bezierCurveTo(x, y + size/1.5, x + size, y + size/2, x + size, y);
  ctx.bezierCurveTo(x + size, y - size/2, x, y - size/2, x, y);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // add new hearts occasionally
  if (Math.random() < 0.5) createHeart();

  for (let i = 0; i < hearts.length; i++) {
    const h = hearts[i];
    h.y -= h.speed;
    drawHeart(h.x, h.y, h.size, h.color, h.opacity);

    if (h.y + h.size < 0) {
      hearts.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

animate();

