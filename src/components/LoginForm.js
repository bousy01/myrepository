import React, { Component } from 'react'
import { VERIFY_USER } from '../Events'

export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nickname:"",
            error: ""
        };
    }

    setUser = ({user, isUser}) => {
        console.log(user, isUser);
        if(isUser) {
            this.setError("Ce pseudo est déjà utilisé")
        } else {
            this.props.setUser(user)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { socket } = this.props;
        const { nickname } = this.state;
        socket.emit(VERIFY_USER, nickname, this.setUser)
    }

    
    handleChange = (e) => {
        this.setState({nickname:e.target.value})
    }

    setError = (error) => {
        this.setState({error})
    }

    render() {
        const { nickname, error } = this.state
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit} className="login-form">
                    <label htmlFor="nickname">
                        <h2>Choisir votre pseudo</h2>
                    </label>
                    <input 
                        ref={(input) => { this.textInput = input }}
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={this.handleChange}
                        placeholder={'MyCoolUsername'}
                    />
                    <div className="error">{error ? error:null}</div>
                </form>
            </div>
        )
    }
}
