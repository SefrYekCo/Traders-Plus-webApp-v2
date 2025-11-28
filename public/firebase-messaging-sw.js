// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getMessaging, getToken } from "firebase/messaging";
// import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp ({
  apiKey: "AIzaSyCTiWcJr5NMv_xSog1PA3EwjB952C3P4jc",
  authDomain: "tradersplusweb.firebaseapp.com",
  projectId: "tradersplusweb",
  storageBucket: "tradersplusweb.appspot.com",
  messagingSenderId: "877768480513",
  appId: "1:877768480513:web:2ee1e9eb33aeb6fe1f6d00",
  measurementId: "G-52EJHCLJM6"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});