const express = require("express");
const server = express();
const bodyParser = require('body-parser');
const admin_routes = require("./routes/admin");
// const main_routes = require("./routes/main");

server.engine('pug', require('pug').__express)

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Указание статической папки public
server.use('/public', express.static('public'));
// указание путей
server.use('/admin', admin_routes);
// server.use('/', main_routes);
// Подключение обработчика шаблонов pug, шаблоны - в папке views
server.set("view engine", "pug");
server.set("views", `./views`);
// Запросы
server.get('/admin', (req, res, next) => {
    res.render("admin/main");
});
// Порт
server.listen(3000);
