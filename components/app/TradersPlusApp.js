import React ,{useContext} from 'react';

import styles from "./tradersPlusApp.module.css";

import {contextThemeController} from '../../context/themeContext';

import MobileImage from "../../public/image/Rectangle.svg";
import ShadowImage from "../../public/image/shadow.png";

import QRCode from "../../public/image/tradersplusQRcode.svg";

import Image from 'next/image';


const TradersPlusApp = () => {

    const {Theme ,setTheme} = useContext(contextThemeController)


    return ( 
        <div className={ Theme ? styles.mainContainer : styles.mainContainerDark }>
            
            <div className={ Theme ? styles.mobileImageContainer : styles.mobileImageContainerDark } > 
                <div className={styles.mobileImage} 
                style={{width:"40%" ,height:"80%" ,position:"absolute" , left:"0%" , top:"0%"}}
                >
                    <Image src={MobileImage} alt='photo' layout='fill'  />
                </div>
                <div className={styles.ShadowImage}  
                style={{ position:"absolute" , bottom:"1%" , left:"12.5%"}}
                >
                    <Image src={ShadowImage} alt='photo' width={"400px"}   />
                </div>
            </div>
            <div className={styles.QrCodeContainer}>
                    <h1>دانلود اپلیکیشن تریدرزپلاس</h1>
                <div className={styles.second}>
                    <a className={styles.aTag} href={"https://www.charkhoneh.com/content/930824561"}  target='_blank'> <button className={styles.downloadBtn}>  دانلود نسخه اندروید از چهارخونه </button></a>
                    <a className={styles.aTag} href={"https://play.google.com/store/apps/details?id=com.sefryektadbir.mobiletradingpro&hl=en"} target='_blank'> <button className={styles.downloadBtn} > دانلود نسخه اندروید از گوگل‌ پلی </button></a> 
                    <button className={Theme ? styles.QRBtn : styles.QRBtnDark }>
                        <Image src={QRCode} alt={"photo"} width={"150px"} height={"150px"} />
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default TradersPlusApp;