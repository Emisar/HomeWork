import React, { Component } from 'react';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    fetch('/getUsers')
      .then(res => res.json())
      .then(users => this.setState({users}, () => console.log(users.data.asd)));
  }
  render() {
    return ( 
        <h2>{this.state.users.result}</h2>

    );
  }
}

export default Users;