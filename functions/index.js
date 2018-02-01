const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const _ = require('lodash');
const fetchJson = require('node-fetch-json');
const fetch = require('node-fetch');
admin.initializeApp(functions.config().firebase);

function pushNotification(upcoming) {
  const body = {
    "notification": {
      "title": "You have an appointment soon, at " + upcoming.location,
      "body": "It's at " + moment(upcoming.date).format('LLLL'),
      "icon": "/fav.png",
      "click_action": "https://specsavers-prototype.firebaseapp.com"
    },
  	"to": "/topics/all2"
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAAuCiTP2Q:APA91bEo4EzXqnc9Cr4bPOO-ey0mY5KeBctnYZixHIncr9et2jDdq_E9aPA3L45rN6-YyD-0XF6bChizbCVmdJmOeNS_-odO3wVjdSnBeN0TjzPhYJZIsrG0qCn7wksPrC414_89QgSp'
      },
    body: JSON.stringify(body)
  };

  fetch('https://fcm.googleapis.com/fcm/send', options)
  .catch((error) => console.log("error: ",error));
}

exports.checkAppointments = functions.https.onRequest((req, res) => {
  const fs = admin.firestore();

  fs.collection("appointments").get().then(snap => {
    const time1 = moment().add(0,'days').format();
    const time2 = moment().add(0,'days').format();

    const today = moment(time1).startOf('day');
    const tomorrow = moment(time2).endOf('day');

    const appointments = snap.docs.map(doc => doc.data());
    const upcomingAppointments = appointments.filter(appot => moment(appot.dateAndTime).isBetween(today,tomorrow))
    upcomingAppointments.forEach(upcoming => pushNotification(upcoming))

    return res.send(upcomingAppointments);
  }).catch(error => {
    console.log("error in firestore:", error)
    throw error
  })
});
