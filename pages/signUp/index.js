import React ,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppRegistrationRounded from "@mui/icons-material/AppRegistrationRounded"
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {signUp} from "../../api/userApi";
import styles from "./signUp.module.css";
import Image from 'next/image';
import finance from "../../public/image/finance2.jpg";
import { toast } from 'react-toastify';
import router from "next/router";
import {useCookies} from "react-cookie";

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

  const [formData ,setFormData] = useState({
    username:"",
    password:"",
    firstName:"",
    lastName:"",
    phoneNumber:"",
    confirmPassword:"",
    email:""
  })

  const changeHandler = (e) => {
    setFormData({...formData ,[e.target.name]:e.target.value})
  }

  const signup = () => {

    if(formData.password !== formData.confirmPassword) return toast.warn("کلمه عبور و تکرار کلمه عبور یکسان نمی‌باشند")

    try {
      const data = {
        username:formData.username,
        name:formData.firstName,
        family:formData.lastName,
        mobileNumber:formData.phoneNumber,
        password:formData.password,
        email:formData.email
      }

      signUp(data ,(isOk ,res) => {
        if(isOk){
          setFormData({
            username:"",
            password:"",
            firstName:"",
            lastName:"",
            phoneNumber:"",
            confirmPassword:"",
            email:""
          })
          // console.log(res.response);
          toast.success(res.response.message)
          setCookie("token" ,res.response.token)
          return router.push("/")
        }
        // console.log(res.response.data.description);
        return toast.error(res.response.data.description)
      })
    } catch (err) {
      console.log(err);
    }
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
              <AppRegistrationRounded />
            </Avatar>
            <Typography component="h1" variant="h5">
            ثبت نام    
            </Typography>
            <Box component="form" noValidate className={styles.innerFormContainer} >
                <div className={styles.firstRowContainer} >
                    <input name='firstName' value={formData.firstName} onChange={changeHandler}  placeholder='نام خانوادگی' /> 
                    <input name='lastName' value={formData.lastName} onChange={changeHandler}  placeholder=' نام' />
                </div>
                <input name='username' value={formData.username} onChange={changeHandler} placeholder='نام کاربری' />
                <input name='phoneNumber' value={formData.phoneNumber} onChange={changeHandler}  placeholder='شماره تماس' />
                <input type={"email"} name='email' value={formData.email} onChange={changeHandler}  placeholder='ایمیل' />
                <input name='password' type={"password"} value={formData.password} onChange={changeHandler}  placeholder='رمز عبور' />
                <input name='confirmPassword' type={"password"} value={formData.confirmPassword} onChange={changeHandler}  placeholder='تکرار رمز عبور ' />

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={signup}
              >
              ثبت نام
              </Button>
              <Grid container justifyContent={"end"}>
  
                <Grid item  >
                  <Link href="/signIn" variant="body2">
                    {" قبلا ثبت نام کرده اید؟"}
                  </Link>
                </Grid>
              </Grid>
              <Grid container className={styles.homeLink}>
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

