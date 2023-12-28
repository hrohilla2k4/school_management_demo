import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyB8BBo5UdCKrlWlee5R9LbsHdnT-KPYXqk",
    authDomain: "school-software-send-otp.firebaseapp.com",
    projectId: "school-software-send-otp",
    storageBucket: "school-software-send-otp.appspot.com",
    messagingSenderId: "938350426992",
    appId: "1:938350426992:web:2c971a63161beee1d8adb5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const db = firebaseApp.firestore();

