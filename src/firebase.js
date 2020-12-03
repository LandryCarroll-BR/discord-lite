import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDUk9e9itNggzaDrSJ1WN1N5crV_zdAEMI",
  authDomain: "discord-clone-a8efb.firebaseapp.com",
  databaseURL: "https://discord-clone-a8efb.firebaseio.com",
  projectId: "discord-clone-a8efb",
  storageBucket: "discord-clone-a8efb.appspot.com",
  messagingSenderId: "602465867365",
  appId: "1:602465867365:web:12997d67fbf46eb72c188c",
  measurementId: "G-F5RESSJ5S0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;