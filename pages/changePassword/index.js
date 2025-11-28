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

import styles from "./changePass.module.css";
import Image from 'next/image';

import finance from "../../public/image/finance.jpg";

import {changePassword}  from "../../api/userApi"
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { useEffect } from 'react';
import { jwtVerify } from '../../helpers/helperFunctions';

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

export default function ChangePassword() {
 
  const router = useRouter()


  useEffect(() => {
    if (router.isReady) {
      if( !jwtVerify(router.query.token)) {
         toast.error("توکن شما معتبر نمیباشد")
         setTimeout(() => {
          return router.push("/forget-password")
        }, 5000);
      }
    }
  }, [router.isReady]);

    
    const [formData ,setFormData] = useState({
        password:"",
        repeatPassword:""
    })
    
  const changeHandler = (e) => {
    setFormData({...formData ,[e.target.name]:e.target.value})
  }

  const clickHandler = () => {

    if(formData.password !== formData.repeatPassword) return toast.warn("رمز عبور و تکرار رمز عبور یکسان نیستند")

    const data = {
        password:formData.password
    }

    changePassword(token , data , (isOk ,res) => {
      if(isOk) {
    
        toast.success(res.description)
        return router.push("/signIn")
      }
      return toast.error(res.response.data.description)
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
              تغییر رمز عبور
            </Typography>
            <Box component="form" noValidate  className={styles.innerFormContainer} >
            <input type={"password"} name='password' value={formData.password} onChange={changeHandler} placeholder=' رمز عبور جدید' />
            <input type={"password"} name='repeatPassword' value={formData.repeatPassword} onChange={changeHandler} placeholder=' تکرار رمز عبور' />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={clickHandler}
              >
               ثبت
              </Button>
              <Grid container className={styles.linksContainer}>
                <Grid item xs>
                  <Link href="/signIn" variant="body2">
                   ورود
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


