const fs = require("fs");
const pictures = require("./picture");
const users = require("./user");

class Auction {

    constructor() {
        let settings = {}
        let users = {}
        let pictures = {}
        try {
            settings = JSON.parse(fs.readFileSync('/home/foksen/Programs/Repo/ELTECH/Web/Lr4/database.json', 'utf8'))['settings'];
            users = JSON.parse(fs.readFileSync('/home/foksen/Programs/Repo/ELTECH/Web/Lr4/database.json', 'utf8'))['users'];
            pictures = JSON.parse(fs.readFileSync('/home/foksen/Programs/Repo/ELTECH/Web/Lr4/database.json', 'utf8'))['pictures'];
        }
        catch (err) {
            console.log("Error while reading file", err);
        }
        this.settings = settings;
        this.users = users;
        this.pictures = pictures;
    }

    // генерация id
    static generate_id() {
        return (Math.random().toString(16).slice(2) + (new Date()).getTime()).toString();
    }

    // создание экземпляра участника
    create_user(name, balance) {
        let user = new users.User(name, balance);
        this.users[Auction.generate_id()] = user;
        this.save();
    }

    // создание экземпляра картины
    create_picture(title, description, author, creation_date, image_url, price, min_step, max_step) {
        let picture = new pictures.Picture(title, description, author, creation_date, image_url, price, min_step, max_step);
        this.pictures[Auction.generate_id()] = picture;
        this.save();
    }

    // вернуть Настройки
    get_settings() {
        return this.settings;
    }

    // вернуть картину
    get_picture(id) {
        return this.pictures[id];
    }

    // вернуть пользователя
    get_user(id) {
        return this.users[id];
    }

    // вернуть все картины
    get_all_pictures() {
        return this.pictures;
    }

    // вернуть картины пользователя
    get_user_pictures(user_id) {
        let pictures = []
        for (let id in this.pictures) {
            if (this.pictures[id].owner == user_id)
                pictures.push(this.pictures[id]);
        }
        return pictures;
    }

    // вернуть всех пользователей
    get_all_users() {
        return this.users;
    }

    // проверить наличие пользователя
    is_user(name) {
        for (let id in this.users) {
            if (this.users[id].name == name)
                return id;
        }
        return null;
    }

    // обновить данные книги
    update_settings(date, timeout, countdown, pause) {
        let settings = this.get_settings();
        if (settings != undefined) {
            settings.date = date;
            settings.timeout = timeout;
            settings.countdown = countdown;
            settings.pause = pause;
            this.settings = settings;
            this.save();
            return true;
        }
        return false;
    }

    // обновить данные картины
    update_picture(id, title, description, author, creation_date, image_url, price, min_step, max_step) {
        let picture = this.get_picture(id);
        if (picture != undefined) {
            picture.title = title;
            picture.description = description;
            picture.author = author;
            picture.creation_date = creation_date;
            picture.image_url = image_url;
            picture.price = price;
            picture.min_step = min_step;
            picture.max_step = max_step;
            this.pictures[id] = picture;
            this.save();
            return true;
        }
        return false;
    }

    // обновить данные участника
    update_user(id, name, balance) {
        let user = this.get_user(id);
        if (user != undefined) {
            user.name = name;
            user.balance = balance;
            this.users[id] = user;
            this.save();
            return true;
        }
        return false;
    }

    // участие / неучастие в аукционе
    change_status(id) {
        let picture = this.get_picture(id);
        if (picture) {
            picture.in = !(picture.in);
            this.pictures[id] = picture;
        }
        else {
            let user = this.get_user(id)
            user.in = !(user.in);
            this.users[id] = user;
        }
        this.save();
    }

    // сохранение в БД
    save() {
        fs.writeFile('/home/foksen/Programs/Repo/ELTECH/Web/Lr4/database.json', JSON.stringify(this), (err) => {
            if (err) throw err;
        });
    }
}

module.exports = {
    Auction: Auction
}
