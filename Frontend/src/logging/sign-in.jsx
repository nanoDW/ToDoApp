import React from 'react';
import axios from "axios";

export default class LoggingPanel extends React.Component {
    state = {
        nick: "",
        password: "",
        hasAccount: true,
        hasToken: ""
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
            console.log(res);
        } catch (err) {
            document.getElementsByClassName("auth-message")[0].innerHTML =
                "Invalid login or password";
        }
    }

    onSignIn() {
        sessionStorage.getItem("token") ? this.setState({ hasToken: true }) : console.log("Fatal errror. No token.")
    }

    setToken = (token) => {
        sessionStorage.setItem("token", token);
    }

    signUp = (e) => {
        e.preventDefault();
        this.props.onClick(this.setState({hasAccount: false}));
    }

    handleChangeNick = (event) => {
        this.setState({ nick: event.target.value });
    };

    handleChangePassword = (event) => {
        this.setState({ password: event.target.value });
    };



    render() {
        return (
        <form className="form--auth">
                <label className="form__label--auth" htmlFor="login">Enter your login:</label>
                <input className="form__input--auth" type="text" id="nick" name="login" minLength="3" maxLength="15" size="20"
            onChange={this.handleChangeNick} 
            value={this.state.nick} required />
                <label className="form__label--auth" htmlFor="password">Enter your password:</label>
            <input className="form__input--auth"type="password" id="password" name="password" onChange={this.handleChangePassword} value={this.state.password} required minLength="8" maxLength="20" size="20" />
                <p className='auth-message form__label--auth'></p>
            <button onClick={this.signIn} className='form__button--auth'>Sign In</button>
            <button onClick={this.signUp} className='form__button--auth'>Sign Up</button>
        </form>
        );
    }
}