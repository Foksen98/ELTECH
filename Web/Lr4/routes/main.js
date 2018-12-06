const router = require('express').Router();
const auctions = require('../models/auction');
const pict_auction = new auctions.Auction();

// вход
router.post('/login/', (req, res, next) => {
    let user_id = pict_auction.is_user(req.body.name);
    if (user_id)
        res.redirect('/main/' + user_id + '/');
    else
        res.render('main/login');
    next();
});

// главная
router.get('/:id/', (req, res, next) => {
    let user_id = req.params.id;
    let user = pict_auction.get_user(user_id);
    res.render('main/main', {
        user: user,
        user_id: user_id,
        user_pict_url: '/main/' + user_id + '/pictures/'
    });
    next();
});

// картины купленные пользователем
router.get('/:id/pictures/', (req, res, next) => {
    let user_id = req.params.id;
    let pictures = pict_auction.get_user_pictures(user_id);
    res.render('main/user_pictures', {
        pictures: pictures
    });
    next();
});

// сокеты
const io = require('socket.io').listen(3030);

let pictures = pict_auction.get_all_pictures();
let users = pict_auction.get_all_users();
let last_picture = undefined;
let last_voted_user = undefined;

io.sockets.on('connection', (socket) => {
    socket.json.emit("init", JSON.stringify({
        message: {
            text: "Вы успешно подключены к аукциону картин!",
            message_type: "default",
            datetime: (new Date()).toLocaleTimeString()
        }
    }));

    socket.on("hello", (msg) => {
        let user = pict_auction.get_user(JSON.parse(msg)['user_id'])
        socket.broadcast.json.emit("message", JSON.stringify({
            message: {
                text: `Участник ${user.name} присоединился к аукциону.`,
                message_type: "default",
                datetime: (new Date()).toLocaleTimeString()
            }
        }));
    });

    // предложить новую цену
    socket.on("voteNewPrice", (msg) => {
        let response = JSON.parse(msg);
        let new_price = response.payload.new_price;
        let user_id = response.payload.user_id;
        let user = users[response.payload.user_id];
        let user_can_vote = false;

        const delta = parseInt(new_price) - parseInt(last_picture.price);

        // первый покупатель
        if ((delta >= 0) && (last_picture.owner === "") && (parseInt(new_price) <= parseInt(user.balance))) {
            user_can_vote = true;
            last_picture.owner = user_id;
        }

        console.log(delta, parseInt(user.balance) - parseInt(new_price));

        // все, кроме первого покупателя
        if (!user_can_vote) {
            if ((delta >= parseInt(last_picture.min_step)) &&
                (delta <= parseInt(last_picture.max_step)) &&
                (parseInt(new_price) <= parseInt(user.balance))) {
                user_can_vote = true;
            }
        }

        if (user_can_vote) {
            last_picture.price = new_price;
            io.json.emit("message", JSON.stringify({
                message: {
                    text: `Участник ${user.name} предложил новую цену ${new_price}`,
                    message_type: "default",
                    datetime: (new Date()).toLocaleTimeString()
                }
            }));
            io.json.emit("changePrice", JSON.stringify({
                payload: {
                    new_price: new_price,
                    min_price: parseInt(last_picture.price) + parseInt(last_picture.min_step)
                }
            }));
            last_voted_user = {
                socket: socket,
                user: user,
                user_id: user_id
            };

        }
        // не удалось предложить цену
        else {
            socket.json.emit("auctionStarted", JSON.stringify({
                message: {
                    text: `Невозможно поднять цену! Укажите правильную цену и не жульничайте!`,
                    message_type: "warning",
                    datetime: (new Date()).toLocaleTimeString()
                }
            }));
        }

    });
});

// цикл аукциона
async function auctionLoop() {
    for (let picture_id in pictures) {
        if (pictures[picture_id].in) {
            console.log(pictures[picture_id].title);
            last_picture = Object.assign({}, pictures[picture_id]);
            last_picture.price = pictures[picture_id].price;
            let timeout_millis = parseInt(pict_auction.settings.timeout) * 1000;
            let end_timeout = (new Date()).getTime() + timeout_millis;
            io.json.emit("pictureAuctionStarted", JSON.stringify({
                message: {
                    text: `Начат торг по картине "${pictures[picture_id].title}"`,
                    message_type: "danger",
                    datetime: (new Date()).toLocaleTimeString()
                },
                payload: {
                    picture: pictures[picture_id],
                    timeout: end_timeout,
                    min_price: pictures[picture_id].price
                }
            }));
            await delay(timeout_millis);
            // картина продана
            if (last_picture.owner != "") {
                pict_auction.buy_picture(picture_id, last_voted_user.user_id, last_picture.price)

                last_voted_user.socket.json.emit("changeCashReserve", JSON.stringify({
                    message: {
                        text: `Соверешена покупка картины. Ваш баланс равен ${users[last_voted_user.user_id].balance}`,
                        message_type: "default",
                        datetime: (new Date()).toLocaleTimeString()
                    },
                    payload: {
                        balance: users[last_voted_user.user_id].balance
                    }
                }));

                // конец аукциона
                io.json.emit("pictureAuctionFinished", JSON.stringify({
                    message: {
                        text: `Окончен торг по картине "${pictures[picture_id].title}"\n
                            Картина продана участнику ${last_voted_user.user.name} по цене ${last_picture.price}`,
                        message_type: "danger",
                        datetime: (new Date()).toLocaleTimeString()
                    }
                }));
            }
            // картина не продана
            else {
                io.json.emit("pictureAuctionFinished", JSON.stringify({
                    message: {
                        text: `Окончен торг по картине "${pictures[picture_id].title}"\n
                           По итогу торга картина не продана`,
                        message_type: "danger",
                        datetime: (new Date()).toLocaleTimeString()
                    }
                }));
            }
            last_voted_user = undefined;
        }
    }
    auction_in_progress = false;
    io.json.emit("auctionFinished", JSON.stringify({
        message: {
            text: `Аукцион окончен!`,
            message_type: "danger",
            datetime: (new Date()).toLocaleTimeString()
        }
    }));
}

setTimeout(() => {
    let start_time = new Date();
    io.json.emit("auctionStarted", JSON.stringify({
        message: {
            text: `Аукцион начался!`,
            message_type: "danger",
            datetime: start_time.toLocaleTimeString()
        },
        payload: {
            start_time: start_time
        }
    }));
    auction_in_progress = true;
    console.log("auctionLoop");
    auctionLoop();

}, 15000);


const delay = (amount) => {
    return new Promise((resolve) => {
        setTimeout(resolve, amount);
    });
};

module.exports = router;
