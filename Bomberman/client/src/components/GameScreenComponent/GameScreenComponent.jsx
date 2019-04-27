import React, {Component} from 'react'
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'



class GameScreenComponent extends Component {
    constructor(props) {
        super(props);
        this.socket = props.socket();
        this.EVENT = props.socketEvent();
        this.socket.on(this.EVENT.UPDATE_SCENE, (data) => this.updateScene(data));
        document.addEventListener("keydown", event => this.keyDown(event));
        window.addEventListener('resize', () => {
            this.width = window.innerWidth * 0.9;
            this.height = window.innerHeight * 0.9;
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
                move = "DOWN";
                break;
            case 40: // Up Arrow
            case 83: // W
                move = "UP";
               break;
            default:
                break;
        }
        if (token && move) {
            this.socket.emit(this.EVENT.GAMER_ACTION, { token, action: { method: "moveHero", move } });
        }
    }

    componentDidMount() {
        this.width = window.innerWidth * 0.9;
        this.height = window.innerHeight * 0.9;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x222222);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xffffff, 1.0);

        document.getElementById('game-screen').appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(100, this.width / this.height, 0.1, 1000);
        this.camera.position.z = 100;
        this.camera.position.y = -50;

        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.enabled = true;
        controls.maxDistance = 1500;
        controls.minDistance = 0;


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
        cube.position.set(-50 + x * 10, 0 + y * 10, z);     

        
    }

    // нарисовать карту
    drawMap(map) {
        for (let j = 0; j < map.length; j++) {
            for (let i = 0; i < map[j].length; i++) {
                if (map[i][j] < 10 ) {
                    this.addBlock(i, j, 0 , 'green');
                } else if (map[i][j] === 10) {
                    this.addBlock(i, j, 10 , 'darkgreen');
                    this.addBlock(i, j, 0 , 'green');
                } else {
                    this.addBlock(i, j, 10 , 'grey');
                    this.addBlock(i, j, 0 , 'green');
                }  
            }
        }
    }

    // нарисовать игроков
    drawPlayers(players) {
        for (let key in players) {
            const x = players[key].x;
            const y = players[key].y;
            this.addBlock(x, y, 10, 'blue');
        }
    }

    updateScene(data) {
        if (data) {

            console.log(data);
            
            this.clearScene();
            this.addLight();
            if (data.map) {
                this.drawMap(data.map);
            }
            if (data.players) {
                this.drawPlayers(data.players);
            } 
        }
    }
    
    render() {
        return(
               <div className='game-screen' id='game-screen'>
               </div>
        )
    }
}
export default GameScreenComponent;