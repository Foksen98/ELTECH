class Stock {
    constructor(title, distribution, max_value, quantity, price) {
        this.title = title;
        this.distribution = distribution;
        this.max_value = max_value;
        this.quantity = quantity;
        this.price = price;
    }
}

module.exports = {
    Stock: Stock
}
