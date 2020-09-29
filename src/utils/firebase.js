import firebase from "firebase";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ? process.env.REACT_APP_FIREBASE_API_KEY : 'AIzaSyB5kqqOyr8aJadVzQncS4lIyM6hSwz_Pus',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? process.env.REACT_APP_FIREBASE_AUTH_DOMAIN : 'letz-dance.firebaseapp.com',
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});
// firebase.analytics();
export default firebase;