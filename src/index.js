import React from 'react'
import { render } from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import store, {history} from './store'
import App from './components/App';
import {Provider} from 'react-redux'
import './index.css'
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
require("firebase/firestore");

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "specsavers-prototype.firebaseapp.com",
  databaseURL: "https://specsavers-prototype.firebaseio.com",
  projectId: "specsavers-prototype",
  storageBucket: "specsavers-prototype.appspot.com",
  messagingSenderId: "790954721124"
};

firebase.initializeApp(config);
firebase.firestore().enablePersistence()

const messaging = firebase.messaging();
messaging.requestPermission()
.then(function() {
  return messaging.getToken()
})
.then(function(token) {
  // console.log("Token: ",token)
  fetch(`https://serene-ocean-70888.herokuapp.com/registertopic`,     //     UNCHECK!
  {
    method: "POST",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body:"token=" + token + "&topic=all2"
  })
  .then(resp => console.log("resp:  ",resp))
  .catch(error => console.log("error:  ",error))
})
.catch(err => console.log("Messaing error: ",err))

messaging.onMessage((payload) => {console.log("onMessage: ",payload)})

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
