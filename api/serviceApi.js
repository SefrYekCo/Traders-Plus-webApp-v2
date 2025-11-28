import { apiWithHeader ,api, apiWithPasswordHeader } from "./api";

export const getServices = (callback) => {
    api().get("/service/getAll-admin").then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true , data)
        }
        return callback(false ,response)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}


export const getService = (id ,callback) => {
    apiWithPasswordHeader().get(`/service/${id}`).then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true , data)
        }
        return callback(false ,response)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}


