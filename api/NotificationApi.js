import { api , apiWithHeader } from "./api";

export const enableNotification = (data ,callback) => {
    api().post(`/enable-notif` ,data).then((response) => {
        const data = response.data
        console.log(response);
        return callback(true ,response)
        }
    ).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const getNotifications = (callback) => {
    api().get(`/admin/notification-report` ).then((response) => {
        const data = response.data
        console.log(response);
        return callback(true ,data)
        }
    ).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}