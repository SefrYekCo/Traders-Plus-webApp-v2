import React, { useState ,useContext ,useEffect} from 'react';

import styles from "./myBrokerage.module.css";
import Image from "next/image";

import RightLine from "../../public/image/rightLine.png";
import LeftLine from "../../public/image/LeftLine.png"; 
import RightLineWhite from "../../public/image/rightLineWhite.png";
import LeftLineWhite from "../../public/image/leftLineWhite.png"; 

import pin from "../../public/image/pin.svg"; 

import image from "../../public/image/icon_transparent.png"; 

import {contextThemeController} from '../../context/themeContext';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination ,Navigation } from "swiper";
import { getUserByToken, pinBroker } from '../../api/userApi';
import { brokerClick } from '../../api/BrokersApi';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';


const MyBrokerage = ({brokers ,isMobile}) => {

    const {Theme ,setTheme} = useContext(contextThemeController)

    const [cookies] = useCookies(["token"])
    
    const [search, setSearch] = useState("");
    const [brokerDatas ,setBrokersData] = useState([])
    const [pinBrokers ,setPinBrokers] = useState([])
    const [refetch ,setRefetch] = useState(false)

    
    const changeSearch = (e) => {
        setSearch(e.target.value)
    }

    const clickHandler = (id) => {

        const data = {
            id
        }

        brokerClick(data ,(isOk ,info) => {
            if(isOk) {
                return 
            }
            return toast.error("خطا در انجام عملیات")
        })
    }
    
    const pinHandler =  (id) => {

        const data = {
            brokerId: id
        }

        pinBroker(cookies.token , data ,(isOk ,info) => {
            if(isOk){
                setRefetch(perv => !perv)
                return 
            }
            console.log(info);
            return toast.error(info.description)
        })

    }


    useEffect(() => {
        if(cookies.token){
        getUserByToken(cookies.token ,(isOk ,info) =>{
            if(isOk){
                setPinBrokers([...info.response.userInfo.brokers])
                const userPinBrokers = info.response.userInfo.brokers;
                if(userPinBrokers.length === 0) return setBrokersData(brokers)
                
                userPinBrokers.map((item) => {
                    const index = brokers.findIndex(x => x.id === item);
                    brokers[index] && brokers.splice(0 ,0 ,brokers[index])
                })

                let uniqueChars = brokers.filter((element, index) => {
                    return brokers.indexOf(element) === index;
                }); 

                setBrokersData(uniqueChars)

                return
            }
            return setBrokersData(brokers)
        })
        return
    }
    return setBrokersData(brokers)
    } ,[refetch])

    const filterBrokers = brokerDatas.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))

    return ( 
        <div className={styles.container} >
                
            <div className={styles.firstContainer}  >
                {
                    Theme ?
                    <Image className={styles.seperationLine}  height={'1px !important'} src={LeftLine} alt="photo"/>
                    :
                    <Image className={styles.seperationLine}  height={'1px !important'} src={LeftLineWhite} alt="photo"/>
                }
                
                <h3 className={ Theme ? styles.h3Tag : styles.h3TagDark} >کارگزاری های من</h3>
                {
                    Theme ?
                    <Image className={styles.seperationLine}  height={'1px !important'} src={RightLine} alt="photo"/>
                    :
                    <Image className={styles.seperationLine}  height={'1px !important'} src={RightLineWhite} alt="photo"/>
                }
            </div>
  
               <input value={search} onChange={changeSearch} className={ Theme ? styles.searchInput : styles.searchInputDark} placeholder={"جستجو براساس نام"} />
            
    <Swiper
            dir="rtl"
            slidesPerView={3}
            spaceBetween={100}
            breakpoints={{
                640: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 5,
                 
                },
                1024: {
                  slidesPerView: 6,
               
                },
                1300:{
                    slidesPerView: 9,
                    centeredSlides:true,
                    centeredSlidesBounds:true,
                    
                }
              }}
            centeredSlides={true}
            centeredSlidesBounds={true}
            style={{marginTop:"2rem" ,width:"100%", display:"flex" ,justifyContent:"center"}}
            
            modules={[Pagination ,Navigation]}
            className={styles.Swiper}
        >
        {
            filterBrokers &&
                   filterBrokers.map((item) => {
                        return(
                            <SwiperSlide key={item.id}> 

                                <div className={ Theme ? styles.eachContainer : styles.eachContainerDark} >
                               { 
                                    cookies.token &&
                                    <button className={ pinBrokers.includes(item.id) ? styles.redPinImgContainer : styles.pinImgContainer} onClick={() => pinHandler(item.id)}  >
                                        <Image src={pin} alt="photo" className={styles.pinImg} />
                                    </button>
                                }
                                <a onClick={() => clickHandler(item.id)} href={isMobile ? item.mobileAddress : item.webAddress} target='_blank' className={styles.link} >
                                    <Image src={ item.imageURL ? item.imageURL : image} width={"60%"} height={"60%"} style={{borderRadius:"50%"}} />
                                    <p className={Theme ? styles.brokerageName :  styles.brokerageNameDark} > {item.name} </p>
                                </a>
                                </div>         
                            </SwiperSlide>
                        )
                    })
                }

    </Swiper>
    
        </div>
     );
}

  
 
export default MyBrokerage;