class Picture {
    constructor(title, description, author, creation_date, image_url, price, min_step, max_step) {
        this.title = title;
        this.decsription = description;
        this.author = author;
        this.creation_date = creation_date;
        this.image_url = image_url;
        this.price = price;
        this.min_step = min_step;
        this.max_step = max_step;
        this.in = False
    }
}

module.exports = {
    Picture: Picture
}
