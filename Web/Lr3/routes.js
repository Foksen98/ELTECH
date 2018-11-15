const router = require('express').Router();
const auctions = require('./models/auction');
const pict_auction = new auctions.Auction();

// /settings/
// настройки аукциона
router.get('/settings/', (req, res, next) => {
    let settings = pict_auction.get_settings();
    res.render("admin/settings/", {
        date: settings.date,
        timeout: settings.timeout,
        countdown: settings.countdown,
        pause: settings.pause,
    });
    next();
});
// изменение настроек
router.post('/settings/', (req, res, next) => {
    pict_auction.update_settings(req.body.date, req.body.timeout, req.body.countdown, req.body.pause);
    res.sendStatus(200);
    next();
});

// /pictures/
// таблица с инфо о картинах
router.get('/pictures/', (req, res, next) => {
    res.json(pict_auction.get_pictures(req.query['filter']));
    next();
});

// добавление новой картины
router.post('/pictures/', (req, res, next) => {
    pict_auction.create_picture(req.body.title, req.body.description, req.body.author, req.body.creation_date, req.body.image_url, req.body.price, req.body.min_step, req.body.max_step);
    res.sendStatus(200);
    next();
});

// /pictures/:id/
// инфо о картине
router.get('/pictures/:id/', (req, res, next) => {
    res.json(pict_auction.get_book(req.params.id));
    next();
});

// изменение инфо о картине
router.put('/pictures/:id/', (req, res, next) => {
    pict_auction.update_picture(req.body.title, req.body.description, req.body.author, req.body.creation_date, req.body.image_url, req.body.price, req.body.min_step, req.body.max_step);
    res.sendStatus(200);
    next();
});

// смена статуса участия картины
router.put('/pictures/status/:id/', (req, res, next) => {
    let picture = pict_auction.get_picture(req.params.id);
    pict_auction.change_status(picture);
    res.sendStatus(200);
    next();
});

// смена статуса участия участника
router.put('/users/status/:id/', (req, res, next) => {
    let user = pict_auction.get_picture(req.params.id);
    pict_auction.change_status(user);
    res.sendStatus(200);
    next();
});

module.exports = router;
