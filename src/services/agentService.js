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

let getAgentWarehouse = (token) => {
    return axios.get(`${baseURL}api-agent/warehouse`, {
        headers: {
            token
        }
    });
}

let createCustomer = (customer, token) => {
    return axios.post(`${baseURL}api-agent/createcustomer`, {
        customer
    }, {
        headers: {
            token
        }
    });
}

let sellProducts = (customerCode, data, token) => {
    return axios.post(`${baseURL}api-agent/sellproducts`, {
        customerCode,
        data
    }, {
        headers: {
            token
        }
    });
}

let getAllCustomers = (token) => {
    return axios.get(`${baseURL}api-agent/customers`, {
        headers: {
            token
        }
    });
}

let getProductsAreSold = (token) => {
    return axios.get(`${baseURL}api-agent/productsaresold`, {
        headers: {
            token
        }
    });
}

let sendWarrantyClaim = (data, token) => {
    return axios.post(`${baseURL}api-agent/sendwarrantyclaim`, {
        data
    },
    {
        headers: {
            token
        }
    });
}
export {
   createOrder,
   getAgentWarehouse,
   createCustomer,
   sellProducts,
   getAllCustomers,
   getProductsAreSold,
   sendWarrantyClaim
}