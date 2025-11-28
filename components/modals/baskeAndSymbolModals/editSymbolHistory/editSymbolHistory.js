import React ,{useContext ,useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import styles from "./editSymbolHistory.module.css";
import { contextThemeController } from '../../../../context/themeContext';
import EditIcon from '@mui/icons-material/Edit';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { Datepicker } from '@ijavad805/react-datepicker';
import { updateSymbolHistory } from '../../../../api/symbolApi';
import moment from 'jalali-moment';

export default function EditSymbolHistory({ stock ,symbolHistory ,setUpdate}) {
  
  moment.locale("fa" ,{useGregorianParser:true})

  const [open, setOpen] = useState(false);
  const [cookies] = useCookies(["token"])

  const [editSymbol ,setEditSymbol] = useState({
    id: "",
    price: "",
    amount: "",
    type: "",
    date: "",
  })

  useEffect(() => {
    setEditSymbol({
        id: symbolHistory._id,
        price: symbolHistory.unitPrice,
        amount: symbolHistory.amount,
        type: symbolHistory.type,
        date: symbolHistory.tradeDate,
    })
  } ,[])

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
  };

  const handleChange = (e) => {
    setEditSymbol({...editSymbol , [e.target.name] : e.target.value})
  }

  
  const handleDateChange = (e) => {
    const justDate = e.format().split("T")[0]
    const correctDate = justDate.replaceAll("-" ,"/")
    setEditSymbol({...editSymbol , ["date"] : correctDate})
  }

  const submitHandler = () => {
    const data = {
        id: editSymbol.id,
        price: editSymbol.price,
        amount: editSymbol.amount,
        type: editSymbol.type,
        date: editSymbol.date,
    }
    console.log(data);
    updateSymbolHistory(cookies.token ,data ,(isOk ,info) => {
        if(isOk) {
            setUpdate(perv => !perv)
            setOpen(false)
            return toast.success("ویرایش تاریخچه با موفقیت انجام شد")
        }
        if(info.response.data.description) return toast.error(info.response.data.description)
        if(info.response.data.message) return toast.error(info.response.data.message)
        return toast.error("خطا در ویرایش تاریخچه")
    })
  }

  const {Theme ,setTheme} = useContext(contextThemeController)

  return (
    <div className={styles.container}>
        <Button className={styles.editBtn} onClick={ () => setOpen(true)} >
          <EditIcon />
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
                <h2> ویرایش تاریخچه</h2> 
                <div dir='rtl' className={Theme ? styles.addSymbolContainer : styles.addSymbolContainerDark}>

                        <input type="text" name="symbol" value={stock.name} disabled className={styles.symbolInput} />

                        <FormControl  sx={{  minWidth: "50%" }}>
                        <InputLabel id="demo-simple-select-label">نوع</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={editSymbol.type}
                                label="نوع"
                                name='type'
                                onChange={handleChange}
                                className={styles.select}
                                dir="rtl"
                                >
                                <MenuItem value={"BUY"}>خرید</MenuItem>
                                <MenuItem value={"SELL"}>فروش</MenuItem>
                                <MenuItem value={"AWARD_SHARE"}>سهام جایزه</MenuItem>
                            </Select>
                        </FormControl>

                        <Datepicker 
                        closeWhenSelectADay={true} 
                        modeTheme={Theme ? "light" : "dark"}
                        // value={ editSymbol.date.length >0 && moment.from(editSymbol.date ,"en" ,"YYYY/M/D").format("YYYY/M/D").split("T")[0]}
                        value={""}
                        format={'YYYY/M/D'}
                        input={<input placeholder="تاریخ" className={styles.datePickerInput} />}
                        onChange={handleDateChange}
                        theme = {"green"}
                        />

                        <TextField 
                            inputProps={{style:{direction:"rtl !important" ,textAlign:"right !important" }}} 
                            type={"number"} value={editSymbol.price} 
                            onChange={handleChange} 
                            InputProps={{inputProps: { min: 0 }}} 
                            sx={{width:"50%" ,direction:"rtl !important" ,textAlign:"right !important"}} 
                            name="price" 
                            label={" قیمت (تومان) "} 
                        />

                        <TextField 
                            inputProps={{style:{direction:"rtl !important" ,textAlign:"right !important" }}}    
                            InputProps={{inputProps: { min: 0 }}} 
                            type={"number"} 
                            value={editSymbol.amount} 
                            onChange={handleChange} 
                            sx={{width:"50%" ,direction:"rtl !important" ,textAlign:"right !important"}}  
                            name="amount" 
                            label={"تعداد"} 
                        />

                        <TextField 
                            inputProps={{style:{direction:"rtl !important" ,textAlign:"right !important" }}} 
                            type={"number"} value={editSymbol.price*editSymbol.amount} 
                            disabled  
                            sx={{width:"50%" ,direction:"rtl !important" ,textAlign:"right !important"}} 
                            name="value" 
                            label={"ارزش"} 
                        />

                        <Button onClick={submitHandler} className={Theme ? styles.submitBtn : styles.submitBtnDark}> ویرایش تاریخچه 
                        </Button>

                </div>
            
        </Box>
      </Modal>
    </div>
  );
}