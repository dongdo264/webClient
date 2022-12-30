import axios from 'axios';

const baseURL = "http://localhost:8080/";



let getAgentWarehouse = (token) => {
    return axios.get(`${baseURL}api-agent/warehouse`, {
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

let analyz = (type, token) => {
    return axios.get(`${baseURL}api-agent/analyz?type=${type}`, {
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
let getAllWarrantyClaim = (token) => {
    return axios.get(`${baseURL}api-agent/warrantyclaim`,
    {
        headers: {
            token
        }
    });
}

let updateStatusProduct = (productCode, status, token) => {
    return axios.put(`${baseURL}api-agent/product/${productCode}`, {
        status
    },
    {
        headers: {
            token
        }
    });
}

let updateCustomerProduct = (model, status, token) => {
    return axios.put(`${baseURL}api-agent/customerproduct/${model}`, {
        status
    },
    {
        headers: {
            token
        }
    });
}
let getAllProductsImported = (token) => {
    return axios.get(`${baseURL}api-agent/productsimported`,
    {
        headers: {
            token
        }
    });
}

let backToFactory = (data, token) => {
    return axios.put(`${baseURL}api-agent/agentwarehouse`,{
        data
    },
    {
        headers: {
            token
        }
    });
}

export {
   getAgentWarehouse,
   sellProducts,
   getProductsAreSold,
   sendWarrantyClaim,
   getAllWarrantyClaim,
   updateStatusProduct,
   updateCustomerProduct,
   getAllProductsImported,
   backToFactory,
   analyz
}