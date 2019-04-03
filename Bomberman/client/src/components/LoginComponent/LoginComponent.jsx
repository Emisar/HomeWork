import React, { Component } from 'react';
import './loginComponent.css'

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nickNmae: '',
            password: '',
        }
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePassChange  = this.handlePassChange.bind(this);
    }

    handleLoginChange(event) {
        this.setState({nickNmae: event.target.value});
    }

    handlePassChange(event) {
        this.setState({password: event.target.value})
    }

    getData = async (event) => {
        event.preventDefault();
        const md5 = require('md5');
        const hash = md5(this.state.nickNmae + this.state.password)
        const api_url = await fetch(`/login/${this.state.nickNmae}/${hash}`);
        const data = await api_url;
        console.log(hash, data);
        //вызов переднной из родительского компонента функции 
        this.props.func();
        
    }

    
    render() {      
        return(
            <div className="registration-container">
                <h1>Приветствие</h1>
                <form onSubmit={this.getData}>
                    <label className="input-container">
                        <input className="registration-nickname" placeholder="Login" type="text" value={this.state.nickNmae} onChange={this.handleLoginChange}></input>              
                        <input className="registration-password" placeholder="Password" type="password" value={this.state.password} onChange={this.handlePassChange}></input>                     
                    </label>
                    <div className="button-container">
                        <input className="registration-button" type="submit" value="Login/Registration"></input>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginComponent