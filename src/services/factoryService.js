import axios from 'axios';

const baseURL = "http://localhost:8080/";



let production = (data, token) => {
    return axios.post(`${baseURL}api-factory/production`,{
        id: data.id,
        batchCode: Date.now() % 100000000,
        color: data.color,
        quantity: data.quantity
    },{
        headers: {
            token
        }
    })
}

let getAllActions = (token) => {
    return axios.get(`${baseURL}api-factory/actions`, {
        headers: {
            token
        }
    })
}
let getAllOrders = (token) => {
    return axios.get(`${baseURL}api-factory/orders`, {
        headers: {
            token
        }
    })
}

let getWarehouse = (token) => {
    return axios.get(`${baseURL}api-factory/warehouse`, {
        headers: {
            token
        }
    })
}

let getAllFaultyProducts = (token) => {
    return axios.get(`${baseURL}api-factory/faultyproducts`, {
        headers: {
            token
        }
    })
}
let analyzQuantityProduced = (type, token) => {
    return axios.get(`${baseURL}api-factory/analyz?type=${type}`, {
        headers: {
            token
        }
    })
}

export {
    production,
    getAllActions,
    getAllOrders,
    getWarehouse,
    getAllFaultyProducts,
    analyzQuantityProduced
}