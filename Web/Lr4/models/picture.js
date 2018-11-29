class Picture {
    constructor(title, description, author, creation_date, image_url = '/public/images/image-square.png', price, min_step, max_step) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.creation_date = creation_date;
        this.image_url = image_url;
        this.price = price;
        this.min_step = min_step;
        this.max_step = max_step;
        this.in = false;
        this.owner = "";
    }
}

module.exports = {
    Picture: Picture
}
