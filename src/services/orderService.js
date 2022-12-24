import axios from 'axios';
const baseURL = "http://localhost:8080/";

let getInfoOrder = (orderNumber, token) => {
    return axios.get(`${baseURL}api-order/orderdetail?orderNumber=${orderNumber}`, {
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

export { getInfoOrder, transferProducts}