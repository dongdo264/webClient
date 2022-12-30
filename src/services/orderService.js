import axios from 'axios';
const baseURL = "http://localhost:8080/";


let createOrder = (factoryCode, data, token) => {
    return axios.post(`${baseURL}api-order/order`, {
        factoryCode,
        data 
    }, {
        headers: {
            token
        }
    });
}
let getInfoOrder = (orderNumber, token) => {
    return axios.get(`${baseURL}api-order/order/${orderNumber}`, {
        headers: {
            token
        }
    });
}   

let getAllOrder = (token) => {
    return axios.get(`${baseURL}api-order/orders`, {
        headers: {
            token
        }
    });
}   

let transferProducts = (orderNumber, token) => {
    return axios.post(`${baseURL}api-order/transferproducts`, {
        orderNumber
    },
    {
        headers: {
            token
        }
    });
}
let updateOrder = (orderNumber, status, token) => {
    return axios.put(`${baseURL}api-order/order/${orderNumber}`, {
        status
    },
    {
        headers: {
            token
        }
    });
}

export { getInfoOrder, transferProducts, createOrder, getAllOrder, updateOrder}