import React, { Component } from 'react';
import MemberList from './MemberList';
import Login from './Login'
import Cookies from 'universal-cookie';
import '../stylesheets/App.css';

const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      loggedin: (cookies.get('jwt') !== undefined),
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