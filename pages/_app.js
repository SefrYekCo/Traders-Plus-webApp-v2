
import { ThemeProvider } from "@mui/material/styles";
import "../styles/globals.css";

import dynamic from 'next/dynamic';
import theme from "../theme/index";
import Footer from "../components/footer/Footer";
const Header = dynamic(() => import("../components/header/Header"), { ssr: false });
import ThemeContainer from "../context/themeContext";
import DrawerContainer from "../context/drawerContext";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import loadingImg from "../public/image/loading.gif"
import {useRouter} from "next/router"
import Head from "next/head";
import Script from 'next/script'
import Loading from "../components/loading/loading";



function MyApp({ Component, pageProps }) {

    const router = useRouter();
    const pathname = router.pathname;
    const [cookies ,setCookies ,removeCookies] = useCookies(["token"]);
    const [loading ,setLoading] = useState(false)


    useEffect(() => {

        const handleRouteChange = (url, { shallow }) => {
            setLoading(true)
        }; 
        
        const handleRouteComplete = (url, { shallow }) => {
            setLoading(false)
        }; 
        
        router.events.on('routeChangeStart', handleRouteChange)
        router.events.on('routeChangeComplete', handleRouteComplete)// If the component is unmounted, unsubscribe
            
        // from the event with the `off` method:
            return () => {
              router.events.off('routeChangeStart', handleRouteChange)
            }
    }, [])

    return(

        !loading ? 

        pathname === "/signUp" || pathname === "/forget-password" || pathname === "/_error" || pathname.includes("changePassword") || pathname.includes("signIn")  ?
        
        <ThemeContainer>
                <ThemeProvider theme={theme.default}>
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
                    <Component {...pageProps} />
                    <ToastContainer rtl={true} />
                </ThemeProvider>
        </ThemeContainer>

        :
        <ThemeContainer>
            <DrawerContainer >
                <ThemeProvider theme={theme.default}>
                        <Script async strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-54MPXCNHZF" />
                        <Script 
                            id='google-analytics'
                            strategy="afterInteractive"
                            dangerouslySetInnerHTML={{
                              __html: `
                              window.dataLayer = window.dataLayer || [];
                              function gtag(){dataLayer.push(arguments);}
                              gtag('js', new Date());
                              gtag('config', 'G-54MPXCNHZF', {
                              page_path: window.location.pathname,
                              });
                            `,
                            }}
                        />
                        <Head>
                            <title> {Component.title} </title>
                            <link rel="shortcut icon" href="/favicon.ico" />
			    <link rel="manifest" href="/manifest.json" />
                            <meta
                            name="تریدرزپلاس - مشاهده آنی و سریع دیجیتال - دسترسی به اخبار و اطلاعات بورس و ارز دیجیتال"
                            content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
                            />
                            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
                            <meta name="robots" content="index,follow" />
                        </Head>

                        <Header />
                        <Component {...pageProps} />
                        <ToastContainer rtl={true} />
                        <Footer />
                </ThemeProvider>
            </DrawerContainer>
        </ThemeContainer>

        :
        <Loading />

    ) 
  }
  

  export default MyApp;
