import React, { useContext, useEffect, useState } from 'react';
import { contextThemeController } from '../../context/themeContext';

import {getCategories} from "../../api/categoryApi";
import {getChannels} from "../../api/channelAPI";
import {getMessageV2} from "../../api/messagesApi";

import styles from "./channels.module.css";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from 'react-toastify';
import {useCookies} from "react-cookie";
import Image from 'next/image';
import { useRouter } from 'next/router';
import WithAuth from '../../components/checkAuth/auth';
import { Button, Menu, MenuItem } from '@mui/material';
import noItem from "../../public/image/noItem.png"
import { getUserByToken } from '../../api/userApi';
import { isUserValidToAccessChannel ,removeHtmlTag } from '../../helpers/helperFunctions';
import Link from 'next/link';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';

const Channels = () => {

    const {Theme ,setTheme} = useContext(contextThemeController);
    const [cookie] = useCookies(['token']);
    const token = cookie.token;
    const router = useRouter()
    const [expanded, setExpanded] = useState(false);
    const [categories ,setCategories] = useState([]);
    const [channels ,setChannels] = useState([]);
    const [messages ,setMessages] = useState([]);
    const [userInfo ,setUserInfo] = useState({});
    const [nextPage ,setNextPage] = useState(false)
    const [page ,setPage] = useState(1);
    const [currentChannelId ,setCurrentChannelId] = useState("")
    const [permissionToChannel ,setPermissionToChannel] = useState(
      {
        isValid:true,
        planName:"",
        planId:"",
      }
    )

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    useEffect(() => {
      getCategories((isOk ,data) => {
        if(isOk){
          // console.log(data);
          const sortedCategories = data.response.categories.sort((a ,b) => a.index - b.index)
          return setCategories(sortedCategories)
        }
        // console.log(data);
        if(data){
          return toast.error(data.response.data.description)
        }
        return toast.error("خطا در دریافت اطلاعات")
      })

      getChannels(token , (isOk ,data) => {
        if(isOk){
          const sortedChannels= data.response.channels.sort((a ,b) => a.index - b.index)
          return setChannels(sortedChannels)
        }
        // console.log(data);
        if(data){
          return toast.error(data.response.data.description)
        }
        return toast.error("خطا در دریافت اطلاعات")
      })

      getUserByToken(cookie.token ,(isOk ,info) => {
        if(isOk) {
          return setUserInfo(info.response.userInfo)
        }
        if(info.response.data.description) {
          router.push("/")
          return toast.error(info.response.data.description)
        }
        if(info.response.data.message) {
          router.push("/")
          return toast.error(info.response.data.message)
        }
        router.push("/")
        return toast.error("خطا در دریافت اطلاعات کاربر ها")
      })
    } ,[])



    const channelClickHandler = (channelId ,channelPlan) => {

      if(!isUserValidToAccessChannel(channelPlan ,userInfo.plans)) {
        setMessages[{}]
        return setPermissionToChannel({isValid:false ,planName:channelPlan.name ,planId:channelPlan._id})
      }

      setPermissionToChannel({isValid:true ,planName:"" ,planId:""})

      setCurrentChannelId(channelId)

      getMessageV2(token ,channelId ,0 ,(isOk ,res) => {
        if(isOk){
          setMessages(res.response.messages)
          setPage(1)
          return handleClose()
        }

        if(res.response){
          handleClose()
          return toast.error(res.response.data.description)
        }
        handleClose()
        return toast.error("خطا در دریافت اطلاعات")
      })

      getMessageV2(token ,channelId ,1 ,(isOk ,res) => {
        if(isOk){
          if(res.response.messages.length > 0) return setNextPage(true)
          return setNextPage(false)
        }

        if(res.response){
          setNextPage(false)
          return toast.error(res.response.data.description)
        }
        setNextPage(false)
        return toast.error("خطا در دریافت اطلاعات")
      })
    }

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const pageChangeHandler = (e ,value) => {
      setPage(value)
      getMessageV2(token ,currentChannelId ,value-1 ,(isOk ,res) => {
        if(isOk){
          setMessages(res.response.messages)
          return
        }

        if(res.response){
        
          return toast.error(res.response.data.description)
        }
      
        return toast.error("خطا در دریافت اطلاعات")
      })

      getMessageV2(token ,currentChannelId ,value ,(isOk ,res) => {
        if(isOk){
          if(res.response.messages.length > 0) return setNextPage(true)
          return setNextPage(false)
        }

        if(res.response){
          setNextPage(false)
          return toast.error(res.response.data.description)
        }
        setNextPage(false)
        return toast.error("خطا در دریافت اطلاعات")
      })
    }


    return ( 
        <div className={ Theme ? styles.mainContainer : styles. mainContainerDark}>
            <div  className={ Theme ? styles.messageListContainer : styles. messageListContainerDark}>
           
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={styles.channelsBtn}
              >
                کانال ها
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                className={styles.menu}
                dir="rtl"
                sx={{ ".MuiMenu-paper":{ borderRadius:"1rem" ,backgroundColor:"#C0E7E1" ,height:"500px" ,overflow:"auto"}}}
              >
                 {
                 channels.map((channel ,index) => {
                  return(
                    <MenuItem  className={styles.menuItem} key={channel._id} onClick={() => channelClickHandler(channel._id ,channel.plan)}> {channel.name} </MenuItem>
                  )

                 })
                 }

              </Menu>
          
              {
                messages.length === 0 
                ?
                <div className={styles.emptyMessageContainer } >
                  <Image src={noItem} width={300} height={300} />
                </div>
                :
                permissionToChannel.isValid 
                ?
                messages.map(item => {
                  return(
                    <div key={item._id} className={Theme ? styles.messageContainer : styles. messageContainerDark}  >
                      {
                        item.file &&
                        <Image src={item.file} alt={"message photo"} width={"100%"} height={"300%"} className={styles.messageImg} />
                      }
                      <h2>
                        {item.title}
                      </h2>
                      <p> {removeHtmlTag(item.content)} </p>
                      {
                        item.link &&
                          <Link href={item.link} tLinkrget='_blank'> برای مشاهده کلیک کنید </Link>
                      }
                   </div >
                  )
                })
                :
              <div className={styles.emptyMessageContainer } >
                  <h4> برای دسترسی به این کانال لطفا پلن <span> {permissionToChannel.planName} </span>  را خریداری کنید  </h4>
                  <Link href={`/plans/plan/${permissionToChannel.planId}`} > خرید پلن </Link>
              </div>
              }
              {
                currentChannelId.length > 0 && permissionToChannel.isValid &&
                  <Pagination className={styles.pagination} count={ nextPage ? page + 1 : page } page={page}  onChange={pageChangeHandler} dir="rtl" />
              }
            </div>
        <div  className={ Theme ? styles.channelsListContainer : styles. channelsListContainerDark}>

                
        <h3> لیست کانال ها</h3>
        <div  className={Theme ? styles.accordionContainer : styles.accordionContainerDark} >
            
     {
      categories.map((category) => {
        return(
          <Accordion key={category._id} expanded={expanded === category._id} onChange={handleChange(category._id)} dir='rtl' className={Theme ? styles.accordion : styles.accordionDark}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='secondary' />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              >
              <Typography>{category.name}</Typography>
            </AccordionSummary>
              <AccordionDetails>
                {
                  channels.map((channel ,index) => {
                    if (channel.category._id === category._id ) {
                      return(
                        <ul key={channel._id}>
                          <li tabIndex={index + 1} onClick={() => channelClickHandler(channel._id ,channel.plan)} > 
                          {channel.name}  
                          {
                            channel.plan.type !== "public" &&
                            <Tooltip placement='top' title={`برای دسترسی به این کانال لطفا پلن ${channel.plan.name} را خریداری کنید`} >
                              <ReportGmailerrorredIcon sx={{marginRight:".5rem"}} />
                            </Tooltip>
                          }
                          </li>
                        </ul>  
                      )
                    }
                  })
                }
              </AccordionDetails>
  
        </Accordion>
        )
      })
    }
     
      </div>
          
    </div>
  </div>
     );
}

Channels.title = "تریدرزپلاس | کانال ها"

export default WithAuth(Channels);
