import React from 'react';
import axios from "axios";

export default class CreatingAccountPanel extends React.Component {
    state = {
        nick: "",
        password: "",
        email: ""
    }

    createAccount = async (e) => {
        e.preventDefault();
        const data = {
            nick: this.state.nick,
            password: this.state.password,
            email: this.state.email
        };
        try {
            const res = await axios.post("http://localhost:4500/api/users", data);
            console.log(res);
        } catch (err) {
            document.getElementsByClassName("auth-message")[1].innerHTML =
                err.message;
        }
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
                <label htmlFor="login">Enter your unique name:</label>
                <input type="text"  name="login" onChange={this.handleChangeNick} required minLength="3" maxLength="15" size="20" />
                <p>Enter your password:</p>
                <input type="password"  name="password" onChange={this.handleSetPassword} required minLength="8" maxLength="20" size="20" />
                <label htmlFor="passwordConfirm">Confirm your password:</label>
                <input type="password"  name="passwordConfirm" onChange={this.handleConfirmPassword} required minLength="8" maxLength="20" size="20" />
                <label htmlFor="email">Enter your email:</label>
                <input type="text"  name="email" onChange={this.handleSetEmail} required minLength="8" maxLength="20" size="20" />
                <p className='auth-message'></p>
                <button onClick={this.createAccount} className='button-auth'>Create an account</button>
            </form>
        );
    }
}                       