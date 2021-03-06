const router = require('express').Router();
const auctions = require('../models/auction');
const pict_auction = new auctions.Auction();

// /settings/
// настройки аукциона
router.get('/settings/', (req, res, next) => {
    let settings = pict_auction.get_settings();
    res.render("admin/settings", {
        settings: settings
    });
    next();
});
// изменение настроек
router.post('/settings/', (req, res, next) => {
    pict_auction.update_settings(req.body.date, req.body.timeout, req.body.countdown, req.body.pause);
    res.redirect('/admin/settings/');
    next();
});

// /pictures/
// таблица с инфо о картинах
router.get('/pictures/', (req, res, next) => {
    let pictures = pict_auction.get_all_pictures();
    res.render('admin/pictures', {
        pictures: pictures
    });
    next();
});

// добавление новой картины
router.post('/pictures/', (req, res, next) => {
    pict_auction.create_picture(req.body.title, req.body.description, req.body.author, req.body.creation_date, req.body.image_url, req.body.price, req.body.min_step, req.body.max_step);
    res.redirect('/admin/pictures/');
    next();
});

// /pictures/:id/
// инфо о картине
router.get('/pictures/:id/', (req, res, next) => {
    pict_id = req.params.id;
    let picture = pict_auction.get_picture(pict_id);
    res.render('admin/picture', {
        picture: picture,
        pict_url: '/admin/pictures/' + pict_id + '/'
    });
    next();
});

// изменение инфо о картине
router.post('/pictures/:id/', (req, res, next) => {
    pict_id = req.params.id;
    pict_auction.update_picture(pict_id, req.body.title, req.body.description, req.body.author, req.body.creation_date, req.body.image_url, req.body.price, req.body.min_step, req.body.max_step);
    res.redirect('/admin/pictures/' + pict_id + '/');
    next();
});

// /users/
// таблица с инфо об участниках
router.get('/users/', (req, res, next) => {
    let users = pict_auction.get_all_users();
    res.render('admin/users', {
        users: users
    });
    next();
});

// добавление нового участника
router.post('/users/', (req, res, next) => {
    pict_auction.create_user(req.body.name, req.body.balance);
    res.redirect('/admin/users/');
    next();
});

// /users/:id/
// инфо об участнике
router.get('/users/:id/', (req, res, next) => {
    user_id = req.params.id;
    let user = pict_auction.get_user(user_id);
    res.render('admin/user', {
        user: user,
        user_url: '/users/' + user_id + '/'
    });
    next();
});

// изменение инфо об участнике
router.post('/users/:id/', (req, res, next) => {
    user_id = req.params.id;
    pict_auction.update_user(user_id, req.body.name, req.body.balance);
    res.redirect('/admin/users/' + user_id + '/');
    next();
});

// смена статуса участия картины
router.post('/pictures/status/:id/', (req, res, next) => {
    pict_auction.change_status(req.params.id);
    res.sendStatus(200);
    next();
});

// смена статуса участия участника
router.post('/users/status/:id/', (req, res, next) => {
    pict_auction.change_status(req.params.id);
    res.sendStatus(200);
    next();
});

module.exports = router;
