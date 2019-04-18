import React, { Component } from 'react';
import './chatComponent.css';

class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.socket = props.socket();
        this.EVENT = props.socketEvent();
        this.state = {
            isVisible: this.props.visible
        }
        
        this.socket.on(this.EVENT.SEND_MESSAGE_TO_ALL, data => this.printMessage(data));
    }

    printMessage(data) {
        if (data && data.message) {
            let output = document.getElementById("chat");
            let p = document.createElement("p");
            p.innerHTML = "<b>" + data.nickname + ":</b> " + data.message;
            output.appendChild(p);
        }
    }

    send() {
        let input = document.getElementById("input");
        let message = input.value;
        let token = localStorage.getItem("token");
        if (message && token) {
            this.socket.emit(this.EVENT.SEND_MESSAGE, { token, message });
            input.value = "";
        }
    }
    
    render() {      
        return(
            <div className={"Chat"}>
                <h1>Chatik</h1>
                <input id="input" type="text" placeholder="Введите сообщение"></input>
                <button id="btn" onClick={() => this.send()}>Послать сообщение</button>
                <div id="chat"></div>
            </div>
        )
    }
}

export default ChatComponent;