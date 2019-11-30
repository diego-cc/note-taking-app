import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCu7aPj_hO5OGXcMWmDeOs9Mfav7IW2T0Q",
  authDomain: "note-taking-app-9617e.firebaseapp.com",
  databaseURL: "https://note-taking-app-9617e.firebaseio.com",
  projectId: "note-taking-app-9617e",
  storageBucket: "note-taking-app-9617e.appspot.com",
  messagingSenderId: "476174101677",
  appId: "1:476174101677:web:3de0d0b5b24d1d0e08ea24"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export {db}

