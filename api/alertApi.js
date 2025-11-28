import { apiWithTokenHeader } from "./api"

export const getAlerts = async (token ,disabled) => {
    const {data ,status} = await apiWithTokenHeader(token).get(`/alert/get?disable=${disabled}`)
    if(status == 401) return "unauthorized";
    return data
}

export const createAlert = (token ,data ,callback) => {
    apiWithTokenHeader(token).post("/alert/add" ,data).then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true ,data)
        }
        return callback(false ,data)
    }).catch(err => {

        return callback(false ,err)
    })
}

export const editAlert = (token ,data ,callback) => {
    apiWithTokenHeader(token).post("/alert/edit" ,data).then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true ,data)
        }
        return callback(false ,data)
    }).catch(err => {

        return callback(false ,err)
    })
}