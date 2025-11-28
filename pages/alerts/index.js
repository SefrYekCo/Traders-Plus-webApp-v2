import React, { useContext, useEffect, useState } from 'react';
import { contextThemeController } from '../../context/themeContext';

import styles from "./alerts.module.css";
import useSWR ,{mutate} from "swr"
import { useRouter } from 'next/router';
import loadingImg from "../../public/image/loading.gif";
import Image from 'next/image';
import { toast } from 'react-toastify';
import { getCryptos } from "../../api/basketApi";
import { useCookies } from "react-cookie";
import Link from 'next/link';
import { Switch } from '@mui/material';
import { getStocks } from '../../api/symbolApi';
import { editAlert, getAlerts } from '../../api/alertApi';
import AddAlertModal from '../../components/modals/alertsModal/addAlertModal/addAlertModal';
import moment from "jalali-moment"
import ShowAlertConditionModal from '../../components/modals/alertsModal/showConditionModal/showConditionModal';
import EditAlertModal from '../../components/modals/alertsModal/EditAlertModal/editALertModal';
import Head from 'next/head';
import WithAuth from '../../components/checkAuth/auth';


const Alarms = () => {

    moment.locale("fa" ,{useGregorianParser:true})
    const router = useRouter();

    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    const {Theme ,setTheme} = useContext(contextThemeController);
    const [update ,setUpdate] = useState(false);
    const [alertType ,setAlertType] = useState(true)
    const [cryptos ,setCryptos] = useState([])
    const [stocks ,setStocks] = useState([])

    useEffect(() => {
        mutate("/alert/get?disable=false")
    } ,[update])
    
    const handleHistory = () => {
        setAlertType(false)
        setUpdate(perv => !perv)
    }

    const handleActiveAlerts = () => {
        setAlertType(true)
        setUpdate(perv => !perv)
    }

    const disableHandler = (check ,alert) => {

        if(!check && alert.expireDate <= Date.now()) return toast.error("تاریخ اعتبار آلارم مورد نظر به پایان رسیده است. لطفا ابتدا تاریخ را تغییر دهید")
            const data = {
               id:alert.id,
               name:alert.name,
               message:alert.message,
               startDate:alert.startDate,
               expireDate:alert.expireDate,
               symbol:alert.symbol,
               justOnce:alert.justOnce,
               sound:alert.sound,
               conditions:alert.conditions,
               actions:alert.actions,
               isCrypto:alert.isCrypto,
               disable:check
            }
       
            editAlert(cookies.token ,data ,(isOk ,info) => {
                if(isOk){
                    return setUpdate(perv => !perv)
                }
                if(info.response.data.description) return toast.error(info.response.data.description)
                if(info.response.data.message) return toast.error(info.response.data.message)
                return toast.error("خطا در انجام عملیات")
            })
        
    }

    useEffect(() => {
        getCryptos((isOk ,info) => {
            if(isOk){
                return setCryptos(info.response.cryptos)
            }   
            if(info.response.data.description) return toast.error(info.response.data.description)
            if(info.response.data.message) return toast.error(info.response.data.message)
            return toast.error("خطا در دریافت رمزارز ها")
        })
        getStocks((isOk ,info) => {
            if(isOk){
                return setStocks(info.response.stocks)
            }   
            if(info.response.data.description) return toast.error(info.response.data.description)
            if(info.response.data.message) return toast.error(info.response.data.message)
            return toast.error("خطا در دریافت نماد ها")
        })
      } ,[alertType])

    const {data ,error ,isLoading} = useSWR("/alert/get?disable=false" , () => getAlerts(token ,alertType) ,
    {
        revalidateOnFocus:false,
        revalidateOnReconnect:false,
        revalidateIfStale:false,
        refreshInterval: 1000*120
    })

    // console.log(data ,error);

    
    if(isLoading){
        return(
            <div className={Theme ? styles.loadingContainer : styles.loadingContainerDark} >
                 <Image layout="fixed" src={loadingImg} />
            </div>
        )
    }
    
    if( error && error.response && error.response.status == 403) {
       return(
        <div className={Theme ? styles.noAuth : styles.noAuthDark} >
            <h1> را خریداری کنید pro برای استفاده از "آلارم" لطفا پلن  </h1>
            <Link href={"/plans"} > خرید پلن </Link>
        </div>
       )
    }

    if( error && error.response && error.response.status == 401) {
        removeCookies("token")
        return(
         <div className={Theme ? styles.noAuth : styles.noAuthDark} >
            <h1> لطفا ابتدا وارد شوید </h1>
            <Link href={"/signInByMobileNumber"} >  ورود </Link>
         </div>
        )
     }

    if(error) {
        return(
         <div className={Theme ? styles.noAuth : styles.noAuthDark} >
             <h1> برقراری ارتباط با مشکل مواجه شده است </h1>
             <p> لطفا شکیبا باشید </p>
         </div>
        )
     }
    return ( 
        <div className={Theme ? styles.mainContainer : styles.mainContainerDark} >
           <div className={Theme ? styles.basketModelContainer : styles.basketModelContainerDark}>
                <button style={ alertType ? {backgroundColor: "#45B6A3" ,boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.25)"} : {}} onClick={handleActiveAlerts} type="button" autoFocus > آلارم های غیرفعال </button>
                <button style={!alertType ? {backgroundColor: "#45B6A3" ,boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.25)"} : {}} onClick={handleHistory} type="button"> آلارم های فعال</button>
           </div>

           <div className={Theme ? styles.operationContainer : styles.operationContainerDark}>
            <AddAlertModal setUpdate={setUpdate} stocks={stocks} cryptos={cryptos} />
           </div>


            <section  className={Theme ? styles.alertsContainer : styles.alertsContainerDark} >
            {
            data.response.alerts.length === 0 
                ?
                <h1> آلارمی موجود نمی باشد </h1>
                :
                data.response.alerts.map(alert => {
                    return(
                        <div key={alert.id} className={Theme ? styles.alertContainer : styles.alertContainerDark} >
                            <p> 
                                {alert.name}
                            </p> 
                            <p> 
                                {alert.deatils.name}
                            </p> 
                            <p> 
                                {moment(new Date(alert.expireDate).toISOString()).format().split("T")[0]}
                            </p> 
                            <p> 
                                {moment(new Date(alert.expireDate).toISOString()).format().split("T")[1].split("+")[0]}
                            </p> 
                            <ShowAlertConditionModal alertCondition={alert.conditions} />
                            <EditAlertModal setUpdate={setUpdate} alert={alert} />
                            <Switch value={alert.disable} checked={!alert.disable} onChange={ () => disableHandler(!alert.disable ,alert)} />
                        </div>
                    )
                })
            }
            </section>

        </div>
     );
}

Alarms.title = " تریدرزپلاس | آلارم ها "
 
export default WithAuth(Alarms);