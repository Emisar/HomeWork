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

    updateScene(data) {
//---------------------------------------- Подготовка работы Three.js
        const width = 400;
        const height = 400;

        console.log(data);

        const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x222222);

        const renderer = new THREE.WebGLRenderer();
                renderer.setSize(width, height);
                renderer.setClearColor(0xffffff, 1.0);

        const dom = document.getElementById('game-screen');
                dom.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 1000);
                camera.position.z = 100;
                camera.position.y = -50;

        const controls = new OrbitControls(camera, renderer.domElement);
                controls.enabled = true;
                controls.maxDistance = 1500;
                controls.minDistance = 0;

//-----------------------------------------------------------------------------

//-------------------------Работа со сценой
        var addBlock = (x, y, z, color) => {
            let geometry = new THREE.BoxGeometry(10, 10, 10);
            let material = new THREE.MeshLambertMaterial({color: color});
            let cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            cube.position.set(x, y, z);
        }

        var addPlayer = (x, y) => {
            let geometry = new THREE.CircleGeometry(10, 10);
            let material = new THREE.MeshLambertMaterial({color: 'blue'});
            let addPlayer = new THREE.Mesh(geometry, material);
            scene.add(addPlayer);
            addPlayer.position.set(x, y, 10);
        }

        var drawPlayers = function() {
            for (let key in data.players) {
                    let x = data.players[key].x;
                    let y = data.players[key].y;
                    addPlayer(x , y);
            }
        }

        var drawMap = () => {
            let i = 0;
            for (let keyY in data.map) {
                let j = 0;
                for (let keyX in data.map[keyY]) {
                    if (data.map[keyY][keyX] < 10 ) {
                        addBlock(-50 + j * 10, 0 + i * 10, 0 , 'green');    
                    } else if (data.map[keyY][keyX] === 10) {addBlock(-50 + j * 10, 0 + i * 10, 10 , 'darkgreen');
                                                            addBlock(-50 + j * 10, 0 + i * 10, 0 , 'green');}
                      else {addBlock(-50 + j * 10, 0 + i * 10, 10 , 'grey');
                            addBlock(-50 + j * 10, 0 + i * 10, 0 , 'green');}  
                    j++;
                }
                i++;
            }
        }

//--------------------------------------------------------------------------

//---------------------------------------------Обработка света
        const light_p = new THREE.PointLight(0xffffff);
                light_p.position.set(10000, 10000, 10000);
                scene.add(light_p);

        const light_a = new THREE.AmbientLight(0x333333);
                scene.add(light_a);
//--------------------------------------------------------
        
//-------------------Анимация
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);

        }
//----------------------------------
        


        drawMap();
        drawPlayers();
        animate();


        
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