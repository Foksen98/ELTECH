const express = require('express');
const router = express.Router();

import { StockExchangeParams } from '../models/StockExchangeParams';
const stockParams = new StockExchangeParams();


router.get('/brokers', (req, res) => {
    return res.json(stockParams['brokers']);
});

router.post('/brokers/change', (req, res) => {
    stockParams.editBroker(req.body.id, req.body.params);
    return res.json({ok:true});
});

router.post('/brokers/delete', (req, res) => {
    stockParams.removeBroker(req.body.id);
    return res.json({ok:true});
});

router.post('/brokers/create', (req, res) => {
    console.log(req.body);
    if (req.body.image_url === "") {
        stockParams.addBroker(req.body.name, req.body.cash_reserve);
    } else {
        stockParams.addBroker(req.body.name, req.body.cash_reserve, req.body.image_url);
    }
    return res.json({ok:true});
});

router.get('/stock', (req, res) => {
   return res.json(stockParams.stock);
});

router.post('/stock/change', (req, res) => {
    stockParams.editStock(req.body.id, req.body.params);
    return res.json({ok:true});
});

router.post('/stock/delete', (req, res) => {
    stockParams.removeStock(req.body.id);
    return res.json({ok:true});
});

router.get('/params', (req, res) => {
    return res.json(stockParams.params);
});

router.post('/params/setParams', (req, res) => {
    stockParams.setParams(req.body);
    return res.json({ok:true});
});

router.post('/stock/create', (req, res) => {
   stockParams.addStock(req.body.title, req.body.distribution, req.body.max_value, req.body.quantity, req.body.starting_price);
   return res.json({ok:true});
});

module.exports = router;