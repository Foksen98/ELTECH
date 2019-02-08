class Entity {
    constructor() {
        this.pos_x = 0;
        this.pos_y = 0;
        this.size_x = 0;
        this.size_y = 0;
        this.touch = false;
    }

    kill() {
        gameManager.kill(this);
    }
}


class Player extends Entity {
    constructor() {
        super();
        this.nickname = "";
        this.countCoins = 0;
        this.move_x = 0;
        this.move_y = 0;
        this.speed = 20;
        this.numbL = 0;
        this.numbR = 0;
        this.left = "hero-left";
        this.right = "hero-right";
        this.position = "hero-right";
        this.jump = false;
        this.win = false;
    }

    draw(ctx) {
        spriteManager.drawSprite(ctx, this.position, this.pos_x, this.pos_y - 70);
    }

    update() {
        physicManager.update(this);
    }

    onTouchEntity(obj) {
        if (obj.name.match(/plus[\d*]/)) {
            soundManager.play("/mus/aud1.wav", {looping: 0, volume: 0.5});
            this.countCoins += 1;
            let elem = document.getElementById('pCoins');
            elem.innerHTML = this.countCoins;
            obj.kill();

        }
        if (obj.name.match(/book/)) {;
            soundManager.stopAll();
            soundManager.init();
            soundManager.play("/mus/aud2.mp3", {looping: 0, volume: 1});
            obj.touch = true;
            this.win = true;
            obj.move_y = 4;
            this.kill();
        }
        if (obj.name.match(/enemy[\d*]/)) {
            this.kill();
        }
    }

    onTouchMap(obj) {
    };

    kill() {
        window.cancelAnimationFrame(ANIM);

        gameManager.entities = [];
        gameManager.kill(this);
        if (!this.win) {
            gameManager.kill(this, false);
            soundManager.stopAll();
            soundManager.init();
            soundManager.play("/mus/aud3.mp3", {looping: 0, volume: 0.5});
            elem.innerHTML = 'Вы отчислены!';
            elem1.innerHTML = 'Хочу учиться!';
            result.style.display = 'block';
        } else {
            gameManager.kill(this, true, this.countCoins);
        }

        document.getElementById("records").innerHTML = scoreTable.get();

        elem1.onclick = function () {
            gameManager.play();

            this.innerHTML = "";
            elem.innerHTML = "";
        }
    }
}


class Pacman extends Entity {
    constructor() {
        super();
        this.move_x = 3;
        this.move_y = 3;
        this.speed = 10;
        this.goLeft = true;
        this.goIt = 0;
        this.left = "pacman";
        this.right = "pacman";
        this.position = "pacman";
    }

    draw(ctx) {
        spriteManager.drawSprite(ctx, this.position, this.pos_x, this.pos_y - 85);
    }

    update() {
        physicManager.update(this);
    }
}


class Minion extends Entity {
    constructor() {
        super();
        this.move_x = 3;
        this.move_y = 3;
        this.speed = 10;
        this.goLeft = true;
        this.goIt = 0;
        this.left = "minion";
        this.right = "minion";
        this.position = "minion";
    }

    draw(ctx) {
        spriteManager.drawSprite(ctx, this.position, this.pos_x, this.pos_y - 100);
    }

    update() {
        physicManager.update(this);
    }
}

class Book extends Entity {
    constructor() {
        super();
    }

    draw(ctx) {
        spriteManager.drawSprite(ctx, "book", this.pos_x, this.pos_y - 150);
    }

    update() {
        if (this.touch === true) {
            physicManager.update(this);
        }
    }

    kill() {
        gameManager.kill(this);
    }
}


class Plus extends Entity {
    draw() {
        spriteManager.drawSprite(ctx, "plus", this.pos_x, this.pos_y - 100);
    }
}


class Plus extends Entity {
    draw() {
        spriteManager.drawSprite(ctx, "minus", this.pos_x, this.pos_y - 100);
    }
}
