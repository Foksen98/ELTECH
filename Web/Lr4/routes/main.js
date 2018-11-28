const router = require('express').Router();
const auctions = require('../models/auction');
const pict_auction = new auctions.Auction();

// вход
router.post('/login/', (req, res, next) => {
    let user = pict_auction.is_user(req.body.name);
    if (user)
        res.render("main/main", {
            user: user
        });
    else
        res.render("main/login");
    next();
});

module.exports = router;
