// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXBIjG3aVqpU8Cb6DVODotV4oiMECqdWM",
  authDomain: "my-task-manager-9ab66.firebaseapp.com",
  projectId: "my-task-manager-9ab66",
  storageBucket: "my-task-manager-9ab66.appspot.com",
  messagingSenderId: "119418669754",
  appId: "1:119418669754:web:d191959d44470a6c3a9083",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
