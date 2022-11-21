import axios from 'axios';

const baseURL = "http://localhost:8080/";

let checkLogin = (username, password) => {
    return axios.post(`${baseURL}api-auth/login`, {
        username, 
        password
    }, {
        headers:{"Content-Type" : "application/json"}
    });
}

let getAllUser = () => {
    return axios.get(`${baseURL}api-user/getAllUser`);
}
export { checkLogin , getAllUser}