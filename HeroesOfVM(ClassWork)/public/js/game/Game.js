function Game(options) {
    var options = (options instanceof Object) ? options : {};
    const DOM_ID = options.id;
    const server = options.server;
    const callbacks = options.callbacks;
    width = document.documentElement.clientWidth * 0.62;
    height = document.documentElement.clientHeight * 0.85
    alert(width);
    const canvas = new Canvas(width, height);

    // картинка с травой
    const imgGrass = new Image();
    imgGrass.src = "public/img/sprites/grass_32x32.png";
    // картинка с водой
    const imgWater = new Image();
    imgWater.src = "public/img/sprites/water_32x32.png";
    // картинка с героями
    const imgHero = new Image();
    imgHero.src = "public/img/sprites/hero_45x60.png";
    // картинки с артефактами
    const imgArtifact = new Image();
    imgArtifact.src = "public/img/sprites/artifacts_32x32.png";
    // спрайты здании на карте
    const imgMapBuilding = new Image();
    imgMapBuilding.src = "public/img/sprites/map_buildings_96x64.png";
    // спрайты городов на карте
    const imgTown = new Image();
    imgTown.src = "public/img/sprites/towns_160x160.png";
    // спрайты предметов
    const imgItem = new Image();
    imgItem.src = "public/img/sprites/items_32x32.png";

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
        },
        artifact: {
            img: imgArtifact,
            sprite: [
                { x: 0, y: 0 },
                //...
            ]
        },
        mapBuilding: {
            img: imgMapBuilding,
            sprite: [
                { x: 0, y: 0 },
            ]
        },
        town: {
            img: imgTown,
            sprite: [
                { x: 0, y: 0 },
                { x: 160, y: 0},
                { x: 320, y: 0},
                { x: 480, y: 0}
            ]
        },
        item: {
            img: imgItem,
            sprite: [
                { x: 0, y: 0 },
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
	
    function printArtifactSprite(artifact) {
        if (artifact && artifact.type) {
            const sprite = SPRITES.artifact;
            canvas.sprite(sprite.img,
                sprite.sprite[artifact.type - 0].x, sprite.sprite[artifact.type - 0].y, SIZE, SIZE,
                artifact.x * SIZE, artifact.y * SIZE, SIZE, SIZE);
        }
    }
	
    function printMapBuildingSprite(mapBuilding) {
        if (mapBuilding && mapBuilding.type) {
            const sprite = SPRITES.mapBuilding;
            canvas.sprite(sprite.img,
                sprite.sprite[mapBuilding.type - 0].x, sprite.sprite[mapBuilding.type - 0].y, 96, 64,
                mapBuilding.x * SIZE - 32, mapBuilding.y * SIZE - 32, SIZE + 64, SIZE + 32);
        }
    }
	
    function printTownSprite(town) {
        if(town && town.type) {
            const sprite = SPRITES.town;
            canvas.sprite(sprite.img,
                sprite.sprite[town.type - 0].x, sprite.sprite[town.type - 0].y, 160, 160,
                town.x * SIZE - 64, town.y * SIZE - 128, 160, 160);
        }
    }
	
    function printItemSprite(item) {
        if(item && item.type) {
            const sprite = SPRITES.item;
            canvas.sprite(sprite.img,
                sprite.sprite[item.type - 0].x, sprite.sprite[item.type - 0].y, 32, 32,
                item.x * SIZE, item.y * SIZE, 32, 32);
        }
    }

    function render(struct) {
        canvas.fillRect('black');
        // нарисовать карту
        const map = struct.map;
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                printSprite(map[i][j], i, j);
            }
        }
        // нарисовать артефакты
        struct.artifacts.forEach(artifact => printArtifactSprite(artifact));
        // нарисовать предметы
        struct.items.forEach(item => printItemSprite(item));
        // нарисовать здания на карте
        struct.mapBuildings.forEach(mapBuilding => printMapBuildingSprite(mapBuilding));
        // нарисовать города на карте
        struct.towns.forEach(town => printTownSprite(town));
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
    };

    this.deinit = () => {
        if (interval) {
            clearInterval(interval);
        }
    };
    
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
        $('#moveHeroTopLeft').on('click', async () => {
            const result = await server.moveHero(1, 'UP-LEFT');
            if (result.result) {
                render(result.data);
            }
        });
        $('#moveHeroTopRight').on('click', async () => {
            const result = await server.moveHero(1, 'UP-RIGHT');
            if (result.result) {
                render(result.data);
            }
        });
        $('#moveHeroDownLeft').on('click', async () => {
            const result = await server.moveHero(1, 'DOWN-LEFT');
            if (result.result) {
                render(result.data);
            }
        });
        $('#moveHeroDownRight').on('click', async () => {
            const result = await server.moveHero(1, 'DOWN-RIGHT');
            if (result.result) {
                render(result.data);
            }
        });
    }
    init();
}