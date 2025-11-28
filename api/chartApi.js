import { api , apiWithHeader } from "./api";

export const getCryptosHistory = (data ,callback) => {
    api().post("/crypto-history" ,data).then((response) => {
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