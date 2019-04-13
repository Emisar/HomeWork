import React, { Component } from 'react';
import './loginComponent.css'
import GameScreenComponent from '../GameScreenComponent/GameScreenComponent';
import ChatComponent from '../ChatComponent/ChatComponent';

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nickName: '',
            password: '',
            regExp: /[а-яА-яёЁ~!@#$%^&*()+`'";:<>/\\|]/,
            token: '',
            
        }

        localStorage.setItem('token', '')
    
    
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePassChange  = this.handlePassChange.bind(this);
        this.checkInput = this.checkInput.bind(this)
    }

    handleLoginChange(event) {
        this.setState({nickName: event.target.value});
    }

    handlePassChange(event) {
        this.setState({password: event.target.value})
    }

    async getData() {
        const md5 = require('md5');
        const hash = md5(this.state.nickName + this.state.password);
        const promise = await fetch(`/login/${this.state.nickName}/${hash}`);
        const answer  = await promise.json();
        if (answer && answer.result === 'ok' && answer.data && answer.data.token) {
            this.setState({token: localStorage.setItem("token", answer.data.token)})
        }
    }

    checkInput(e) {
        e.preventDefault();
        if (!this.state.regExp.test(this.state.nickName) && 
           !this.state.regExp.test(this.state.password)){
            this.getData();
        } else {
            this.setState({nickName: "", password: ""})
            alert('Введены недопустимые символы. Попробуйте еще раз')
        }
    }
    
    render() {      
        return(
            <div className="wrapp">
                <div className={"registration-container" + ((this.state.token === '') ? ' visible' : ' invisible')}>
                <h1>Приветствие</h1>
                <form onSubmit={this.checkInput}>
                    <label className="input-container">
                        <input 
                            className="registration-nickname" 
                            placeholder="Login" 
                            type="text" 
                            value={this.state.nickName} 
                            onChange={this.handleLoginChange}>
                        </input>              
                        <input 
                            className="registration-password" 
                            placeholder="Password" 
                            type="password" 
                            value={this.state.password} 
                            onChange={this.handlePassChange}>
                            </input>                     
                    </label>
                    <div className="button-container">
                        <input 
                            className="registration-button" 
                            type="submit" 
                            value="Login/Registration">
                        </input>
                    </div>
                </form>
                </div>
                <div className={"game" + ((this.state.token === '') ? ' invisible' : ' visible')}>
                    <GameScreenComponent />
                    <ChatComponent client={() => this.props.client()} socketEvent={() => this.props.socketEvent()}/>
                </div>
            </div>
            
        )
    }
}

export default LoginComponent