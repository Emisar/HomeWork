import React, { Component } from 'react';
import './App.css';
import LoginComponent from './components/LoginComponent/LoginComponent';
import openSocket from 'socket.io-client';

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = openSocket('http://localhost:5000');
    

  this.send = this.send.bind(this);
  }


  //функция, содержащая обращение к серверу и реагирование на обратный ответ от него
  send() {
    this.socket.emit('priv', 1000);
    
    this.socket.on("answer", (data) => {
      console.log(data);
    })
  }

//тут в компонент передвется функция через props
  render() {

    return (
      <div className="App">
        <h1 onClick={this.send}>Тык</h1>
        <LoginComponent func={this.send}/>
      </div>
    );
  }
}

export default App;
