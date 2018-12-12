const BLANK_IMAGE = 'https://www.sdprg.com/files/images/property-default-photo.png';

export class Stock {
    constructor(title, distribution, max_value, quantity, starting_price) {
        this.title = title;
        this.distribution = distribution;
        this.max_value = max_value;
        this.quantity = quantity;
        this.starting_price = starting_price;
    }
}