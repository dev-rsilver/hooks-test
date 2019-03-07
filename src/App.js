import React, { Component } from 'react';
import './App.css';
import ClockSVG from './components/clock-svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>{new Date().toDateString()}</h1>
          <ClockSVG />
        </header>
      </div>
    );
  }
}

export default App;
