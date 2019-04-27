import React, { Component } from 'react';
import './loginComponent.css'

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            password: '',
            regExp: /[а-яА-яёЁ~!@#$%^&*()+`'";:<>/\\|]/,
        }

        this.socket = props.socket();
        this.EVENT = props.socketEvent();

        localStorage.setItem('token', '')
    
    
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePassChange  = this.handlePassChange.bind(this);
        this.checkInput = this.checkInput.bind(this)
    }

    handleLoginChange(event) {
        this.setState({nickname: event.target.value});
    }

    handlePassChange(event) {
        this.setState({password: event.target.value});
    }

    writeAuthInfoMessage(msg, color){
        const authInfoElement = document.getElementById("auth-info-message");
        document.querySelector('#auth-info-message').style.color = color || 'red';
        authInfoElement.innerHTML = msg;
        clearTimeout(authInfoElement.timeoutId);
        authInfoElement.timeoutId = setTimeout(function(){
            if (authInfoElement){
                authInfoElement.innerHTML = '';
            }
        }, 5000);
    }

    async getData() {
        const md5 = require('md5');
        const hash = md5(this.state.nickname + this.state.password);
        const promise = await fetch(`/login/${this.state.nickname}/${hash}`);
        const answer  = await promise.json();
        if (answer && answer.result === 'ok'){
            if (answer.data === true){
                this.writeAuthInfoMessage('Вы успешно зарегестрированы', 'lime');
            } else if (answer.data.token){
                this.writeAuthInfoMessage('Вы успешно вошли', 'lime');
                setTimeout(()=>{
                    this.socket.emit(this.EVENT.START_GAME, {nickname: this.state.nickname});
                    this.props.parent(answer.data.token);
                }, 1000);
            }
        } else {
            this.writeAuthInfoMessage('Неверный логин или пароль');
        }
    }

    checkInput(e) {
        e.preventDefault();
        if (!this.state.regExp.test(this.state.nickname) && 
           !this.state.regExp.test(this.state.password)){
            this.getData();
        } else {
            this.setState({nickname: "", password: ""})
            this.writeAuthInfoMessage('Введены недопустимые символы. Попробуйте еще раз');
        }
    }
    
    render() {    
        return(
            <div className={"wrapp"}>
                <div className={"registration-container"}>
                <h1>Приветствие</h1>
                <form onSubmit={this.checkInput}>
                    <label className="input-container">
                        <input 
                            className="registration-nickname" 
                            placeholder="Login" 
                            type="text" 
                            value={this.state.nickname} 
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
                    <div id="auth-info-message"></div>
                </form>
                </div>  
            </div>
            
        )
    }
}

export default LoginComponent