const express = require('express');
const router = express.Router();
const settings = require("../models/settings");
const stockSettings = new settings.Settings();

// брокеры
router.get('/brokers', (req, res) => {
    return res.json(stockSettings.brokers);
});

router.post('/brokers/create', (req, res) => {
    console.log(req.body);
    stockSettings.addBroker(req.body.name, req.body.balance, req.body.image_url);
    return res.json({ok:true});
});

router.post('/brokers/change', (req, res) => {
    stockSettings.editBroker(req.body.id, req.body.params);
    return res.json({ok:true});
});

router.post('/brokers/delete', (req, res) => {
    stockSettings.removeBroker(req.body.id);
    return res.json({ok:true});
});

// акции
router.get('/stocks', (req, res) => {
   return res.json(stockSettings.stock);
});

router.post('/stocks/create', (req, res) => {
   stockSettings.addStock(req.body.title, req.body.distribution, req.body.max_value, req.body.quantity, req.body.starting_price);
   return res.json({ok:true});
});

router.post('/stocks/change', (req, res) => {
    stockSettings.editStock(req.body.id, req.body.params);
    return res.json({ok:true});
});

router.post('/stocks/delete', (req, res) => {
    stockSettings.removeStock(req.body.id);
    return res.json({ok:true});
});

// настройки
router.get('/settings', (req, res) => {
    return res.json(stockSettings.settings);
});

router.post('/settings/set', (req, res) => {
    stockSettings.set(req.body);
    return res.json({ok:true});
});


module.exports = router;
