import firebase from "firebase/app";
import '@firebase/messaging'

const config = {
    apiKey: "AIzaSyAOnORzzr2YgLvnR2cXfs0XqfihF1yq9EM",
    authDomain: "du-an-tot-nghiep-a61be.firebaseapp.com",
    databaseURL: "https://du-an-tot-nghiep-a61be-default-rtdb.firebaseio.com",
    projectId: "du-an-tot-nghiep-a61be",
    storageBucket: "du-an-tot-nghiep-a61be.appspot.com",
    messagingSenderId: "115764973780",
    appId: "1:115764973780:web:248788f1c9c1f002112b41"
};

firebase.initializeApp(config)
export const message = firebase.messaging();

export default firebase;