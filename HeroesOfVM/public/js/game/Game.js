function Game(options) {
    var options = (options instanceof Object) ? options : {};
    const DOM_ID = options.id;
    const server = options.server;
    const callbacks = options.callbacks;

    const canvas = new Canvas(400, 300);

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
        canvas.fillRect('yellow');
        const map = struct.map;
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                printSprite(map[i][j].type, i, j);
            }
        }
    }

    this.show = async () => {
        $(DOM_ID).show();
        // послать запрос на сервер и отрисовать полученные данные
        const result = await server.getStruct();
        if (result.result) {
            render(result.data);
        }
    };
    this.hide = () => $(DOM_ID).hide();
}