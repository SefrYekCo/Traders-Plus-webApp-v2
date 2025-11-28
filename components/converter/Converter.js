import React ,{useContext} from 'react';

import styles from "./converter.module.css";
import {contextThemeController} from '../../context/themeContext';
import Image from "next/image";
import flashSign from "../../public/image/flashSign.svg";
import bitCoin from "../../public/image/bitcoin.png";
import teter from "../../public/image/teter.svg";

import { Modal } from '@mui/material';

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const Converter = () => {

    const {Theme ,setTheme} = useContext(contextThemeController)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return ( 
        <>
           <div className={styles.CurrencyExchangeBtn}>
               <CurrencyExchangeIcon onClick={handleOpen} color='success' className={styles.changeIcon} />
           </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={ Theme ? styles.firstMainContainer : styles.firstMainContainerDark}>
        
        <div className = { Theme ? styles.mainContainer : styles.mainContainerDark}>
            <div className = {  styles.firstContainer }>
                <p className={Theme ? styles.firstpTag : styles.firstpTagDark}>مبدل</p>
            </div>
            <div className = { Theme ? styles.secondContainer : styles.secondContainerDark}>
                <button className={Theme ?styles.btn : styles.btnDark} type="button"> ارز دیجیتال </button>
                <button className={Theme ?styles.btn : styles.btnDark}  type="button"> سکه و فلز </button>
                <button className={Theme ?styles.btn : styles.btnDark} type="button"> بورس ایران</button>
                <button className={Theme   ?styles.btn : styles.btnDark}  type="button"> فارکس </button>
            </div>
            <div className = { styles.thirdContainer}>
                <div className = {styles.teterContainer}>
                    <Image src={teter} alt={"photo"} className={styles.cryptoImage}  />
                    <p  className={Theme ? styles.pTag : styles.pTagDark} >49000$</p>
                    <select className={Theme ? styles.selectTag : styles.selectTagDark}>
                        <option value="bitcoin">bitcoin</option>
                    </select>
                    <p  className={Theme ? styles.pTag : styles.pTagDark} >0.00395</p>
                </div>
                <Image src={flashSign} alt={"photo"} />
                <div className = {styles.bitcoinContainer}>
                    <Image  src={bitCoin} alt={"photo"} className={styles.cryptoImage} />
                    <p className={Theme ? styles.pTag : styles.pTagDark}>49000$</p>
                    <select className={Theme ? styles.selectTag : styles.selectTagDark}>
                        <option value="bitcoin">bitcoin</option>
                    </select>
                    <p  className={Theme ? styles.pTag : styles.pTagDark} >0.00395</p>
                </div>
            </div>
        </div>
    </div>
    </Modal>
    </>
)}
 
export default Converter;