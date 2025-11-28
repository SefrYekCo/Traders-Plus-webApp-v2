import React, { useRef, useState ,useContext ,useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

import RightLine from "../../public/image/rightLine.png";
import LeftLine from "../../public/image/LeftLine.png"; 
import RightLineWhite from "../../public/image/rightLineWhite.png";
import LeftLineWhite from "../../public/image/leftLineWhite.png"; 
import loadingImg from "../../public/image/loading.gif";

import styles from "./myList.module.css";
import {getStocks} from "../../api/cryptosApi";

import {contextThemeController} from '../../context/themeContext';
import useSWR, { mutate } from "swr";

// import required modules
import { Pagination ,Navigation } from "swiper";
import { numberWithCommas } from "../../helpers/helperFunctions";

export default function MyList() {


    const {Theme ,setTheme} = useContext(contextThemeController)

    const [search , setSearch] = useState('')

    const [stocks ,setStocks] = useState([])   

    
    const searchHandler = (e) => {
      setSearch(e.target.value)
    }
    const {data ,error ,isLoading} = useSWR("/stocks" , () => getStocks())
    useEffect(() => {
      if(data) setStocks(data)
    } ,[data])  

    if(isLoading){
      return(
          <div className={Theme ? styles.loadingContainer : styles.loadingContainerDark} >
               <Image layout="fixed" src={loadingImg} />
          </div>
      )
  }
  
    if(error) return(
      <div className={Theme ? styles.loadingContainer : styles.loadingContainerDark} >
        خطا در دریافت اطلاعات
      </div>
    )


    const filterStocks = stocks.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))

  return (
      
    <React.Fragment >
      <div className={styles.firstContainer}  >
                {
                    Theme ?
                    <Image height={'1px !important'} src={LeftLine} alt="photo"/>
                    :
                    <Image height={'1px !important'} src={LeftLineWhite} alt="photo"/>
                }
                <h3  style={ Theme ? {color:"#000"} : {color:"#fff"}}  > نماد ها</h3>
                {
                    Theme ?
                    <Image  height={'1px !important'} src={RightLine} alt="photo"/>
                    :
                    <Image height={'1px !important'} src={RightLineWhite} alt="photo"/>
                }
        </div>
        <div className={styles.searchContainer}>
          
        <input name="search" onChange={searchHandler} value={search} placeholder={"جستجو بر اساس نام"} className={Theme ? styles.searchInput : styles.searchInputDark} />
        </div>
        <Swiper
            dir="rtl"
            slidesPerView={4}
            autoplay ={{
              delay:8000,
           }}
            spaceBetween={40}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            centeredSlides={true}
            centeredSlidesBounds={true}
            style={{marginTop:"2rem" ,width:"100%"}}
           
           
            modules={[Pagination ,Navigation]}
            className="mySwiper"
        >
          {
            filterStocks &&
            filterStocks.map((item) => {
              return(
        <SwiperSlide key={item.name} className={ Theme ? styles.eachContainer : styles.eachContainerDark}>
            <div className={styles.headerContainer}>
            <p  className={Theme ? styles.pTag : styles.pTagDark} > {item.name} </p>
            <p className={Theme ? styles.pTag : styles.pTagDark}>  آخرین قیمت : {numberWithCommas(item.final_price)} ریال </p>
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.chartDataContainer}>
                    <div className={styles.firstRow}>
                        <p className={Theme ? styles.pTag : styles.pTagDark}> <span className={item.final_price_change >= 0 ? styles.greenPercetage : styles.redPercetage} > {item.final_price_change} </span> : تغییرات آخرین قیمت  </p>
                        <p className={Theme ? styles.pTag : styles.pTagDark}> <span className={styles.symbol_code} >  {item.symbol_code}  </span>: کد نماد  </p>
                    </div >
                    <div className={styles.secondRow}>
                        <p className={Theme ? styles.pTag : styles.pTagDark}> <span className={item.final_price_change_percent >= 0 ? styles.greenPercetage : styles.redPercetage} > {item.final_price_change_percent}% </span>  : درصد تغییرات آخرین قیمت  </p>
                       
                        <p className={Theme ? styles.pTag : styles.pTagDark}>  وضعیت : <span> {item.state} </span> </p>
                    </div>
                </div >
            </div>
        </SwiperSlide>

              )
            })
          }
      
      </Swiper>
    </React.Fragment>
  );
}
