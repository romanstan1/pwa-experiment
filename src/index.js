import React from 'react'
import { render } from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import store, {history} from './store'
import App from './components/App';
import {Provider} from 'react-redux'
import './index.css'
// import registerServiceWorker from './registerServiceWorker';
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

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
// registerServiceWorker();
