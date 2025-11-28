import React ,{useContext ,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import styles from "./addSymbolModal.module.css";
import { contextThemeController } from '../../../../context/themeContext';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { Datepicker } from '@ijavad805/react-datepicker';
import { addSymbol } from '../../../../api/symbolApi';
import Add from '@mui/icons-material/Add';
import { validateCreateSymbol } from '../../../../helpers/helperFunctions';

export default function AddSymbolModal({ setUpdate ,basket ,stocks ,type  }) {

  const [open, setOpen] = useState(false);
  const [cookies] = useCookies(["token"])

  const [newSymbol ,setNewSymbol] = useState({
    basketId: "",
    symbol: "",
    price: "",
    amount: 1,
    type: "",
    date: "",
    unit: type==="iranWachlist" ? "Rial" : "usd" 
  })

  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setNewSymbol({
        basketId: "",
        symbol: "",
        price: "",
        amount: 1,
        type: "",
        date: "",
        unit: type==="iranWachlist" ? "Rial" : "usd" 
    })
  };

  const handleChange = (e) => {
    setNewSymbol({...newSymbol , [e.target.name] : e.target.value})
  }

  
  const handleDateChange = (e) => {
    const justDate = e.format().split("T")[0]
    const correctDate = justDate.replaceAll("-" ,"/")
    setNewSymbol({...newSymbol , ["date"] : correctDate})
  }

  const handleSymbolChange = (e ,value) => {
    if(type === "iranWachlist") return setNewSymbol({...newSymbol , ["symbol"] : value.instance_code})
    setNewSymbol({...newSymbol , ["symbol"] : value.symbol})
  }

  const submitHandler = () => {
    const {status ,message} = validateCreateSymbol( type==="iranWachlist" ? newSymbol.instance_code : newSymbol.symbol ,newSymbol.price, newSymbol.amount ,newSymbol.type ,newSymbol.date)
    if(!status) return toast.error(message)

    const data = {
        basketId:basket._id,
        symbol: type === "iranWachlist" ?  newSymbol.instance_code : newSymbol.symbol,
        price:newSymbol.price,
        amount:newSymbol.amount,
        type:newSymbol.type,
        date:newSymbol.date,
        unit:newSymbol.unit,
    }

    addSymbol( cookies.token , data , (isOk ,info) => {
        if(isOk){
          
            handleClose()
            setUpdate(perv => !perv)
            return toast.success("نماد با موفقیت اضافه شد")
        }
        if(info.response.data.description) return toast.error(info.response.data.description)
        if(info.response.data.message) return toast.error(info.response.data.message)
        return toast.error("خطا در انجام عملیات")
    })

  }


  const {Theme ,setTheme} = useContext(contextThemeController)

  return (
    <div className={styles.container}>
        <Button onClick={ () => setOpen(true)} >
          <Add />
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
                <h2> افزودن نماد </h2> 
                <div dir='rtl' className={Theme ? styles.addSymbolContainer : styles.addSymbolContainerDark}>

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            dir='rtl'
                            onChange={ (e ,value) => handleSymbolChange(e ,value)}
                            options={stocks}
                            noOptionsText={"یافت نشد !"}
                            getOptionLabel={(option) => option.name}
                            className={styles.select}
                            sx={{ width: "50%", direction:"rtl !important" ,textAlign:"right"}}
                            renderInput={(params) => <TextField name='symbol' {...params} sx={{direction:"rtl" ,textAlign:"right"}} label="نماد" />}
                        />

                        <FormControl className={styles.select}  sx={{  minWidth: "50%" }}>
                        <InputLabel id="demo-simple-select-label">نوع</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={newSymbol.type}
                                label="نوع"
                                name='type'
                                onChange={handleChange}
                         
                                dir="rtl"
                                >
                                <MenuItem value={"BUY"}>خرید</MenuItem>
                                <MenuItem value={"SELL"}>فروش</MenuItem>
                                 { type !== "cryptoWachlist" && <MenuItem value={"AWARD_SHARE"}>سهام جایزه</MenuItem> }  
                            </Select>
                        </FormControl>

                        <Datepicker 
                        closeWhenSelectADay={true} 
                        modeTheme={Theme ? "light" : "dark"}
                        format={'YYYY/MM/DD'}
                        input={<input placeholder="تاریخ" className={styles.datePickerInput} />}
                        onChange={handleDateChange}
                        theme = {"green"}
                        />

                        <TextField 
                            inputProps={{style:{direction:"rtl !important" ,textAlign:"right !important" }}} 
                            type={"number"} value={newSymbol.price} 
                            onChange={handleChange} 
                            InputProps={{inputProps: { min: 0 }}} 
                            className={styles.input}
                            sx={{width:"50%" ,direction:"rtl !important" ,textAlign:"right !important"}} 
                            name="price" 
                            label={type === "iranWachlist" ? " قیمت (تومان) " : "قیمت (دلار)"} 
                        />

                        <TextField 
                            inputProps={{style:{direction:"rtl !important" ,textAlign:"right !important" }}}    
                            InputProps={{inputProps: { min: 0 }}} 
                            type={"number"} 
                            value={newSymbol.amount} 
                            className={styles.input}
                            onChange={handleChange} 
                            sx={{width:"50%" ,direction:"rtl !important" ,textAlign:"right !important"}}  
                            name="amount" 
                            label={"تعداد"} 
                        />

                        <TextField 
                            inputProps={{style:{direction:"rtl !important" ,textAlign:"right !important" }}} 
                            type={"number"} value={newSymbol.price*newSymbol.amount} 
                            disabled  
                            className={styles.input}
                            sx={{width:"50%" ,direction:"rtl !important" ,textAlign:"right !important"}} 
                            name="value" 
                            label={"ارزش"} 
                        />

                        <Button onClick={submitHandler} className={Theme ? styles.submitBtn : styles.submitBtnDark}> 
                            افزودن نماد 
                        </Button>

                </div>
            
        </Box>
      </Modal>
    </div>
  );
}