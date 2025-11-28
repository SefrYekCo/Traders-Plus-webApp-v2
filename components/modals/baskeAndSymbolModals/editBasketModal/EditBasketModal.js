import React ,{useContext ,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import styles from "./editBasketModal.module.css";
import { contextThemeController } from '../../../../context/themeContext';
import EditIcon from '@mui/icons-material/Edit';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { updateBasket } from '../../../../api/basketApi';

export default function EditBasketModal({ basket , setUpdate}) {
  const [open, setOpen] = useState(false);
  const [basketName, setBasketName] = useState("");
  const [cookies] = useCookies(["token"])

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setBasketName("")
  };

  const {Theme ,setTheme} = useContext(contextThemeController)

  const changeHandler = (e) => {
    setBasketName(e.target.value)
  }

  const editBasket = () => {

    const editData = {
        id:basket._id,
        name: basketName
    }

    updateBasket(cookies.token , editData, (isOk ,info) => {
        if(isOk){
            toast.success("سبد با موفقیت ویرایش شد")
            setOpen(false)
            return setUpdate(perv => !perv)
        }
        if(info.response.data.message) return toast.error(info.response.data.message)
        if(info.response.data.description) return toast.error(info.response.data.description)
        return toast.error("خطا در ویرایش اطلاعات")
    })
}

  return (
    <div className={styles.container}>
        <Button onClick={ () => setOpen(true)} >
          <EditIcon />
        </Button>
      <Modal
        
        open={open}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={Theme ? styles.modalContainer : styles.modalContainerDark}>
            <h2>
                ویرایش سبد
            </h2>
            <input maxLength={30} className={Theme ? styles.input : styles.inputDark}  name="name" value={basketName} onChange={changeHandler} placeholder={" نام سبد جدید (حداکثر 30 کاراکتر) " } />
          <div  className={Theme ? styles.btnContainer : styles.btnContainerDark} >
            <button type=""  onClick={editBasket} >ویرایش </button>
            <button onClick={handleClose} type="">منصرف شدم</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}