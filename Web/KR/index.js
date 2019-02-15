const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const score_element = document.getElementById("score");
const level_element = document.getElementById("level");
const username_element = document.getElementById("username");

var gameManager = new GameManager();
var mapManager = new MapManager();
var physicManager = new PhysicManager();
var spriteManager = new SpriteManager();
var eventManager = new EventManager();
var scoreTable = new ScoreTable();
var soundManager = new SoundManager();
var ANIM;
var step = 1 / 20, counter = 0, dt = 0, now, last = timestamp();
// ******************************************
window.onload = function () {
    show_element(document.getElementById("login"));
    document.getElementById("login_username").value = read_username();
    scoreTable.update_table();
};

// Начать игру
document.getElementById('login_form').addEventListener('submit', function(event) {
    event.preventDefault();
    store_username(document.getElementById("login_username").value);
    hide_element(document.getElementById("left_column"));
    hide_element(document.getElementById("right_column"));
    show_element(document.getElementById("game"));
    username_element.innerText = read_username();
    gameManager.play();
});

// Новая игра
document.getElementById('new_game').addEventListener('click', function(event) {
    event.preventDefault();
    hide_element(document.getElementById("game_over"));
    location.reload();
});

// Конец игры (поражение)
function lose_game() {
    hide_element(document.getElementById("game"));
    document.getElementById("current_result").innerText = score;
    scoreTable.store_record(localStorage["univer.username"], score);
    scoreTable.update_table();
    show_element(document.getElementById("game_over"));
}

// Конец игры (победа)
function win_game() {
    hide_element(document.getElementById("game"));
    document.getElementById("current_result").innerText = score;
    scoreTable.store_record(localStorage["univer.username"], score);
    scoreTable.update_table();
    show_element(document.getElementById("game_over"));
}

// -----------------------------------------------------------------------------
// Скрыть элемент
function hide_element(element) {
    element.style.display = 'none';
}

// Показать элемент
function show_element(element) {
    element.style.display = 'block';
}

// Сохранение имени пользователя
function store_username(username) {
    localStorage["univer.username"] = username;
}

// Автоввод последнего использованного имени
function read_username() {
    if (localStorage['univer.username'] != undefined) {
        return localStorage['univer.username'];
    }
}
