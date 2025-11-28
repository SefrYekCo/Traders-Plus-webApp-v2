import { apiWithHeader ,apiWithPasswordHeader ,api } from "./api";

export const checkVersion = ( data ,callback) => {
    api().post(`/check-version` ,data).then((response) => {
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
