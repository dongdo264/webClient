import axios from 'axios';

const baseURL = "http://localhost:8080/";

let createNewUser = (data, token) => {
    return axios.post(`${baseURL}api-admin/createNewUser`, {
        id: Date.now() % 100000000,
        username: data.username,
        password: data.password,
        name: data.name,
        adress: data.adress,
        city: data.city,
        phone: data.phone,
        option: data.option
    }, {
        headers: {
            token
        }
    });
}
let getAllAgents = (token) => {
    return axios.get(`${baseURL}api-admin/getAllAgents`, {
        headers: {
            token
        }
    });
}

let getAllFactories = (token) => {
    return axios.get(`${baseURL}api-admin/getAllFactories`,{
        headers: {
            token
        }
    });
}

let getAllWarrantyCenter = (token) => {
    return axios.get(`${baseURL}api-admin/getAllWarrantyCenter`,{
        headers: {
            token
        }
    });
}
let deleteAgentById = (id, token) => {
    return axios.delete(`${baseURL}api-admin/deleteAgentById?id=${id}`, {
        headers: {
            token
        }
    });
}
let getAllProductlines = (token) => {
    return axios.get(`${baseURL}api-admin/getAllProductlines`, {
        headers: {
            token
        }
    });
}
export { getAllAgents,
    getAllFactories,
    getAllWarrantyCenter,
    deleteAgentById,
    createNewUser,
    getAllProductlines
    }