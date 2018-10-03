const main_audio = new Audio("../audio/tetris-main.mp3");

window.onload = function () {
    show_element(document.getElementById("login"));
    document.getElementById("login_username").value = read_username();
    update_table();
};

// Начать игру
document.getElementById('login_form').addEventListener('submit', function(event) {
    event.preventDefault();
    store_username(document.getElementById("login_username").value);
    hide_element(document.getElementById("login"));
    show_element(document.getElementById("game"));
    game_over = false;
    game_paused = false;
    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
    document.getElementById("username").innerText = read_username();
    main_audio.loop = true;
    main_audio.play();
    drop_figure();
});

// Пауза
document.getElementById('pause').addEventListener('click', function(event) {
    event.preventDefault();
    if (!game_paused) {
        game_paused = true;
        hide_element(document.getElementById("board_block"));
        this.innerText = "Продолжить";
    }
    else {
        game_paused = false;
        show_element(document.getElementById("board_block"));
        this.innerText = "Пауза";
        drop_figure();
    }

});

// Новая игра
document.getElementById('new_game').addEventListener('click', function(event) {
    event.preventDefault();
    hide_element(document.getElementById("game_over"));
    location.reload();
    update_table();
});

// Конец игры
function finish_game() {
    stop_audio(main_audio);
    hide_element(document.getElementById("game"));
    document.getElementById("current_result").innerText = score;
    store_record(localStorage["tetris.username"], score);
    update_table();
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
    localStorage["tetris.username"] = username;
}

// Автоввод последнего использованного имени
function read_username() {
    if (localStorage['tetris.username'] != undefined) {
        return localStorage['tetris.username'];
    }
}

// Сохранение результата
function store_record(username, score) {
    let records = get_records();
    if ((username in records) && (records[username] < score) || (!(username in records))) {
        records[username] = score;
        localStorage.setItem("tetris.records", JSON.stringify(records));
    }
}

// Получение результатов
function get_records() {
    let records = localStorage.getItem('tetris.records');
    if (!records) return new Object;
    return JSON.parse(records);
}

// Сортировка результатов
function sort_scores() {
    let records = get_records();

    let items = Object.keys(records).map(function(key) {
        return [key, records[key]];
    });

    // Сортируем по количеству очков
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    return items;
}

// Обновление таблицы с результатами
function update_table() {
    let scores = sort_scores();
    let table_content = "";
    scores.forEach(function (record) {
        if (record[0] != 'undefined') {
            table_content += `<tr> <td> ${record[1]} </td> <td> ${record[0]} </td> </tr>`;
        }
    });
    document.getElementById("table_body").innerHTML = table_content;
}

// Остановить звук
function stop_audio(sound) {
    sound.pause();
    sound.currentTime = 0;
}
