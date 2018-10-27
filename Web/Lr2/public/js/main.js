const booksContainer = document.getElementById('books-container');
const showAllButton = document.getElementById('showAllBooks');
const showInStockButton = document.getElementById('showInStockBooks');
const showExpiredButton = document.getElementById('showExpiredBooks');

const getAllBooksUrl = '/api/books?filter=all';
const getBooksInStockUrl = '/api/books?filter=in_stock';
const getBooksExpiredUrl = '/api/books?filter=expired';

const addReaderModal = document.getElementById('addReaderModal');
const addReaderForm = document.getElementById('addReaderForm');

function buildBookCard(id, book) {
    if (book.reader != null) {
        return `
            <div class="w3-card-4 w3-margin-bottom w3-margin-top">
                <header class="w3-container w3-red">
                    <h3>${book.title}</h3>
                </header>
                <div class="w3-container w3-light-blue w3-padding">
                    <div class="w3-quarter">
                        <img src="${book.image_url}" alt="${book.title}" class="w3-round" height="200" />
                    </div>
                    <div class="w3-threequarter">
                        <ul style="font-size:1.3em;">
                            <li>Автор: <strong>${book.author}</strong></li>
                            <li>Год: <strong>${book.publication_date}</strong></li>
                            <li>Читатель: <strong>${book.reader}</strong></li>
                            <li>Дата возврата: <strong>${moment(parseInt(book.expiration_date)).format('DD-MM-YYYY')}</strong></li>
                        </ul>
                    </div>
                </div>
                <footer class="w3-red w3-padding">
                    <button type="button" id="${id}" class="returnButton w3-btn w3-ripple w3-blue w3-border">Вернуть</button>
                </footer>
            </div>
    `;
    } else {
        return `
            <div class="w3-card-4 w3-margin-bottom w3-margin-top">
                <header class="w3-container w3-blue">
                   <h3>${book.title}</h3>
                </header>
                 <div class="w3-container w3-light-blue w3-padding">
                    <div class="w3-quarter">
                        <img src="${book.image_url}" alt="${book.title}" class="w3-round" height="200" />
                    </div>
                    <div class="w3-threequarter">
                        <ul style="font-size:1.3em;">
                            <li>Автор: <strong>${book.author}</strong></li>
                            <li>Год: <strong>${book.publication_date}</strong></li>
                        </ul>
                    </div>
                </div>
                <footer class="w3-blue w3-padding">
                    <button type="button" class="giveAwayButton w3-btn w3-ripple w3-yellow w3-border w3-margin-right" id="${id}">Выдать читателю</button>
                    <button type="button" class="deleteButton w3-btn w3-ripple w3-red w3-border w3-margin-right" id="${id}">Удалить</button>
                    <button type="button" class="editButton w3-btn w3-ripple w3-pale-green w3-border w3-margin-right" id="${id}">Редактировать</button>
                </footer>
            </div>
    `;
    }
}

showAllButton.addEventListener('click', function () {
    fetch(getAllBooksUrl, { headers: { "Content-Type": "application/json; charset=utf-8" }})
        .then(res => res.json())
        .then(response => {
            rebuildBooksContainer(response);
            update_listeners();
        })
        .catch(err => {
            console.log("Error")
            update_listeners();
        });
});


showExpiredButton.addEventListener('click', function () {
    fetch(getBooksExpiredUrl, { headers: { "Content-Type": "application/json; charset=utf-8" }})
        .then(res => res.json())
        .then(response => {
            rebuildBooksContainer(response);
            update_listeners();
        })
        .catch(err => {
            console.log("Error")
            update_listeners();
        });
});


showInStockButton.addEventListener('click', function () {
    fetch(getBooksInStockUrl, { headers: { "Content-Type": "application/json; charset=utf-8" }})
        .then(res => res.json())
        .then(response => {
            rebuildBooksContainer(response);
            update_listeners();
        })
        .catch(err => {
            console.log("Error")
            update_listeners();
        });
});

function rebuildBooksContainer(books) {
    let booksHtml = '';
    for (let id in books) {
        booksHtml += buildBookCard(id, books[id]);
    }
    booksContainer.innerHTML = booksHtml;
}

document.getElementById('newBookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let newBook = {
        title: document.getElementById('newBookTitle').value,
        author: document.getElementById('newBookAuthor').value,
        publication_date: document.getElementById('newBookYear').value
    };
    if (document.getElementById('newBookImage').value != "") {
        newBook['image_url'] = document.getElementById('newBookImage').value;
    }
    fetch('/api/books/', {
        method: 'POST',
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(newBook)
    })
        .then(res => res.json())
        .then(response => {
            location.reload();
            update_listeners();
        })
        .catch(err => {
            location.reload();
            update_listeners();
        });
});

document.getElementById('editBookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let editBookId = document.getElementById('editBookSubmit').getAttribute('book_id');
    let editBook = {
        id: editBookId,
        title: document.getElementById('editBookTitle').value,
        author: document.getElementById('editBookAuthor').value,
        publication_date: document.getElementById('editBookYear').value
    };
    if (document.getElementById('editBookImage').value != "") {
        editBook['image_url'] = document.getElementById('editBookImage').value;
    }
    fetch(`/api/books/${editBookId}/`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(editBook)
    })
        .then(res => res.json())
        .then(response => {
            location.reload();
            update_listeners();
        })
        .catch(err => {
            location.reload();
            update_listeners();
        });
});

document.getElementById('addReaderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let newReader = {
        id: document.getElementById('addReaderForm').getAttribute('book_id'),
        reader: document.getElementById('newReaderName').value,
        expiration_date: moment(document.getElementById('newExpirationDate').value).format('x')
    };
    fetch(`/api/books/${newReader.id}/give_book/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(newReader)
    })
        .then(res => res.json())
        .then(response => {
            location.reload();
            update_listeners();
        })
        .catch(err => {
            location.reload();
            update_listeners();
        });
});

// обновление действий по нажатию
function update_listeners() {
    const deleteButtons = document.getElementsByClassName('deleteButton');
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function() {
            fetch(`/api/books/${ deleteButtons[i].id}/`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json; charset=utf-8" },
            })
                .then(res => res.json())
                .then(response => {
                    location.reload();
                })
                .catch(err => {
                    location.reload();
                });
        });
    }

    const returnButtons = document.getElementsByClassName('returnButton');
    for (let i = 0; i < returnButtons.length; i++) {
        returnButtons[i].addEventListener('click', function() {
            fetch(`/api/books/${ returnButtons[i].id}/return`, {
                method: 'POST',
                headers: { "Content-Type": "application/json; charset=utf-8" },
            })
                .then(res => res.json())
                .then(response => {
                    location.reload();
                })
                .catch(err => {
                    location.reload();
                });
        });
    }

    const giveAwayButtons = document.getElementsByClassName('giveAwayButton');
    for (let i = 0; i < giveAwayButtons.length; i++) {
        giveAwayButtons[i].addEventListener('click', function() {
            let date = new Date();
            addReaderForm.setAttribute('book_id', giveAwayButtons[i].id);
            document.getElementById('newExpirationDate').setAttribute('min', moment().format('YYYY-MM-DD'));
            document.getElementById('newExpirationDate').setAttribute('value', moment().add(1, 'days').format('YYYY-MM-DD'));
            addReaderModal.style.display = 'block';
        });
    }

    const editButtons = document.getElementsByClassName('editButton');
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', function() {
            fetch(`/api/books/${editButtons[i].id}/`, {
                method: 'GET',
                headers: { "Content-Type": "application/json; charset=utf-8" },
            })
                .then(res => res.json())
                .then(response => {
                    document.getElementById('editBookTitle').value = response.title;
                    document.getElementById('editBookAuthor').value = response.author;
                    document.getElementById('editBookYear').value = response.publication_date;
                    document.getElementById('editBookImage').value = response.image_url;
                    document.getElementById('editBookSubmit').setAttribute('book_id', editButtons[i].id);
                    editBookModal.style.display = 'block';
                })
                .catch(err => {
                    location.reload();
                });
        });
    }
}

// действия при перезагрузке страницы
window.onload = function() {
    fetch(getBooksInStockUrl, { headers: { "Content-Type": "application/json; charset=utf-8" }})
        .then(res => res.json())
        .then(response => {
            rebuildBooksContainer(response);
            update_listeners();
        })
        .catch(err => {
            console.log("Error")
        });
};
