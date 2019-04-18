import React, {Component} from 'react'
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

class GameScreenComponent extends Component {
    constructor(props) {
        super(props);

        this.socket = props.socket();
        this.EVENT = props.socketEvent();
        
        this.socket.on(this.EVENT.UPDATE_SCENE, (data) => this.updateScene(data));
    }


componentDidMount() {
        this.width = 400;
        this.height = 400;
        this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x222222);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xffffff, 1.0);

        this.dom = document.getElementById('game-screen');
        this.dom.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(100, this.width / this.height, 0.1, 1000);
        this.camera.position.z = 100;
        this.camera.position.y = -50;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enabled = true;
        this.controls.maxDistance = 1500;
        this.controls.minDistance = 0;

        this.light_p = new THREE.PointLight(0xffffff);
        this.light_p.position.set(10000, 10000, 10000);
        this.scene.add(this.light_p);

        this.light_a = new THREE.AmbientLight(0x333333);
        this.scene.add(this.light_a);

        this.animate = () => {
            requestAnimationFrame(this.animate);
            this.renderer.render(this.scene, this.camera);
        }

        this.animate();

}

    updateScene(data) {

        console.log(data)


        this.addBlock = (x, y, z, color) => {
            let geometry = new THREE.BoxGeometry(10, 10, 10);
            let material = new THREE.MeshLambertMaterial({color: color});
            let cube = new THREE.Mesh(geometry, material);
            this.scene.add(cube);
            cube.position.set(x, y, z);
        }


        this.addPlayer = (x, y) => {
            let geometry = new THREE.BoxGeometry(10, 10, 10);
            let material = new THREE.MeshLambertMaterial({color: 'blue'});
            let Player = new THREE.Mesh(geometry, material);
            this.scene.add(Player);
            Player.position.set(x, y, 10);
        }

        this.drawPlayers = () => {
            for (let key in data.players) {
                    let x = data.players[key].x;
                    let y = data.players[key].y;
                    this.addPlayer(-50 + x * 10 , -50 + y * 10);
            }
        }


        this.drawMap = () => {
            let i = 0;
            for (let keyY in data.map) {
                let j = 0;
                for (let keyX in data.map[keyY]) {
                    if (data.map[keyY][keyX] < 10 ) {
                        this.addBlock(-50 + j * 10, 0 + i * 10, 0 , 'green');    
                    } else if (data.map[keyY][keyX] === 10) {this.addBlock(-50 + j * 10, 0 + i * 10, 10 , 'darkgreen');
                                                            this.addBlock(-50 + j * 10, 0 + i * 10, 0 , 'green');}
                      else {this.addBlock(-50 + j * 10, 0 + i * 10, 10 , 'grey');
                            this.addBlock(-50 + j * 10, 0 + i * 10, 0 , 'green');}  
                    j++;
                }
                i++;
            }
        }



        this.drawMap();
        this.drawPlayers();
    }


    shouldComponentUpdate() {
        return false;
    }
    
    
    render() {
        return(
               <div className='game-screen' id='game-screen'>
               </div>
        )
    }
}

export default GameScreenComponent