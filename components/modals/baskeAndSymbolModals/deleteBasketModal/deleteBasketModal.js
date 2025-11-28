import React ,{useContext ,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import styles from "./deleteBasketModal.module.css";
import { contextThemeController } from '../../../../context/themeContext';
import { deleteBasket } from '../../../../api/basketApi';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

export default function DeleteBasketModal({ basket ,setUpdate}) {
  const [open, setOpen] = useState(false);
  const [basketName, setBasketName] = useState("");
  const [cookies] = useCookies(["token"])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {Theme ,setTheme} = useContext(contextThemeController)

  const changeHandler = (e) => {
    setBasketName(e.target.value)
  }

  const removeBasket = () => {
    deleteBasket(cookies.token , basket._id , (isOk ,info) => {
        if(isOk){
            toast.success("سبد با موفقیت حذف شد")
            return setUpdate(perv => !perv)
        }
        if(info.response.data.message) return toast.error(info.response.data.message)
        if(info.response.data.description) return toast.error(info.response.data.description)
        return toast.error("خطا در حذف اطلاعات")
    })
}

  return (
    <div className={styles.container}>
        <Button onClick={ () => setOpen(true)} >
          <DeleteOutlineIcon />
        </Button>
      <Modal
        
        open={open}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={Theme ? styles.modalContainer : styles.modalContainerDark}>
            <h2>
                حذف سبد
            </h2>
            <p> "{basket.name}" حذف شود ؟  </p>
          <div  className={Theme ? styles.btnContainer : styles.btnContainerDark} >
            <button type=""  onClick={removeBasket} >حذف </button>
            <button onClick={handleClose} type="">منصرف شدم</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}