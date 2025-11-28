import React from "react";
import Link from "next/link";
import styles from "./404.module.css";
// import notFoundImg from "../public/image/notFound.png"
// import Image from "next/image";

const Auth  = () => {
    return ( 
        <div className={styles.container} >
            <h1> صفحه مورد نظر یافت نشد</h1>
            {/* <Link href={"/singIn"} > ورود </Link>
            <Link href={"/signUp"} > ثبت نام </Link> */}
            <Link href={"/"} > بازگشت به خانه </Link>
            {/* <Image src={notFoundImg} width={"300px"} height={"300px"}  /> */}
        </div>
     );
}
 
export default Auth ;