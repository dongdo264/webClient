import axios from 'axios';

const baseURL = "http://localhost:8080/";

let getAllAgents = () => {
    return axios.get(`${baseURL}api-admin/getAllAgents`);
}
export { getAllAgents }