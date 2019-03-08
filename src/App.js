import React, { Component } from 'react';
import './App.css';
import ClockSVG from './components/clock-svg';
import DateLabel from './components/date'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <DateLabel />
          <ClockSVG />
        </header>
      </div>
    );
  }
}

export default App;
