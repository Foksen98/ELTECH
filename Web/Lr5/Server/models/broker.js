class Broker {
    constructor (name, balance, image_url) {
        this.name = name;
        this.balance = balance;
        this.image_url = image_url;
    }
}


module.exports = {
    Broker: Broker
}
