import React from 'react';
import LoggingPanel from "./sign-in";
import CreatingAccountPanel from "./sign-up";

export default class MainView extends React.Component {
    state = {
        hasAccount: true,
        hasToken: "",
        token: ""
    }

    changePanel = () => {
        this.setState({hasAccount: false});
    }
    
    signIn = () => {
        this.setState({hasToken: true});
    }

    onClick = () => {
        this.props.onClick(this.setState({hasToken: true}));
    }

    signUp = () => {
        this.setState({hasAccount: true})
    }

    setPanel = () => {
        return (this.state.hasAccount ? <LoggingPanel onSignIn={this.signIn} onClick={this.changePanel} /> : <CreatingAccountPanel onRegister={this.signUp}/>)
    }

    render () {
        return (
        <>
            <aside className="aside">
                <div className="aside__header">Create your own list of tasks on sticky notes!</div>
            </aside>
            <article className="article">
                {this.setPanel()}
            </article>
            <footer className="footer">ToDoApp was created by nanoDW. All rigths reserved.</footer>
        </>);
    }
}