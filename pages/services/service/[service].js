import React, { useContext, useEffect } from 'react';
import { contextThemeController } from '../../../context/themeContext';
import styles from "./service.module.css";

import tradersplus from "../../../public/image/icon_transparent.png";

import Image from 'next/image';
import { getService } from '../../../api/serviceApi';
import { useRouter } from 'next/router'; 
import { useState } from 'react';
import { toast } from 'react-toastify';
import withAuth from '../../../components/checkAuth/auth';
import Head from 'next/head';

const Service = () => {

    const router = useRouter();
    // console.log(router.query.service)
    const id = router.query.service;

    const [service ,setService] = useState([])

    useEffect(() => {
        if(!id){
            return
        }
        getService(id ,(isOk ,info) => {
            if(isOk){
                setService(info.response.service)
                return
            }
            toast.error(info.response.data.description)
            return
        })
    } ,[id])

    const {Theme ,setTheme} = useContext(contextThemeController)

    return ( 
        <div className={Theme ? styles.mainContainer : styles.mainContainerDark} >
             <Head>
                <title>سرویس {service.name}</title>
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
            </Head>

            <h1> {service.name} </h1>
            <section className={styles.cardsContainer}>

                    <div key={service._id} className={Theme ? styles.card : styles.cardDark}>

                        <Image src={ service.icon ? service.icon : tradersplus } width={"90%"} height={"90%"}  />
                        <div className={styles.contentContainer}>
                            <h3> {service.name} </h3> 
                            <p> { service.description} </p>   
                            <a href = {service.link} target={'_blank'} > برای مشاهده کلیک کنید </a>                        
                        </div>
                    </div>
                        
            </section>
        </div>
     );
}

 
export default withAuth(Service);


