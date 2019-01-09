import React, { Component } from 'react';
import './App.sass';
import LoggingPanel from './components/sign-up.jsx'

class App extends Component {
  state = {
    nick: "",
    password: "",
    token: ""
  }


  render() {
    console.log(sessionStorage.getItem("token"));
    return (
    <>
      <aside>
          <div className="aside-desc">Create your own list of tasks on sticky notes!</div>
      </aside>
      <article>
          <LoggingPanel />
      </article>
      <footer>ToDoApp was created by nanoDW. All rigths reserved.</footer>
    </>
    );
  }
}

export default App;