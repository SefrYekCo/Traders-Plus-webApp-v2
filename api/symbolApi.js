import { api, apiWithTokenHeader } from "./api"

export const getStocks = (callback) => {
    api().get("/stocks").then((response) => {
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

export const addSymbol = (token ,data ,callback) => {
    apiWithTokenHeader(token).post("/user/add-symbol" ,data).then((response) => {
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

export const getStock = (data ,callback) => {
    api().post("/stocks-details-with-instance" ,data).then((response) => {
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

export const deleteSymbolHistory = ( token ,id ,callback) => {
    apiWithTokenHeader(token).delete(`/user/delete-symbol-history/${id}`).then((response) => {
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

export const updateSymbolHistory = (token ,data ,callback) => {
    apiWithTokenHeader(token).post(`/user/update-symbol-history` ,data).then((response) => {
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