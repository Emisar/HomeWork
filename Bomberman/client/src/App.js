import React, { Component } from 'react';
import openSocket from 'socket.io-client';

import './App.css';

import SETTINGS from './settings';
import LoginComponent from './components/LoginComponent/LoginComponent';
import GameScreenComponent from './components/GameScreenComponent/GameScreenComponent';
import ChatComponent from './components/ChatComponent/ChatComponent';

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = openSocket(`http://${window.location.hostname}:${SETTINGS.PORT}`);
    this.state = {
      token: '',
    }
  }

  updateToken(token){
    this.setState({token: token});
    localStorage.setItem('token', token);
  }

  // тут в компонент передвется функция через props
  render() {
    return (
      <div className="App">
        {
        !this.state.token
        ? 
          <LoginComponent
            parent={(token)=>{this.updateToken(token)}} 
            socket={() => this.socket} 
            socketEvent={() => SETTINGS.SOCKET}/> 
        : 
          <>
          <ChatComponent
            socket={() => this.socket} 
            socketEvent={() => SETTINGS.SOCKET}/>
          <GameScreenComponent
            socket={() => this.socket} 
            socketEvent={() => SETTINGS.SOCKET}/>
          </>
        }
      </div>
    )
  }
}
export default App;