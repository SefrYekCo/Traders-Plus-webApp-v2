
import { getMessaging, getToken } from "firebase/messaging";
import {initializeApp ,getApps} from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = {
  init: async () => {
    if(!getApps()?.length){
      // Initialize the Firebase app with the credentials
      initializeApp({
        apiKey: "AIzaSyCTiWcJr5NMv_xSog1PA3EwjB952C3P4jc",
        authDomain: "tradersplusweb.firebaseapp.com",
        projectId: "tradersplusweb",
        storageBucket: "tradersplusweb.appspot.com",
        messagingSenderId: "877768480513",
        appId: "1:877768480513:web:2ee1e9eb33aeb6fe1f6d00",
        measurementId: "G-52EJHCLJM6"
      });

      try {
        const messaging = getMessaging();
        const tokenInLocalForage = await localforage.getItem("fcm_token");
        const tokenDateInLocalForage = await localforage.getItem("fcm_date");
        // Return the token if it is alredy in our local storage
        const d = new Date()
        if ( Notification.permission === "granted" && tokenInLocalForage !== null && tokenDateInLocalForage !== null && tokenDateInLocalForage > d.setMonth(d.getMonth() - 2)) {
          return {token :tokenInLocalForage , byPermission: false};
        }

        if( Notification.permission === "granted" && tokenInLocalForage !== null && tokenDateInLocalForage < d.setMonth(d.getMonth() - 2)) {
          const fcm_token = await getToken( messaging , {
            vapidKey: "BCUjbkzlELZnoXdaN9wDAMOT2OiKuAzuS2l452yMqryGvFrgWetmR99-9-GM9if_JVnDr7DF4tWajmYACewg6_4",
          });

          if (fcm_token) {
            localforage.setItem("fcm_token", fcm_token);
            localforage.setItem("fcm_date" , Date.now())
            return {token :fcm_token , byPermission: true};
          }
        }
        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === "granted") {
        // Get new token from Firebase
          const fcm_token = await getToken( messaging , {
            vapidKey: "BCUjbkzlELZnoXdaN9wDAMOT2OiKuAzuS2l452yMqryGvFrgWetmR99-9-GM9if_JVnDr7DF4tWajmYACewg6_4",
          });

          // Set token in our local storage
          if (fcm_token) {
            localforage.setItem("fcm_token", fcm_token);
            localforage.setItem("fcm_date" , Date.now())
            return {token :fcm_token , byPermission: true};
          }
        }
      } catch (error) {
        console.error(error);
        return {token :null , byPermission: null};;
      }
    }
    return {token :null , byPermission: null};;
  },
};
export { firebaseCloudMessaging };