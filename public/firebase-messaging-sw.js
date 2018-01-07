
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js')


var config = {
  apiKey: "AIzaSyDpBvzku_aVum3eNUtatPFLJ6PYttj3I8k",
  authDomain: "specsavers-prototype.firebaseapp.com",
  databaseURL: "https://specsavers-prototype.firebaseio.com",
  projectId: "specsavers-prototype",
  storageBucket: "specsavers-prototype.appspot.com",
  messagingSenderId: "790954721124"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
