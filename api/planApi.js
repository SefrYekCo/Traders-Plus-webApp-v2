import { apiWithHeader ,api, apiWithPasswordHeader, apiWithTokenHeader } from "./api";

export const getPlans = (callback) => {
    api().get("/plan/getAll").then((response) => {
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

export const getAllPlans = (callback) => {
    api().get("/plan/getAll-admin").then((response) => {
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

export const getPlan = (id ,callback) => {
    apiWithPasswordHeader().get(`/plan/${id}`).then((response) => {
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

export const buyPlan = (token ,data ,callback) => {
    apiWithTokenHeader(token).post(`/payment/buy-plan` ,data).then((response) => {
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

export const getResult = (token ,data ,callback) => {
    apiWithTokenHeader(token).post(`/payment/get-result` ,data).then((response) => {
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

