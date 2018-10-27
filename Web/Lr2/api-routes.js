const router = require('express').Router();
const lib = require('./models/library.js');
const home_lib = new lib.Library();

// /books/
router.get('/books/', (req, res, next) => {
    res.json(home_lib.get_books(req.query['filter']));
    next();
});

router.post('/books/', (req, res, next) => {
    if (req.body.image_url != "") {
        home_lib.create_book(req.body.title, req.body.author, req.body.publication_date, req.body.image_url);
    } else {
        home_lib.create_book(req.body.title, req.body.author, req.body.publication_date, '/public/images/image-square.png');
    }
    res.sendStatus(200);
    next();
});

// /books/:id/
router.get('/books/:id/', (req, res, next) => {
    res.json(home_lib.get_book(req.params.id));
    next();
});

router.put('/books/:id/', (req, res, next) => {
    if (req.body.image_url != "") {
        home_lib.update_book(req.body.id, req.body.title, req.body.author, req.body.publication_date, req.body.image_url);
    } else {
        home_lib.update_book(req.body.id, req.body.title, req.body.author, req.body.publication_date, '/public/images/image-square.png');
    }
    res.sendStatus(200);
    next();
});

router.delete('/books/:id/', (req, res, next) => {
    home_lib.delete_book(req.params.id);
    res.sendStatus(200);
    next();
});

// /books/:id/set_reader/
router.post('/books/:id/give_book/', (req, res, next) => {
    home_lib.give_book(req.params.id, req.body.reader, req.body.expiration_date);
    res.sendStatus(200);
    next();
});

// /books/:id/return/
router.post('/books/:id/return/', (req, res, next) => {
    home_lib.return_book(req.params.id);
    res.sendStatus(200);
    next();
});

module.exports = router;
