import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import image from "../../public/image/icon_transparent.png";

import styles from "./banners.module.css";

const Banners = ({banners}) => {

    return ( 
        <div className={styles.container} >
            
        <Carousel className={styles.carousel} emulateTouch  stopOnHover infiniteLoop >
            {
                banners.map((item ,index) => {
                    return(
                        <a key={index+1} href={item.link.includes("http") ? item.link : "#"} target={"_blank"}>

                        <h1 className={styles.bannerName} style={{color:item.appearance.titleColor}} > {item.name} </h1>
                        <h3 className={styles.bannerDes}  style={{color:item.appearance.descriptionColor}} > {item.description} </h3>
                    <div className = {styles.imgContainer}>
                        <Image layout='fill' src={item.resources.icon ? item.resources.icon : image} alt="bannerPic"  />
                    </div>
                        </a>
                    )
                })
            }
     </Carousel>
        </div>
     );
}
 
export default Banners;