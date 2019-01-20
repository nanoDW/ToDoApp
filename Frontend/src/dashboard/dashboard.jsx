import React from 'react';
import axios from "axios";

export default class Dashboard extends React.Component {
state = {
    nick: "",
    token: "",
    add: ""
}

handleAddTask = () => {
    this.setState({add: true})
}

display() {
    console.log(1);
}

    render() {
        return (
            <>
            <header>
                <button className="button--add">Add new task</button>
                <div className="dashboard--logged">Logged as {this.state.nick}.<div className="dashboard--logout">Log out</div></div>
            </header>
            <nav>A few important links :)</nav>
            </>
        );
    }
}