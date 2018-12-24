const fs = require("fs");
const stock = require("./stock");
const broker = require("./broker");
const FILENAME = 'database.json';

class Settings {

    constructor() {
        let instance = {};
        try {
            instance = JSON.parse(fs.readFileSync(FILENAME));
            this.brokers = instance['brokers'];
            this.stock = instance['stock'];
            this.settings = instance['settings'];
        } catch (e) {
            console.log('An error occurred while reading the file.');
        }
    }

    static generateId() {
        return (Math.random().toString(16).slice(2) + (new Date()).getTime()).toString();
    }

    // акции
    addStock(title, distribution, max_value, quantity, price) {
        let new_stock = new stock.Stock(title, distribution, max_value, quantity, price);
        this.stock[Settings.generateId()] = new_stock;
        this.save();
    }

    editStock(id, props) {
        let instance = this.stock[id];
        if (instance !== undefined) {
            for (let property in props) {
                if ((property in instance) && (props[property] !== "")) {
                    instance[property] = props[property];
                }
            }
            this.stock[id] = instance;
            this.save();
        }
    }

    removeStock(id) {
        if (id in this.stock) {
            delete this.stock[id];
            this.save();
        }
    }

    // брокеры
    addBroker(name, balance, image_url) {
        let new_broker = undefined;
        new_broker = new broker.Broker(name, balance, image_url);
        this.brokers[Settings.generateId()] = new_broker;
        this.save();
    }

    editBroker(id, props) {
        let broker = this.brokers[id];
        if (broker !== undefined) {
            for (let property in props) {
                console.log(property);
                if (property in broker) {
                    broker[property] = props[property];
                }
            }
            this.brokers[id] = broker;
            this.save();
        }
    }

    removeBroker(id) {
        if (id in this.brokers) {
            delete this.brokers[id];
            this.save();
        }
    }

    // настройки
    set(settings) {
        this.settings['start_datetime'] = settings['start_datetime'];
        this.settings['end_datetime'] = settings['end_datetime'];
        this.settings['timeout'] = settings['timeout'];
        this.save();
    }

    save() {
        fs.writeFile(FILENAME, JSON.stringify(this), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
}


module.exports = {
    Settings: Settings
}
