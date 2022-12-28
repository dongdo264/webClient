import axios from 'axios';

const baseURL = "http://localhost:8080/";

let getCustomerById = (id, token) => {
    return axios.get(`${baseURL}api-customer/customer/${id}`,{
        headers: {
            token
        }
    })
}

let updateCustomer = (data, id, token) => {
    return axios.put(`${baseURL}api-customer/customer/${id}`,{
        data
    },{
        headers: {
            token
        }
    })
}
let createCustomer = (customer, token) => {
    return axios.post(`${baseURL}api-customer/customer`, {
        customer
    }, {
        headers: {
            token
        }
    });
}
let getAllCustomers = (token) => {
    return axios.get(`${baseURL}api-customer/customers`, {
        headers: {
            token
        }
    });
}

export {
    getCustomerById,
    updateCustomer,
    getAllCustomers,
    createCustomer
}