import React from 'react';
import axios from "axios";

export default class LoggingPanel extends React.Component {
    state = {
        nick: "",
        password: "",
    }

    signIn = async (e) => {
        e.preventDefault();
        const data = {
            nick: this.state.nick,
            password: this.state.password
        };
        try {
            const res = await axios.post("http://localhost:4500/api/auth", data);
            this.setToken(res.headers.xauthtoken);
            await sessionStorage.setItem("token", JSON.stringify(res.headers.xauthtoken));
        } catch (err) {
            document.getElementsByClassName("form-auth")[0].children[4].innerHTML =
                "Invalid login or password";
        }
    }

    setToken = (token) => {
        sessionStorage.setItem("token", token);
    }

    signUp = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    handleChangeNick = (event) => {
        this.setState({ nick: event.target.value });
    };

    handleChangePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    render() {
        return (
        <form className="form-auth">
            <p>Enter your login:</p>
            <input type="text" id="nick" name="login" onChange={this.handleChangeNick} required minLength="3" maxLength="15" size="20" />
            <p>Enter your password:</p>
            <input type="password" id="password" name="password" onChange={this.handleChangePassword} required minLength="8" maxLength="20" size="20" />
            <p className='auth-message'></p>
            <button onClick={this.signIn} className='button-auth'>Sign In</button>
            <button onClick={this.signUp} className='button-auth'>Sign Up</button>
        </form>
        );
    }
}