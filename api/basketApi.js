import { api, apiWithTokenHeader } from "./api"

export const getBasket = async (token) => {
    const {data ,status} = await apiWithTokenHeader(token).get("/user/get-baskets")
    if(status == 401) return "unauthorized";
    return data
}

export const createBasket = (token ,data ,callback) => {
    apiWithTokenHeader(token).post("/user/add-basket" ,data).then((response) => {
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

export const updateBasket = (token ,data ,callback) => {
    apiWithTokenHeader(token).post("/user/update-basket" ,data).then((response) => {
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

export const createSymbol = (token ,data ,callback) => {
    apiWithTokenHeader(token).post("/user/add-symbol" ,data).then((response) => {
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

export const updateSymbol = (token ,data ,callback) => {
    apiWithTokenHeader(token).get("/user/update-symbol-history" ,data).then((response) => {
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

export const deleteBasket = (token ,id ,callback) => {
    apiWithTokenHeader(token).delete(`/user/delete-basket/${id}`).then((response) => {
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


export const deleteSymbol = (token ,id ,callback) => {
    apiWithTokenHeader(token).delete(`/user/delete-symbol/${id}`).then((response) => {
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

export const deleteSymbolHistory = (token ,id ,callback) => {
    apiWithTokenHeader(token).get(`/user/delete-symbol-history/${id}` ,data).then((response) => {
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

export const getCryptos = (callback) => {
    api().get(`/cryptos`).then((response) => {
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

