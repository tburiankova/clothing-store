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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // check if user already exists in db - with documentRef
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // const collectionRef = firestore.collection('users');

  // get snapshot based on documentRef
  const snapShot = await userRef.get();
  // const collectionSnapshot = await collectionRef.get();
  // console.log({ collection: collectionSnapshot.docs.map((doc) => doc.data()) });

  // create doc, if snapshot not found in db
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // create a new user document
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

// function to add data from app to firebase db programatically
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj); // instead of just newDocRef.set()
  });

  // promise!
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  // convert into obj
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
// trigger google pop-up
googleProvider.setCustomParameters({ prompt: 'select_account' });
// sign in with google fn
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
