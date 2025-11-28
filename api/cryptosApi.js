import { api , apiWithHeader } from "./api";

export const getCryptos = (callback) => {
    api().get("/cryptos").then((response) => {
        const data = response.data
        console.log(data);
        if(response.status){
            return callback(true ,data)
        }
        return callback(false ,response)
    }).catch((err) => {
        console.log(err);
        return callback(false ,err)
    })
}

export const getCurrencies = (callback) => {
    api().get("/currencies").then((response) => {
        const data = response.data
        console.log(data);
        if(response.status){
            return callback(true ,data)
        }
        return callback(false ,response)
    }).catch((err) => {
        console.log(err);
        return callback(false ,err)
    })
}

export const getStocks = async () => {
    const stocks = await api().get("/stocks")
    if(stocks.statusText === "OK") return stocks.data.response.stocks
    return stocks
}

