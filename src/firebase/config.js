import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDomq0caJx_Ki2jhfS67HRUUa_JP905fvM",
  authDomain: "project-management-site-9400a.firebaseapp.com",
  projectId: "project-management-site-9400a",
  storageBucket: "project-management-site-9400a.appspot.com",
  messagingSenderId: "846771357402",
  appId: "1:846771357402:web:d4d9903d9618682a1cc7e3"
};

firebase.initializeApp(firebaseConfig);

// firestore, authentication, timestamp setting
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;


export { projectFirestore, projectAuth, timestamp }

