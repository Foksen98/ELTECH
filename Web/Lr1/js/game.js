const board_cvs = document.getElementById("board");
const board_ctx = board_cvs.getContext("2d");
const next_figure_cvs = document.getElementById("next_figure");
const next_figure_ctx = next_figure_cvs.getContext("2d");
const score_element = document.getElementById("score");
const level_element = document.getElementById("level");

// Количество строк "Стакана"
const BOARD_ROW = 20;
// Количество столбцов "Стакана"
const BOARD_COL = 10;
// Количество строк поля для отображения следующей фигуры
const NEXT_FIGURE_ROW = 6;
// Количество столбцов поля для отображения следующей фигуры
const NEXT_FIGURE_COL = 6;
// Размер клетки
const SQUARE_SIZE = 30;
// Цвет пустой клетки
const EMPTY = "white";

// Флаг конца игры
var game_over = true;
// Очки
var score = 0;
// Уровень
var level = 1;
// Начальный интервал движения фигур
var interval = 700;

// Создание "Стакана"
let board = [];
for (i = 0; i < BOARD_ROW; ++i) {
    board[i] = [];
    for (j = 0; j < BOARD_COL; ++j) {
        board[i][j] = EMPTY;
    }
}

// Создание поля для отображения следующей фигуры
let next_figure_board = [];
for (i = 0; i < NEXT_FIGURE_ROW; ++i) {
    next_figure_board[i] = [];
    for (j = 0; j < NEXT_FIGURE_COL; ++j) {
        next_figure_board[i][j] = EMPTY;
    }
}

// Отрисовка "Стакана"
draw_board();
// Отрисовка поля для отображения следующей фигуры
draw_next_figure_board();
// Создание фигур
let current_figure = random_figure();
let next_figure = random_figure();
// Отображение следующей фигуры
show_next_figure(next_figure);
// Время появления последней фигуры
var drop_start = Date.now();

// -----------------------------------------------------------------------------
function draw_board() {
    for (i = 0; i < BOARD_ROW; ++i) {
        for (j = 0; j < BOARD_COL; ++j) {
            draw_square(board_ctx, j, i, board[i][j]);
        }
    }
}

function draw_next_figure_board() {
    for (i = 0; i < NEXT_FIGURE_ROW; ++i) {
        for (j = 0; j < NEXT_FIGURE_COL; ++j) {
            draw_square(next_figure_ctx, j, i, next_figure_board[i][j]);
        }
    }
}

function show_next_figure(figure) {
    let next_figure_form = figure.tetromino[0];

    for (i = 0; i < 5; ++i) {
        for (j = 0; j < 5; ++j) {
            draw_square(next_figure_ctx, j + 1, i + 1, next_figure_form[i][j] ? figure.color : EMPTY);
        }
    }
}

// Отрисовка квадрата
function draw_square(context, x, y, color) {
    // Площадь
    context.fillStyle = color;
    context.fillRect(x * SQUARE_SIZE, y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
    // Рамка
    context.strokeStyle = "black";
    context.strokeRect(x * SQUARE_SIZE, y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
}

// Управление с клавиатуры
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 37) {
        current_figure.move_left();
    } else if (event.keyCode == 38) {
        current_figure.rotate();
        move_audio.play();
    } else if (event.keyCode == 39) {
        current_figure.move_right();
    } else if (event.keyCode == 40) {
        move_audio.play();
        current_figure.move_down();
    }
    else if (event.keyCode == 32) {
        move_audio.play();
        current_figure.throw_down();
    }
});

// Опускаем фигуры через определенные интервалы (начальный интервал - 600мс)
function drop_figure() {
    let now = Date.now();
    let delta = now - drop_start;
    if (delta > interval) {
        current_figure.move_down();
        drop_start = Date.now();
    }
    if (!game_over) {
        requestAnimationFrame(drop_figure);
    }
}
