import React ,{useContext,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import styles from "./editAlertConditionModal.module.css";
import { contextThemeController } from '../../../../context/themeContext';
import { useCookies } from 'react-cookie';
import Add from '@mui/icons-material/Add';
import { Autocomplete, TextField } from '@mui/material';
import { alertConditions ,cryptoAlertConditions } from '../../../../helpers/alertConditions';
import { findConditionTranslate } from '../../../../helpers/helperFunctions';

export default function EditAlertConditionModal({ state ,setState ,isCrypto ,setUpdate}) {
  const [open, setOpen] = useState(false);
  const [basketName, setBasketName] = useState("");
  const [cookies] = useCookies(["token"])
  const [editCondition ,setEditCondition] = useState({
    type:"greater-than",
    condition:"",
    value:0,
  })
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setEditCondition({
      type:"greater-than",
      condition:"",
      value:0,
    })
  };

  const {Theme ,setTheme} = useContext(contextThemeController)

  const changeHandler = (e) => {
    setEditCondition({...editCondition ,["value"]:e.target.value})
  }

  const handleSymbolChange = (e ,value) => {
    if(value){
      return setEditCondition({...editCondition ,["condition"]:value.condition })
    }
    setEditCondition({...editCondition ,["condition"]:"" })
  }

  const radioHandler = (e) => {
    setEditCondition({...editCondition ,["type"]:e.target.value})
  }

  const editConditionHandler = (condition) => {
    console.log(condition);
    setEditCondition({
        type:condition.type,
        condition:condition.condition,
        value:condition.value,
    })
    handleOpen()
  }

  const addCondition = () => {
    if(editCondition.condition.length === 0 ) return handleClose()
    setState([...state ,{type:editCondition.type ,condition:editCondition.condition ,value:parseFloat(editCondition.value)}])
    setUpdate(perv => !perv)
    handleClose()
  }

  return (
    <div className={styles.container}>
        <div className={styles.conditionContainer} >
          <Button className={styles.openModalBtn} onClick={ () => setOpen(true)} >
            <Add fontSize='large' />
          </Button>
          {
            state.length > 0 &&
            state.map((item ,index) => {
              return(
              <div key={index} onClick={() => editConditionHandler(item)} className={Theme ? styles.showConditionContainer : styles.showConditionContainerDark} >
                <p> {findConditionTranslate(item.condition)} </p>
                <p> {item.type === "greater-than" ? "بیشتر از" : item.type === "lower-than" ? "کمتر از" : "برابر با" } </p>
                <p> {item.value} </p>
              </div>
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
            <h2>
                شرایط آلارم
            </h2>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                dir='rtl'
                onChange={(e ,value) => handleSymbolChange(e ,value)}
                options={ isCrypto ? cryptoAlertConditions : alertConditions}

                noOptionsText={"یافت نشد !"}
                getOptionLabel={(option) => option.persion}
                className={styles.select}
                style={{    '@media (min-width: 780px)': {
                  width: '80% !important'
                }}}
                sx={{ width: "60%", direction:"rtl !important" ,textAlign:"right"}}
                renderInput={(params) => <TextField name='symbol' {...params} sx={{direction:"rtl" ,textAlign:"right"}} label={findConditionTranslate(editCondition.condition)} />}
            />

            <div className={Theme ? styles.radioInputContainer : styles.radioInputContainerDark} >
                <label > بیشتر از</label>
                <input type="radio" name="alertType" value={"greater-than"} checked = {editCondition.type === "greater-than" ? true : false} onChange={radioHandler} />
                <label > کمتر از</label>
                <input type="radio" name="alertType" value={"lower-than"} checked = {editCondition.type === "lower-than" ? true : false} onChange={radioHandler}  />
                <label > برابر با</label>
                <input type="radio" name="alertType" value={"equal"} checked = {editCondition.type === "equal" ? true : false} onChange={radioHandler}  />
            </div>

            <div className={Theme ? styles.valueContainer : styles.valueContainerDark} >
              <label> مقدار آلارم </label>
              <input type={"number"} className={Theme ? styles.input : styles.inputDark}  name="value" value={editCondition.value} onChange={changeHandler} placeholder={" مقدار آلارم" } />
            </div>
          <div  className={Theme ? styles.btnContainer : styles.btnContainerDark} >
            <button type=""  onClick={addCondition} >تایید </button>
            <button onClick={handleClose} type=""> انصراف </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}