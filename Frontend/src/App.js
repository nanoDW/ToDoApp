import * as React from 'react';
import './App.sass';
import LoggingPanel from './components/sign-in';
import CreatingAccountPanel from './components/sign-up';

export default class App extends React.Component {
  state = {
    hasToken: false,
    hasAccount: true,
    token: null
  }

  componentDidMount() {
    this.setState({ token: sessionStorage.getItem("token") });
  }

  changePanel() {
    this.setState({ hasAccount: false });
  }

  render() {
    return (
    <>
      <aside>
          <div className="aside-desc">Create your own list of tasks on sticky notes!</div>
      </aside>
      <article>
          <LoggingPanel setPanel={this.changePanel} />
          <CreatingAccountPanel />
      </article>
        {this.state.hasAccount}
      <footer>ToDoApp was created by nanoDW. All rigths reserved.</footer>
    </>
    );
  }
}