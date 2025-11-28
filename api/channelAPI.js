import { api , apiWithHeader ,apiWithTokenHeader } from "./api";

export const getChannels = ( token ,callback) => {
    apiWithTokenHeader(token).get("/channel/getAll").then((response) => {
        const data = response.data
        if(response.status){
            return callback(true ,data)
        }
        return callback(false ,data)
    }).catch((err) => {
        console.log(err);
        return callback(false ,err)
    })
}

export const muteChannel = (token ,data ,callback) => {
    apiWithHeader(token).post("/channel/mute" ,data).then((response) => {
        const data = response.data
        if(response.status){
            return callback(true ,data)
        }
        return callback(false ,response)
    }).catch((err) => {
        console.log(err);
        return callback(false ,err)
    })
}

