import React, { useContext } from 'react';
import { contextThemeController } from '../../context/themeContext';
import styles from "./services.module.css";

import tradersplus from "../../public/image/icon_transparent.png";

import Image from 'next/image';
import { api } from '../../api/api';
import { truncate } from '../../helpers/helperFunctions';
import { useRouter } from 'next/router';
import {useCookies} from "react-cookie"
import withAuth from '../../components/checkAuth/auth';

export async function getServerSideProps() {

    const Services = await api().get("/service/getAll") 

    if(Services.statusText != "OK"){
        return { props: { sortedServices : "error" } }
    }
    const services = Services.data.response.services;
    const sortedServices = services.sort((a ,b) => a.index - b.index)
    return { props: { sortedServices } }
}

const Services = ({sortedServices}) => {
    const [cookies] = useCookies(["token"])
    
    const router = useRouter();
    const {Theme ,setTheme} = useContext(contextThemeController)
    

    const clickHandler = (id) => {
        router.push(`/services/service/${id}`)
    }

    return ( 
        sortedServices === "error" 
        ?
        <div className={Theme ? styles.mainContainer : styles.mainContainerDark} style={{alignItems:"center" ,justifyContent:"center"}} >
            <h1> خطا در دریافت سرویس ها </h1> 
        </div>
        :
        <div className={Theme ? styles.mainContainer : styles.mainContainerDark} >
            <h1>خدمات</h1>
            <section className={styles.cardsContainer}>
            {
            sortedServices.map(item => {
                return(
                    <div key={item._id} className={Theme ? styles.card : styles.cardDark} onClick={() => clickHandler(item._id)} >

                        <Image src={ item.icon ? item.icon : tradersplus } width={"90%"} height={"90%"}  />
                        <h3> {item.name} </h3> 
                        <p> { truncate(item.description ,100)} </p>   
                        <a href = {item.link} target={'_blank'} > برای مشاهده کلیک کنید </a>                        
                    </div>
                )
            })}
                        
            </section>
        </div>
     );
}

Services.title = "تریدرز پلاس | سرویس ها"
 
export default withAuth(Services);


