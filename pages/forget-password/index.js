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

import styles from "./forget.module.css";
import Image from 'next/image';

import finance from "../../public/image/finance.jpg";

import {getForgetPassUrl}  from "../../api/userApi"
import { toast } from 'react-toastify';
import { useRef } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
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

export default function ForgetPassword() {

  const btnRef = useRef()
  const [formData ,setFormData] = useState({
    mobileNumber:""
  })
  const [delay ,setDelay] = useState(false)

  const changeHandler = (e) => {
    setFormData({...formData ,[e.target.name]:e.target.value})
  }

  const clickHandler = (e) => {
   
    setDelay(true)

    const data = {
      mobileNumber:formData.mobileNumber
    }
    getForgetPassUrl(data , (isOk ,res) => {
      if(isOk) {
        toast.success(res.description)
        setFormData({
          mobileNumber:""
        })
        return setTimeout(() => {
          setDelay(false)
        }, 60000);
      }

      toast.error(res.response.data.description);
      return setDelay(false)
    })
  }

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
              فراموشی رمز عبور
            </Typography>
            <Box component="form" noValidate  className={styles.innerFormContainer} >
                <input name='mobileNumber' value={formData.mobileNumber} onChange={changeHandler} placeholder=' شماره تماس خود را وارد نمایید' />
        {
          delay ?
          <Typography>
            لطفا شکیبا باشید
          </Typography>  
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
                  <Link href="/signIn" variant="body2">
                   ورود
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signUp" variant="body2">
                    {" ثبت نام"}
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

