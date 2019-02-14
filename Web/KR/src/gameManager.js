class GameManager {
    constructor() {
        this.factory = {};
        this.entities = [];
        this.coinsNum = 0;
        this.totalScore = 0;
        this.player = null;
        this.levels = {curr: 1, max: 3};
        this.nickname = "";
        this.laterKill = [];
    }


    initPlayer(obj) {
        this.player = obj;
    }

    // убийство любого персонажа
    kill(obj, count) {
        // убить не игрока
        if (obj.type !== "player") {
            this.laterKill.push(obj);
        }
        // если игрок победил / перешел на новый уровень
        if (obj.win) {
            this.totalScore += count;
            document.getElementById("total").innerHTML = gameManager.totalScore;
            // победа
            if (this.levels.curr === this.levels.max) {
                soundManager.stopAll();
                soundManager.init();
                soundManager.play("/music/aud5.mp3", {looping: 0, volume: 0.5});
                scoreTable.add(nickname, obj.countCoins);
                elem.innerHTML = 'Поздравляю! Вы закончили уливерситет!';
                elem1.innerHTML = 'Поступить снова на 1 курс!';
                result.style.display = 'block';
            }
            // новый уровень
            else {
                this.levelUp();
            }
        }
    }


    update() {
        if (this.player === null)
            return;
        this.player.move_x = 0;
        this.player.move_y = 0;

        // вверх
        if (eventManager.action["up"]) {
            this.player.jump = true;
        }

        // влево
        if (eventManager.action["left"]) {
            this.player.move_x = -1;
            this.player.position = this.player.left;
        }

        // вправо
        if (eventManager.action["right"]) {
            this.player.move_x = 1;
            this.player.position = this.player.right;
        }

        // вправо
        if (eventManager.action["fire"]) {
            this.player.fire();
        }
        // обновление персонажей
        this.entities.forEach(function (e) {
            try {
                e.update();
            }
            catch (ex) {
                console.log("" + e.gid + e.type + ex);
            }
        });
        // удаление персонажей
        for (let i = 0; i < this.laterKill.length; i++) {
            let idx = this.entities.indexOf(this.laterKill[i]);
            if (idx > -1)
                this.entities.splice(idx, 1);
        }
        this.laterKill = [];
        mapManager.draw(ctx);
        mapManager.centerAt(this.player.pos_x, this.player.pos_y);
        this.draw(ctx);
    }

    // отрисовка всех персонажей
    draw(ctx) {
        for(let i = 0; i < this.entities.length; i++)
            this.entities[i].draw(ctx);
    }


    loadAll() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mapManager = new MapManager();
        mapManager.loadMap("maps/level" + this.levels.curr + ".json");
        spriteManager.loadAtlas("sprites.json", "spritesheet.png");
        this.factory['player'] = Player;
        this.factory['book'] = Book;
        this.factory['pacman'] = Pacman;
        this.factory['minion'] = Minion;
        this.factory['ball'] = Ball;
        this.factory['plus'] = Plus;
        this.factory['minus'] = Minus;
        mapManager.parseEntities();
        mapManager.draw(ctx);
        eventManager.setup();
        document.getElementById("pCoins").innerHTML = this.totalScore < 0 ? "0" : this.totalScore;
        document.getElementById("total").innerHTML = this.levels.curr;
    }

    // начало игры
    play() {
        this.levels.curr = 1;
        this.totalScore = 0;
        nickname = document.getElementById("nick").value;

        if(nickname.length > 0){
            document.getElementById("myModal").style.display = "none";

            soundManager.init();
            soundManager.loadArray(["/music/aud1.wav","/music/aud2.mp3", "/music/aud3.mp3", "/music/aud6.mp3", "/music/aud5.mp3"]);
            soundManager.play("/music/aud6.mp3", {looping: 1, volume: 0.5});
            this.loadAll();
            updateWorld();
        }
    }

    // переход на новый уровень
    levelUp() {
        this.levels.curr++;
        this.loadAll();
        updateWorld();
        soundManager.play("/music/aud6.mp3", {looping: 1, volume: 0.5});
    }
}
