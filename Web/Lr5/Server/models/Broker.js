const BLANK_IMAGE = 'https://vignette.wikia.nocookie.net/cswikia/images/2/20/Profile-blank-male.png/revision/latest?cb=20150701175801';

export class Broker {
    constructor (name, cash_reserve, image_url=BLANK_IMAGE) {
        this.name = name;
        this.cash_reserve = cash_reserve;
        this.image_url = image_url;
    }
}