import React ,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import styles from "./signInByMobileNumber.module.css";
import Image from 'next/image';

import finance from "../../public/image/finance.jpg";

import { useCookies } from "react-cookie";
import { signInByMobileNumber ,getCodeForSignIn }  from "../../api/userApi"
import { toast } from 'react-toastify';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Timer from '../../helpers/timer';
import Head from 'next/head';

function Copyright(props) {
  return (
    <Typography className={styles.copyright} variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://sefryek.com/">
        sefryek
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInByMobileNumber() {

  const btnRef = useRef();
  const router = useRouter();
  const [cookies ,setCookie] = useCookies(["token"])
  const [formData ,setFormData] = useState({
    mobileNumber:"",
    code:""
  });
  const [delay ,setDelay] = useState(false);

  const changeHandler = (e) => {
    setFormData({...formData ,[e.target.name]:e.target.value})
  }

  const clickHandler = (e) => {
  
  
    const data = {
      mobileNumber:formData.mobileNumber,
      platform:"web"
    }

    getCodeForSignIn(data , (isOk ,res) => {
      if(isOk) {
        setDelay(true);
        return toast.success("کد با موفقیت ارسال شد")
      }else{
        if(res.response.data.message)  toast.error(res.response.data.message);
        else toast.error(res.response.data.description);
        return setDelay(false)
      }

    })

    setTimeout(() => {
      setFormData({...formData ,['code']:""})
      setDelay(false);

    }, 120000);
  }

  const codeInputChangeHandler = (e) => {
    setFormData({...formData ,[e.target.name]:e.target.value})
    // console.log(e);

  }

    useEffect(() => {
        if(formData.code.length === 4){

            const info = {
                mobileNumber:formData.mobileNumber,
                code:formData.code
            }
        
            signInByMobileNumber(info , (isOk ,res) => {
                if(isOk) {
                    // console.log(res);
                  setCookie("token",res.response.token ,{
                    maxAge:60*60*24*30
                  })
                  toast.success(res.response.message)
                  setFormData({
                    mobileNumber:"",
                    code:""
                  })
                  return router.push("/")
                }
                setFormData({...formData ,["code"]:""})
                return toast.error(res.response.data.description);
              })
        }
    } ,[formData.code])

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          container
          className={styles.imageContainer}
        >
            <Image src={finance} alt={"photo"} />
        </Grid>
        <Grid item  className={styles.formContainer} component={Paper} elevation={6} square>
          <Box
           className={styles.formBox}

          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ورود
            </Typography>
            <Box component="form" noValidate  className={styles.innerFormContainer} >
                <input name='mobileNumber' value={formData.mobileNumber} onChange={changeHandler} placeholder=' شماره تماس خود را وارد نمایید' />

          
        {
          delay ?
          <div className={styles.timerContainer}>
              <input name='code' value={formData.code} onChange={codeInputChangeHandler} placeholder='کد تایید را وارد کنید' /> 
              <Timer  />
          </div>
          : 
           <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 ,transition:"all 2s ease" }}
                onClick={clickHandler}
                ref={btnRef}
              >
               ارسال کد 
              </Button>}
              <Grid container className={styles.linksContainer}>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                   بازگشت
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

SignInByMobileNumber.title = "تریدرزپلاس | ورود";

