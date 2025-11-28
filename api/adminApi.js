import {api ,apiWithHeader, apiWithPasswordHeader } from "./api"

export const sendNotifBeforeExpire = (data ,callback) => {
    api().post("/days-before-expire-send-notif" ,data).then((response) => {
        const data = response
        console.log(data);
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

export const muteChannelNotification = (data ,callback) => {
    api().post("/mute-channel-notif ",data).then((response) => {
        const data = response
        console.log(data);
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

export const getUserRepost = (data ,callback) => {
    api().post("/user/get-report" ,data).then((response) => {
        const data = response
        console.log(data);
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

export const deletePlan = (data ,callback) => {
    api().post("/user/delete-plan" ,data).then((response) => {
        const data = response
        console.log(data);
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

export const getUserInfo = (data ,callback) => {
    api().post("/admin/fcm" ,data ).then((response) => {
        const data = response
        console.log(data);
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

export const activePlanForUser = (data ,callback) => {
    api().post("/admin/activePlan" ,data ).then((response) => {
        const data = response
        console.log(data);
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

export const sendNotifByCount = (data ,callback) => {
    apiWithPasswordHeader().post("/admin/send-notification-by-count" ,data).then((response) => {
        const data = response
        console.log(data);
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