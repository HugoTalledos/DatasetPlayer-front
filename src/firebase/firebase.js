import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import firebaseConfig from './firebase-config.json';

firebase.initializeApp(firebaseConfig);

export const firebaseStorage = firebase.storage();
