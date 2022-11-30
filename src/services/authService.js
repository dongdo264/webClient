import axios from 'axios';
import { loginFailed, loginStart, loginSuccess } from '../redux/authSlice';
const baseURL = "http://localhost:8080/";

let login = async (user, dispatch, history) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${baseURL}api-auth/login`, {
            username: user.username, 
            password: user.password
        });
        dispatch(loginSuccess(res.data));
        sessionStorage.setItem('accessToken', 'Bearer ' + res.data.token);
        if (res.data.role === 10) {
            history.push("/admin");
        } else if (res.data.role === 1) {
            history.push("/factory");
        } else if (res.data.role === 2) {
            history.push("/wc");
        } else if (res.data.role === 3) {
            history.push("/agent");
        }
    }catch(err) {
        dispatch(loginFailed());
    }
}

export { login }