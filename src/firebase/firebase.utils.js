import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA5BgsOlIbxAIEB7omquntRlHbL5RM8Iis",
  authDomain: "shopping-app-db-55d4d.firebaseapp.com",
  databaseURL: "https://shopping-app-db-55d4d.firebaseio.com",
  projectId: "shopping-app-db-55d4d",
  storageBucket: "shopping-app-db-55d4d.appspot.com",
  messagingSenderId: "891118992390",
  appId: "1:891118992390:web:c67f83f01728d2a3631787",
  measurementId: "G-KYBY4PENKJ"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
