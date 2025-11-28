import {api ,apiWithHeader, apiWithTokenHeader } from "./api"

export const getCategories = (callback) => {
    api().get("/category/getAll").then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true ,data)
        }
        return callback(false ,data)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}


