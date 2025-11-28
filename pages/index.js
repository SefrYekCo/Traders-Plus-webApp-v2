import React, { useContext, useEffect, useState } from "react";

// import dynamic from 'next/dynamic';
// import {Grid, Typography} from "@mui/material"
// import { ThemeProvider } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Banners from "../components/banners/banners";
import MyBrokerage from "../components/myBrokerage/MyBrokerage";
// const MyBrokerage = dynamic(() => import("../src/components/myBrokerage/MyBrokerage"), { ssr: false });
import theme from "../theme/index";
import { contextThemeController } from "../context/themeContext";
import Prices from "../components/prices/Prices";
const PushNotificationLayout = dynamic(() => import("../components/notification/PushNotificationLayout"), { ssr: false });
import "swiper/css/bundle";
// import "./styles.css";
import TradersPlusApp from "../components/app/TradersPlusApp";
import MyList from "../components/myList/MyList";
// import Converter from '../components/converter/Converter';

import { api } from "../api/api";
//import PushNotificationLayout from "../components/notification/PushNotificationLayout";
import { useCookies } from "react-cookie";

export async function getStaticProps() {
  const Brokers = await api().get("/brokerage/active");
  const brokers = Brokers.data.response.brokers;

  const Banners = await api().get("/banner/getAll/web");
  const banners = Banners.data.response.banners;

  const Currencies = await api().get("/currencies");
  const currencies = Currencies.data.response

  const Cryptos = await api().get("/cryptos");
  const cryptos = Cryptos.data.response.cryptos

  return { props: { banners, brokers ,currencies ,cryptos }, revalidate: 120 };
}

const Index = ({ brokers, banners ,currencies ,cryptos }) => {
  const main = theme.default.palette.primary.main;
  const [cookies ,setCookies ,removeCookies] = useCookies(["token"]);
  const { Theme, setTheme } = useContext(contextThemeController);


  const [width, setWidth] = useState();

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      setWidth(window.innerWidth)
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;

  return (

    <div
    style={
      Theme
          ? { backgroundColor: main, height: "100%" }
          : { backgroundColor: "#131722", height: "100%" }
      }
      >
        {
          cookies.token &&
        <PushNotificationLayout>
        </PushNotificationLayout>
        }
      <Banners banners={banners} />
      <MyBrokerage brokers={brokers} isMobile={isMobile} />
      <Prices currencies={currencies} cryptos={cryptos} />

      {/* <Slider /> */}
      <MyList />
      <TradersPlusApp />
      {/* <Converter /> */}
    </div>

  );
};

Index.title = "تریدرزپلاس | خانه";

export default Index;
