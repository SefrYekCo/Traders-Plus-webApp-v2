import React, { useEffect } from "react";

import { getMessaging, getToken ,onMessage } from "firebase/messaging";
import { firebaseCloudMessaging } from "../../helpers/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { saveRegisterToken } from "../../api/userApi";

function PushNotificationLayout({ children }) {
  const router = useRouter();
  const [cookies] = useCookies(['token'])
  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const {token ,byPermission} = await firebaseCloudMessaging.init();
        if (token && byPermission) {
          const data = {
            token
          }
          saveRegisterToken(cookies.token , data ,(isOk ,res) => {
            if(isOk){
              return 
            }
            return toast.error(res.response.data.description)
          })
          // console.log("token", token ,byPermission);
          getMessage();
        }else {
          // console.log("token", token ,byPermission);
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url) => {
    router.push(url);
  };

  // Get the push notification message and triggers a toast to display it
  function getMessage() {
    getMessaging();
    onMessage((message) => {
      toast(
        <div onClick={() => handleClickPushNotification(message?.data?.url)}>
          <h5>{message?.notification?.title}</h5>
          <h6>{message?.notification?.body}</h6>
        </div>,
        {
          closeOnClick: false,
        }
      );
    });
  }

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

export default PushNotificationLayout;





