import { apiWithHeader ,apiWithPasswordHeader ,api, apiWithTokenHeader, apiWithDynamicToken } from "./api";

export const signUp = ( data ,callback) => {
    api().post(`/webUser/signup` ,data).then((response) => {
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

export const signIn = (data ,callback) => {
    api().post(`/webUser/signin` ,data).then((response) => {
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

export const getForgetPassUrl = (data ,callback) => {
    api().post(`/webUser/sendUrl` ,data).then((response) => {
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

export const changePassword = (token ,data ,callback) => {
    api().post(`/webUser/forgetPassword?Token=${token}` ,data).then((response) => {
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

export const getCodeForSignIn = (data ,callback) => {
    api().post(`/user/login` ,data).then((response) => {
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

export const signInByMobileNumber = (data ,callback) => {
    api().post(`/user/validation` ,data).then((response) => {
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

export const logout = (token ,callback) => {
    apiWithHeader(token).post(`/webUser/logout`).then((response) => {
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

export const getUserByToken = (token ,callback) => {
    apiWithTokenHeader(token).get(`/user/user-info`).then((response) => {
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

export const editUser = (token ,data ,callback) => {
    apiWithTokenHeader(token).post(`/user/edit-profile` ,data).then((response) => {
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

export const pinBroker = async (token ,data ,callback) => {
    apiWithTokenHeader(token).post(`/user/pin-broker` ,data).then((response) => {
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

export const saveRegisterToken = (token ,data ,callback) => {
    apiWithTokenHeader(token).post(`/user/save-notification-token` ,data).then((response) => {
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