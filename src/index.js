importScripts('https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/9.9.3/index.js')

const firebaseConfig = {
    apiKey: "AIzaSyBTFToc75kJyOOegNQSX-l60zscgkLm8MA",
    authDomain: "adobe-restaurant.firebaseapp.com",
    databaseURL: "https://adobe-restaurant-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "adobe-restaurant",
    storageBucket: "adobe-restaurant.appspot.com",
    messagingSenderId: "705969273202",
    appId: "1:705969273202:web:230e4ef0e81079d15ec5eb",
    measurementId: "G-4D8L23BLH1"
  };

  const messaging = firebaseConfig.messaging()


