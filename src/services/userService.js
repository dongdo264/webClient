import axios from 'axios';

const baseURL = "http://localhost:8080/";

let getItemFromReact = (id) => {
    return axios.get(`${baseURL}getItem?id=${id}`);
}
export { getItemFromReact }