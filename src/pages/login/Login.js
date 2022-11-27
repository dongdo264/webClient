import React from "react";
import { withRouter } from 'react-router-dom';
import "./login.css"
import {login} from '../../services/authService'
import { Box } from "@material-ui/core";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : ''
        }
    }

    handleOnChangeUsername = (event) => {   
        this.setState({
            username : event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password : event.target.value
        })
    }
    handleLongin = async (event) => {
        event.preventDefault();
        try {
            let result = await login(this.state.username, this.state.password);
            if (result.data.token) {
                localStorage.setItem('accessToken', 'Bearer ' + result.data.token);
                this.props.handleLoginFromParent(true, result.data.role);
                if (result.data.role === 10) {
                    this.props.history.push({
                        pathname: "/admin"
                    });
                }
            }

        }catch(error) {
            console.log(error.response);
        }
    }

    render() {
        return (
        <div className="login-box">

            <h2>Đăng nhập</h2>
            <p>Enter your details</p>

            <form>
                <div className="form-group">
                    <label htmlFor="email">
                        Username
                    </label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Your username"
                        required
                        value={this.state.username}
                        onChange={(event) => {this.handleOnChangeUsername(event)}}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Your password"
                        required
                        value={this.state.password}
                        onChange={(event) => { this.handleOnChangePassword(event) }}
                    />
                </div>

                <a className="forgot">
                    Forgot your password?
                </a>

                <button onClick={(event)=>{this.handleLongin(event)}}> Log In</button>

            </form>

        </div>
            
        )
    }
}

export default withRouter(Login);