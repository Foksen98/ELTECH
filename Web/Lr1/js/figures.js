const achivement_audio = new Audio("../audio/achivement.mp3");
const game_over_audio = new Audio("../audio/gameover.wav");
const move_audio = new Audio("../audio/move.wav");
const fall_audio = new Audio("../audio/falldown.wav");

const figure_I = [
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
    ]
];

const figure_J = [
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ]
];

const figure_L = [
  [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
  ],
  [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0]
  ],
  [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0]
  ],
  [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
  ]
];

const figure_O = [
    [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]
];

const figure_S = [
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ]
];

const figure_T = [
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ]
];

const figure_Z = [
    [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ]
];

// Фигуры и соответствующие им цвета
const figures = [
    [figure_Z, "red"],
    [figure_S, "green"],
    [figure_T, "yellow"],
    [figure_O, "blue"],
    [figure_L, "purple"],
    [figure_I, "cyan"],
    [figure_J, "orange"]
];

// Фигура
function figure(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;
    this.type = 0;
    // Положение фигуры
    this.x = 3;
    this.y = -3;
}

// Генерация случайной фигуры
function random_figure() {
    let figure_index = Math.floor(Math.random() * figures.length);
    return new figure(figures[figure_index][0], figures[figure_index][1]);
}

// Заполнение фигуры
figure.prototype.fill = function(context, color) {
    form = this.tetromino[this.type];
    for (i = 0; i < form.length; ++i) {
        for (j = 0; j < form.length; ++j) {
            // Рисуем только "заполненные" клетки
            if(form[i][j]) {
                draw_square(context, this.x + j, this.y + i, color);
            }
        }
    }
}

// Отрисовка фигуры в стакане
figure.prototype.draw = function(context) {
    this.fill(context, this.color);
}

// "Стирание" фигуры
figure.prototype.clean = function(context) {
    this.fill(context, EMPTY);
}

// Перемещение фигуры вниз на 1 клетку
figure.prototype.move_down = function() {
    let form = this.tetromino[this.type];

    if (!this.collision(0, 1, form)) {
        this.clean(board_ctx);
        this.y++;
        this.draw(board_ctx);
    } else {
        // Блокируем движение фигуры и генерируем новую
        this.lock();
        fall_audio.play();
        current_figure = next_figure;
        next_figure = random_figure();
        show_next_figure(next_figure);
    }
}

// Перемещение фигуры вниз на 1 клетку
figure.prototype.throw_down = function() {
    let form = this.tetromino[this.type];

    while (!this.collision(0, 1, form)) {
        this.clean(board_ctx);
        this.y++;
        this.draw(board_ctx);
    }
    // Блокируем движение фигуры и генерируем новую
    this.lock();
    fall_audio.play();
    current_figure = next_figure;
    next_figure = random_figure();
    show_next_figure(next_figure);
}

// Перемещение фигуры вправо
figure.prototype.move_right = function() {
    let form = this.tetromino[this.type];

    if (!this.collision(1, 0, form)) {
        this.clean(board_ctx);
        this.x++;
        this.draw(board_ctx);
    }
}

// Перемещение фигуры влево
figure.prototype.move_left = function() {
    let form = this.tetromino[this.type];

    if (!this.collision(-1, 0, form)) {
        this.clean(board_ctx);
        this.x--;
        this.draw(board_ctx);
    }
}

// Поворот фигуры
figure.prototype.rotate = function() {
    let next_form = this.tetromino[(this.type + 1) % this.tetromino.length];

    if(!this.collision(0, 0, next_form)) {
        this.clean(board_ctx);
        this.type = (this.type + 1) % this.tetromino.length;
        this.draw(board_ctx);
    }
}

// Закрепить фигуру
figure.prototype.lock = function() {
    let form = this.tetromino[this.type];

    for (i = 0; i < form.length; ++i) {
        for (j = 0; j < form.length; ++j) {
            // Пропускаем свободные клетки
            if (!form[i][j]) {
                continue;
            }
            // Фигура остановилась у верхней границы - конец игры
            if (this.y + i < 0){
                game_over = true;
                game_over_audio.play();
                finish_game();
                break;
            }
            // Блокируем фигуру
            board[this.y + i][this.x + j] = this.color;
        }
    }
    let full_row_count = 0;
    // Осуществляем удаление заполненных строк
    for (i = 0; i < BOARD_ROW; ++i) {
        let is_full_row = true;

        for (j = 0; j < BOARD_COL; ++j) {
            is_full_row = is_full_row && (board[i][j] != EMPTY);
        }
        if (is_full_row) {
            // Если строка заполнена, нужно сдвинуть вниз все строки выше
            for (y = i; y > 0; --y) {
                for (j = 0; j < BOARD_COL; ++j) {
                    board[y][j] = board[y - 1][j];
                }
            }
            // Самая верхняя строка не имеет строк выше, значит делаем её пустой
            for (j = 0; j < BOARD_COL; ++j){
                board[0][j] = EMPTY;
            }
            // Увеличиваем счетчик убранных за раз строк на 1
            full_row_count += 1;
        }
    }
    if (full_row_count > 0) {
        // Увеличиваем количество очков
        score += 100 * (2 * full_row_count - 1) * level ;
        if (score >= (level + 1) * 500 * level) {
            // Увеличиваем уровень
            ++level;
            // Уменьшаем интервал передвижения фигур
            interval *= 0.9;
        }
        achivement_audio.play();
    }
    // Перерисовываем стакан
    draw_board(BOARD_ROW, BOARD_COL);

    // Обновляем отображение очков на странице
    score_element.innerHTML = score;
    level_element.innerHTML = level;
}

// Обработка столкновений
figure.prototype.collision = function(x, y, form) {
    for (i = 0; i < form.length; ++i) {
        for (j = 0; j < form.length; ++j) {
            // Если фигура пустая, пропускаем
            if (!form[i][j]) {
                continue;
            }
            // Координаты фигуры после перемещения
            let new_x = this.x + j + x;
            let new_y = this.y + i + y;

            // Условия на стены
            if (new_x < 0 || new_x >= BOARD_COL || new_y >= BOARD_ROW) {
                return true;
            }

            if (new_y < 0) {
                continue;
            }
            // Проверка, есть ли на этом месте уже заблокированная фигура
            if (board[new_y][new_x] != EMPTY) {
                return true;
            }
        }
    }
    return false;
}
