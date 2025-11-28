import React ,{useContext ,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import styles from "./addBasketModal.module.css";
import { contextThemeController } from '../../../../context/themeContext';
import useSWR from 'swr';
import {createBasket} from "../../../../api/basketApi";
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddBasketModal({type , setUpdate}) {
  const [open, setOpen] = useState(false);
  const [newBasket, setNewBasket] = useState({
    name:"",
  });
  const [cookies] = useCookies(["token"])

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setNewBasket({
      name:""
    })
  };

  const {Theme ,setTheme} = useContext(contextThemeController)

  const changeHandler = (e) => {
    setNewBasket({...newBasket ,[e.target.name]:e.target.value})
  }

  const addBasket = () => {

    const info = {
      name:newBasket.name,
      type
    }

    createBasket(cookies.token ,info ,(isOk ,data) => {
      if(isOk) {
        handleClose()
        return setUpdate(perv => !perv)
      }
      return toast.error(data.description)
    })


  }
    

  return (
    <div className={styles.container}>
      <Button className={styles.btn} onClick={handleOpen}>افزودن سبد</Button>
      <Modal
        
        open={open}
 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={Theme ? styles.modalContainer : styles.modalContainerDark}>
            <h2>
                 افزودن سبد {type === "iranWachlist" ? "بورسی" : "ارز دیجیتال"} 
            </h2>
            <input className={Theme ? styles.input : styles.inputDark}  name="name" value={newBasket.name} onChange={changeHandler} placeholder={"نام سبد جدید (حداکثر 30 کاراکتر) " } />
          <div  className={Theme ? styles.btnContainer : styles.btnContainerDark} >
            <button onClick={addBasket} type="">اضافه شود</button>
            <button onClick={handleClose} type="">منصرف شدم</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}