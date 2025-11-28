import React, { useContext, useEffect, useState } from 'react';
import { contextThemeController } from '../../context/themeContext';

import AddBasketModal from '../../components/modals/baskeAndSymbolModals/addBasketModal/AddBasketModal';
import EditBasketModal from '../../components/modals/baskeAndSymbolModals/editBasketModal/EditBasketModal'

import styles from "./myBasket.module.css";
import useSWR ,{mutate} from "swr"
import { useRouter } from 'next/router';
import loadingImg from "../../public/image/loading.gif"
import Image from 'next/image';
import { toast } from 'react-toastify';
import {getBasket, getCryptos} from "../../api/basketApi";
import { useCookies } from "react-cookie";
import noItem from "../../public/image/noItem.png";
import Link from 'next/link';
import { Divider } from '@mui/material';
import DeleteBasketModal from '../../components/modals/baskeAndSymbolModals/deleteBasketModal/deleteBasketModal';
import BasketSymbolModal from '../../components/modals/baskeAndSymbolModals/basketSymbolModal/basketSymbolModal';
import { getStocks } from '../../api/symbolApi';
import AddSymbolModal from '../../components/modals/baskeAndSymbolModals/addSymbolModal/addSymbolModal';

const MyBasket = () => {

    const router = useRouter();

    const [cookies ,setCookies ,removeCookies] = useCookies(["token"]);
    const token = cookies.token;

    const {Theme ,setTheme} = useContext(contextThemeController);
    const [update ,setUpdate] = useState(false);
    const [basketType ,setBasketType] = useState('iranWachlist')
    const [stocks ,setStocks] = useState([])

    useEffect(() => {
        mutate("/user/get-baskets")
    } ,[update])
    
    const handleBasketType = (e) => {
        setBasketType(e.target.name)
    }

    useEffect(() => {
        if(basketType === "iranWachlist") {
            getStocks((isOk ,info) => {
            if(isOk) {
                    return setStocks(info.response.stocks)
                }
                return toast.error(info.response.data.description)
            })
        }else{
            getCryptos((isOk ,info) => {
                if(isOk){
                    return setStocks(info.response.cryptos)
                }
                if(info.response.data.description) return toast.error(info.response.data.description)
                if(info.response.data.message) return toast.error(info.response.data.message)
                return toast.error("خطا در دریافت رمزارز ها")
            })
        }
      } ,[basketType])

    const {data ,error ,isLoading} = useSWR("/user/get-baskets" , () => getBasket(token) ,
    {
        revalidateOnFocus:false,
        revalidateOnReconnect:false,
        revalidateIfStale:false,
        refreshInterval: 1000*120
    })

    
    if(isLoading){
        return(
            <div className={Theme ? styles.loadingContainer : styles.loadingContainerDark} >
                 <Image layout="fixed" src={loadingImg} />
            </div>
        )
    }
    
    if(error && error.response && error.response.status == 403) {
       return(
        <div className={Theme ? styles.noAuth : styles.noAuthDark} >
            <h1> را خریداری کنید pro برای استفاده از "سبد من" لطفا پلن  </h1>
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
                <button onClick={handleBasketType} name={"iranWachlist"} type="button" autoFocus > سبد بورسی </button>
                <button onClick={handleBasketType} name={"cryptoWachlist"} type="button"> سبد ارز دیجیتال </button>
           </div>

           <div className={Theme ? styles.operationContainer : styles.operationContainerDark}>
                <AddBasketModal type={basketType} setUpdate = {setUpdate} />
           </div>

           <h2> {basketType === "iranWachlist" ? "سبد بورسی" : "سبد ارز دیجیتال"} </h2>

            <section  className={Theme ? styles.basketsContainer : styles.basketsContainerDark} >
                {
                    data.response &&
                    data.response.baskets.length == 0 ?
                    <div>
                        <Image src={noItem} width={300} height={300} />
                        <h1> در حال حاضر سبدی وجود ندارد </h1>
                    </div>
                    :
                    data.response.baskets.map(item => {
                        return(
                            item.type === basketType &&
                            <div  key={item._id} className={Theme ? styles.basket : styles.basketDark} >
                                <BasketSymbolModal basket={item} stocks={stocks} type={basketType} setUpdate={setUpdate} update = {update}  />
                              <div className={Theme ? styles.btnContainer : styles.btnContainerDark} >
                                    <Divider orientation='horizontal' sx={{color:"red"  ,width:"90%" ,position:"absolute" ,top:"0"}} />
                                 <DeleteBasketModal basket={item} setUpdate={setUpdate} />
                                 |
                                 <AddSymbolModal setUpdate={setUpdate} basket={item} stocks={stocks} type={basketType} />
                                 |
                                 <EditBasketModal setUpdate={setUpdate} basket={item} />
                              </div>
                            </div>
                        )
                    })
                }
            </section>

        </div>
     );
}

MyBasket.title = "تریدرزپلاس | سبدمن"
 
export default MyBasket;