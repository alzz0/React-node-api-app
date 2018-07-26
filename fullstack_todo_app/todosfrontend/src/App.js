import React, { Component } from 'react';
import TodoList from "./TodoList"
import './App.css';
import "isomorphic-fetch"





class App extends Component {

  render() {
    return (
      <div className="App">
       <TodoList/>
      </div>
    );
  }
}

export default App;
