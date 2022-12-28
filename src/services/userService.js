import axios from 'axios';
const baseURL = "http://localhost:8080/";

let getProfileUser = (id, token) => {
    return axios.get(`${baseURL}api-user/user/${id}`,{
        headers: {
            token
        }
    });
}

let updateUser = (id, data, avatar, token) => {
    return axios.put(`${baseURL}api-user/user/${id}`,{
        data,
        avatar
    },{
        headers: {
            token
        }
    });
}

let getInfoProduct = (id, token) => {
    return axios.get(`${baseURL}api-user/product/${id}`,{
        headers: {
            token
        }
    });
}

let getAllProducts = (token) => {
    return axios.get(`${baseURL}api-user/products`, {
        headers: {
            token
        }
    })
} 
let getAllFactories = (token) => {
    return axios.get(`${baseURL}api-user/factories`, {
        headers: {
            token
        }
    })
}

let getAllProductLines = (token) => {
    return axios.get(`${baseURL}api-user/productlines`, {
        headers: {
            token
        }
    })
}

let getAllWarrantyCenter = (token) => {
    return axios.get(`${baseURL}api-user/warrantycenters`, {
        headers: {
            token
        }
    })
}

let getAllAgents = (token) => {
    return axios.get(`${baseURL}api-user/agents`, {
        headers: {
            token
        }
    })
}

export { getProfileUser ,
    getInfoProduct,
    getAllProducts,
    getAllFactories,
    getAllProductLines,
    getAllWarrantyCenter,
    getAllAgents,
    updateUser
}