import React ,{useContext ,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import styles from "./showConditionModal.module.css";
import { contextThemeController } from '../../../../context/themeContext';
import { useCookies } from 'react-cookie';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import { findConditionTranslate } from '../../../../helpers/helperFunctions';
import CloseIcon from '@mui/icons-material/Close';

export default function ShowAlertConditionModal({ alertCondition }) {
  const [open, setOpen] = useState(false);
  const [cookies] = useCookies(["token"])

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
  };

  const {Theme ,setTheme} = useContext(contextThemeController)

  return (
    <div className={styles.container}>
          <Button color='secondary' onClick={ () => setOpen(true)} >
            <RemoveRedEye />
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
            <h2>
                شرایط آلارم
            </h2>
            <div className={Theme ? styles.conditionsContainer : styles.conditionsContainerDark} >
                {
                    alertCondition.map((item ,index) => {
                        return(
                            <div key={index} className={Theme ? styles.showAlertConditionContainer : styles.showAlertConditionContainerDark} >
                                <p> {findConditionTranslate(item.condition)} </p>
                                <p> {item.type === "greater-than" ? "بیشتر از" : item.type === "lower-than" ? "کمتر از" : "برابر با" } </p>
                                <p> {item.value} </p>
                            </div>
                        )
                    })
                }
                
            </div>
        </Box>
      </Modal>
    </div>
  );
}