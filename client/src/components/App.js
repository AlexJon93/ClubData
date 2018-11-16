import React, { Component } from 'react';
import MemberList from './MemberList';
import Login from './Login'
import '../stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      loggedin: false,
      clubName: 'Labor Club'
    }
  }

  render() {
    return (
      <div className='App'>
        { this.state.loggedin ?
          <div>
            <h1 className='DataTitle'>{this.state.clubName}</h1>
            <MemberList/>
          </div> :
          <Login onLogin={this.handleLogin}/>
        }
        
      </div>
    );
  }

  handleLogin(login) {
    this.setState({
      loggedin: login
    })
  }
}

export default App;