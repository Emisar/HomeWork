import React, {Component} from 'react'

class GameScreenComponent extends Component {
    constructor(props) {
        super(props);

        this.socket = props.socket();
        this.EVENT = props.socketEvent();
        
        this.socket.on(this.EVENT.UPDATE_SCENE, (data) => this.updateScene(data));
    }


    updateScene(data) {
        console.log(data);
    }
    
    render() {
        return(
            <h1 className={'game-screen'}>ТУТ БУИТ ИГРА</h1>
        )
    }
}

export default GameScreenComponent