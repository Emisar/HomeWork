function Game(options) {
    var options = (options instanceof Object) ? options : {};
    const DOM_ID = options.id;
    const server = options.server;
    const callbacks = options.callbacks;
    width = document.documentElement.clientWidth * 0.62;
    height = document.documentElement.clientHeight * 0.85;
    var TurnColor;
    var name = document.getElementById("name");
    var movePoints = document.getElementById("move_points");
    var gold = document.getElementById("gold");
    var wood = document.getElementById("wood");
    var ore = document.getElementById("ore");
    var idGamer; 
    var invActive = false;
    const canvas = new Canvas(width, height, 'game-field');
    const canvasInv = new Canvas(600, 600, 'inv-screen');
    const canvasUI = new Canvas(width,height, 'gameUI');
    var dataStruct;
    var activeHero;
    var heroUpdate;
    var activeDescription = false;


    const imgBand = new Image();
    canvasInv.fillRect('brown');
    // картинка с травой
    const imgGrass = new Image();
    imgGrass.src = "public/img/sprites/Grass.png";
    // картинка с грязью
    const imgDirt = new Image();
    imgDirt.src = "public/img/sprites/Dirt.png";
    // картинка с горной местностью
    const imgLands = new Image();
    imgLands.src = "public/img/sprites/Highlands.png";
    // картинка с лавой
    const imgLava = new Image();
    imgLava.src = "public/img/sprites/Lava.png";
    // картинка с грубостью
    const imgRough = new Image();
    imgRough.src = "public/img/sprites/Rough.png";
    // картинка с песком
    const imgSand = new Image();
    imgSand.src = "public/img/sprites/Sand.png";
    // картинка с тёмным песком
    const imgDarkSand = new Image();
    imgDarkSand.src = "public/img/sprites/Subterranean.png";
    // картинка со снегом
    const imgSnow = new Image();
    imgSnow.src = "public/img/sprites/Snow.png";
    // картинка с болотом
    const imgSwamp = new Image();
    imgSwamp.src = "public/img/sprites/Swamp.png";
    // картинка с водой
    const imgWater = new Image();
    imgWater.src = "public/img/sprites/Water.png";
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
    const stdSprite = [ //Стандартная картинка со спрайтом 160*64
        { x: 0, y: 0 },
        { x: SIZE, y: 0 },
        { x: SIZE*2, y: 0 },
        { x: SIZE*3, y: 0 },
        { x: SIZE*4, y: 0 },
        { x: 0, y: SIZE },
        { x: SIZE, y: SIZE },
        { x: SIZE*2, y: SIZE },
        { x: SIZE*3, y: SIZE },
        { x: SIZE*4, y: SIZE }
    ];
    const SPRITES = {
        grass: {
            img: imgGrass,
            sprite: stdSprite
        },
        dirt: {
            img: imgDirt,
            sprite: stdSprite
        },
        lands: {
            img: imgLands,
            sprite: stdSprite
        },
        lava: {
            img: imgLava,
            sprite: stdSprite
        },
        rough: {
            img: imgRough,
            sprite: stdSprite
        },
        sand: {
            img: imgSand,
            sprite: stdSprite
        },
        darkSand: {
            img: imgDarkSand,
            sprite: [
                { x: 0, y: 0 },
                { x: SIZE, y: 0 },
                { x: SIZE*2, y: 0 },
                { x: 0, y: SIZE },
                { x: SIZE, y: SIZE },
                { x: SIZE*2, y: SIZE },
            ]
        },
        snow: {
            img: imgSnow,
            sprite: stdSprite
        },
        swamp: {
            img: imgSwamp,
            sprite: stdSprite
        },
        water: {
            img: imgWater,
            sprite: stdSprite
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
                { x: 0, y: 0   },
                { x: 0, y: 32  },
                { x: 0, y: 64  },
                { x: 0, y: 96  },
                { x: 0, y: 127 },
                { x: 0, y: 160 },
                { x: 0, y: 192 },
                { x: 0, y: 224 },
                { x: 0, y: 256 },
                { x: 0, y: 289 }
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

    function printArtifactBackpack(artifact, i, j) {
        if (artifact && artifact.type) {
            const sprite = SPRITES.artifact;
            canvasInv.sprite(sprite.img,
                sprite.sprite[artifact.type - 0].x, sprite.sprite[artifact.type - 0].y, SIZE, SIZE,
                25 + 100 * i, 25 + 100 * j, 50, 50);
        }
    }

    function printHeadBand(x,y, color) {
            canvasUI.rect(x, y , 32, 32 , color);
        }


    function drawInventoryGrid() {
        canvasInv.line(301, 0, 301, 600, 'yellow');
        for (var i = 1; i <= 2; i++) {
            canvasInv.line(i * 100, 0, i * 100, 600, 'yellow');
        }
        for (var i = 1; i <= 5; i++) {
            canvasInv.line(0, i * 100, 301, i * 100, 'yellow');
        }
    }

    function drawRightInventoryGrid() {
        canvasInv.line(400, 140, 500, 140, 'yellow');
        canvasInv.line(500, 140, 540, 230, 'yellow');
        canvasInv.line(400, 140, 360, 230, 'yellow');
        canvasInv.line(450, 125, 450, 320, 'yellow');
        canvasInv.line(450, 320, 390, 470, 'yellow');
        canvasInv.line(450, 320, 510, 470, 'yellow');
        canvasInv.circle(450, 90, 35, 'yellow');
        //gloveses
        canvasInv.fillSmallRect(320, 90, 60, 60, 'brown');
        drawCellInventory(350, 120);
        canvasInv.fillSmallRect(420, 60, 60, 60, 'brown');
        drawCellInventory(450, 90); // голова
        canvasInv.fillSmallRect(330, 200, 60, 60, 'brown');
        drawCellInventory(360, 230); // левая рука
        canvasInv.fillSmallRect(510, 200, 60, 60, 'brown');
        drawCellInventory(540, 230); // правая рука
        canvasInv.fillSmallRect(420, 190, 60, 60, 'brown');
        drawCellInventory(450, 220); // грудь
        canvasInv.fillSmallRect(420, 440, 60, 60, 'brown');
        drawCellInventory(450, 470); // левая нога
        drawCellInventory(540, 70);  // плащ
        drawCellInventory(450, 550); // ожерелье
        drawCellInventory(375, 550); // кольцо 1
        drawCellInventory(525, 550); // кольцо 2
    }

    function drawCellInventory(x, y) {
        canvasInv.line(x - 30, y - 30, x + 30, y - 30, 'yellow');
        canvasInv.line(x - 30, y - 30, x - 30, y + 30, 'yellow');
        canvasInv.line(x - 30, y + 30, x + 30, y + 30, 'yellow');
        canvasInv.line(x + 30, y - 30, x + 30, y + 30, 'yellow');
    }

    function printDescription(x, y, xPos, yPos) {
        console.log(activeHero);
        canvasInv.fillSmallRect(xPos * 100, yPos * 100, 300, 200, 'rgba(0, 0, 0, 0.7)');
        canvasInv.rect(xPos * 100, yPos * 100, 300, 200, 'white');
        canvasInv.text(activeHero.backpack[x + y * 3].name, xPos * 100 + 10, yPos * 100 + 20, 'yellow', 20);
        canvasInv.text('Урон: ' + activeHero.backpack[x + y * 3].properties.attack, xPos * 100 + 20, yPos * 100 + 35 + 5, "white", 14);
        canvasInv.text('Защита ' + activeHero.backpack[x + y* 3].properties.defence, xPos * 100 + 20, yPos * 100 +  50 + 5, "white", 14);
        canvasInv.text('Магический урон: ' + activeHero.backpack[x + y * 3].properties.spellPower, xPos * 100 + 20, yPos * 100 + 65 + 5, "white", 14);
        canvasInv.text('Интеллект: ' + activeHero.backpack[x + y * 3].properties.knowledge, xPos * 100 + 20, yPos * 100 + 80 + 5, "white", 14);
        canvasInv.text('Очки хода: ' + activeHero.backpack[x + y * 3].properties.movePoints, xPos * 100 + 20, yPos * 100 + 95 + 5, "white", 14);
        canvasInv.text('Мана: ' + activeHero.backpack[x + y * 3].properties.manaPoints, xPos * 100 + 20, yPos * 100 + 110 + 5, "white", 14);
        canvasInv.text(activeHero.backpack[x + y * 3].description, xPos * 100 + 10, yPos * 100 + 150, 'violet', 14);
    }

    function fillInv(color) {
        canvasInv.fillSmallRect(0, 0, 300, 600, "brown");
    }

    function setUserResources() {
        if (dataStruct){
            idGamer = server.getUserId();
            for (var i = 0; i < dataStruct.gamers.length; i++) {
                if(dataStruct.gamers[i].isActive == 1) {
                    $('#activePlayer').text(function(color) {
                        return "You in " + dataStruct.gamers[idGamer - 1].color + " team"; 
                    });
                    TurnColor = dataStruct.gamers[i].color;
                }
                if(dataStruct.gamers[i].id == idGamer) {
                    ore.textContent  = 'Рудишко : '   + dataStruct.gamers[i].resources.ore;
                    wood.textContent = 'Древесина : ' + dataStruct.gamers[i].resources.wood;
                    gold.textContent = 'Золотишко : ' + dataStruct.gamers[i].resources.gold;
                }
            }
        } else {
            console.log('Йа туд!!!', dataStruct);
        }
    }

    function setHeroInfo(activeHero) {
        if(activeHero) {
            name.textContent       = 'Имя : ' + activeHero.name;
            movePoints.textContent = 'Очки хода : ' + activeHero.properties.movePoints;
        } else {
            name.textContent="Имя : ";
            movePoints.textContent = 'Очки хода : ';
        }
    }

    function setInventory() {
        var x = 0;
        var y = 0;
        for (var i = 0; i < dataStruct.heroes.length; i++) {
            if (activeHero && dataStruct.heroes[i].id == activeHero.id && idGamer && activeHero.id == idGamer) {
                dataStruct.heroes[i].backpack.forEach(function(artifact) {
                    if (x == 3) {
                        x = 0;
                        y++;
                    }
                    printArtifactBackpack(artifact, x, y);
                    x++;
                });
            }
        }
    }


    


 
    // drawCellInventory(375, 550); // кольцо 1
    // drawCellInventory(525, 550); // кольцо 2

    function drawInvBody() {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.body != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.body.type - 0].x, sprite.sprite
                    [activeHero.inventory.body.type - 0].y, SIZE, SIZE, 430, 200, 40, 40);
            }
        }
    }

    function drawInvCloak() {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.cloak != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.cloak.type - 0].x, sprite.sprite
                    [activeHero.inventory.cloak.type - 0].y, SIZE, SIZE, 520, 50, 40, 40);
            }
        }
    }
    function drawInvFeet() {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.feet != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.feet.type - 0].x, sprite.sprite
                    [activeHero.inventory.feet.type - 0].y, SIZE, SIZE, 430, 450, 40, 40);
            }
        }
    }
    function drawInvGloves() {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.gloves != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.gloves.type - 0].x, sprite.sprite
                    [activeHero.inventory.gloves.type - 0].y, SIZE, SIZE, 330, 100, 40, 40);
            }
        }
    }
    function drawInvHead() {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.head != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.head.type - 0].x, sprite.sprite
                    [activeHero.inventory.head.type - 0].y, SIZE, SIZE, 430, 70, 40, 40);
            }
        }
    }
    function drawInvRightHand() {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.rightHand != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.rightHand.type - 0].x, sprite.sprite
                    [activeHero.inventory.rightHand.type - 0].y, SIZE, SIZE, 340, 210, 40, 40);
            }
        }
    }
    function drawInvNeck() {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.neck != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.neck.type - 0].x, sprite.sprite
                    [activeHero.inventory.neck.type - 0].y, SIZE, SIZE, 430, 530, 40, 40);
            }
        }
    }
    function drawInvLeftHand() {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.leftHand != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.leftHand.type - 0].x, sprite.sprite
                    [activeHero.inventory.leftHand.type - 0].y, SIZE, SIZE, 520, 210, 40, 40);
            }
        }
    }
    function drawInvRingOne() {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.ringOne != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.ringOne.type - 0].x, sprite.sprite
                    [activeHero.inventory.ringOne.type - 0].y, SIZE, SIZE, 355, 530, 40, 40);
            }
        }
    }
    function drawInvRingTwo() {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.ringTwo != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.ringTwo.type - 0].x, sprite.sprite
                    [activeHero.inventory.ringTwo.type - 0].y, SIZE, SIZE, 505, 530, 40, 40);
            }
        }
    }

    function render(struct) {
        canvas.clearRect();
        setHeroInfo(activeHero);
        setUserResources();
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
        struct.buildings.forEach(building => printMapBuildingSprite(building));
        // нарисовать города на карте
        struct.towns.forEach(town => printTownSprite(town));
        // нарисовать героев
        struct.heroes.forEach(hero => printHeroSprite(hero));
        // отрисовка экипировки
        drawRightInventoryGrid();
        drawInvGloves();
        drawInvHead();
        drawInvRightHand();
        drawInvNeck();
        drawInvLeftHand();
        drawInvRingOne();
        drawInvRingTwo();
        drawInvBody();
        drawInvCloak();
        drawInvFeet();
    }

    this.show = () => $(DOM_ID).show();
    this.hide = () => $(DOM_ID).hide();

    async function refreshData() {
        // послать запрос на сервер и отрисовать полученные данные
        const result = await server.getStruct();
        if (result.result) {
            canvasUI.clearRect();
            dataStruct = result.data;
            activeHero = dataStruct.heroes[heroUpdate];
            console.log(dataStruct);
            if (typeof activeHero != "undefined"){
                printHeadBand(-5+32*activeHero.x,0+32*activeHero.y, TurnColor);
            }
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
            if(typeof activeHero != "undefined") {
            const result = await server.moveHero(activeHero.id, 'LEFT');
            if (result.result) {
                render(result.data);
            }
        } else {alert("Выбери героя!!!");}
    });
        $('#moveHeroRight').on('click', async () => {
            if(typeof activeHero != "undefined") {
                const result = await server.moveHero(activeHero.id, 'RIGHT');
                if (result.result) {
                    render(result.data);
                }
            } else {alert("Выбери героя!!!");}
        });
         $('#moveHeroUp').on('click', async () => {
            if(typeof activeHero != "undefined") {
            const result = await server.moveHero(activeHero.id, 'UP');
            if (result.result) {
                render(result.data);
            }
        } else {alert("Выбери героя!!!");}
    });

         $('#moveHeroDown').on('click', async () => {
            if(typeof activeHero != "undefined") {
            const result = await server.moveHero(activeHero.id, 'DOWN');
            if (result.result) {
                render(result.data);
            }
        } else {alert("Выбери героя!!!");}
    });
        $('#moveHeroTopLeft').on('click', async () => {
            if(typeof activeHero != "undefined") {
            const result = await server.moveHero(activeHero.id, 'UP-LEFT');
            if (result.result) {
                render(result.data);
            }
        } else {alert("Выбери героя!!!");}
    });

        $('#moveHeroTopRight').on('click', async () => {
            if(typeof activeHero != "undefined") {
            const result = await server.moveHero(activeHero.id, 'UP-RIGHT');
            if (result.result) {
                render(result.data);
            }
        } else {alert("Выбери героя!!!");}
    });

        $('#moveHeroDownLeft').on('click', async () => {
            if(typeof activeHero != "undefined") {
            const result = await server.moveHero(activeHero.id, 'DOWN-LEFT');
            if (result.result) {
                render(result.data);
            }
        } else {alert("Выбери героя!!!");}
    });
        $('#moveHeroDownRight').on('click', async () => {
            if(typeof activeHero != "undefined") {
            const result = await server.moveHero(activeHero.id, 'DOWN-RIGHT');
            if (result.result) {
                render(result.data);
            }
        } else {alert("Выбери героя!!!");}
    });

        $('#inventory').on('click', async() => {
            if (invActive == false) {
                canvasInv.fillRect('brown');
                drawInventoryGrid();
                drawRightInventoryGrid();
                setInventory();
                document.getElementById('inv-screen').style.display = 'block';
                invActive = true;
            } else {
                document.getElementById('inv-screen').style.display = 'none';
                invActive = false;
            }
        });
        //Береженого бог бережет(Выпилить после добавления адаптивности)
        $('#game-field').on('click', async(canvas) => {
            var x = Math.floor(canvas.offsetX / 32);
            var y = Math.floor(canvas.offsetY / 32);
            console.log(x, y);
            for (var i = 0; i < dataStruct.heroes.length; i++) {
                if (x == dataStruct.heroes[i].x && y == dataStruct.heroes[i].y) {
                    heroUpdate = i;
                    activeHero = dataStruct.heroes[i];
                }
            console.log(activeHero);
            }
        });

        $('#inv-screen').on('dblclick', async(canvasInv) => {
            var x = Math.floor(canvasInv.offsetX / 100);
            var y = Math.floor(canvasInv.offsetY / 100);
            if (activeHero.backpack[x + y * 3]) {
                if (x <= 2 && y <= 6 && x >= 0 && y >= 0) {
                    const result = await server.equipArtifact(activeHero.id, activeHero.backpack[x + y * 3].id);
                    if (result.result) {
                        render(result.data);
                    }
                }
            }
            setInventory();
        });

        $('#inv-screen').on('mousemove', async(canvasInv) => {
        var x = xPos= Math.floor(canvasInv.offsetX / 100);
        var y = yPos= Math.floor(canvasInv.offsetY / 100);
        fillInv('brown');
        setInventory();
        drawInventoryGrid();
        if (activeHero.backpack[x + y * 3]) {
            if (x <= 2 && y <= 6 && x >= 0 && y >= 0) {
                if (y == 5 && x == 1) {
                    printDescription(x, y, 0, 4);
                } else {
                    printDescription(x, y, 0, y);
                }
            }
        }
    });

        $('#gameUI').on('click', async(canvas) => {
            var x = Math.floor(canvas.offsetX / 32);
            var y = Math.floor(canvas.offsetY / 32);
            console.log(x, y);
            for (var i = 0; i < dataStruct.heroes.length; i++) {
                if (x == dataStruct.heroes[i].x && y == dataStruct.heroes[i].y) {
                    heroUpdate = i;
                    activeHero = dataStruct.heroes[i];
                }
            }
        });
    }
    init();
}