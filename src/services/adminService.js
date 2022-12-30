import axios from 'axios';

const baseURL = "http://localhost:8080/";

let createNewUser = (data, token) => {
    return axios.post(`${baseURL}api-admin/user`, {
        id: Math.floor(Math.random() * 10000000000),
        username: data.username,
        password: data.password,
        name: data.name,
        adress: data.adress,
        city: data.city,
        phone: data.phone,
        option: data.option
    }, {
        headers: {
            token
        }
    });
}



let deleteUser = (status, id, token) => {
    return axios.put(`${baseURL}api-admin/user/${id}`,{
        status
    }, {
        headers: {
            token
        }
    });
}

let createNewProduct = (product, productdetail, avatar, token) => {
    return axios.post(`${baseURL}api-admin/product`, {
        id: Math.floor(Math.random() * 100000000000),
        product,
        productdetail,
        avatar  
    }, {
        headers: {
            token
        }
    });
}

let createNewProductLine = (data, token) => {
    return axios.post(`${baseURL}api-admin/productline`,{
        data
    }, {
        headers: {
            token
        }
    });
}

let updateProduct = (product, productdetail, avatar, token) => {
    return axios.put(`${baseURL}api-admin/product/${product.productCode}`, {
        product,
        productdetail,
        avatar  
    }, {
        headers: {
            token
        }
    });
}
let updateProductLine = (productLine, data, token) => {
    return axios.put(`${baseURL}api-admin/productline/${productLine}`, {
       data 
    }, {
        headers: {
            token
        }
    });
}
export { 
    deleteUser,
    createNewUser,
    createNewProductLine,
    createNewProduct,
    updateProduct,
    updateProductLine
}