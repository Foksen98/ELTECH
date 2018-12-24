class Broker {
    constructor (name, balance, image_url='public/images/avatar.png') {
        this.name = name;
        this.balance = balance;
        this.image_url = image_url;
    }
}


module.exports = {
    Broker: Broker
}
