import React, { Component } from 'react';
import './App.css';
import LoginComponent from './components/LoginComponent/LoginComponent';
import ChatComponent from './components/ChatComponent/ChatComponent';
import openSocket from 'socket.io-client';
import SETTINGS from './settings';

class App extends Component {

  constructor(props) {
    super(props);
    this.client = openSocket('http://localhost:5000');

    
  }

  // тут в компонент передвется функция через props
  render() {
    return (
      <div className="App">
        <LoginComponent client={() => this.client} socketEvent={() => SETTINGS.SOCKET}/>
      </div>
    );
  }
}
export default App;