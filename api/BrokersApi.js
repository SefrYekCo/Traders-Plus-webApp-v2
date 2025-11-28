import {api ,apiWithHeader, apiWithTokenHeader } from "./api"

export const getBrokers = async () => {
    const data = await api().get("/brokers")
    return data
}

export const brokerClick = (data ,callback) => {
    api().post("/brokerage/click" ,data).then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true ,data)
        }
        return callback(false ,data)
    }).catch(err => {
        console.log(err.response.data);
        return callback(false ,err.response.data)
    })
}