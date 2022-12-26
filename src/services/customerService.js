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

export {
    getCustomerById,
    updateCustomer
}