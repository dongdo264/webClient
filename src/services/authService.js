import axios from 'axios';

const baseURL = "http://localhost:8080/";

let login = (username, password) => {
    return axios.post(`${baseURL}api-auth/login`, {
        username, 
        password
    }, {
        headers:{"Content-Type" : "application/json"}
    });
}

export { login }