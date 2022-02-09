import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDXW2fd8vnIIRyeYLgFZx23lyyqYuG-msg",
    authDomain: "fir-article-1992c.firebaseapp.com",
    projectId: "fir-article-1992c",
    storageBucket: "fir-article-1992c.appspot.com",
    messagingSenderId: "1055999221189",
    appId: "1:1055999221189:web:0ab77e562524345bfbbfac"
  };

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app);
  export const db = getFirestore(app);