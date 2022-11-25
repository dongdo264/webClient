import axios from 'axios';

const baseURL = "http://localhost:8080/";


let createNewUser = (data) => {
    return axios.post(`${baseURL}api-admin/createNewUser`, {
        id: Date.now() % 100000000,
        username: data.username,
        password: data.password,
        name: data.name,
        adress: data.adress,
        city: data.city,
        phone: data.phone,
        option: data.option
    });
}
let getAllAgents = () => {
    return axios.get(`${baseURL}api-admin/getAllAgents`);
}

let getAllFactories = () => {
    return axios.get(`${baseURL}api-admin/getAllFactories`);
}
let deleteAgentById = (id) => {
    return axios.delete(`${baseURL}api-admin/deleteAgentById?id=${id}`);
}
export { getAllAgents,
    getAllFactories,
    deleteAgentById,
    createNewUser 
    }