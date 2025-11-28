import React ,{useContext ,useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {  Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import styles from "./editAlertModal.module.css";
import { contextThemeController } from '../../../../context/themeContext';
import EditIcon from '@mui/icons-material/Edit';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/fa';
import AdapterJalali from '@date-io/date-fns-jalali';
import {editAlert} from "../../../../api/alertApi"
import EditAlertConditionModal from '../editAlertConditionModal/editAlertConditionModal';

export default function EditAlertModal({ setUpdate , alert  }) {

  const [open, setOpen] = useState(false);
  const [cookies] = useCookies(["token"])
  const [alertCondition ,setAlertCondition] = useState([])
  const [alertActions ,setAlertActions] = useState(["notification"])
  const [modalUpdate ,setModalUpdate] = useState(false)
  const [editAlertState ,setEditAlertState] = useState({
    name: "",
    message: "",
    startDate: Date.now(),
    expireDate: Date.now(),
    symbol: "",
    justOnce: "",
    sound:"",
    isCrypto:"",
    disable:false
  })

  useEffect(() => {
    setEditAlertState({
        name: alert.name,
        message: alert.message,
        startDate: alert.startDate,
        expireDate: alert.expireDate,
        symbol: alert.symbol,
        justOnce: alert.justOnce,
        sound:alert.sound,
        isCrypto:alert.isCrypto,
        disable:alert.disable
    })
    setAlertCondition([...alert.conditions])
    setAlertActions([...alert.actions])
  } ,[modalUpdate])

  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setEditAlertState({
        name: alert.name,
        message: alert.message,
        startDate: alert.startDate,
        expireDate: alert.expireDate,
        symbol: alert.symbol,
        justOnce: alert.justOnce,
        sound:alert.sound,
        isCrypto:alert.isCrypto,
        disable:alert.disable
    })
    setAlertCondition([...alert.conditions])
    setAlertActions([...alert.actions])
  };

  const handleChange = (e) => {
    setEditAlertState({...editAlertState , [e.target.name] : e.target.value})
  }

//   const disableHandler = (e) => {
//       setEditAlert({...editAlert ,["isCrypto"]: false})
//   }

//   const enableHandler = () => {
//     setEditAlert({...editAlert ,["isCrypto"]: true})
//   }

//   const handleSymbolChange = (e ,value) => {
//     if(!editAlert.isCrypto) return setEditAlert({...editAlert , ["symbol"] : value.instance_code})
//     setEditAlert({...editAlert , ["symbol"] : value.symbol})
//   }

  const handleStartDate = (e) => {
    const startDate = new Date(e).getTime()
    setEditAlertState({...editAlertState ,["startDate"]:startDate})
  }

  const handleExpireDate = (e) => {
    const expireDate = new Date(e).getTime()
    setEditAlertState({...editAlertState ,["expireDate"]:expireDate})
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
      name:editAlertState.name,
      message:editAlertState.message,
      startDate:editAlertState.startDate,
      expireDate:editAlertState.expireDate,
      symbol:editAlertState.symbol,
      justOnce:editAlertState.justOnce,
      sound:editAlertState.sound,
      conditions:alertCondition,
      actions:alertActions,
      isCrypto:editAlertState.isCrypto,
      disable:editAlertState.disable
    }

    editAlert(cookies.token ,data ,(isOk ,info) => {
      if(isOk) {
        handleClose()
        setUpdate(perv => !perv)
        return toast.success("آلارم با موفقیت ویرایش شد")
      }
      if(info.response.data.message) return toast.error(info.response.data.message)
      if(info.response.data.description) return toast.error(info.response.data.description)
      return toast.error("خطا در ویرایش آلارم")
    })

  }


  const {Theme ,setTheme} = useContext(contextThemeController)

  return (
    <div className={styles.container}>
        <Button onClick={ () => setOpen(true)} >
            <EditIcon color='secondary' />
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
                <h2> ویرایش آلارم </h2> 
                <div dir='rtl' className={Theme ? styles.addSymbolContainer : styles.addSymbolContainerDark}>

                        <input maxLength={50} type={"text"} value={editAlertState.name} name="name" onChange={handleChange} className={styles.symbolInput} placeholder={"نام آلارم"} />

                        <input type={"text"} value={alert.deatils.name} disabled name="symbol" onChange={handleChange} className={styles.symbolInput} placeholder={"نام آلارم"} />

                        <LocalizationProvider dateAdapter={AdapterJalali}  >
                       
                            <MobileDateTimePicker 
                              defaultValue={dayjs('2022-04-17T15:30')} 
                              renderInput={(props) => <TextField dir='rtl' {...props} size='medium' helperText={null} />}
                              value={editAlertState.startDate}
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
                              value={editAlertState.expireDate}
                              renderInput={(props) => <TextField dir='rtl' {...props} size='medium'  helperText={null} />}
                              onChange={handleExpireDate}
                              disablePast
                              label={"تاریخ و ساعت پایان"}
                              toolbarTitle={"."}
                            /> 
                        </LocalizationProvider>
                        <div className={Theme ? styles.alertConditionModalContainer : styles.alertConditionModalContainerDark} >
                          <label > شروط آلارم </label> 
                          <EditAlertConditionModal state={alertCondition} setState={setAlertCondition} isCrypto={editAlertState.isCrypto} setUpdate={setModalUpdate} />
                        </div>

                        <FormGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                          sx={{display:"flex" ,alignItems:"center"}}
                          >
                          <label> ارسال آلارم : </label>
                          <FormControlLabel defaultChecked  value="notification" control={<Checkbox color='secondary' checked = {alertActions.includes("notification") ? true :false} />} label="اعلان" onChange={actionChangeHandler} />
                          <FormControlLabel  value="email" control={<Checkbox color='secondary' checked = {alertActions.includes("email") ? true :false} />} label="ایمیل"   onChange={actionChangeHandler}/>
                        </FormGroup>
                        
                        <textarea maxLength={100} type={"text"} value={editAlertState.message} name="message" onChange={handleChange} className={styles.textArea} placeholder={"متن آلارم"} />


                        <Button onClick={submitHandler} className={Theme ? styles.submitBtn : styles.submitBtnDark}> 
                            ویرایش آلارم 
                        </Button>

                </div>
            
        </Box>
      </Modal>
    </div>
  );
}