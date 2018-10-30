$(document).ready(async () => {

    var canvasHeight = 400;
    var canvasWeight = 300;

    var fieldHeight;
    var fieldWeight;

    const server = new Server();
    const user = new User({ authCallback });
    const canvas = new Canvas(canvasHeight, canvasHeight);

<<<<<<< HEAD
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
=======

    async function authCallback(login, password) {
        const result = await server.login(login, password);
        console.log(result);
    }


    user.auth();


    const img = new Image();
        img.src = "public/img/sprites/grass.png";

    /*const SIZE = 40;
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
    }*/

    function render(struct) {
        // очистить экран
        canvas.fillRect("#d0d0d0");
>>>>>>> cbff924b7de175a5a6eb0d5a73496106be3a4519
        // нарисовать карту
        const map = struct.map;
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
<<<<<<< HEAD
                printSprite(map[i][j].type, i, j);
=======
                //printSprite(map[i][j].type, i, j);
>>>>>>> cbff924b7de175a5a6eb0d5a73496106be3a4519
            }
        }
        // нарисовать строения
        // нарисовать предметы
        // нарисовать юниты
        // нарисовать героев
<<<<<<< HEAD
    }

    // послать запрос на сервер и отрисовать полученные данные
    const result = await server.getStruct();
    if (result.result) {
        render(result.data);
=======
>>>>>>> cbff924b7de175a5a6eb0d5a73496106be3a4519
    }

    // послать запрос на сервер и отрисовать полученные данные
    const result = await server.getStruct();
    //console.log(result);
    canvas.sprite(img, 32, 32, 32, 32, 0, 0, 32, 32);
    canvas.sprite(img, 128, 32, 32, 32, 32, 0, 32, 32);
    canvas.sprite(img, 0, 0, 32, 32, 64, 0, 32, 32);
    canvas.sprite(img, 0, 0, 32, 32, 128, 0, 32, 32);
    canvas.sprite(img, 0, 0, 32, 32, 160, 0, 32, 32);
});
