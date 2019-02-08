const canvas = document.getElementById("canvasId");
const ctx = canvas.getContext("2d");
const elem = document.getElementById('hBody');
const elem1 = document.getElementById('aResult');
const result = document.getElementById('result');

let nickname = "";

let ANIM;

const scoreTable = new ScoreTable();
const eventManager = new EventManager();
const gameManager = new GameManager();
const soundManager = new SoundManager();
const mapManager = new MapManager();
const spriteManager = new SpriteManager();
const physicManager = new PhysicManager();

var step = 1 / 20, counter = 0, dt = 0, now, last = timestamp();

window.onload = function () {
    document.getElementById("records").innerHTML = scoreTable.get();
};
