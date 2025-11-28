import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Link from "next/link";
import styles from "./auth.module.css";
import Head from "next/head";

const AuthPage  = () => {
    return ( 
        <div className={styles.container} >
            <h1> لطفا ابتدا وارد شوید </h1>
            <Link href={"/signInByMobileNumber"} > ورود </Link>
            <Link href={"/"} > بازگشت به خانه </Link>
        </div>
     );
}
 
const WithAuth = Component => {
    const Auth = (props) => {
      const [isOk ,setIsOk] = useState(false)
      const [cookies] = useCookies(["token"])

      console.log(props);

      useEffect(() => {
        if(cookies.token) return setIsOk(true)
       } ,[])
  
      if(!isOk){
        return(
        <AuthPage />
        )
      }
    
      return (
        <>
        <Head>
            <title> {Component.title} </title>
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta
              name="تریدرزپلاس - مشاهده آنی و سریع دیجیتال - دسترسی به اخبار و اطلاعات بورس و ارز دیجیتال"
              content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
            />
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
            <meta name="robots" content="index,follow" />
        </Head>
        <Component {...props} />
        </>
      );
      
    };
  
    if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps;
    }
  
    return Auth;
  };
  
  export default WithAuth;