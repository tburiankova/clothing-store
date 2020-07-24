import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCAvZLo8mC71xtWREzNzCrPj-HQakd99DA',
  authDomain: 'crwn-db-cba57.firebaseapp.com',
  databaseURL: 'https://crwn-db-cba57.firebaseio.com',
  projectId: 'crwn-db-cba57',
  storageBucket: 'crwn-db-cba57.appspot.com',
  messagingSenderId: '681955117153',
  appId: '1:681955117153:web:05ebd9e1aab55139e94220',
  measurementId: 'G-BJEKBBDE5W',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// trigger google pop-up
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
