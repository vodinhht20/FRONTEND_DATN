importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-analytics.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js')


 if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('../firebase-messaging-sw.js')
   .then(function(registration) {
     console.log('Registration successful, scope is:', registration.scope);
   }).catch(function(err) {
     console.log('Service worker registration failed, error:', err);
   });
 }

 // Initialize the Firebase app in the service worker by passing the generated config
 var firebaseConfig = {
    apiKey: "AIzaSyAOnORzzr2YgLvnR2cXfs0XqfihF1yq9EM",
    authDomain: "du-an-tot-nghiep-a61be.firebaseapp.com",
    databaseURL: "https://du-an-tot-nghiep-a61be-default-rtdb.firebaseio.com",
    projectId: "du-an-tot-nghiep-a61be",
    storageBucket: "du-an-tot-nghiep-a61be.appspot.com",
    messagingSenderId: "115764973780",
    appId: "1:115764973780:web:248788f1c9c1f002112b41"
 };

 // phần firebaseConfig tương tự như ở trên nhé

 firebase.initializeApp(firebaseConfig);

 const message = firebase.messaging()