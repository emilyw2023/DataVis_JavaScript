const scene = document.getElementById("bg");
const items = Array.from(document.querySelectorAll(".scene-item"));
const targetSelect = document.getElementById("target-select");
const widthInput = document.getElementById("size-width");
const heightInput = document.getElementById("size-height");
const scaleInput = document.getElementById("scale-control");
const skewXInput = document.getElementById("skew-x");
const skewYInput = document.getElementById("skew-y");
const posXInput = document.getElementById("pos-x");
const posYInput = document.getElementById("pos-y");

const state = {
  sun: { x: 40, y: 30, width: 120, height: 120, scale: 1, skewX: 0, skewY: 0, color: "#ffffff" },
  tree: { x: 230, y: 120, width: 220, height: 260, scale: 1, skewX: 0, skewY: 0, color: "#ffffff" },
  bottle: { x: 160, y: 240, width: 70, height: 120, scale: 1, skewX: 0, skewY: 0, color: "#ffffff" },
  grass: { x: 110, y: 310, width: 300, height: 150, scale: 1, skewX: 0, skewY: 0, color: "#ffffff" }
};

const itemMap = {};
items.forEach((item) => {
  itemMap[item.dataset.name] = item;
});

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function syncControls() {
  const selected = targetSelect.value;
  const current = state[selected];

  widthInput.value = current.width;
  heightInput.value = current.height;
  scaleInput.value = current.scale;
  skewXInput.value = current.skewX;
  skewYInput.value = current.skewY;
  posXInput.value = current.x;
  posYInput.value = current.y;
}

function applyItemStyles(item) {
  const key = item.dataset.name;
  const current = state[key];

  item.style.width = `${current.width}px`;
  item.style.height = `${current.height}px`;
  item.style.left = `${current.x}px`;
  item.style.top = `${current.y}px`;
  item.style.transform = `scale(${current.scale}) skew(${current.skewX}deg, ${current.skewY}deg)`;

}

function renderAll() {
  Object.keys(itemMap).forEach((key) => applyItemStyles(itemMap[key]));
}

function setPosition(item, x, y) {
  const key = item.dataset.name;
  state[key].x = x;
  state[key].y = y;
  item.dataset.x = String(x);
  item.dataset.y = String(y);
  item.style.left = `${x}px`;
  item.style.top = `${y}px`;
  if (targetSelect.value === key) {
    posXInput.value = x;
    posYInput.value = y;
  }
}

items.forEach((item) => {
  const key = item.dataset.name;
  const start = state[key];
  item.dataset.x = String(start.x);
  item.dataset.y = String(start.y);
  item.style.cursor = "default";
  item.style.touchAction = "none";

  item.addEventListener("pointerdown", (event) => {
    event.preventDefault();
  });
});

scene.addEventListener("pointerdown", (event) => {
  event.preventDefault();
});

scene.addEventListener("pointermove", (event) => {
  event.preventDefault();
});

widthInput.addEventListener("input", (event) => {
  const selected = targetSelect.value;
  state[selected].width = Number(event.target.value);
  applyItemStyles(itemMap[selected]);
});

heightInput.addEventListener("input", (event) => {
  const selected = targetSelect.value;
  state[selected].height = Number(event.target.value);
  applyItemStyles(itemMap[selected]);
});

scaleInput.addEventListener("input", (event) => {
  const selected = targetSelect.value;
  state[selected].scale = Number(event.target.value);
  applyItemStyles(itemMap[selected]);
});

skewXInput.addEventListener("input", (event) => {
  const selected = targetSelect.value;
  state[selected].skewX = Number(event.target.value);
  applyItemStyles(itemMap[selected]);
});

skewYInput.addEventListener("input", (event) => {
  const selected = targetSelect.value;
  state[selected].skewY = Number(event.target.value);
  applyItemStyles(itemMap[selected]);
});

posXInput.addEventListener("input", (event) => {
  const selected = targetSelect.value;
  state[selected].x = Number(event.target.value);
  applyItemStyles(itemMap[selected]);
});

posYInput.addEventListener("input", (event) => {
  const selected = targetSelect.value;
  state[selected].y = Number(event.target.value);
  applyItemStyles(itemMap[selected]);
});

targetSelect.addEventListener("change", () => {
  syncControls();
});

renderAll();
syncControls();