import axios from 'axios';

const baseURL = "http://localhost:8080/";

let createOrder = (factoryCode, data, token) => {
    return axios.post(`${baseURL}api-agent/order`, {
        factoryCode,
        data 
    }, {
        headers: {
            token
        }
    });
}

export {
   createOrder
}