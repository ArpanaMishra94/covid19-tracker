import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAkrFTdtsIDIwa8yAebY16DGfQos1mCp3o",
    authDomain: "covid-tracker-bcddf.firebaseapp.com",
    projectId: "covid-tracker-bcddf",
    storageBucket: "covid-tracker-bcddf.appspot.com",
    messagingSenderId: "56325659591",
    appId: "1:56325659591:web:d4a8499655edb63956d7e2",
    measurementId: "G-FS1SHF05N4"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  export { db, auth };