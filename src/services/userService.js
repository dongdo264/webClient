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

export { getProfileUser , getInfoProduct}