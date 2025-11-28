import Head from "next/head";
import Image from "next/image";
import React from "react";
import loadingImg from "../../public/image/loading.gif";
import styles from "./loading.module.css";

export default function Loading({height}) {
  
    return  (
      <div style={{width:"100%" ,height:height}} className={ styles.loadingContainer } >
            <Head>
                <title> تریدرزپلاس </title>
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
            </Head>
            <Image layout="fixed" src={loadingImg} />
      </div>
    )
  }