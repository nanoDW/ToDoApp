import * as React from 'react';
import './App.sass';
import Dashboard from './dashboard/dashboard';
import axios from 'axios';
import MainView from './logging/panel';

export default class App extends React.Component {
  state = {
    token: null
  }

  openDashboard = async (token) => {
    const data = {};
    try {
      const res = await axios.post("http://localhost:4500/api/auth", data, {headers: {xauthtoken: this.state.token}});
      this.setToken(res.headers.xauthtoken);
    } catch (err) {
       console.log( "No connection");
    }
  }

  logIn = () => {
    this.setState({hasToken: true})
  }
  
  

  setView = () => {
   return this.state.hasToken ? <Dashboard onClick={this.logIn}/> : <MainView />
  }


  render() {
    return (
      <main>
      {this.setView()}
      </main>
    );
  }
}