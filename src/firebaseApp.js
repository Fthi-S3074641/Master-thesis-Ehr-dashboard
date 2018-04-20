
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBcH-nexMDex6Zytuje3q_CqUyCzh7Exbg",
  authDomain: "turnout-fcb6b.firebaseapp.com",
  databaseURL: "https://turnout-fcb6b.firebaseio.com",
  projectId: "turnout-fcb6b",
  storageBucket: "turnout-fcb6b.appspot.com",
  messagingSenderId: "504787830140"
};

export const firebaseApp = firebase.initializeApp(config)