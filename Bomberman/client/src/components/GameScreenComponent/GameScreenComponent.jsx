import React, {Component} from 'react'
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import Webcam from 'react-webcam'

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
            case 70: // F
                if (this.fullscreen) {
                    this.width = window.outerWidth;
                    this.height = window.outerWidth;
                    this.renderer.setSize(this.width, this.height)
                    this.camera.aspect = this.width / this.height;
                    this.camera.updateProjectionMatrix();
                    this.fullscreen = false;
                } else {
                    this.width = window.innerWidth * 0.9;
                    this.height = window.innerHeight * 0.9;
                    this.renderer.setSize(this.width, this.height)
                    this.camera.aspect = this.width / this.height;
                    this.camera.updateProjectionMatrix();
                    this.fullscreen = true;
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
        this.width = window.innerWidth * 0.8;
        this.height = window.innerHeight * 0.95;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('white');

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xffffff, 1.0);

        document.getElementById('game').appendChild(this.renderer.domElement);

        console.log(document.getElementById('game'));

        this.camera = new THREE.PerspectiveCamera(100, this.width / this.height, 0.1, 1000);
        this.camera.aspect = this.width / this.height;
        this.camera.position.z = 100;
        this.camera.position.y = -50;

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

    clearScene() {
        for(var i = this.scene.children.length - 1; i >= 0; i--) { 
            this.scene.remove(this.scene.children[i]);
        }
    }

    addLight() {
        const lightP = new THREE.PointLight(0xffffff);
        lightP.position.set(10000, 10000, 10000);
        this.scene.add(lightP);
        const lightA = new THREE.AmbientLight(0x333333);
        this.scene.add(lightA);
    }

    // нарисовать блок 
    addBlock(x, y, z, color) {
        let geometry = new THREE.BoxGeometry(10, 10, 10);
        let material = new THREE.MeshLambertMaterial({ color });
        let cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        cube.position.set(-50 + x * 10, 0 + -y * 10, z);     
    }

    //нарисовать сферу
    addSphere(x, y, z, color){
        let geometry = new THREE.SphereGeometry(9, 20, 20);
        let material = new THREE.MeshLambertMaterial({ color });
        let cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        cube.position.set(-50 + x * 10, 0 + -y * 10, z); 
    }

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
                if ((y + i) < map[0].length){
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
    
    render() {
        return(
            <div id="game__container">
                <div id='game'></div>
            </div>
        )
    }
}
export default GameScreenComponent;