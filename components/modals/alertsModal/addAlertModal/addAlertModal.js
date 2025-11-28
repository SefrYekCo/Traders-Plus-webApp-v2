import React ,{useContext ,useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Autocomplete, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import styles from "./addAlertModal.module.css";
import { contextThemeController } from '../../../../context/themeContext';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import AddAlarm  from '@mui/icons-material/AddAlarm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/fa';
import AdapterJalali from '@date-io/date-fns-jalali';
import AlertConditionModal from '../alertConditionModal/alertCondition';
import {createAlert} from "../../../../api/alertApi"

export default function AddAlertModal({ setUpdate ,stocks ,cryptos  }) {

  const [open, setOpen] = useState(false);
  const [cookies] = useCookies(["token"])
  const [value, onChange] = useState('10:00');
  const [alertCondition ,setAlertCondition] = useState([])
  const [alertActions ,setAlertActions] = useState(["notification"])
  const [modalUpdate ,setModalUpdate] = useState(false)
  const [newAlert ,setNewAlert] = useState({
    name: "",
    message: "",
    startDate: Date.now(),
    expireDate: Date.now(),
    symbol: "",
    justOnce: true,
    sound:"",
    isCrypto:false
  })

  useEffect(() => {

  } ,[modalUpdate])

  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setNewAlert({
        name: "",
        message: "",
        startDate:Date.now(),
        expireDate:Date.now(),
        symbol: "",
        justOnce: true,
        sound:"",
        isCrypto:false
    })
    setAlertCondition([])
  };

  const handleChange = (e) => {
    setNewAlert({...newAlert , [e.target.name] : e.target.value})
  }

  const disableHandler = (e) => {
      setNewAlert({...newAlert ,["isCrypto"]: false})
  }

  const enableHandler = () => {
    setNewAlert({...newAlert ,["isCrypto"]: true})
  }

  const handleSymbolChange = (e ,value) => {
    if(!newAlert.isCrypto) return setNewAlert({...newAlert , ["symbol"] : value.instance_code})
    setNewAlert({...newAlert , ["symbol"] : value.symbol})
  }

  const handleStartDate = (e) => {
    const startDate = new Date(e).getTime()
    setNewAlert({...newAlert ,["startDate"]:startDate})
  }

  const handleExpireDate = (e) => {
    const expireDate = new Date(e).getTime()
    setNewAlert({...newAlert ,["expireDate"]:expireDate})
  }

  const actionChangeHandler = (e) => {
    if(e.target.checked){
      return setAlertActions([...alertActions , e.target.value])
    }
    const index = alertActions.indexOf(e.target.value)
    alertActions.splice(index ,1)
    setAlertActions([...alertActions])
  }

  const submitHandler = () => {
    
    const data = {
      name:newAlert.name,
      message:newAlert.message,
      startDate:newAlert.startDate,
      expireDate:newAlert.expireDate,
      symbol:newAlert.symbol,
      justOnce:newAlert.justOnce,
      sound:newAlert.sound,
      conditions:alertCondition,
      actions:alertActions,
      isCrypto:newAlert.isCrypto
    }
    console.log(data);
    createAlert(cookies.token ,data ,(isOk ,info) => {
      if(isOk) {
        handleClose()
        setUpdate(perv => !perv)
        return toast.success("آلارم با موفقیت ساخته شد")
      }
      if(info.response.data.message) return toast.error(info.response.data.message)
      if(info.response.data.description) return toast.error(info.response.data.description)
      return toast.error("خطا در ساخت آلارم")
    })

  }


  const {Theme ,setTheme} = useContext(contextThemeController)

  return (
    <div className={styles.container}>
        <Button onClick={ () => setOpen(true)} >
            <AddAlarm fontSize='large' />
        </Button>
        <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={Theme ? styles.modalContainer : styles.modalContainerDark}>
        <div onClick={handleClose}  className={Theme ? styles.closeIconContainer : styles.closeIconContainerDark} >
                <CloseIcon />
        </div>
                <h2> افزودن آلارم </h2> 
                <div dir='rtl' className={Theme ? styles.addSymbolContainer : styles.addSymbolContainerDark}>

                        <input type={"text"} value={newAlert.name} name="name" onChange={handleChange} className={styles.symbolInput} placeholder={"نام آلارم"} />

                        <div>
                          <label > نماد بورسی </label>
                          <input type="radio" checked = {!newAlert.isCrypto && true} name="alertType" onChange={disableHandler} />
                          <label > رمزارز</label>
                          <input type="radio" checked = {newAlert.isCrypto && true} name="alertType" onChange={enableHandler}  />
                        </div>

                        {
                          newAlert.isCrypto ?
                          <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              dir='rtl'
                              onChange={(e ,value) => handleSymbolChange(e ,value)}
                              options={cryptos}
                              noOptionsText={"یافت نشد !"}
                              getOptionLabel={(option) => option.name}
                              className={styles.select}
                              sx={{ width: "50%", direction:"rtl !important" ,textAlign:"right"}}
                              renderInput={(params) => <TextField name='symbol' {...params} sx={{direction:"rtl" ,textAlign:"right"}} label="نماد" />}
                          />
                          :
                          <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              dir='rtl'
                              onChange={(e ,value) => handleSymbolChange(e ,value)}
                              options={stocks}
                              noOptionsText={"یافت نشد !"}
                              getOptionLabel={(option) => option.name}
                              className={styles.select}
                              sx={{ width: "50%", direction:"rtl !important" ,textAlign:"right"}}
                              renderInput={(params) => <TextField name='symbol' {...params} sx={{direction:"rtl" ,textAlign:"right"}} label="نماد" />}
                          />
                        }

                        <LocalizationProvider dateAdapter={AdapterJalali}  >
                       
                            <MobileDateTimePicker 
                              defaultValue={dayjs('2022-04-17T15:30')} 
                              renderInput={(props) => <TextField dir='rtl' {...props} size='medium' helperText={null} />}
                              value={newAlert.startDate}
                              onChange={handleStartDate}
                              label={"تاریخ و ساعت شروع"}
                              toolbarTitle={"."}
                            /> 
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterJalali}  
                          localeText={{dateTimePickerDefaultToolbarTitle:"."}}
                        >
                      
                            <MobileDateTimePicker 
                              defaultValue={dayjs('2022-04-17T15:30')} 
                              value={newAlert.expireDate}
                              renderInput={(props) => <TextField dir='rtl' {...props} size='medium'  helperText={null} />}
                              onChange={handleExpireDate}
                              disablePast
                              label={"تاریخ و ساعت پایان"}
                              toolbarTitle={"."}
                            /> 
                        </LocalizationProvider>
                        <div className={Theme ? styles.alertConditionModalContainer : styles.alertConditionModalContainerDark} >
                          <label > شروط آلارم </label> 
                          <AlertConditionModal state={alertCondition} setState={setAlertCondition} isCrypto={newAlert.isCrypto} setUpdate={setModalUpdate} />
                        </div>

                        <FormGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                          sx={{display:"flex" ,alignItems:"center"}}
                          >
                          <label> ارسال آلارم : </label>
                          <FormControlLabel defaultChecked  value="notification" control={<Checkbox color='secondary' defaultChecked />} label="اعلان" onChange={actionChangeHandler} />
                          <FormControlLabel  value="email" control={<Checkbox color='secondary' />} label="ایمیل"   onChange={actionChangeHandler}/>
                        </FormGroup>
                        
                        <textarea type={"text"} value={newAlert.message} name="message" onChange={handleChange} className={styles.textArea} placeholder={"متن آلارم"} />


                        <Button onClick={submitHandler} className={Theme ? styles.submitBtn : styles.submitBtnDark}> 
                            ثبت آلارم 
                        </Button>

                </div>
            
        </Box>
      </Modal>
    </div>
  );
}