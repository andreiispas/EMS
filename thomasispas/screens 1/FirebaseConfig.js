//const firebase = require("firebase");
// Required for side-effects
//require("firebase/firestore");
//require("firebase/auth");

import * as firebase from "firebase";
//import 'firebase/firestore';
// 4.5.2
// 4.5.2
var firebaseConfig = {
  apiKey: "AIzaSyD1iar-av7RYFd8rhw-kUl2fuD6UIQt0Sw",
  authDomain: "stock-and-shift-manager.firebaseapp.com",
  databaseURL: "https://stock-and-shift-manager-default-rtdb.firebaseio.com",
  projectId: "stock-and-shift-manager",
  storageBucket: "stock-and-shift-manager.appspot.com",
  messagingSenderId: "218014141297",
  appId: "1:218014141297:web:5f1d1b9af22a98d42884d0",
};
var firebaseApp;
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
}

export default firebaseApp;
