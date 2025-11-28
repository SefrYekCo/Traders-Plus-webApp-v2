import React from "react";
import styles from "./myProfile.module.css";
import { contextThemeController } from '../../context/themeContext';
import { useRouter } from "next/router";
import {useCookies} from "react-cookie";
import { useEffect } from "react";
import { editUser, getUserByToken } from "../../api/userApi";
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

import image from "../../public/image/icon_transparent.png";
import { useContext } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRef } from "react";
import withAuth from "../../components/checkAuth/auth";
import {getAllPlans} from "../../api/planApi";
import { getNameOfPlan } from "../../helpers/helperFunctions";

import moment from "jalali-moment";
import Head from "next/head";

const MyProfile = () => {

    moment.locale("fa" ,{useGregorianParser:true})
    const fileInput = useRef();
    const router = useRouter()
    const [cookies ,setCookie ,removeCookie] = useCookies(['token'])

    const {Theme ,setTheme} = useContext(contextThemeController);
    const [userInfo ,setUserInfo] = useState({
        name:"",
        family:"",
        mobileNumber:"",
        plans:[],
        username:"",
        _id:"",
        thumbnailImagePath:"",
    })
    const [editMode ,setEditMode] = useState(false)
    const [plans , setPlans] = useState([])
    const [icon , setIcon] = useState({})

    useEffect(() => {
        
        if(!editMode){
            getUserByToken(cookies.token ,(isOk ,info) => {
                if(isOk){
                    console.log(info.response.userInfo);
                    setUserInfo(info.response.userInfo)
                    return 
                }
                return toast.error(info.response.data.description)
            })
        }
        
    } ,[editMode])

    useEffect(() => {
        getAllPlans((isOk ,info) => {
            if(isOk){
                return setPlans(info.response.plans)
            }
            if(info.response.data.description) return toast.error(info.response.data.description)
            if(info.response.data.message) return toast.error(info.response.data.message)
            return toast.error( 'خطا در دریافت اشتراک ها' )
        })
    } ,[])

    const changeHandler = (e) => {
        setUserInfo({...userInfo ,[e.target.name]:e.target.value})
    }

    const changeProfileImage = (e) => {
        
        setIcon(e.target.files[0])
        
        const reader = new FileReader();
        reader.onload = (e) => {
        
          setUserInfo({...userInfo , ['thumbnailImagePath']:e.target.result})

        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }
        setEditMode(true)
    }

    const clickHandler = () => {
        setEditMode(perv => !perv)
    }

    const changeImageBtn = () => {
        fileInput.current.click()
    }

    const logOut = () => {
        removeCookie("token")
        router.push("/signInByMobileNumber")
    }

    const submitHandler = () => {

        const formData = new FormData();
        formData.append("name" ,userInfo.name);
        formData.append("family" ,userInfo.family);
        // formData.append("mobileNumber" ,userInfo.mobileNumber);
        formData.append("username" ,userInfo.username);
        formData.append("icon" ,icon)


        editUser(cookies.token , formData,(isOk ,info) => {
            if(isOk) {
                setEditMode(false)
                return toast.success("ویرایش با موفقیت انجام شد")
            }
            toast.error(info.response.data.description)
        })
    }

    return ( 
        <div className={ Theme ? styles.mainContainer : styles.mainContainerDark }>
            <div className={Theme ? styles.container : styles.containerDark}>
                <div className={styles.imageContainer}>
                    <Image layout="fill" src={  !userInfo.thumbnailImagePath ? image : userInfo.thumbnailImagePath} alt={"photo"}  />
                </div>

                <div className={Theme ? styles.plansContainer : styles.plansContainerDark} >
                    <h3>پلن های من</h3>
                        {
                            userInfo.plans.length > 0 ?
                            userInfo.plans.map(item => {
                                return(
                                    <div key={item._id} className={styles.showPlansDetailsContainer} >
                                        <p> نام اشتراک : {getNameOfPlan(item ,plans)} </p>
                                        <p> تاریخ فعاسازی : {moment(new Date(item.activateDate).toISOString()).format("YYYY/MM/DD").split("T")[0]} </p>
                                        <p> تاریخ پایان : {moment(new Date(item.expireDate).toISOString()).format("YYYY/MM/DD").split("T")[0]}</p>
                                    </div>
                                )
                            })
                            :
                            <div className={styles.noPlanContainer} >
                                <h3 className={styles.alert} > شما در حال حاضر پلن فعالی ندارید  </h3>
                                <Link href={"/plans"} > خریداری پلن </Link>
                            </div>
                        }

                </div>

            <div className={ Theme ? styles.informationContainer : styles.informationContainerDark}>
                <div>
                    <h3>  نام کاربری :  </h3>
                    <input type="text" name="username" onChange={changeHandler} value={userInfo.username === "null" ? "" : userInfo.username} disabled = {editMode ? false : true} />
                </div>
                <div>
                    <h3>  نام :  </h3>
                    <input type="text" name="name" onChange={changeHandler} value={userInfo.name === "undefined" ? "" : userInfo.name} disabled = {editMode ? false : true} />
                </div>
                <div>
                    <h3>  نام خانوادگی :  </h3>
                    <input type="text" name="family" onChange={changeHandler} value={userInfo.family === "undefined" ? "": userInfo.family} disabled = {editMode ? false : true} />
                </div>
                <div>
                    <h3>  شماره تماس :  </h3>
                    <input type="text" name="family" onChange={changeHandler} value={userInfo.mobileNumber} disabled = {true} />
                </div>

                <div className={styles.btnContainer}>
                    <Button type="button" onClick={clickHandler}>{ editMode ? " انصراف" : "ویرایش اطلاعات" }</Button>
                    <input ref={fileInput} type="file" name="thumbnailImagePath" onChange={changeProfileImage} className={styles.changeImageBtn} style={{display:"none"}} />
                    <Button type="button" color="primary" onClick={changeImageBtn} > تغییر عکس پروفایل</Button>
                </div>
                    {
                        editMode &&
                        <Button type="button" onClick={submitHandler} className={styles.submitBtn} > ثبت</Button>
                    }
                         <Button type="button" color="error" className={styles.deleteBtn} onClick={logOut} >  حذف حساب کاربری </Button>
            </div>
            </div>
        </div>
     );
}

MyProfile.title = "پروفایل من"
 
export default withAuth(MyProfile);