import React, { Component } from 'react';
import './App.css';
import ClockSVG from './components/clock-svg';
import DateLabel from './components/date'
import SimpleTodo from './components/simple-todo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="item">
            <DateLabel />
            <ClockSVG />
          </div>
          <div className="item">
            <SimpleTodo />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
