const add_message = (message) => {
    const message_block = $(
    `
        <li class="list-group-item">
            <h4>${message["datetime"]}</h4>
            <p>${message["text"]}</p>
        </li>
    `);
    $("#auction_log").prepend(message_block);
};

// соединение через сокет
const init_socket = (user_id) => {
    socket = io.connect("http://localhost:4000");
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
    // socket.on("auctionStarted", (response) => {
    //     response = JSON.parse(response);
    //     addMessage(response.message);
    //     startAuctionTimer(response.payload.start_time);
    // });
    // socket.on("pictureAuctionStarted", (response) => {
    //     response = JSON.parse(response);
    //     addMessage(response.message);
    //     displayPicture(response.payload['painting']);
    //     $("#picture_container").fadeIn();
    //     $("#picture_timer_block").show();
    //     startPictureCountDown(response.payload.timeout)
    // });
    // socket.on("pictureAuctionFinished", (response) => {
    //     response = JSON.parse(response);
    //     addMessage(response.message);
    //     $("#picture_container").fadeOut();
    // });
    // socket.on("auctionFinished", (response) => {
    //     response = JSON.parse(response);
    //     addMessage(response.message);
    //     stopAuctionTimer();
    // });
    // socket.on("changePrice", (response) => {
    //     response = JSON.parse(response);
    //     $("#current_picture_price").text(response.payload.new_price);
    // });
    // socket.on("changeCashReserve", (response) => {
    //     response = JSON.parse(response);
    //     addMessage(response.message);
    //     $("#participant_cache").text(response.payload.cash_reserve);
    // });
};

$(document).ready(() => {
    // принять участие
    $("#join_auction").click(() => {
        let user_id = $(this).attr('user_id');
        init_socket(user_id);
    });
});
