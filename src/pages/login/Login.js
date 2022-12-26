import React, { useState } from "react";
import "./login.css"
import {login} from '../../services/authService'
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { isUsername } from "../../utils/validateAuth";
import { useSelector } from "react-redux";
export default function Login() {
    //const login = useSelector((state) => state.auth.login);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const handleOnChangeUsername = (event) => {   
        setUsername(event.target.value);
    }
    const handleOnChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleLogin = (event) => {
        event.preventDefault();
        const user = {
            username: username,
            password: password
        }
        if (!isUsername(username)) {
            setErrMessage("Tài khoản chỉ được chứa các ký tự A-Z, a-z, 0-9");
        }
        else {
            login(user, dispatch, history, () => setErrMessage("Thông tin tài khoản hoặc mật khẩu không chính xác"));
            
        }
    }
    return (
        <div className="login-box">

            <h2>Đăng nhập</h2>
            <p>Enter your details</p>

            <form>
                <div className="form-group">
                    <label htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Your username"
                        required
                        value={username}
                        onChange={handleOnChangeUsername}
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
                        value={password}
                        onChange={handleOnChangePassword}
                    />
                    
                </div>

                {/* <a className="forgot">
                    Forgot your password?
                </a> */}
                <span className="errMsg">{errMessage}</span>
                <button onClick={handleLogin}> Log In</button>
            </form>

        </div>
            
    )

}