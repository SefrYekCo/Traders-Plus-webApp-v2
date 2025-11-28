import React ,{useContext ,useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import styles from "./basketSymbolModal.module.css";
import { contextThemeController } from '../../../../context/themeContext';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

import CloseIcon from '@mui/icons-material/Close';
import { Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { addSymbol, deleteSymbolHistory, getStock } from '../../../../api/symbolApi';
import { Datepicker } from '@ijavad805/react-datepicker';
import {validateCreateSymbol ,numberWithCommas ,calculateSymbolBenefit} from "../../../../helpers/helperFunctions";
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import moment from 'jalali-moment';
import EditSymbolHistory from "../editSymbolHistory/editSymbolHistory"
import DeleteSymbolModal from '../deleteSymbolModal/deleteSymbolModal';

export default function BasketSymbolModal({ basket ,stocks ,type ,setUpdate ,update}) {

  moment.locale("fa" ,{useGregorianParser:true})

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState({
    symbolDetail:true,
    history:false,
    addSymbol:false
  });
  const [stock ,setStock] = useState({})
  const [newSymbol ,setNewSymbol] = useState({
    basketId: "",
    symbol: "",
    price: "",
    amount: 1,
    type: "",
    date: "",
    unit: type==="iranWachlist" ? "Rial" : "usd" 
  })

  const [symbol ,setSymbol] = useState({
    history:[]
  })

  const [cookies] = useCookies(["token"])

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setMode({symbolDetail:true ,history:false ,addSymbol:false})
    setNewSymbol({
        basketId: "",
        symbol: "",
        price: "",
        amount: 1,
        type: "",
        date: "",
        unit: type==="iranWachlist" ? "Rial" : "usd" 
    })
    setOpen(false)
  };

  const {Theme ,setTheme} = useContext(contextThemeController)

  const detailHandler = () => {
    setMode({symbolDetail:true ,history:false ,addSymbol:false})
  

  }

  const historyHandler = () => {
    setMode({symbolDetail:false ,history:true ,addSymbol:false})

  }

  useEffect(() => {

  } ,[update])

  const addSymbolHandler = () => {
    setMode({symbolDetail:false ,history:false ,addSymbol:true})
    // getStocks((isOk ,info) => {
    //     if(isOk) {
    //         return setStocks(info.response.stocks)
    //     }
    //     return toast.error(info.response.data.description)
    // })
  }

  const handleChange = (e) => {
    setNewSymbol({...newSymbol , [e.target.name] : e.target.value})
  }

  const handleDateChange = (e) => {
    const justDate = e.format().split("T")[0]
    const correctDate = justDate.replaceAll("-" ,"/")
    setNewSymbol({...newSymbol , ["date"] : correctDate})
  }

  const symbolClickHandler = (symbol ,stock) => {
    handleOpen()
    // console.log(symbol ,stock);
    // setLoading(true)
    setSymbol(symbol)
    const data = {
      stocks: [`${symbol.symbol}`]
    }
    getStock( data ,(isOk ,info) => {
      if(isOk){
        setStock(info.response.stocks[0])
          return 
      }
      // setLoading(false)
      if(info.response.data.description) return toast.error(info.response.data.description)
      if(info.response.data.message) return toast.error(info.response.data.message)
      return toast.error("خطا در دریافت نماد")
  })
  }

  const cryptoClickHandler = (symbol ,crypto) => {
    handleOpen()
    setSymbol(symbol)
    setStock(crypto)
  }

  const deleteHistoryHandler = (id) => {
    deleteSymbolHistory(cookies.token ,id ,(isOk ,info) => {
      if(isOk){
        toast.success("تاریخچه با موفقیت حذف شد")
        return
      }
      if(info.response.data.description) return toast.error(info.response.data.description)
      if(info.response.data.message) return toast.error(info.response.data.message)
      return toast.error("خطا در حذف تاریخچه")
    })
  }

  const submitHandler = () => {
    console.log(newSymbol);
    const {status ,message} = validateCreateSymbol(type==="iranWachlist" ? stock.instance_code : stock.symbol ,newSymbol.price, newSymbol.amount ,newSymbol.type ,newSymbol.date)
    if(!status) return toast.error(message)

    const data = {
        basketId:basket._id,
        symbol: type==="iranWachlist" ? stock.instance_code : stock.symbol,
        price:newSymbol.price,
        amount:newSymbol.amount,
        type:newSymbol.type,
        date:newSymbol.date,
        unit:newSymbol.unit,
    }

    addSymbol( cookies.token , data , (isOk ,info) => {
        if(isOk){
          
            setUpdate(perv => !perv)
            setNewSymbol({
              basketId: "",
              symbol: "",
              price: "",
              amount: 1,
              type: "",
              date: "",
              unit: type==="iranWachlist" ? "Rial" : "usd" 
          })
            return toast.success("نماد با موفقیت اضافه شد")
        }
        if(info.response.data.description) return toast.error(info.response.data.description)
        if(info.response.data.message) return toast.error(info.response.data.message)
        return toast.error("خطا در انجام عملیات")
    })

  }

  return (
    <div className={styles.container}>
           <h3> {basket.name} </h3> 
            <div className={Theme ? styles.symbolTitlesContainer : styles.symbolTitlesContainerDark} >
                  <p> نام نماد </p>
                  <p> قیمت پایانی</p>
                  <p> سود یا زیان   </p>
            </div>
        <div className={Theme ? styles.contentContainer : styles.contentContainerDark} >
            <Divider orientation='horizontal' sx={{color:"red"  ,width:"90%" }} />
            {
              type === "iranWachlist"
              ?
                basket.symbols.map(symbol => {
                    return(
                      stocks.map(stock => {
                        if(stock.instance_code === symbol.symbol){
                            return(
                              <div key={stock.symbol_code} className={Theme ? styles.symbolContainer : styles.symbolContainerDark}>
                                <div  onClick={ () => symbolClickHandler(symbol ,stock)} className={Theme ? styles.symbolDetailsContainer : styles.symbolDetailsContainerDark} >
                                    <p> {stock.name} </p>
                                    <p> {stock.final_price} </p>
                                    {/* <p className={parseFloat(stock.final_price_change_percent) > 0 ? styles.greenChange : styles.redChange} > {stock.final_price_change_percent}% </p> */}
                                    <p className={calculateSymbolBenefit(symbol.history ,stock.final_price) > 0 ? styles.greenChange : styles.redChange} > {numberWithCommas(calculateSymbolBenefit(symbol.history ,stock.final_price))} </p>
                                    {/* <Divider orientation='horizontal' sx={{color:"red"  ,width:"90%" }} /> */}
                                </div>
                                
                                    <DeleteSymbolModal setUpdate={setUpdate} stockName={stock.name} id={symbol._id} />
                              </div>
                            )
                        }
                    })
                )
                })
                :
                basket.symbols.map(symbol => {
                  return(
                    stocks.map(stock => {
                      if(stock.symbol === symbol.symbol){
                          return(
                            <div key={stock.symbol_code} className={Theme ? styles.symbolContainer : styles.symbolContainerDark}>
                              <div  onClick={() => cryptoClickHandler(symbol ,stock)} className={Theme ? styles.symbolDetailsContainer : styles.symbolDetailsContainerDark} >
                                  <p> {stock.symbol} </p>
                                  <p> {Number(stock.price).toFixed(2)} $ </p>
                                  {/* <p className={parseFloat(stock.change_percent_24h) > 0 ? styles.greenChange : styles.redChange} > {stock.change_percent_24h}% </p> */}
                                  <p className={calculateSymbolBenefit(symbol.history ,stock.price) > 0 ? styles.greenChange : styles.redChange} > {numberWithCommas(calculateSymbolBenefit(symbol.history ,stock.price).toFixed(0))} </p>
                                  {/* <Divider orientation='horizontal' sx={{color:"red"  ,width:"90%" }} /> */}
                              </div>
                              
                                  <DeleteSymbolModal setUpdate={setUpdate} stockName={stock.name} id={symbol._id} />
                            </div>
                          )
                      }
                  })
              )
              })
            }
       
        </div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={Theme ? styles.modalContainer : styles.modalContainerDark}>
            <div onClick={handleClose}  className={Theme ? styles.closeIconContainer : styles.closeIconContainerDark} >
                <CloseIcon />
            </div>
            <div className={Theme ? styles.menuContainer : styles.menuContainerDark} >
                <Button onClick={detailHandler} > جزییات نماد </Button>
                <Button onClick={historyHandler} > تاریخچه </Button>
                <Button onClick={addSymbolHandler} > افزودن تاریخچه </Button>
            </div>
            {
            mode.addSymbol &&
                <div dir='rtl' className={Theme ? styles.addSymbolContainer : styles.addSymbolContainerDark}>

                        <input type="text" name="symbol" value={stock.name} disabled className={styles.symbolInput} />

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
                                {type === "iranWachlist" && <MenuItem value={"AWARD_SHARE"}>سهام جایزه</MenuItem>} 
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
                            className={styles.input}
                            InputProps={{inputProps: { min: 0 }}} 
                            sx={{width:"50%" ,direction:"rtl !important" ,textAlign:"right !important"}} 
                            name="price" 
                            label={type === "iranWachlist" ? " قیمت (تومان) " : "قیمت (دلار)"} 
                        />

                        <TextField 
                            inputProps={{style:{direction:"rtl !important" ,textAlign:"right !important" }}}    
                            InputProps={{inputProps: { min: 0 }}} 
                            type={"number"} 
                            className={styles.input}
                            value={newSymbol.amount} 
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
                        ثبت نماد 
                        </Button>

                </div>
            }
            {
              type === "iranWachlist"
              ?
                mode.symbolDetail &&
                <div className={Theme ? styles.symbolDetalContainer : styles.symbolDetalContainerDark} >
                    <p> {stock.name} </p>
                    <p> {stock.industry} </p>
                    <p> وضعیت : <span>  {stock.state}</span> </p>
                    <p> آخرین قیمت : <span> {stock.final_price} </span>  </p>
                    <p> تغییرات آخرین قیمت : <span>{stock.final_price_change}</span> <span className={ stock.final_price_change_percent >= 0 ? styles.greenChange : styles.redChange} > {stock.final_price_change_percent} % </span> </p>
                    <p> قیمت پایانی : <span >{stock.close_price}</span> </p>
                    <p> تغییرات قیمت پایانی : <span>{stock.close_price_change}</span> <span className={ stock.close_price_change_percent >= 0 ? styles.greenChange : styles.redChange} > {stock.close_price_change_percent} %  </span> </p>
                    <p>  eps : <span>{stock.eps}</span>  </p>
                    <p> P/E  : <span>{stock.P_E}</span> </p>
                    <p> حجم خرید حقیقی  : <span>{numberWithCommas(stock.real_buy_volume)}</span> </p>
                    <p> حجم خرید حقوقی  : <span>{numberWithCommas(stock.co_buy_volume)}</span> </p>
                    <p> حجم فروش حقوقی  : <span>{numberWithCommas(stock.real_sell_volume)}</span> </p>
                    <p> حجم فروش حقوقی  : <span>{numberWithCommas(stock.co_sell_volume)}</span> </p>
                    <p> ارزش خرید های حقیقی  : <span>{numberWithCommas(stock.real_buy_value)}</span> </p>
                    <p> ارزش خرید های حقوقی  : <span>{numberWithCommas(stock.co_buy_value)}</span> </p>
                    <p> ارزش فروش های حقیقی  : <span>{numberWithCommas(stock.real_sell_value)}</span> </p>
                    <p> ارزش فروش های حقوقی  : <span>{numberWithCommas(stock.co_sell_value)}</span> </p>
                    <p> تعداد کل معاملات: <span>{numberWithCommas(stock.trade_number)}</span> </p>
                    <p> حجم معاملات: <span>{numberWithCommas(stock.trade_volume)}</span> </p>
                    <p> ارزش معاملات: <span>{numberWithCommas(stock.trade_value)}</span> </p>
                    <p> تعداد کل سهام: <span>{numberWithCommas(stock.all_stocks)}</span> </p>
                </div>
                :
                mode.symbolDetail &&
              <div className={Theme ? styles.symbolDetalContainer : styles.symbolDetalContainerDark} >
                <p> {stock.name} </p>
                <p> قیمت : $ {stock.price} <span className={ stock.change_percent_24h >= 0 ? styles.greenChange : styles.redChange} > {stock.change_percent_24h} % </span>  </p>
                <p> نماد :{stock.symbol} </p>
                <p> market cap : <span> {stock.market_cap} </span> </p> 
            </div>
            }

            {
              mode.history &&
              <div className={Theme ? styles.historyContainer : styles.historyContainerDark} >
            {
                symbol.history.map(item => {
                  return(
                <div key={item._id} className={Theme ? styles.showInformationMainContainer : styles.showInformationMainContainerDark} >
                  <div className={Theme ? styles.showInformationContainer : styles.showInformationContainerDark} >
                      <p> قیمت : <span> {numberWithCommas(item.unitPrice)} </span>  </p>
                      {/* <p> تاریخ : <span> { item.tradeDate && moment.from(item.tradeDate ,"en" ,"YYYY/M/D").format("YYYY/M/D").split("T")[0]} </span>  </p> */}
                      <p> تاریخ : <span> { item.tradeDate } </span>  </p>
                      <p> نوع : <span> {item.type === "BUY" ? "خرید" : item.type === "SELL" ? "فروش" : "سهام جایزه"} </span>  </p>
                      <p> تعداد : <span> {item.amount} </span>  </p>
                      <p> ارزش : <span> { numberWithCommas(item.amount * item.unitPrice) } </span>  </p>
                  </div>
                      <div className={Theme ? styles.symbolBtnContainer : styles.symbolBtnContainerDark}>
                        <Button onClick={ () => deleteHistoryHandler(item._id)} className={Theme ? styles.deleteSymbolBtn : styles.deleteSymbolBtnDark}  >
                          <DeleteOutline />
                        </Button>
                        <EditSymbolHistory stock={stock} symbolHistory={item} setUpdate={setUpdate} />
                      </div>
                </div>    
                  )
              })
            }
              </div>
            }
        </Box>
      </Modal>
    </div>
  );
}
