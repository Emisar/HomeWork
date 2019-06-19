import React, {Component} from 'react'
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

class GameScreenComponent extends Component {
    constructor(props) {
        super(props);   
        this.socket = props.socket();
        this.EVENT = props.socketEvent();
        this.socket.on(this.EVENT.UPDATE_SCENE, (data) => this.updateScene(data));
        this.fullscreen = false;
        this.booms = {};
        this.bombs = {};
        document.addEventListener("keydown", event => this.keyDown(event));
        window.addEventListener('resize', () => {
            this.width = window.innerWidth * 0.8;
            this.height = window.innerHeight * 0.95;
            this.renderer.setSize(this.width, this.height)
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
        });
    }


    // юзер нажал на клавишу управления (стрелочку)
    keyDown(event) {
        const token = localStorage.getItem("token");
        let move; 
        switch(event.keyCode) {
            case 37: // Left Arrow
            case 65: // A
                move = "LEFT";
                break;
            case 39: // Right Arrow
            case 68: // D
                move = "RIGHT";
                break;
            case 38: // Down Arrow
            case 87: // S
                move = "UP";
                break;
            case 40: // Up Arrow
            case 83: // W
                move = "DOWN";
               break;
            case 32: // SPACE
                if (token){
                    this.socket.emit(this.EVENT.GAMER_ACTION, { token, action: { method: "setBomb"} });
                }
                break;
            default:
            break;
        }
        if (token && move) {
            this.socket.emit(this.EVENT.GAMER_ACTION, { token, action: { method: "moveHero", move } });
        }
    }

    componentDidMount() {
        //Подключиение распознователя метки
        //var AR = new require('js-aruco').AR;
        //var detector = new AR.Detector();

        //создание канваса на котором отображается видео
        /*var video = document.getElementById('videoElement');
        var canvas = document.getElementById('canvasElement');
        var ctx = canvas.getContext('2d');

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true})
            .then(function (stream) {
                video.srcObject = stream;
                video.addEventListener('timeupdate', () => {
                    ctx.drawImage(video, 0 ,0);
                    var markers = detector.detect(ctx.getImageData(0, 0, canvas.width, canvas.height));
                    console.log(markers);
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        }   */

        //Высота и ширина игрового поля
        this.width = window.innerWidth * 0.8;
        this.height = window.innerHeight * 0.95;

        //Создаем игровую сцену (THREE.JS)
        this.scene = new THREE.Scene();

        //Создаем конвас под игровое поле
        this.gamecanvas = document.getElementById("gamecanvas");

        //Создаем рендер элемент (THREE.JS)
        this.renderer = new THREE.WebGLRenderer( { alpha: true, canvas: this.gamecanvas } );
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0x000000, 0);

        //document.getElementById('game').appendChild(this.renderer.domElement);

        //Создаем камеру игрового поля (THREE.JS)
        this.camera = new THREE.PerspectiveCamera(100, this.width / this.height, 0.1, 1000);
        this.camera.aspect = this.width / this.height;
        this.camera.position.z = 100;
        this.camera.position.y = -50;

        //Возможность крутить в пространстве объекты на игровом поле (THREE.JS)
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.enabled = true;
        controls.maxDistance = 1500;
        controls.minDistance = 0;
        controls.enableKeys = false;

        // запустить анимацию
        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        }
        animate();
    }

    //Очистить сцену (THREE.JS)
    clearScene() {
        for(var i = this.scene.children.length - 1; i >= 0; i--) { 
            this.scene.remove(this.scene.children[i]);
        }


    }

    //Добавить освещение на игровое поле (THREE.JS)
    addLight() {
        const lightP = new THREE.PointLight(0xffffff);
        lightP.position.set(10000, 10000, 10000);
        this.scene.add(lightP);
        const lightA = new THREE.AmbientLight(0x333333);
        this.scene.add(lightA);
    }

    // нарисовать блок (THREE.JS)
    addBlock(x, y, z, color) {
        let geometry = new THREE.BoxGeometry(10, 10, 10);
        let material = new THREE.MeshLambertMaterial({ color });
        let cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        cube.position.set(-50 + x * 10, 0 + -y * 10, z);     
    }

    //нарисовать сферу (THREE.JS)
    addSphere(x, y, z, color){
        let geometry = new THREE.SphereGeometry(9, 20, 20);
        let material = new THREE.MeshLambertMaterial({ color });
        let cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        cube.position.set(-50 + x * 10, 0 + -y * 10, z); 
    }

    //Отрисовка взрывов от бомб (THREE.JS)
    drawBooms(map){
        for (let key in this.booms){
            const x = this.booms[key].x - 1;
            const y = this.booms[key].y - 1;
            this.addSphere(x, y, 11, 'red');
            let obstacleInRightSide, obstacleInLeftSide, obstacleInTopSide, obstacleInBottomSide;
            for (let i = 1; i <= this.booms[key].power; i++){
                if ((x + i) < map.length){
                    if (map[y][x+i] > 9 && map[y][x+i] !== 11){
                        obstacleInRightSide = true;
                    }
                    if (!obstacleInRightSide){
                        this.addSphere(x + i, y, 10, 'red');
                    }
                } 
                if ((x - i) > -1){
                    if (map[y][x-i] > 9 && map[y][x-i] !== 11){
                        obstacleInLeftSide = true;
                    }
                    if (!obstacleInLeftSide){
                        this.addSphere(x - i, y, 10, 'red');
                    }
                } 
                if ((y + i) < map.length){
                    if (map[y+i][x] > 9 && map[y+i][x] !== 11){
                        obstacleInBottomSide = true;
                    }
                    if (!obstacleInBottomSide){
                        this.addSphere(x, y + i, 10, 'red');
                    }
                } 
                if ((y - i) > -1){
                    if (map[y-i][x] > 9 && map[y-i][x] !== 11){
                        obstacleInTopSide = true;
                    }
                    if (!obstacleInTopSide){
                        this.addSphere(x, y - i, 10, 'red');
                    }
                } 
            }
        }
    }

    //Отрисовка бомб (THREE.JS)
    drawBombs(bombs){
        for (let key in bombs) {
            const x = bombs[key].x - 1;
            const y = bombs[key].y - 1;
            this.addSphere(x, y, 10, 'black');
        }
    }

    //Проверка, готовы ли бомбы сделать бум
    checkBombs(newBombs){
        for (let key in this.bombs){
            if (!newBombs[key]){
                this.booms[key] = {x: this.bombs[key].x, y: this.bombs[key].y, power: this.bombs[key].power};
            }
        }
        this.bombs = {};
        for (let key in newBombs){
            this.bombs[key] = newBombs[key];
        }
    }

    // нарисовать карту
    drawMap(map) {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] < 10 ) {
                    this.addBlock(j, i, 0 , 'green');
                } else if (map[i][j] === 10) {
                    this.addBlock(j, i, 10 , 'darkgreen');
                    this.addBlock(j, i, 0 , 'green');
                } else if (map[i][j] === 11) {
                    this.addBlock(j, i, 0, 'green');
                }  else {
                    this.addBlock(j, i, 10, 'grey');
                    this.addBlock(j, i, 0 , 'green');
                }
            }
        }
    }

    // нарисовать игроков
    drawPlayers(players) {
        for (let key in players) {
            const x = players[key].x - 1;
            const y = players[key].y - 1;
            this.addBlock(x, y, 10, 'blue');
        }
    }

    //Обновление сцены (THREE.JS)
    updateScene(data) {
        if (data) {
            this.clearScene();
            this.addLight();
            if (data.map) {
                this.drawMap(data.map);
            }
            if (data.players) {
                this.drawPlayers(data.players);
            } 
            if (data.bombs){
                this.drawBombs(data.bombs);
            }
            this.checkBombs(data.bombs);
            this.drawBooms(data.map);
            this.booms = {};
        }
    }
    

    /*<video autoPlay id="videoElement" width="640" height="480"></video>
    <canvas id="canvasElement" width="640" height="480"></canvas> */


    render() {
        return(
            <div id="game__container">
                <canvas id='gamecanvas'></canvas>
            </div>
        )
    }
}
export default GameScreenComponent;