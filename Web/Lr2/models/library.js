const fs = require("fs");
const books = require("./book");

class Library {

    constructor() {
        let books = {}
        try {
            books = JSON.parse(fs.readFileSync('/home/foksen/Programs/Repo/ELTECH/Web/Lr2/database.json', 'utf8'))['books'];
        } catch (err) {
            console.log("Error while reading file", err);
        }
        this.books = books;
    }

    // генерация id книги
    static generate_id() {
        return (Math.random().toString(16).slice(2) + (new Date()).getTime()).toString();
    }

    // вернуть книгу
    get_book(id) {
        return this.books[id];
    }

    // вернуть книги по фильтру
    get_books(filter) {
        let filtered_books = {};
        switch (filter) {
            case 'all':
                filtered_books = this.books;
                break;
            case 'expired':
                for (let id in this.books) {
                    if (this.is_book_expired(id)) {
                        filtered_books[id] = this.books[id];
                    }
                }
                break;
            case 'in_stock':
                for (let id in this.books) {
                    if (this.books[id].reader == null) {
                        filtered_books[id] = this.books[id];
                    }
                }
                break;
            default:
                console.log('Неизвестный фильтр');
        }
        return filtered_books;
    }

    // создание экземпляра книги
    create_book(title, author, publication_date, image_url = '/public/images/image-square.png') {
        let book = new books.Book(title, author, publication_date, image_url);
        this.books[Library.generate_id()] = book;
        this.save();
    }

    // обновить данные книги
    update_book(id, title, author, publication_date, image_url) {
        let book = this.get_book(id);
        if (book != undefined) {
            book['title'] = title;
            book['author'] = author;
            book['publication_date'] = publication_date;
            book['image_url'] = image_url;
            this.books[id] = book;
            this.save();
            return true;
        }
        return false;
    }

    // выдвть книгу читателю
    give_book(id, reader, date) {
        let book = this.get_book(id);
        if (book != undefined) {
            if (book.reader == null) {
                this.update_book(id, 'reader', reader);
                this.update_book(id, 'expiration_date', date);
                return true;
            }
        }
        return false;
    }

    // вернуть книгу в библиотеку
    return_book(id) {
        let book = this.get_book(id);
        if (book != undefined) {
            this.update_book(id, 'reader', null);
            this.update_book(id, 'expiration_date', null);
        }
    }

    // удаление книги
    delete_book(id) {
        if (id in this.books) {
            delete this.books[id];
            this.save();
            return true;
        }
        return false;
    }

    // проверка, не просрочена ли книга
    is_book_expired(id) {
        let book = this.get_book(id);
        if (book != undefined) {
            if ((book.reader != null) && (book.expiration_date < Date.now())) {
                return true;
            }
            else
                return false;
        }
    }

    // сохранение книг в БД
    save() {
        fs.writeFile('/home/foksen/Programs/Repo/ELTECH/Web/Lr2/database.json', JSON.stringify(this), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
}

module.exports = {
    Library: Library
}
