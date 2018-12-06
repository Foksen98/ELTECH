import {Stock} from "./Stock";
import {Broker} from "./Broker";
import fs from 'fs';

const FILENAME = 'database.json';

export class StockExchangeParams {

    constructor() {
        let instance = {};
        try {
            instance = JSON.parse(fs.readFileSync(FILENAME));
            this.brokers = instance['brokers'];
            this.stock = instance['stock'];
            this.params = instance['params'];
        } catch (e) {
            console.log('An error occurred while reading the file.');
        }
    }

    static generateId() {
        return (Math.random().toString(16).slice(2) + (new Date()).getTime()).toString();
    }

    addStock(title, distribution, max_value, quantity, starting_price) {
        let new_stock = new Stock(title, distribution, max_value, quantity, starting_price);
        this.stock[StockExchangeParams.generateId()] = new_stock;
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

    addBroker(name, cash_reserve, image_url) {
        let new_broker = undefined;
        if (image_url === "") {
            new_broker = new Broker(name, cash_reserve);
        } else {
            new_broker = new Broker(name, cash_reserve, image_url);
        }
        this.brokers[StockExchangeParams.generateId()] = new_broker;
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

    setParams(params) {
        this.params['start_datetime'] = params['start_datetime'];
        this.params['end_datetime'] = params['end_datetime'];
        this.params['timeout'] = params['timeout'];
        this.save();
    }

    save() {
        fs.writeFile(FILENAME, JSON.stringify(this), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
}