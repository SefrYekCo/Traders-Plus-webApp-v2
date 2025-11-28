import { api , apiWithHeader ,apiWithTokenHeader ,apiWithPasswordAndTokenHeader } from "./api";

export const getMessages = (token ,id ,callback) => {
    apiWithHeader(token).get(`/message/messages/${id}`).then((response) => {
        const data = response.data
        return callback(true ,response)
        }
    ).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}


export const getMessageV2 = (token ,channelId, page ,callback) => {
    apiWithPasswordAndTokenHeader(token).get(`/message/messagesv2?page=${page}&channelId=${channelId}`).then((response) => {
            const data = response.data
            return callback(true ,data)
        }).catch(err =>{
        console.log(err);
        return callback(false ,err)
    })
}


export const likeMessage = (data ,token ,callback) => {
    apiWithHeader(token).delete("/message/like-message" ,data).then((response) => {
            const data = response
            return callback(true ,response)
        }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}