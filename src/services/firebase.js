import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBrCtxu0rR4-LhpTEwKzNpcD_R9C4KAHyQ",
    authDomain: "tinder-clone-500ac.firebaseapp.com",
    databaseURL: "https://tinder-clone-500ac.firebaseio.com",
    projectId: "tinder-clone-500ac",
    storageBucket: "tinder-clone-500ac.appspot.com",
    messagingSenderId: "401938868826",
    appId: "1:401938868826:web:ec36c60b7ddbd7facb4663",
    measurementId: "G-BCDSZNWX49"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const usersCollection = firebaseApp.firestore().collection('users');
const matchesCollection = firebaseApp.firestore().collection('matches').doc('matches');
const chatsCollection = firebaseApp.firestore().collection('chats');
const createdProfileCollection = firebaseApp.firestore().collection('createdProfile');
const storage = firebaseApp.storage();

export default firebaseApp;
export {usersCollection, matchesCollection, chatsCollection, storage, createdProfileCollection};