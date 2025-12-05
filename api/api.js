import axios from "axios";

// export const baseURL = process.env.APP_ENV === "production" ? 'https://api.traderzplus.ir/api/v1' : 'http://tradersplus-qa.sefryek.com:5000/api/v1';
export const baseURL = 'https://apinew.traderzplus.ir/api/v1'
// http://tradersplus-qa.sefryek.com:5000/api/v1
// http://localhost:5000/api/v1
//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQxOTIwNzMxMjg3ZTUyZWFlZDNiOWMiLCJtb2JpbGVOdW1iZXIiOiIwOTM2NzIzMTMzNyIsImlzcyI6InRyYWRlcnNwbHVzIiwiZXhwIjoxMjAwMDAwMDAwMDAwLCJpYXQiOjE2NDcyMTE5ODB9.mT7iXSLt0_sTcZCFDYz_koYtDu26ddnbNDt_aKkMQAM'
export const password = "sefryek3914!@#$"



export const api = () => { 
    return axios.create({
        baseURL
    })
}


export const apiWithHeader = (token) => {
    return axios.create({
        baseURL,
        headers:{
            Authorization:`bearer ${token}`
        }
    })
}


export const apiWithTokenHeader = (token) => {
    return axios.create({
        baseURL,
        headers:{
            token:`${token}`
        }
    })
}

export const apiWithDynamicToken = (dynamicToken) => {
    return axios.create({
        baseURL,
        headers:{
            token:`bearer ${dynamicToken}`
        }
    })
}

export const apiWithPasswordHeader = () => {
    return axios.create({
        baseURL,
        headers:{
            password:`${password}`
        }
    })
}

export const apiWithPasswordAndTokenHeader = (token) => {
    return axios.create({
        baseURL,
        headers:{
            password:`${password}`,
            token:`${token}`
        }
    })
}