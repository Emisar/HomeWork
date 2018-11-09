function Game(options) {
    var options = (options instanceof Object) ? options : {};
    const DOM_ID = options.id;
    const server = options.server;
    const callbacks = options.callbacks;

    const canvas = new Canvas(400, 300);

    // картинка с травой
    const imgGrass = new Image();
    imgGrass.src = "public/img/sprites/grass_32x32.png";
    // картинка с водой
    const imgWater = new Image();
    imgWater.src = "public/img/sprites/water_32x32.png";
    // картинка с героями
    const imgHero = new Image();
    imgHero.src = "public/img/sprites/hero_45x60.png"

    const SIZE = 32;
    const SPRITES = {
        grass: {
            img: imgGrass,
            sprite: [
                { x: 0, y: 0 },
                { x: SIZE, y: 0 }
            ]
        },
        water: {
            img: imgWater,
            sprite: [
                { x: 0, y: 0 },
                { x: SIZE, y: 0 },
                { x: SIZE, y: SIZE }
            ]
        },
        hero: {
            img: imgHero,
            sprite: [
                { x: 0, y: 0 },
                //...
            ]
        }
    };

    let interval = null;

    function printSprite(tile, x, y) {
        if (tile && tile.type && tile.sprite) {
            const sprite = SPRITES[tile.type];
            canvas.sprite(sprite.img,
                sprite.sprite[tile.sprite - 0].x, sprite.sprite[tile.sprite - 0].y, SIZE, SIZE,
                x * SIZE, y * SIZE, SIZE, SIZE);
        }
    }

    function printHeroSprite(hero) {
        if (hero && hero.type) {
            const sprite = SPRITES.hero;
            canvas.sprite(sprite.img,
                sprite.sprite[hero.type - 0].x, sprite.sprite[hero.type - 0].y, 45, 60,
                hero.x * SIZE, hero.y * SIZE - (60 - SIZE), 45, 60);
        }
    }

    function render(struct) {
        canvas.fillRect('yellow');
        // нарисовать карту
        const map = struct.map;
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                printSprite(map[i][j], i, j);
            }
        }
        // нарисовать всё остальное
        //...
        // нарисовать героев
        struct.heroes.forEach(hero => printHeroSprite(hero));
    }

    this.show = () => $(DOM_ID).show();
    this.hide = () => $(DOM_ID).hide();

    async function refreshData() {
        // послать запрос на сервер и отрисовать полученные данные
        const result = await server.getStruct();
        if (result.result) {
            render(result.data);
        }
    }

    this.init = () => {
        refreshData();
        this.deinit();
        interval = setInterval(refreshData, 1000);
    }

    this.deinit = () => {
        if (interval) {
            clearInterval(interval);
        }
    }
    
    function init() {
        $('#endTurn').on('click', async () => {
            const result = await server.endTurn();
            if (result.result) {
                render(result.data);
            }
        });
                $('#moveHeroLeft').on('click', async () => {
            const result = await server.moveHero(1, 'LEFT');
            if (result.result) {
                render(result.data);
            }
        });
                $('#moveHeroRight').on('click', async () => {
            const result = await server.moveHero(1, 'RIGHT');
            if (result.result) {
                render(result.data);
            }
        });

                 $('#moveHeroUp').on('click', async () => {
            const result = await server.moveHero(1, 'UP');
            if (result.result) {
                render(result.data);
            }
        });
                 $('#moveHeroDown').on('click', async () => {
            const result = await server.moveHero(1, 'DOWN');
            if (result.result) {
                render(result.data);
            }
        });
    }
    init();
}