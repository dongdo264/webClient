import axios from 'axios';
const baseURL = "http://localhost:8080/";

let getProfileUser = (id, token) => {
    return axios.get(`${baseURL}api-user/getprofileuserbyid?id=${id}`,{
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
    return axios.get(`${baseURL}api-user/getallproducts`, {
        headers: {
            token
        }
    })
} 
let getAllFactories = (token) => {
    return axios.get(`${baseURL}api-user/getallfactories`, {
        headers: {
            token
        }
    })
}

let getAllProductLines = (token) => {
    return axios.get(`${baseURL}api-user/getallproductlines`, {
        headers: {
            token
        }
    })
}

export { getProfileUser , getInfoProduct, getAllProducts, getAllFactories, getAllProductLines}