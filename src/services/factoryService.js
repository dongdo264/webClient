import axios from 'axios';

const baseURL = "http://localhost:8080/";

let createProduct = (product, productdetail, avatar, token) => {
    return axios.post(`${baseURL}api-factory/production`, {
        id: Date.now() % 10000000,
        product,
        productdetail,
        avatar  
    }, {
        headers: {
            token
        }
    });
}



export {
    createProduct
}