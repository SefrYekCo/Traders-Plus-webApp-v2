import { Button } from '@mui/material';
import React, { useState ,useContext, useEffect, useRef } from 'react';
import styles from "./header.module.css";

import Link from "next/link";
import image from "../../public/image/icon_transparent.png";
import {contextThemeController} from '../../context/themeContext';                                        

import Image from 'next/image';
import Converter from '../converter/Converter';

import { contextDrawerController } from '../../context/drawerContext';
import SideBar from '../drawer/Drawer';

import {useCookies} from "react-cookie";
import { useRouter } from 'next/router';
import { getUserByToken } from '../../api/userApi';
import { toast } from 'react-toastify';

const Header = () => {

    const [cookie ,setCookie ,removeCookie] = useCookies(['token'])

    const {draweHandler ,setDrawerHandler} = useContext(contextDrawerController)
    const {Theme ,setTheme} = useContext(contextThemeController)
    const [user ,setUser] = useState({})
    const [search ,setSearch] = useState("")

    const router = useRouter();
    const headerRef = useRef();

    useEffect(() => {
        var lastScrollTop = window.scrollY
        if(screen.width > 450){

        window.onscroll = () => {
            if (lastScrollTop < window.scrollY ){
                if(headerRef.current) headerRef.current.style.height = '0rem'
                if(headerRef.current) headerRef.current.style.opacity = 0
                lastScrollTop = window.scrollY
            } else {
                lastScrollTop = window.scrollY
                if(headerRef.current) headerRef.current.style.height = "4rem"
                if(headerRef.current) headerRef.current.style.opacity = 1
            }
        }
    }
      } 
      , [])

    useEffect(() => {
        if(cookie.token){
            getUserByToken(cookie.token ,(isOk ,info) => {
                if(isOk){
                    setUser(info.response.userInfo)
                    return
                }
                return toast.error(info.response.data.description)
            })
        }
    } ,[cookie.token])

    const searchHandler = (e) => {
        setSearch(e.target.value);
    }

    const themeHandler = (e) => {
        setTheme(perv => !perv)
    }

    const logOut = () => {
        removeCookie("token")
        router.push("/signInByMobileNumber")
    }

    const profileHandler = () => {
        router.push("/myProfile")
    }

    return ( 

       <header ref = { headerRef} className={ Theme ? styles.container : styles.containerDark} >

           <div  className={styles.imageContainer} >
                <Link href={"/"} >
               <Image width={'50px'} height={"50px"} src={image} alt="photo" />
                </Link>
               <h3 className={Theme ? styles.tradersPlus : styles.tradersPlusDark} >تریدرز پلاس</h3>
           </div>
            
           {/* <Converter /> */}
           {/* <input  placeholder='جستجو' className={ Theme ? styles.searchInput : styles.searchInputDark} value={search} onChange={searchHandler} /> */}
           <div  className={ Theme ? styles.linksContainer : styles.linksContainerDark}>
               <Link href="/"> خانه </Link>
               <Link href={ cookie.token ? "/channels" : "/signInByMobileNumber"}> کانال ها</Link>
               <Link href={ cookie.token ? "/myBasket" : "/signInByMobileNumber"}> سبد من</Link>
               <Link href={ cookie.token ? "/services" : "/signInByMobileNumber"}> خدمات</Link>
               <Link href={ cookie.token ? "/alerts" : "/signInByMobileNumber"}> آلارم ها</Link>
               <Link href={ cookie.token ? "/plans" : "/signInByMobileNumber"}> اشتراک ها</Link>
           </div >
           {/* <div  className={styles.themeContainer} >
           {
               Theme ?
               <LightModeIcon />
               :
               <Brightness4Icon style={{color:"#ffffff"}} />
           }

           <Switch onChange={themeHandler}/>
           </div> */}

            {
                cookie.token ?
                <div className={ styles.profileImageContainer}>
                   
                   
                    <div className={ Theme ? styles.btn : styles.btnDark}  >
                        <Button onClick={logOut} >خروج </Button>
                    </div>
                        <Image width={"60px"} height={"60px"} src={user.thumbnailImagePath ? user.thumbnailImagePath : image} onClick={profileHandler} />
                </div>
                :
                <div className={ styles.profileImageContainer}>
                    <div className={ Theme ? styles.btn : styles.btnDark}  >
                        <Link href='/signInByMobileNumber' className={styles.signInLink} >ورود</Link>  
                        {/* <span>|</span>
                        <Link className={styles.signUpLink} href='/signUp'> ثبت نام</Link> */}
                    </div>
                 </div>
            }
            
                  <SideBar theme={Theme} />
       </header>
      
     );
}
 
export default Header;