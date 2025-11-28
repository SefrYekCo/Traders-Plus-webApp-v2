import React ,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useCookies} from "react-cookie";

import styles from "./signIn.module.css";
import Image from 'next/image';

import finance from "../../public/image/finance2.jpg";
import { signIn } from '../../api/userApi';
import { toast } from 'react-toastify';

import router from 'next/router';

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


export default function SignInSide() {
  
  const [cookies ,setCookie] = useCookies(["token"])
  
  const [isCheck , setIsCheck] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [formData ,setFormData] = useState({
    username:"",
    password:""
  })

  const changeHandler = (e) => {
    setFormData({...formData ,[e.target.name]:e.target.value})
  }

  const signin = () => {
    const data = {
      username:formData.username,
      password:formData.password
    }

    signIn(data ,(isOk ,res) => {
      if(isOk){
        if(isCheck){
          setCookie("token",res.response.token ,{
            maxAge:60*60*24*30
          })
        }else{
          setCookie("token",res.response.token)
        }
        setFormData({
          username:"",
          password:""
        })
        toast.success(res.response.message)
        return router.push("/")
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
              ورود
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} className={styles.innerFormContainer} >
                <input name='username' value={formData.username} onChange={changeHandler} placeholder='نام کاربری' />
                <input name='password' type={"password"} value={formData.password} onChange={changeHandler}  placeholder='رمز عبور' />
              <FormControlLabel
                dir='rtl'
                sx={{
                    display:"flex",
                    width:"100%",
                    justifyContent:"flex-start",
                    alignItems:"center"
                }}
                control={<Checkbox sx={{alignSelf:"start"}} onChange = {(e) => setIsCheck(e.target.checked)} value={isCheck} color="primary"  />}
                label="مرا به خاطر بسپار"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick = {signin}
              >
               ورود  
              </Button>
              <Grid container className={styles.linksContainer}>
                <Grid item xs>
                  <Link href="/forget-password" variant="body2">
                    رمز عبور خود را فراموش کرده اید؟
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signUp" variant="body2">
                    {"تا کنون ثبت نام نکرده اید؟ ثبت نام"}
                  </Link>
                  
                </Grid>
              </Grid>
              <Grid container className={styles.homeLink}>
              <Grid container className={styles.homeLink}>
              <Link href="/signInByMobileNumber" variant="body2">
                    {"ورود با شماره تماس"}
                  </Link>
              </Grid>
              <Link href="/" variant="body2">
                    {"بازگشت به خانه"}
                  </Link>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

