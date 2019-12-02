/**
 * Firebase.dev..js
 */
import firebase from 'firebase';

/**
 * Basic configuration object for firebase
 * @type {{storageBucket: string, apiKey: string, messagingSenderId: string, appId: string, projectId: string, databaseURL: string, authDomain: string}}
 */
const firebaseConfig = {
  apiKey: "AIzaSyCu7aPj_hO5OGXcMWmDeOs9Mfav7IW2T0Q",
  authDomain: "note-taking-app-9617e.firebaseapp.com",
  databaseURL: "https://note-taking-app-9617e.firebaseio.com",
  projectId: "note-taking-app-9617e",
  storageBucket: "note-taking-app-9617e.appspot.com",
  messagingSenderId: "476174101677",
  appId: "1:476174101677:web:3de0d0b5b24d1d0e08ea24"
};

/**
 * Initialise firebase with the provided configuration
 */
firebase.initializeApp(firebaseConfig);

// handle persistence issues here
const handleError = error => {
  console.error(error);
};

/**
 * Enable persistence (for offline mode)
 */
firebase
  .firestore()
  .enablePersistence({synchronizeTabs: true})
  .then(() => console.log(
	'%c✓ Persistence enabled',
	'font-weight: bolder; color: #4CAF50; font-size: 18px'
  ))
  .catch(err => {
	handleError(err);
  });

/**
 * Export database
 * @type {firebase.firestore.Firestore}
 */
const db = firebase.firestore();
export {db}

