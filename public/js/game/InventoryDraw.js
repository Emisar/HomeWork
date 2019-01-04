function CanvasInv() {
    const canvasInv = new Canvas(600, 600, 'inv-screen');

    this.getCanvas = function () {
        return canvasInv;
    };

    this.getOffsetX = function () {
        var a = canvasInv.offsetX;

        console.log(canvasInv.offsetX);
        return a;
    };

    this.getOffsetY = function () {
        var a = canvasInv.offsetY;
        console.log(a);
        return a;
    };

    this.drawInventoryGrid = function() {
        canvasInv.line(301, 0, 301, 600, 'yellow');
        for (var i = 1; i <= 2; i++) {
            canvasInv.line(i * 100, 0, i * 100, 600, 'yellow');
        }
        for (var i = 1; i <= 5; i++) {
            canvasInv.line(0, i * 100, 301, i * 100, 'yellow');
        }
    };

    this.drawRightInventoryGrid = function() {
        canvasInv.line(400, 140, 500, 140, 'yellow');
        canvasInv.line(500, 140, 540, 230, 'yellow');
        canvasInv.line(400, 140, 360, 230, 'yellow');
        canvasInv.line(450, 125, 450, 320, 'yellow');
        canvasInv.line(450, 320, 390, 470, 'yellow');
        canvasInv.line(450, 320, 510, 470, 'yellow');
        canvasInv.circle(450, 90, 35, 'yellow');

        canvasInv.fillSmallRect(320, 90, 60, 60, 'brown');
        this.drawCellInventory(350, 120);
        canvasInv.fillSmallRect(420, 60, 60, 60, 'brown');
        this.drawCellInventory(450, 90); // голова
        canvasInv.fillSmallRect(330, 200, 60, 60, 'brown');
        this.drawCellInventory(360, 230); // левая рука
        canvasInv.fillSmallRect(510, 200, 60, 60, 'brown');
        this.drawCellInventory(540, 230); // правая рука
        canvasInv.fillSmallRect(420, 190, 60, 60, 'brown');
        this.drawCellInventory(450, 220); // грудь
        canvasInv.fillSmallRect(420, 440, 60, 60, 'brown');
        this.drawCellInventory(450, 470); // левая нога
        this.drawCellInventory(540, 70);  // плащ
        this.drawCellInventory(450, 550); // ожерелье
        this.drawCellInventory(375, 550); // кольцо 1
        this.drawCellInventory(525, 550); // кольцо 2
    };

    this.drawCellInventory = function(x, y) {
        canvasInv.line(x - 30, y - 30, x + 30, y - 30, 'yellow');
        canvasInv.line(x - 30, y - 30, x - 30, y + 30, 'yellow');
        canvasInv.line(x - 30, y + 30, x + 30, y + 30, 'yellow');
        canvasInv.line(x + 30, y - 30, x + 30, y + 30, 'yellow');
    };

    this.printDescription = function(x, y, xPos, yPos, activeHero) {
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
    };

    //накопироватьть на все шмотки
    this.printLeftDescription = function(x, y, clothType, activeHero) {
        canvasInv.fillSmallRect(x, y, 299, 200, 'rgba(0, 0, 0, 0.7)');
        canvasInv.rect(x, y, 299, 200, 'white');
        canvasInv.text(activeHero.inventory[clothType].name, x + 10, y + 30, 'yellow', 20);
        canvasInv.text('Урон: ' + activeHero.inventory[clothType].properties.attack, x + 20 , y + 35 + 20  + 5, "white", 14);
        canvasInv.text('Защита ' + activeHero.inventory[clothType].properties.defence, x + 20 , y +  50 + 20  + 5, "white", 14);
        canvasInv.text('Магический урон: ' + activeHero.inventory[clothType].properties.spellPower, x + 20,  y + 20  + 65 + 5, "white", 14);
        canvasInv.text('Интеллект: ' + activeHero.inventory[clothType].properties.knowledge, x + 20 , y + 80 + 20  + 5, "white", 14);
        canvasInv.text('Очки хода: ' + activeHero.inventory[clothType].properties.movePoints, x + 20 , y + 95 + 20  + 5, "white", 14);
        canvasInv.text('Мана: ' + activeHero.inventory[clothType].properties.manaPoints, x + 20 , y + 110  + 20 + 5, "white", 14);
        canvasInv.text(activeHero.inventory[clothType].description, x + 10, y + 150 + 20 , 'violet', 14);
    };

    this.printInventoryDescription = function(x, y, activeHero) {
        canvasInv.fillSmallRect(x , y , 300, 200, 'rgba(0, 0, 0, 0.7)');
    }

    this.fillInv = function() {
        canvasInv.fillSmallRect(0, 0, 300, 600, "brown");
    };
    this.fillRightInv = function() {
        canvasInv.fillSmallRect(302, 0, 600, 600, "brown");
    }

    this.setFillRect = function () {
        canvasInv.fillRect("brown");
    };

    this.setInventory = function(dataStruct, activeHero, SPRITES, idGamer, SIZE) {
        var x = 0;
        var y = 0;
        for (var i = 0; i < dataStruct.heroes.length; i++) {
            if (activeHero && dataStruct.heroes[i].id == activeHero.id && idGamer && activeHero.id == idGamer) {
                dataStruct.heroes[i].backpack.forEach(function(artifact) {
                    if (x == 3) {
                        x = 0;
                        y++;
                    }
                    printArtifactBackpack(artifact, x, y, SPRITES, SIZE);
                    x++;
                });
            }
        }
    };

    this.drawInvBody = function(activeHero, SIZE, SPRITES) {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.body != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.body.type - 0].x, sprite.sprite
                        [activeHero.inventory.body.type - 0].y, SIZE, SIZE, 430, 200, 40, 40);
            }
        }
    };

    this.drawInvCloak = function(activeHero, SIZE, SPRITES) {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.cloak != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.cloak.type - 0].x, sprite.sprite
                        [activeHero.inventory.cloak.type - 0].y, SIZE, SIZE, 520, 50, 40, 40);
            }
        }
    };

    this.drawInvFeet = function(activeHero, SIZE, SPRITES) {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.feet != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.feet.type - 0].x, sprite.sprite
                        [activeHero.inventory.feet.type - 0].y, SIZE, SIZE, 430, 450, 40, 40);
            }
        }
    };

    this.drawInvGloves = function(activeHero, SIZE, SPRITES) {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.gloves != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.gloves.type - 0].x, sprite.sprite
                        [activeHero.inventory.gloves.type - 0].y, SIZE, SIZE, 330, 100, 40, 40);
            }
        }
    };

    this.drawInvHead = function(activeHero, SIZE, SPRITES) {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.head != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.head.type - 0].x, sprite.sprite
                        [activeHero.inventory.head.type - 0].y, SIZE, SIZE, 430, 70, 40, 40);
            }
        }
    };

    this.drawInvRightHand = function(activeHero, SIZE, SPRITES) {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.rightHand != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.rightHand.type - 0].x, sprite.sprite
                        [activeHero.inventory.rightHand.type - 0].y, SIZE, SIZE, 340, 210, 40, 40);
            }
        }
    };

    this.drawInvNeck = function(activeHero, SIZE, SPRITES) {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.neck != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.neck.type - 0].x, sprite.sprite
                        [activeHero.inventory.neck.type - 0].y, SIZE, SIZE, 430, 530, 40, 40);
            }
        }
    };

    this.drawInvLeftHand = function(activeHero, SIZE, SPRITES) {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.leftHand != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.leftHand.type - 0].x, sprite.sprite
                        [activeHero.inventory.leftHand.type - 0].y, SIZE, SIZE, 520, 210, 40, 40);
            }
        }
    };

    this.drawInvRingOne = function(activeHero, SIZE, SPRITES) {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.ringOne != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.ringOne.type - 0].x, sprite.sprite
                        [activeHero.inventory.ringOne.type - 0].y, SIZE, SIZE, 355, 530, 40, 40);
            }
        }
    };

    this.drawInvRingTwo = function(activeHero, SIZE, SPRITES) {
        if(typeof activeHero !== 'undefined') {
            if(activeHero.inventory.ringTwo != null) {
                const sprite = SPRITES.artifact;
                canvasInv.sprite(sprite.img,
                    sprite.sprite[activeHero.inventory.ringTwo.type - 0].x, sprite.sprite
                        [activeHero.inventory.ringTwo.type - 0].y, SIZE, SIZE, 505, 530, 40, 40);
            }
        }
    };

    function printArtifactBackpack(artifact, i, j, SPRITES, SIZE) {
        if (artifact && artifact.type) {
            const sprite = SPRITES.artifact;
            canvasInv.sprite(sprite.img,
                sprite.sprite[artifact.type - 0].x, sprite.sprite[artifact.type - 0].y, SIZE, SIZE,
                25 + 100 * i, 25 + 100 * j, 50, 50);
        }
    }
}

