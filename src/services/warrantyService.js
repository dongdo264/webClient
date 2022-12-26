import axios from 'axios';

const baseURL = "http://localhost:8080/";

let getAllWarrantyActions = (token) => {
    return axios.get(`${baseURL}api-warranty/warranties`,{
        headers: {
            token
        }
    })
}

let sendProductToAgent = (data, token) => {
    return axios.put(`${baseURL}api-warranty/warrantysuccess/${data.warrantyCode}`,{
        data
    }, {
        headers: {
            token
        }
    })
}

let sendProductToFactory = (data, token) => {
    return axios.put(`${baseURL}api-warranty/warrantyfailed/${data.warrantyCode}`,{
        data
    }, {
        headers: {
            token
        }
    })
}

let analyzQuantityWarranty = (type, token) => {
    return axios.get(`${baseURL}api-warranty/analyzwarranty?type=${type}`,{
        headers: {
            token
        }
    })
}
export {
    getAllWarrantyActions,
    sendProductToAgent,
    sendProductToFactory,
    analyzQuantityWarranty
}