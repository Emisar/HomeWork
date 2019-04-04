import React, { Component } from 'react';
import './loginComponent.css'

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nickName: '',
            password: '',
            regExp: /[а-яА-яёЁ~!@#$%^&*()+`'";:<>/\\|]/
            
        }
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

    getData = async () => {
        const md5 = require('md5');
        const hash = md5(this.state.nickName + this.state.password)
        const api_url = await fetch(`/login/${this.state.nickName}/${hash}`);
        const data = await api_url;
        //вызов переднной из родительского компонента функции 
        this.props.func();
        console.log(hash, data);
        
        
    }

    checkInput(e) {
        e.preventDefault();
        if(!this.state.regExp.test(this.state.nickName) && 
           !this.state.regExp.test(this.state.password)){
            this.getData();
        }else {
            this.setState({nickName: "", password: ""})
            alert('Введены недопустимые символы. Попробуйте еще раз')
        }
    }
    
    render() {      
        return(
            <div className="registration-container">
                <h1>Приветствие</h1>
                <form onSubmit={this.checkInput}>
                    <label className="input-container">
                        <input 
                            className="registration-nickname" 
                            placeholder="Login" 
                            type="text" 
                            value={this.state.nickName} 
                            onChange={
                                this.handleLoginChange
                                }>
                        </input>              
                        <input 
                            className="registration-password" 
                            placeholder="Password" 
                            type="password" 
                            value={this.state.password} 
                            onChange={
                                this.handlePassChange
                                }>
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
        )
    }
}

export default LoginComponent