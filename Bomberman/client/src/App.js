import React, { Component } from 'react';
import './App.css';
import LoginComponent from './components/LoginComponent/LoginComponent';
import openSocket from 'socket.io-client';
import SETTINGS from './settings';
import GameScreenComponent from './components/GameScreenComponent/GameScreenComponent';
import ChatComponent from './components/ChatComponent/ChatComponent';

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = openSocket('http://localhost:5000');

    this.state = {
      token: '',
    }

    //setInterval(()=>{this.setState({token: this.state.token})}, 1000)
  }

  updateToken(token){
    this.setState({token: token});
    localStorage.setItem('token', token);
  }



  // тут в компонент передвется функция через props
  render() {
    let token;
    if(this.state.token === '') {
      token = true;
    } else {
      token = false;
    }
    return (
    <div className="App">
      {
      token ? 
      <LoginComponent
        parent={(token)=>{this.updateToken(token)}} 
        socket={() => this.socket} 
        socketEvent={() => SETTINGS.SOCKET}/> : 
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