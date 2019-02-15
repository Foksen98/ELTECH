const SPACE = 16;
const JUMP = 10;
const FALL = 25;


class PhysicManager {
    // обработка движений игрока
    updatePlayer(obj) {
        // на месте
        if (obj.move_x === 0 && obj.jump === false) {
            // проверка на яму
            let ts = mapManager.getTilesetIdx(obj.pos_x + obj.size_x / 2, obj.pos_y + obj.size_y + SPACE);
            if (ts === 0) {
                obj.pos_y += FALL
            }
            return "stop";
        }

        // движение влево / вправо / вверх
        // новые координаты игрока
        let newX = obj.pos_x + obj.move_x * obj.speed
        let newY = obj.pos_y;
        if (obj.jump === true) {
            // проверка на прыжок из пустоты
            let ts = mapManager.getTilesetIdx(obj.pos_x + obj.size_x / 2, obj.pos_y + obj.size_y + SPACE);
            if (ts !== 0) {
              newY -= JUMP * obj.speed;
            }
            obj.jump = false;
        }
        // проверка на препятствие
        for (let i = 0; i < Math.round(obj.size_y / mapManager.tSize.y); i++) {
            let ts = mapManager.getTilesetIdx(newX + obj.size_x / 2, newY + (i + 0.5) * mapManager.tSize.y);
            if (ts !== 0) {
                return "stop";
            }
        }
        // проверка на яму
        let ts = mapManager.getTilesetIdx(newX + obj.size_x / 2, newY + obj.size_y + SPACE);
        if (ts === 0) {
            newY += FALL;
        }
        // проверка на врага
        let e = this.entityAtXY(obj, newX, obj.pos_y);
        if (e !== null) {
            obj.onTouchEntity(e);
        }

        obj.pos_x = newX;
        obj.pos_y = newY;
        return "move";
    }


    // обработка движений врагов
    updateEnemy(obj) {
        if (obj.steps == obj.distance) {
            if (obj.move_x === 1) {
                obj.position = obj.left;
            }
            else {
                obj.position = obj.right;
            }
            obj.move_x *= -1;
            obj.steps = 0;
        }
        let newX = obj.pos_x + obj.move_x * obj.speed;
        // проверка на препятствие
        for (let i = 0; i < Math.round(obj.size_y / mapManager.tSize.y); i++) {
            let ts = mapManager.getTilesetIdx(newX + obj.size_x / 2, obj.pos_y + (i + 0.5) * mapManager.tSize.y);
            if (ts !== 0) {
                if (obj.move_x === 1) {
                    obj.position = obj.left;
                }
                else {
                    obj.position = obj.right;
                }
                obj.move_x *= -1;
                obj.steps = 0;
                return "stop";
            }
        }

        obj.pos_x = newX;
        obj.steps += 1;
        return "move";
    }


    // обработка движений мячей
    updateBall(obj) {
        if (obj.steps == obj.distance) {
            obj.kill(null);
            return "stop";
        }
        let newX = obj.pos_x + obj.move_x * obj.speed;
        // проверка на препятствие
        let ts = mapManager.getTilesetIdx(newX + obj.size_x / 2, obj.pos_y + obj.size_y / 2);
        if (ts !== 0) {
            obj.kill(null);
            return "stop";
        }
        // проверка на врага
        let e = this.entityAtXY(obj, newX, obj.pos_y);
        if (e !== null && (e.type === 'pacman' || e.type === 'minion')) {
            obj.kill(e);
        }

        obj.pos_x = newX;
        obj.steps += 1;
        return "move";
    }


    // поиск объекта по координатам
    entityAtXY(obj, x, y) {
        for (let i = 0; i < gameManager.entities.length; i++) {
            let e = gameManager.entities[i];
            if (e.type !== obj.type) {
                if (x + obj.size_x < e.pos_x || y + obj.size_y < e.pos_y || x > e.pos_x + e.size_x  || y > e.pos_y + e.size_y)
                    continue;
                return e;
            }
        }
        return null;
    }
}
