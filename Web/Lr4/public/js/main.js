var socket;
let full_timeout = undefined;
let picture_timeout = undefined;
let prev = 0;

// добавить сообщение
const add_message = (message) => {
    const message_block = $(
    `
        <li class="list-group-item">
            <b>${message["datetime"]}</b>
            <p>${message["text"]}</p>
        </li>
    `);
    $("#auction_log").prepend(message_block);
};

// показать пустую картину
const show_fake_picture = () => {
    $('#pict_img').attr('src', '/public/images/image-square.png');
    $('#pict_title').text("Название картины");
    $('#pict_description').text("Описание картины");
    $('#pict_price').text("Цена картины");
    $('#pict_min_step').text("Минимальный шаг");
    $('#pict_max_step').text("Максимальный шаг");
};

// показать картину
const show_picture = (picture, min_price) => {
    $('#pict_img').attr('src', picture.image_url);
    $('#pict_title').text(picture.title);
    $('#pict_description').text(picture.description);
    $('#pict_price').text(picture.price);
    $('#pict_min_step').text(picture.min_step);
    $('#pict_max_step').text(picture.max_step);
    $('#new_price').val(min_price);
};

// изменить цену картины
const change_price = (picture, min_price) => {
    $('#pict_price').text(picture.price);
    $('#new_price').val(min_price);
};

// соединение через сокет
const init_socket = (user_id) => {
    socket = io.connect("http://localhost:3030");

    socket.on("init", (response) => {
        response = JSON.parse(response);
        add_message(response.message);
        socket.json.emit("hello", JSON.stringify({
            user_id: user_id
        }));
    });

    socket.on("message", (response) => {
        response = JSON.parse(response);
        add_message(response.message);
    });

    // начало аукциона
    socket.on("auctionStarted", (response) => {
       response = JSON.parse(response);
       add_message(response.message);
       // startAuctionTimer(response.payload.start_time);
    });

    // начало аукциона по картине
    socket.on("pictureAuctionStarted", (response) => {
        response = JSON.parse(response);
        add_message(response.message);
        show_picture(response.payload.picture, response.payload.min_price);
        startPictureCountDown(response.payload.timeout);
    });

    // конец аукциона по картине
    socket.on("pictureAuctionFinished", (response) => {
        response = JSON.parse(response);
        add_message(response.message);
    });

    // конец аукциона
    socket.on("auctionFinished", (response) => {
        response = JSON.parse(response);
        add_message(response.message);
        show_fake_picture();
        stopAuctionTimer();
    });

    // изменить цену картины
    socket.on("changePrice", (response) => {
        response = JSON.parse(response);
        change_price(response.payload.new_price, response.payload.min_price);
    });

    // изменить баланс
    socket.on("changeCashReserve", (response) => {
        response = JSON.parse(response);
        add_message(response.message);
        $("#balance").text(response.payload.balance);
    });
};

$(document).ready(() => {
    show_fake_picture();
    // принять участие
    $("a#join_auction").click(() => {
        if (!($("a#join_auction").attr('disabled'))) {
            let user_id = $("a#join_auction").attr('user_id');
            $("a#join_auction").attr('disabled', true);
            init_socket(user_id);
        }
    });
    // предложить цену
    $("#vote_price").click(() => {
        user_id = $("#vote_price").attr('user_id');
        new_price = $("#new_price").val();
        socket.json.emit("voteNewPrice", JSON.stringify({
            payload: {
                user_id: user_id,
                new_price: new_price
            }
        }));
    });
});

// таймеры
// const formatTimePart = (val) => {
//     const valString = val + "";
//     if (valString.length < 2) {
//         return "0" + valString;
//     } else {
//         return valString;
//     }
// };
//
// const upTime = (countTo) => {
//     const now = new Date();
//     countTo = new Date(countTo);
//     const difference = (now - countTo);
//
//     const days = Math.floor(difference/(60*60*1000*24));
//     const hours = Math.floor((difference%(60*60*1000*24))/(60*60*1000));
//     const mins = Math.floor(((difference%(60*60*1000*24))%(60*60*1000))/(60*1000));
//     const secs = Math.floor((((difference%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000);
//
//     $("#auction_timer #days").text(formatTimePart(days));
//     $("#auction_timer #hours").text(formatTimePart(hours));
//     $("#auction_timer #minutes").text(formatTimePart(mins));
//     $("#auction_timer #seconds").text(formatTimePart(secs));
//
//     clearTimeout(upTime.to);
//     upTime.to = setTimeout(() => {
//         upTime(countTo);
//     }, 1000);
//
// };

const startPictureCountDown = (timestamp) => {
    picture_timeout = timestamp + 2;
    let interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = picture_timeout - now;

        if (full_timeout === undefined) {
            full_timeout = difference;
        }

        prev = prev + 1000;

        updateProgress(full_timeout, prev);

        if (difference < 0) {
            clearInterval(interval);
            prev = 0;
            full_timeout = undefined;
        }

    }, 1000);
};

const updateProgress = (full_timeout, count) => {
    console.log("progressbar", (count / full_timeout) * 100);
    $("#progressbar").progressbar({value: (count / full_timeout) * 100});
};

// const startAuctionTimer = (start_time) => {
//     upTime(start_time);
// };

// const stopAuctionTimer = () => {
//     clearTimeout(upTime.to);
// };
