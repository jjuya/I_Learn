import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Hello react!
        </p>

          <ul className="tyler">
            <li>test1</li>
            <li>test2</li>
            <li>test3</li>
          </ul>
      </div>
    );
  }
}

export default App;
