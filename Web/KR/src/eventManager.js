class EventManager {
    constructor() {
        this.bind = [];
        this.action = [];
    }

    setup() {
        this.bind[32] = 'fire';
        this.bind[37] = 'left';
        this.bind[38] = 'up';
        this.bind[39] = 'right';
        document.body.addEventListener("keydown", this.onKeyDown);
        document.body.addEventListener("keyup", this.onKeyUp);
    }

    // нажатие на кнопку
    onKeyDown(event) {
        const action = eventManager.bind[event.keyCode];
        if(action)
            eventManager.action[action] = true;
    }

    // отпускание кнопки
    onKeyUp(event) {
        const action = eventManager.bind[event.keyCode];
        if(action)
            eventManager.action[action] = false;
    }
}
