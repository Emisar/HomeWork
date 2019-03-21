import React, { Component } from 'react';
import './App.css';
import LoginComponent from './components/LoginComponent/LoginComponent';
import GameScreenComponent from './components/GameScreenComponent/GamesScreenComponent';


class App extends Component {

  render() {

    return (
      <div className="App">
        <LoginComponent/>
        <GameScreenComponent />
      </div>
    );
  }
}

export default App;
