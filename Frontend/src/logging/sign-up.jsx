import React from 'react';
import axios from "axios";

export default class CreatingAccountPanel extends React.Component {
    state = {
        nick: "",
        password: "",
        passToConfirm: "",
        email: "",
        valid: ""
    }

    createAccount = async (e) => {
        e.preventDefault();
        this.confirmPassword();
        const data = {
            nick: this.state.nick,
            password: this.state.password,
            email: this.state.email
        };
        if(this.state.valid){
        try {
            const res = await axios.post("http://localhost:4500/api/users", data);
            console.log(res);
            this.onRegister();
        } catch (err) {
            document.getElementsByClassName("auth-message")[0].innerHTML =
                err.message;
        }
    }
    }

    handleSetNick = (event) => {
        this.setState({ nick: event.target.value });
    };

    handleSetPassword = (event) => {
        this.setState({ password: event.target.value });
    };

    confirmPassword = () => {
        this.state.password === this.state.passToConfirm ? this.setState({valid: true}) : document.getDocumentByClassName("auth-message")[0].innerHTML = "Invalid password."
    }

    handleSetEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    render() {
        return (
            <form className="form--auth">
                <label className="form__label--auth" htmlFor="login">Enter your unique name:</label>
                <input className="form__input--auth" type="text"  name="login" onChange={this.handleSetNick} value={this.state.nick} required minLength="3" maxLength="15" size="20" />
                <label className="form__label--auth" htmlFor="password">Enter your password:</label>
                <input className="form__input--auth" type="password" name="password" onChange={this.handleSetPassword} value={this.state.password} required minLength="8" maxLength="20" size="20" />
                <label className="form__label--auth" htmlFor="passwordConfirm">Confirm your password:</label>
                <input className="form__input--auth" type="password"  name="passwordConfirm"  onChange={e => this.setState({passToConfirm: e.target.value})} value={this.state.passToConfirm} required minLength="8" maxLength="20" size="20" />
                <label className="form__label--auth" htmlFor="email">Enter your email:</label>
                <input className="form__input--auth" type="text" name="email" onChange={this.handleSetEmail} value={this.state.email} required minLength="8" maxLength="20" size="20" />
                <p className='auth-message form__label--auth'></p>
                <button onClick={this.createAccount} className='form__button--auth'>Create an account</button>
            </form>
        );
    }
}                       