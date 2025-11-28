import React ,{useContext ,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import styles from "./deleteSymbolModal.module.css";
import { contextThemeController } from '../../../../context/themeContext';
import { deleteSymbol } from '../../../../api/basketApi';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

export default function DeleteSymbolModal({ stockName ,id ,setUpdate}) {

  const [open, setOpen] = useState(false);
  const [cookies] = useCookies(["token"])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {Theme ,setTheme} = useContext(contextThemeController)

  const deleteSymbolHandler = () => {
    deleteSymbol(cookies.token ,id ,(isOk ,info) => {
      if(isOk){
        toast.success("نماد با موفقیت حذف شد")
        return setUpdate(perv => !perv)
      }
      if(info.response.data.description) return toast.error(info.response.data.description)
      if(info.response.data.message) return toast.error(info.response.data.message)
      return toast.error("خطا در حذف نماد")
    })
  }

  return (
    <div className={styles.container}>
        <Button className={styles.deleteSymbolBtn}  onClick={ () => setOpen(true)} >
          <DeleteOutlineIcon />
        </Button>
      <Modal
        
        open={open}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={Theme ? styles.modalContainer : styles.modalContainerDark}>
            <h2>
               حذف نماد
            </h2>
            <p> "{stockName}" حذف شود ؟  </p>
          <div  className={Theme ? styles.btnContainer : styles.btnContainerDark} >
            <button type=""  onClick={deleteSymbolHandler} >حذف </button>
            <button onClick={handleClose} type="">منصرف شدم</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}