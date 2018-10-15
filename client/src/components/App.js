import React, { Component } from 'react';
import MemberList from './MemberList';
import Login from './Login'
import '../stylesheets/App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        {/* <h1>ClubData</h1>
        <MemberList/> */}
        <Login/>
      </div>
    );
  }
}

export default App;