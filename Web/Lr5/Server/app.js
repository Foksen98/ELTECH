const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const adminRouter = require('./routes/admin');

const app = express();

const corsOptions = {
    'credentials': true,
    'origin': true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', adminRouter);

app.listen(3000);

module.exports = app;
