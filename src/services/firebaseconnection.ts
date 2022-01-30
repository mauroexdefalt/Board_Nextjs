// Import the functions you need from the SDKs you need

import firebase from 'firebase/app'
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyBRmuuIujttywFQKSM68QsOLOS6vN0d95M",
  authDomain: "boardapp-5f3ea.firebaseapp.com",
  projectId: "boardapp-5f3ea",
  storageBucket: "boardapp-5f3ea.appspot.com",
  messagingSenderId: "987600727349",
  appId: "1:987600727349:web:7677f5c9429617e79eb07c"
};

// Initialize Firebase
if(!firebase.apps.length){
 firebase.initializeApp(firebaseConfig);
}


export default firebase ;