import React, { Component } from 'react';
import './loginComponent.css'

class LoginComponent extends Component {

    constructor() {
        super();
        this.state = {
            nickNmae: '',
            password: '',
    }

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePassChange  = this.handlePassChange.bind(this);
        this.handleSubmit      = this.handleSubmit.bind(this);
    }

    handleLoginChange(event) {
        this.setState({nickNmae: event.target.value});
    }

    handlePassChange(event) {
        this.setState({password: event.target.value})
    }

    getData = async (event) => {
        event.preventDefault();
        const api_url = await fetch(`/login/${this.state.nickNmae}/${this.state.password}`);
        const data = await api_url;
        console.log(data);
        
    }

    handleSubmit(event) {
        alert("прилетел никнейм: " + this.state.nickNmae);
        event.preventDefault();
    }
    
    render() {      
        return(
            <div className="registration-container">
                <h1>Добро пожаловать</h1>
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