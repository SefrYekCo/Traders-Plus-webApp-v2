
import { isExpired, decodeToken } from "react-jwt";
import { alertConditions, cryptoAlertConditions } from "./alertConditions";

export function numberWithCommas(x) {
    if(x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const jwtVerify = (token) => {
    try {

        const myDecodedToken = decodeToken(token);
        const isMyTokenExpired = isExpired(token);
        // console.log(myDecodedToken ,isMyTokenExpired);
        if(myDecodedToken === null || typeof myDecodedToken !== 'object' || isMyTokenExpired) return false
        
        return true

    } catch (err) {
        console.log(err);
        return false
    }

}

export const truncate = (str , len) => {
    if(str){

        if(str.length > len && str.length > 0){
            
            let new_str = str.substr(0 , len);
            
            return new_str + "..."
        }
        return str;
    }
}

export const removeHtmlTag = (text) => {
    if(text) return text.replace(/(<([^>]+)>)/gi, "");
}

export const validateCreateSymbol = (symbol ,price ,amount ,type ,date ) => {

    if(symbol.length == 0) return { status:false ,message:"لطفا نماد مورد نظر را انتخاب کنید"};
    if(price.length == 0) return { status:false ,message:"لطفا قیمت را وارد کنید"};
    if(amount.length == 0) return {status:false ,message:"لطفا تعداد را وارد کنید"};
    if(type.length == 0) return {status:false ,message:"لطفا نوع معامله را انتخاب نمایید"};
    if(date.length == 0) return {status:false ,message:"لطفا تاریخ را انتخاب نمایید"};

    return {status:true ,message:""}
}



export const findConditionTranslate = (condition) => {
    const conditionObj = alertConditions.find(item => item.condition === condition)
    // console.log(conditionObj);
    if(conditionObj) return conditionObj.persion
    conditionObj = cryptoAlertConditions.find(item => item.condition === condition)
    if(conditionObj) return conditionObj.persion
    return condition
  }

  export const calculateSymbolBenefit = (history=[] ,currentPrice) => {

        let symbolValue = 0
        let count = 0
      
        history.forEach(item => {
            
            if(item.type === "SELL"){
                symbolValue -= Number(item.unitPrice)*Number(item.amount);
                return count -=  Number(item.amount)
            } 
            if(item.type === "AWARD_SHARE"){
                return count +=  Number(item.amount)
            } 
            if(item.type === "BUY"){
                symbolValue +=  Number(item.unitPrice)*Number(item.amount)
                return count += Number(item.amount)
            }
        })

        const currentValue = currentPrice * count;

        return currentValue - symbolValue;
  }

  export const isUserValidToAccessChannel = (channelPlan ,userPlans = []) => {

    let isValid = false
    for (let i = 0; i < userPlans.length; i++) {
        if(channelPlan.type === "public" || userPlans[i].planId === channelPlan._id) {
            isValid = true
            break
        }
        continue
    }

    return isValid;
  }


  export const getNameOfPlan = (userPlan ,allPlans=[]) => {
    // console.log(userPlan);
    // console.log(allPlans);
    const filterPlan = allPlans.filter((item) => item._id === userPlan.planId)
    // console.log(filterPlan);
    return filterPlan.length > 0 ? filterPlan[0].name : ""
  }