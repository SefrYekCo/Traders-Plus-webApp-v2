import React ,{useContext ,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import styles from "./alertCondition.module.css";
import { contextThemeController } from '../../../../context/themeContext';
import { useCookies } from 'react-cookie';
import  Add  from '@mui/icons-material/Add';
import { Autocomplete, TextField } from '@mui/material';
import { alertConditions ,cryptoAlertConditions } from '../../../../helpers/alertConditions';
import { findConditionTranslate } from '../../../../helpers/helperFunctions';

export default function AlertConditionModal({ state ,setState ,isCrypto ,setUpdate}) {
  const [open, setOpen] = useState(false);
  const [cookies] = useCookies(["token"])
  const [newCondition ,setNewCondition] = useState({
    type:"greater-than",
    condition:"",
    value:0,
  })
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setNewCondition({
      type:"greater-than",
      condition:"",
      value:0,

    })
  };

  const {Theme ,setTheme} = useContext(contextThemeController)

  const changeHandler = (e) => {
    setNewCondition({...newCondition ,["value"]:e.target.value})
  }

  const handleSymbolChange = (e ,value) => {
    setNewCondition({...newCondition ,["condition"]:value.condition})
  }

  const radioHandler = (e) => {
    setNewCondition({...newCondition ,["type"]:e.target.value})
  }

  const addCondition = () => {
    if(newCondition.condition.length === 0 ) return handleClose()
    setState([...state ,{type:newCondition.type ,condition:newCondition.condition ,value:parseFloat(newCondition.value)}])
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
            state.map((item) => {
              return(
              <div className={Theme ? styles.showConditionContainer : styles.showConditionContainerDark} >
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
                sx={{ width: "60%", direction:"rtl !important" ,textAlign:"right"}}
                renderInput={(params) => <TextField name='symbol' {...params} sx={{direction:"rtl" ,textAlign:"right"}} label="زمان آلارم" />}
            />

            <div className={Theme ? styles.radioInputContainer : styles.radioInputContainerDark} >
                <label > بیشتر از</label>
                <input type="radio" name="alertType" value={"greater-than"} defaultChecked onChange={radioHandler} />
                <label > کمتر از</label>
                <input type="radio" name="alertType" value={"lower-than"} onChange={radioHandler}  />
                <label > برابر با</label>
                <input type="radio" name="alertType" value={"equal"} onChange={radioHandler}  />
            </div>

            <div className={Theme ? styles.valueContainer : styles.valueContainerDark} >
              <label> مقدار آلارم </label>
              <input type={"number"} className={Theme ? styles.input : styles.inputDark}  name="value" value={newCondition.value} onChange={changeHandler} placeholder={" مقدار آلارم" } />
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