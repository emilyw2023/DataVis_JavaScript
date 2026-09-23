const scene = document.getElementById("bg");
const items = Array.from(document.querySelectorAll(".scene-item"));

const defaultPositions = {
  sun: { x: 40, y: 30 },
  tree: { x: 230, y: 120 },
  bottle: { x: 160, y: 240 },
  grass: { x: 110, y: 310 }
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setPosition(item, x, y) {
  item.dataset.x = String(x);
  item.dataset.y = String(y);
  item.style.left = `${x}px`;
  item.style.top = `${y}px`;
}

let activeItem = null;
let offsetX = 0;
let offsetY = 0;

function getScenePoint(event) {
  const rect = scene.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function updatePointerPosition(event) {
  if (!activeItem) return;

  const point = getScenePoint(event);
  const maxX = scene.clientWidth - activeItem.offsetWidth;
  const maxY = scene.clientHeight - activeItem.offsetHeight;

  const newX = clamp(point.x - offsetX, 0, maxX);
  const newY = clamp(point.y - offsetY, 0, maxY);

  setPosition(activeItem, newX, newY);
}

items.forEach((item) => {
  const key = item.dataset.name;
  const start = defaultPositions[key];
  setPosition(item, start.x, start.y);

  item.addEventListener("pointerdown", (event) => {
    activeItem = item;
    const point = getScenePoint(event);
    const x = Number(item.dataset.x || 0);
    const y = Number(item.dataset.y || 0);
    offsetX = point.x - x;
    offsetY = point.y - y;
    item.style.zIndex = "10";
    item.setPointerCapture(event.pointerId);
  });

  item.addEventListener("pointermove", updatePointerPosition);
  item.addEventListener("pointerup", () => {
    activeItem = null;
    item.style.zIndex = "1";
  });
  item.addEventListener("pointerleave", () => {
    if (activeItem === item) {
      activeItem = null;
      item.style.zIndex = "1";
    }
  });
});

scene.addEventListener("pointerup", () => {
  if (activeItem) {
    activeItem.style.zIndex = "1";
    activeItem = null;
  }
});

scene.addEventListener("pointermove", updatePointerPosition);