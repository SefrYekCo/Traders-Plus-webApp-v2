import { Grid } from '@mui/material';
import React ,{useContext} from 'react';
import {contextThemeController} from '../../context/themeContext';
import styles from './footer.module.css';

import Image from "next/image"

import tradersPlusLogo from "../../public/image/icon_transparent.png";
import instagram from "../../public/image/logo_instagram.svg";
import telegramIcon from "../../public/image/telegram.png";

const Footer = () => {

  const {Theme ,setTheme} = useContext(contextThemeController)

    return ( 
      <footer className={Theme ? styles.footer : styles.footerDark}>
        <div className={Theme ? styles.mainContainer : styles.mainContainerDark}>
          <div className={Theme ? styles.firstContainer : styles.firstContainerDark} >
            <section className={styles.logosContainer}>
                <div className={styles.tradersPlusLogoContainer}>
                  <p>تریدرزپلاس</p>
                  <Image src={tradersPlusLogo} alt="photo" width={50} height={50}  /> 
                </div>
                {/* <Image src={SefrYekLogo} alt="photo" width={80} height={80} /> */}
            </section>
            <section className={styles.secondContainer}>
              <p> 
                تریدرزپلاس یک پلتفرم خدماتی برای ارایه انواع خدمات ارزش افزوده و سرمایه‌گذاری توسط خدمات دهندگان مختلف می‌باشد
              </p>
            </section>
            <section className={styles.socialMedias}>
              <a referrerPolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=332597&amp;Code=808ASIiUkCuWDdRITpgW">
                <img referrerPolicy="origin" src="https://trustseal.enamad.ir/logo.aspx?id=332597&amp;Code=808ASIiUkCuWDdRITpgW" alt="اینماد" style={{cursor:"pointer" ,width:"50px" ,height:"50px"}} id="808ASIiUkCuWDdRITpgW" />
              </a>
              <a href="https://instagram.com/traderzplus?igshid=YmMyMTA2M2Y=" target={"_blank"}> <Image src={instagram} alt="photo" width={30} height={30} /></a>
              <a href="https://t.me/sefryekco" target={"_blank"}> <Image src={telegramIcon} alt="photo" width={30} height={30} /></a>
            </section>
          </div>
          <div className={Theme ? styles.secondMainContainer : styles.secondMainContainerDark}>
            {/* <section className={ styles.ptagContainer}>
              
              <a href="https://sefryek.ir"><p> مجوز ها </p></a>
              <a href="https://sefryek.ir"><p> قوانین و مقررات</p></a>
          </section> */}
            <section className={ styles.ptagContainer}>
              
                <a href="https://sefryek.com"  target={"_blank"}><p> سایت</p></a>
                <a href="https://www.sefryek.com/portfolio/%d8%aa%d8%b1%db%8c%d8%af%d8%b1%d8%b2-%d9%be%d9%84%d8%a7%d8%b3/" target={"_blank"}><p> درباره ما</p></a>
                {/* <a href="https://www.sefryek.com/contact/" target={"_blank"}><p> تماس با ما</p></a> */}
          
            </section>
            {/* <section className={ styles.ptagContainer}>
              
              <a href="https://sefryek.ir"><p> آدرس</p></a>
              <a href="https://sefryek.ir"><p> شماره تماس</p></a>
              <a href="https://sefryek.ir"><p>ایمیل </p></a>
          </section> */}
          </div>
          </div>
          <hr className={styles.hr} />
          <section className={styles.endContainer}>
            <p> کلیه حقوق تریدرز پلاس محفوظ است </p>
      
          </section>
      </footer>
     );
}
 
export default Footer;