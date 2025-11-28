import * as React from 'react';
import { useContext ,useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import styles from "./drawer.module.css";
import { Button, Grid, Input, Switch, TextField } from '@mui/material';
import { contextDrawerController } from '../../context/drawerContext';


import Link from "next/link";

import Brightness4Icon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/LightMode';  

import MenuIcon from '@mui/icons-material/Menu';   
import CancelIcon from '@mui/icons-material/Cancel'; 
import { contextThemeController } from '../../context/themeContext';
import {useRouter} from 'next/router';
import {useCookies} from "react-cookie";

export default function SideBar() {

    const {draweHandler ,setDrawerHandler} = useContext(contextDrawerController)
    const {Theme ,setTheme} = useContext(contextThemeController)
    const [cookie ,setCookie ,removeCookie] = useCookies(['token'])

    const [state ,setState] = useState({
        right:false
    })

  const router = useRouter();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state , ["right"]:open})
  };

  const themeHandler = (e) => {
    setTheme(perv => !perv)
}

const logOut = () => {
  removeCookie("token")
  router.push("/signInByMobileNumber")
}

const signIn = () => {
  router.push("/signInByMobileNumber")
}


  const list = () => (
    <Box
     className= { Theme ? styles.boxDrawer : styles.boxDrawerDark}
    >
      <div className={styles.iconsContainer}>
        <CancelIcon onClick={toggleDrawer(false)} className={Theme ? styles.cancelIcon : styles.cancelIconDark} />
        <Grid item container className={styles.themeContainer} >
           {/* {
               Theme ?
               <LightModeIcon />
               :
               <Brightness4Icon style={{color:"#ffffff"}} />
           }

           <Switch onChange={themeHandler}/> */}
           </Grid>
      </div>
      <div className={ Theme ? styles.btn : styles.btnDark}  >
        {
          cookie.token 
          ?
          <Button onClick={logOut} > خروج </Button>
          :
          <Button onClick={signIn} > ورود </Button>
        }
      </div>
    <ul   className= { Theme ? styles.ul : styles.ulDark} >
        <li>
            <Link href={"/"} > خانه</Link>
        </li>
        <li>
            <Link href={cookie.token ? "/services" : "/signInByMobileNumber"} > خدمات  </Link>
        </li>
        <li>
            <Link href={cookie.token ? "/channels" : "/signInByMobileNumber"} > کانال ها </Link>
        </li>
        <li>
            <Link href={cookie.token ? "/alerts" : "/signInByMobileNumber"} > آلارم ها </Link>
        </li>
        <li>
            <Link href={cookie.token ? "/plans" : "/signInByMobileNumber"} > پلن ها </Link>
        </li>
        <li>
            <Link href={ cookie.token ? "/myBasket" : "/signInByMobileNumber"} > سبد من  </Link>
        </li>
        {   cookie.token &&      
        <li>
            <Link href={ cookie.token ? "/myProfile" : "/signInByMobileNumber"} >  پروفایل من </Link>
        </li>
        }
    </ul>
    </Box>
  );

  return (
    <div  className={styles.drawerContainer}>
      
        
      <MenuIcon onClick={toggleDrawer(true)} className={Theme ? styles.menuIcon : styles.menuIconDark} />
      <React.Fragment key={"right"}>

          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer(false)}
            
            sx={{
            
                "& .MuiDrawer-modal":{
                    backgroundColor:"#000",
                    width:"300px"
                }
            }}
            >
          {list()}
          </Drawer>
     </React.Fragment>
    
      
    </div>
  );
}