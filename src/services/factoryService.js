import axios from 'axios';

const baseURL = "http://localhost:8080/";

let createProduct = (product, productdetail, avatar, token) => {
    return axios.post(`${baseURL}api-factory/createproduct`, {
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


let production = (data, token) => {
    return axios.post(`${baseURL}api-factory/production`,{
        id: data.id,
        batchCode: data.batchCode,
        color: data.color,
        quantity: data.quantity
    },{
        headers: {
            token
        }
    })
}

let getAllActions = (token) => {
    return axios.get(`${baseURL}api-factory/getallactions`, {
        headers: {
            token
        }
    })
}
let getAllOrders = (token) => {
    return axios.get(`${baseURL}api-factory/getallorders`, {
        headers: {
            token
        }
    })
}

export {
    createProduct,
    production,
    getAllActions,
    getAllOrders
}