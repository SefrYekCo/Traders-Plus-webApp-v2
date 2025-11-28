import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./secondBanner.module.css";

import image from "../../public/image/banner.png";

// import required modules
import SwiperCore , { Pagination ,Autoplay } from "swiper";
import Image from "next/image";

 const Slider = () => {

    SwiperCore.use([Autoplay ,Pagination])
 
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay ={{
           delay:4000,
            pauseOnMouseEnter:true
        }}
        
        style={{height:"200px" ,marginTop:"2rem"}}
        pagination={{
          clickable: true,
        }}
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
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide style={{width:"500px"}} ><Image src={image} alt="banner photo" /> </SwiperSlide>
        <SwiperSlide style={{width:"500px"}} ><Image src={image} alt="banner photo" /> </SwiperSlide>
        <SwiperSlide style={{width:"500px"}} ><Image src={image} alt="banner photo" /> </SwiperSlide>
        <SwiperSlide style={{width:"500px"}} ><Image src={image} alt="banner photo" /> </SwiperSlide>
        <SwiperSlide style={{width:"500px"}} ><Image src={image} alt="banner photo" /> </SwiperSlide>
        <SwiperSlide style={{width:"500px"}} ><Image src={image} alt="banner photo" /> </SwiperSlide>
        </Swiper>
    </>
  );
}


export default Slider;