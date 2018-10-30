$(document).ready(async () => {
    const server = new Server();
    const user = new User({ authCallback });
    const canvas = new Canvas(400, 300);


    async function authCallback(login, password) {
        const result = await server.login(login, password);
        console.log(result);
    }


    user.auth();


    const img = new Image();
        img.src = "public/img/heroes.png";

    const SIZE = 40;
    const SPRITE = {
        grass: { x: 0, y: 0 },
        water: { x: SIZE, y: 0 }
    };
    function printSprite(type, x, y) {
        if (type && SPRITE[type]) {
            canvas.sprite(img,
                SPRITE[type].x, SPRITE[type].y, SIZE, SIZE,
                x * SIZE, y * SIZE, SIZE, SIZE);
        }
    }

    function render(struct) {
        // очистить экран
        canvas.fillRect('yellow');
        // нарисовать карту
        const map = struct.map;
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                printSprite(map[i][j].type, i, j);
            }
        }
        // нарисовать строения
        // нарисовать предметы
        // нарисовать юниты
        // нарисовать героев
    }

    // послать запрос на сервер и отрисовать полученные данные
    const result = await server.getStruct();
    if (result.result) {
        render(result.data);
    }
});