class ScoreTable {
    constructor() {
        this.records = JSON.parse(localStorage.getItem('univer.records')) || {};
    }

    // Сохранение результата
    store_record(username, score) {
        if ((username in this.records) && (this.records[username] < score) || (!(username in this.records))) {
            this.records[username] = score;
            localStorage.setItem("univer.records", JSON.stringify(this.records));
        }
    }

    // Сортировка результатов
    sort_scores() {
        let records = this.records
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
    update_table() {
        let scores = this.sort_scores();
        let table_content = "";
        scores.forEach(function(record) {
            if (record[0] != 'undefined') {
                table_content += `<tr> <td> ${record[0]} </td> <td> ${record[1]} </td> </tr>`;
            }
        });
        document.getElementById("table_body").innerHTML = table_content;
    }


}
