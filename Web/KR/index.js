const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const score_element = document.getElementById("score");
const level_element = document.getElementById("level");
const username_element = document.getElementById("username");
const login_username_element = document.getElementById("login_username");
const result_element = document.getElementById("current_result");
const congratulations_element = document.getElementById("congratulations");
// блоки
const game_element = document.getElementById("game");
const left_column_element = document.getElementById("left_column");
const right_column_element = document.getElementById("right_column");
const login_element = document.getElementById("login");
const game_over_element = document.getElementById("game_over");

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
    show_element(login_element);
    login_username_element.value = read_username();
    scoreTable.update_table();
};

// Начать игру
document.getElementById('login_form').addEventListener('submit', function(event) {
    event.preventDefault();
    store_username(login_username_element.value);
    hide_element(login_element);
    hide_element(left_column_element);
    hide_element(right_column_element);
    show_element(game_element);
    username_element.innerText = read_username();
    gameManager.play();
});

// Новая игра
document.getElementById('new_game').addEventListener('click', function(event) {
    event.preventDefault();
    hide_element(game_over_element);
    location.reload();
});

// Конец игры (поражение)
function lose_game(level, score) {
    hide_element(game_element);
    congratulations.innerText = "К сожалению вас отчислили с " + level + " курса";
    result_element.innerText = "Ваши очки: " + score;
    show_element(game_over_element);
    show_element(left_column_element);
    show_element(right_column_element);
}

// Конец игры (победа)
function win_game(score) {
    hide_element(game_element);
    congratulations.innerText = "Поздравляю! Вы окончили университет!";
    result_element.innerText = "Ваши очки: " + score;
    scoreTable.store_record(localStorage["univer.username"], score);
    scoreTable.update_table();
    show_element(game_over_element);
    show_element(left_column_element);
    show_element(right_column_element);
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
